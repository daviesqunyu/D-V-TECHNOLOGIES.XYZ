import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  RefreshCw,
  LogOut,
  Lock,
  MessageSquare,
  DollarSign,
  Rss,
  Download,
  Reply,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { api, authHeaders, config } from "@/lib/api";
import * as XLSX from "xlsx";

const ADMIN_STORAGE_KEY = "dv-admin-token";
const ADMIN_TOKEN_EXPIRY_MS = 8 * 60 * 60 * 1000;

function getStoredAdminToken(): string | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(ADMIN_STORAGE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as { token?: string; expiresAt?: number };
    if (
      typeof parsed.token === "string" &&
      typeof parsed.expiresAt === "number" &&
      parsed.expiresAt > Date.now()
    ) {
      return parsed.token;
    }
  } catch {
    if (raw.trim()) return raw;
  }
  sessionStorage.removeItem(ADMIN_STORAGE_KEY);
  return null;
}

type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  created_at: string;
};

type PaymentRecord = {
  id: string;
  method: string;
  plan: string;
  amount: number;
  phone: string | null;
  email: string | null;
  name: string | null;
  status: string;
  checkout_request_id: string | null;
  error_message: string | null;
  created_at: string;
};

type NewsletterSubscriber = {
  id: string;
  email: string;
  created_at: string;
};

type AdminData = {
  success?: boolean;
  warnings?: string[];
  contactSubmissions: ContactSubmission[];
  paymentRecords: PaymentRecord[];
  newsletterSubscribers: NewsletterSubscriber[];
};

async function parseJsonSafe<T>(res: Response): Promise<T | { error: string }> {
  return res.json().catch(() => ({ error: "Invalid server response." }));
}

function formatDate(s: string) {
  try {
    return new Date(s).toLocaleString("en-KE", {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return s;
  }
}

function formatPaymentAmount(method: string, amount: number) {
  try {
    if (method === "mpesa" || method === "card" || method === "paystack") {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
        maximumFractionDigits: 0,
      }).format(amount);
    }
    // BTC flow is quoted/stored in USD in this project.
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return method === "mpesa" ? `KES ${amount}` : `$${amount}`;
  }
}

const BUSINESS_EMAIL = "info@dvtechnologies.xyz";

function contactReplyMailto(c: ContactSubmission) {
  const subject = `Re: ${c.subject}`;
  const body =
    `Hi ${c.name},\n\n` +
    `Thanks for reaching out to D&V Technologies.\n\n` +
    `---\n` +
    `Your message (${formatDate(c.created_at)}):\n` +
    `${c.message}\n` +
    `---\n\n` +
    `Regards,\nD&V Technologies\n${BUSINESS_EMAIL}\n`;
  const params = new URLSearchParams({
    subject,
    body,
    bcc: BUSINESS_EMAIL,
  });
  return `mailto:${encodeURIComponent(c.email)}?${params.toString()}`;
}

function contactReplyGmailUrl(c: ContactSubmission) {
  // Opens Gmail compose. User must be logged into the right inbox (info@...) to send from it.
  const subject = `Re: ${c.subject}`;
  const body =
    `Hi ${c.name},\n\n` +
    `Thanks for reaching out to D&V Technologies.\n\n` +
    `---\n` +
    `Your message (${formatDate(c.created_at)}):\n` +
    `${c.message}\n` +
    `---\n\n` +
    `Regards,\nD&V Technologies\n${BUSINESS_EMAIL}\n`;
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: c.email,
    su: subject,
    body,
    bcc: BUSINESS_EMAIL,
  });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

function webmailUrl(domain: string) {
  // cPanel webmail is commonly on :2096. This just opens the login page.
  return `https://${domain}:2096`;
}

function downloadPaymentsExcel(records: PaymentRecord[]) {
  const rows = records.map((p) => {
    const isKes = p.method === "mpesa" || p.method === "paystack" || p.method === "card";
    return {
      Date: p.created_at,
      Method: p.method,
      Plan: p.plan,
      Amount: Number(p.amount),
      Currency: isKes ? "KES" : "USD",
      Status: p.status,
      Phone: p.phone ?? "",
      Email: p.email ?? "",
      Name: p.name ?? "",
      Reference: p.checkout_request_id ?? "",
      Error: p.error_message ?? "",
    };
  });

  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Payments");

  const stamp = new Date().toISOString().slice(0, 10);
  XLSX.writeFile(wb, `dv-payment-records-${stamp}.xlsx`);
}

export default function Admin() {
  const { toast } = useToast();
  const [token, setToken] = useState<string | null>(() => getStoredAdminToken());
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AdminData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState<"contacts" | "payments" | "newsletter">(
    "contacts"
  );

  const fetchData = useCallback(async () => {
    if (!token) return;
    setRefreshing(true);
    try {
      const res = await fetch(api.adminData, {
        method: "GET",
        headers: {
          ...authHeaders(),
          "x-admin-secret": token,
        },
      });
      const json = await parseJsonSafe<AdminData & { success?: boolean; error?: string }>(
        res
      );
      if (res.ok && json.success) {
        setData(json as AdminData);
        if (json.warnings?.length) {
          toast({
            title: "Loaded with warnings",
            description: json.warnings.join(" | "),
          });
        }
      } else {
        toast({
          title:
            "error" in json && typeof json.error === "string"
              ? json.error
              : "Failed to load data",
          variant: "destructive",
        });
        if (res.status === 401) {
          sessionStorage.removeItem(ADMIN_STORAGE_KEY);
          setToken(null);
        }
      }
    } catch (error) {
      toast({
        title: "Connection error",
        description:
          error instanceof Error ? error.message : "Unable to load admin data right now.",
        variant: "destructive",
      });
    } finally {
      setRefreshing(false);
    }
  }, [token, toast]);

  useEffect(() => {
    if (token) fetchData();
  }, [token, fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(api.adminData, {
        method: "GET",
        headers: {
          ...authHeaders(),
          "x-admin-secret": password.trim(),
        },
      });
      const json = await parseJsonSafe<AdminData & { success?: boolean; error?: string }>(
        res
      );
      if (res.ok && json.success) {
        sessionStorage.setItem(
          ADMIN_STORAGE_KEY,
          JSON.stringify({
            token: password.trim(),
            expiresAt: Date.now() + ADMIN_TOKEN_EXPIRY_MS,
          })
        );
        setToken(password.trim());
        setPassword("");
        toast({ title: "Logged in successfully" });
      } else {
        toast({
          title:
            "error" in json && typeof json.error === "string"
              ? json.error
              : "Invalid password",
          variant: "destructive",
        });
      }
    } catch {
      toast({ title: "Connection error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setToken(null);
    setData(null);
    toast({ title: "Logged out" });
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-card rounded-2xl p-8 border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">Admin Login</h1>
              <p className="text-sm text-muted-foreground">{config.domain}</p>
            </div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Admin Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin secret"
                className="w-full px-4 py-3 rounded-xl border border-border bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>
            <Button type="submit" variant="hero" className="w-full" disabled={loading}>
              {loading ? "Verifying..." : "Login"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Set ADMIN_SECRET in Supabase Edge Function secrets
          </p>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: "contacts" as const, label: "Contacts", icon: MessageSquare },
    { id: "payments" as const, label: "Payments", icon: DollarSign },
    { id: "newsletter" as const, label: "Newsletter", icon: Rss },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
              <p className="text-xs text-muted-foreground">{config.domain}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={refreshing}>
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
        <div className="container mx-auto px-4 flex gap-2 border-t border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid gap-3 sm:grid-cols-3 mb-6">
          <div className="glass-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Contacts</p>
            <p className="font-display text-2xl font-bold">{data?.contactSubmissions?.length ?? 0}</p>
          </div>
          <div className="glass-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Payments</p>
            <p className="font-display text-2xl font-bold">{data?.paymentRecords?.length ?? 0}</p>
          </div>
          <div className="glass-card rounded-xl p-4 border border-border">
            <p className="text-xs text-muted-foreground">Newsletter</p>
            <p className="font-display text-2xl font-bold">{data?.newsletterSubscribers?.length ?? 0}</p>
          </div>
        </div>

        {activeTab === "contacts" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Contact Form Submissions ({data?.contactSubmissions?.length ?? 0})
              </h2>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="max-h-[60vh] overflow-y-auto">
                {!data?.contactSubmissions?.length ? (
                  <div className="p-8 text-center text-muted-foreground">No submissions yet</div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50 sticky top-0">
                          <tr>
                            <th className="text-left p-3 font-medium">Date</th>
                            <th className="text-left p-3 font-medium">Name</th>
                            <th className="text-left p-3 font-medium">Email</th>
                            <th className="text-left p-3 font-medium">Phone</th>
                            <th className="text-left p-3 font-medium">Subject</th>
                            <th className="text-left p-3 font-medium">Message</th>
                            <th className="text-left p-3 font-medium">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.contactSubmissions.map((c) => (
                            <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 text-muted-foreground">{formatDate(c.created_at)}</td>
                              <td className="p-3">{c.name}</td>
                              <td className="p-3">
                                <a href={`mailto:${c.email}`} className="text-primary hover:underline">
                                  {c.email}
                                </a>
                              </td>
                              <td className="p-3">{c.phone || "—"}</td>
                              <td className="p-3">{c.subject}</td>
                              <td className="p-3 max-w-xs truncate">{c.message}</td>
                              <td className="p-3">
                                <div className="flex items-center gap-2">
                                  <a href={contactReplyMailto(c)} className="inline-flex">
                                    <Button variant="outline" size="sm" className="gap-2">
                                      <Reply className="w-4 h-4" />
                                      Reply
                                    </Button>
                                  </a>
                                  <a
                                    href={contactReplyGmailUrl(c)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex"
                                    title="Opens Gmail compose (send from info@ by logging into that inbox)"
                                  >
                                    <Button variant="ghost" size="sm" className="gap-2">
                                      <ExternalLink className="w-4 h-4" />
                                      Gmail
                                    </Button>
                                  </a>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden divide-y divide-border">
                      {data.contactSubmissions.map((c) => (
                        <div key={c.id} className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium truncate">{c.name}</p>
                              <a href={`mailto:${c.email}`} className="text-sm text-primary hover:underline truncate block">
                                {c.email}
                              </a>
                            </div>
                            <p className="text-xs text-muted-foreground flex-shrink-0">{formatDate(c.created_at)}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">Subject:</span> {c.subject}
                          </p>
                          <p className="text-sm text-muted-foreground break-words">{c.message}</p>
                          <p className="text-xs text-muted-foreground">
                            Phone: <span className="text-foreground">{c.phone || "—"}</span>
                          </p>
                          <div className="pt-2 flex flex-col gap-2">
                            <a href={contactReplyMailto(c)} className="inline-flex">
                              <Button variant="outline" size="sm" className="gap-2 w-full justify-center">
                                <Reply className="w-4 h-4" />
                                Reply
                              </Button>
                            </a>
                            <a
                              href={contactReplyGmailUrl(c)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button variant="ghost" size="sm" className="gap-2 w-full justify-center">
                                <ExternalLink className="w-4 h-4" />
                                Reply in Gmail
                              </Button>
                            </a>
                            <a
                              href={webmailUrl(config.domain)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex"
                            >
                              <Button variant="ghost" size="sm" className="gap-2 w-full justify-center">
                                <ExternalLink className="w-4 h-4" />
                                Open Webmail
                              </Button>
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "payments" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Payment Records ({data?.paymentRecords?.length ?? 0})
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 w-full sm:w-auto"
                onClick={() => data?.paymentRecords?.length && downloadPaymentsExcel(data.paymentRecords)}
                disabled={!data?.paymentRecords?.length}
              >
                <Download className="w-4 h-4" />
                Export Excel
              </Button>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="max-h-[60vh] overflow-y-auto">
                {!data?.paymentRecords?.length ? (
                  <div className="p-8 text-center text-muted-foreground">No payment records yet</div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50 sticky top-0">
                          <tr>
                            <th className="text-left p-3 font-medium">Date</th>
                            <th className="text-left p-3 font-medium">Method</th>
                            <th className="text-left p-3 font-medium">Plan</th>
                            <th className="text-left p-3 font-medium">Amount</th>
                            <th className="text-left p-3 font-medium">Phone/Email</th>
                            <th className="text-left p-3 font-medium">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.paymentRecords.map((p) => (
                            <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 text-muted-foreground">{formatDate(p.created_at)}</td>
                              <td className="p-3">
                                <span className="capitalize">{p.method}</span>
                              </td>
                              <td className="p-3">{p.plan}</td>
                              <td className="p-3 font-medium">{formatPaymentAmount(p.method, p.amount)}</td>
                              <td className="p-3">{p.phone || p.email || "—"}</td>
                              <td className="p-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    p.status === "completed"
                                      ? "bg-emerald-500/20 text-emerald-600"
                                      : p.status === "failed"
                                      ? "bg-red-500/20 text-red-600"
                                      : "bg-amber-500/20 text-amber-600"
                                  }`}
                                >
                                  {p.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile cards */}
                    <div className="md:hidden divide-y divide-border">
                      {data.paymentRecords.map((p) => (
                        <div key={p.id} className="p-4 space-y-2">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-medium truncate">{p.plan}</p>
                              <p className="text-xs text-muted-foreground capitalize">{p.method}</p>
                            </div>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${
                                p.status === "completed"
                                  ? "bg-emerald-500/20 text-emerald-600"
                                  : p.status === "failed"
                                  ? "bg-red-500/20 text-red-600"
                                  : "bg-amber-500/20 text-amber-600"
                              }`}
                            >
                              {p.status}
                            </span>
                          </div>
                          <p className="text-sm">
                            <span className="text-muted-foreground">Amount:</span>{" "}
                            <span className="font-semibold">{formatPaymentAmount(p.method, p.amount)}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(p.created_at)}
                          </p>
                          <p className="text-xs text-muted-foreground break-words">
                            Contact: <span className="text-foreground">{p.phone || p.email || "—"}</span>
                          </p>
                          {p.checkout_request_id ? (
                            <p className="text-[11px] text-muted-foreground break-words">
                              Ref: <span className="text-foreground">{p.checkout_request_id}</span>
                            </p>
                          ) : null}
                          {p.error_message ? (
                            <p className="text-[11px] text-red-500/80 break-words">{p.error_message}</p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "newsletter" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-lg font-bold flex items-center gap-2">
                <Rss className="w-5 h-5 text-primary" />
                Newsletter Subscribers ({data?.newsletterSubscribers?.length ?? 0})
              </h2>
            </div>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="max-h-[60vh] overflow-y-auto">
                {!data?.newsletterSubscribers?.length ? (
                  <div className="p-8 text-center text-muted-foreground">No subscribers yet</div>
                ) : (
                  <>
                    {/* Desktop table */}
                    <div className="hidden md:block overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted/50 sticky top-0">
                          <tr>
                            <th className="text-left p-3 font-medium">Date</th>
                            <th className="text-left p-3 font-medium">Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.newsletterSubscribers.map((s) => (
                            <tr key={s.id} className="border-t border-border hover:bg-muted/30">
                              <td className="p-3 text-muted-foreground">{formatDate(s.created_at)}</td>
                              <td className="p-3">
                                <a href={`mailto:${s.email}`} className="text-primary hover:underline">
                                  {s.email}
                                </a>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Mobile list */}
                    <div className="md:hidden divide-y divide-border">
                      {data.newsletterSubscribers.map((s) => (
                        <div key={s.id} className="p-4">
                          <a href={`mailto:${s.email}`} className="text-primary hover:underline break-words">
                            {s.email}
                          </a>
                          <p className="text-xs text-muted-foreground mt-1">{formatDate(s.created_at)}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
