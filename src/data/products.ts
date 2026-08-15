import type { LucideIcon } from "lucide-react";
import {
  Wrench,
  Monitor,
  Wifi,
  Shield,
  Globe,
  Camera,
  Cloud,
  Brain,
  Store,
  HardDrive,
  Router,
  Cpu,
  Laptop,
  Network,
  Building2,
  Smartphone,
  LineChart,
  CreditCard,
  Megaphone,
  Printer,
  KeyRound,
  BatteryCharging,
  GraduationCap,
  Mail,
  Search,
  CalendarClock,
  Fingerprint,
  Zap,
} from "lucide-react";

const img = (id: number, w = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

export type Product = {
  id: string;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  compareAt?: number;
  currency: "KES" | "USD";
  billing?: "weekly" | "monthly" | "once";
  category: string;
  icon: LucideIcon;
  gradient: string;
  tag?: string;
  featured?: boolean;
  features: string[];
  deliverables?: string[];
  image?: string;
  highlight?: string;
  market?: boolean;
};

export const products: Product[] = [
  {
    id: "weekly-support",
    name: "Weekly IT Support Plan",
    description:
      "Test our services risk-free. Remote IT support, troubleshooting and guidance billed every week via M-Pesa. Cancel anytime.",
    longDescription:
      "The 100 KES weekly plan is D&V's risk-free way to start working with a professional IT team. You get remote support during business hours, fast answers to your tech questions and guidance on the basics — hardware, software, email and networking. Billed automatically every week on M-Pesa, you can cancel anytime with no lock-in.",
    price: 100,
    currency: "KES",
    billing: "weekly",
    category: "IT Support",
    icon: Monitor,
    gradient: "from-amber-400 to-orange-500",
    tag: "Promo",
    featured: true,
    image: img(3182773),
    highlight: "Great for individuals & startups testing the waters",
    features: [
      "Remote IT support (business hours)",
      "Basic troubleshooting & guidance",
      "Email setup assistance",
      "Weekly M-Pesa auto-billing",
      "Cancel anytime, no lock-in",
    ],
    deliverables: ["1:1 WhatsApp support line", "Remote session fix log", "Weekly health tip email"],
  },
  {
    id: "essential-support",
    name: "Essential Support",
    description:
      "Core IT support for small businesses getting started with professional tech services.",
    longDescription:
      "Essential Support gives a small business a real IT department. Expect fast remote help, software management, hardware troubleshooting and a monthly system health check that keeps your machines fast and your data safe — all without hiring in-house staff.",
    price: 300,
    currency: "USD",
    billing: "monthly",
    category: "IT Support",
    icon: Monitor,
    gradient: "from-primary to-cyan-500",
    image: img(7988079),
    features: [
      "Remote IT support (business hours)",
      "Basic hardware troubleshooting",
      "Software installation & updates",
      "Monthly system health check",
      "Email & productivity setup",
    ],
    deliverables: ["Dedicated support ticket queue", "Monthly health report", "Software update ledger"],
  },
  {
    id: "advanced-solutions",
    name: "Advanced Solutions",
    description:
      "Full-service IT, networking, cloud, and security for growing businesses.",
    longDescription:
      "Advanced Solutions is our most popular managed plan. It covers 24/7 support, hardware and server maintenance, network design, cloud migration, backups and firewall protection — everything a growing Nairobi company needs to run without tech drama. Most clients see this plan as 'our IT department for a flat monthly fee'.",
    price: 650,
    currency: "USD",
    billing: "monthly",
    category: "IT Support",
    icon: Network,
    gradient: "from-primary to-accent",
    tag: "Popular",
    featured: true,
    image: img(1148820),
    highlight: "Most popular for growing businesses",
    features: [
      "24/7 remote & on-site support",
      "Hardware repair & server maintenance",
      "Network design & Wi-Fi (multi-AP)",
      "Firewall & VPN configuration",
      "Cloud migration & SaaS setup",
      "Data backup & recovery plan",
    ],
    deliverables: ["24/7 hotline + SLA", "On-site visits (4/month)", "Quarterly security review"],
  },
  {
    id: "enterprise-ai",
    name: "Enterprise & AI",
    description:
      "Unlimited support, custom software, AI, cybersecurity and full digital transformation.",
    longDescription:
      "Our top tier is a full transformation partnership. Unlimited priority support plus custom software, ERP, AI/automation, predictive analytics and digital strategy. If you want your business run by technology — not just supported by it — this is the plan.",
    price: 900,
    currency: "USD",
    billing: "monthly",
    category: "IT Support",
    icon: Building2,
    gradient: "from-violet-500 to-primary",
    image: img(3182812),
    features: [
      "24/7 priority support (unlimited)",
      "Custom software & ERP development",
      "AI & automation solutions",
      "Unlimited on-site visits",
      "Cybersecurity audit & training",
      "Dedicated account manager",
    ],
    deliverables: ["Dedicated account manager", "Digital transformation roadmap", "Custom AI automations"],
  },
  {
    id: "custom-website",
    name: "Custom Website",
    description:
      "A modern, fast, SEO-ready website designed around your brand and goals.",
    longDescription:
      "We design and build your website from scratch — or refresh your existing one — with a modern UI, mobile-first responsiveness and SEO foundations. You own everything: domain, hosting and code. Includes a training session so your team can update content easily.",
    price: 25000,
    compareAt: 40000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: Globe,
    gradient: "from-green-500 to-emerald-500",
    tag: "Popular",
    featured: true,
    image: img(1108101),
    features: [
      "Custom design & development",
      "Mobile-first responsive layout",
      "SEO basics included",
      "Contact forms & WhatsApp button",
      "Analytics installed",
      "Team training session",
    ],
    deliverables: ["Design mockups (2 rounds)", "Live staging link", "Domain & hosting setup", "Admin training"],
  },
  {
    id: "ecommerce-platform",
    name: "E-commerce Platform",
    description:
      "Launch a full online store with M-Pesa, card and delivery integrations.",
    longDescription:
      "A complete online shop: catalog, cart, secure checkout with M-Pesa STK and cards, order dashboard, and delivery integrations. We handle payment wiring, so customers pay you directly. Perfect for retailers, boutiques and distributors ready to sell online.",
    price: 60000,
    compareAt: 90000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: Store,
    gradient: "from-teal-500 to-cyan-500",
    image: img(230544),
    features: [
      "Product catalog & cart",
      "M-Pesa & card checkout",
      "Order management dashboard",
      "Delivery & courier integration",
      "Customer accounts",
      "Analytics & reporting",
    ],
    deliverables: ["Store setup & product upload (50 SKUs)", "Payment gateway activation", "Seller training"],
  },
  {
    id: "ai-chatbot",
    name: "AI Chatbot Setup",
    description:
      "Deploy DIVA, our local AI assistant, on your website or Telegram to answer customers instantly.",
    longDescription:
      "We train an AI assistant on YOUR business — products, prices, FAQs, location — and deploy it on your website and/or Telegram. It answers customers 24/7 in English and Swahili, hands off to a human when stuck, and even collects leads for you.",
    price: 15000,
    currency: "KES",
    billing: "once",
    category: "AI",
    icon: Brain,
    gradient: "from-pink-500 to-violet-500",
    tag: "New",
    image: img(8386440),
    features: [
      "Trained on your business info",
      "Website & Telegram widgets",
      "Swahili & English support",
      "24/7 instant responses",
      "Lead capture & notifications",
    ],
    deliverables: ["Trained knowledge base", "Widget embed code", "Telegram bot link", "1 month tuning"],
  },
  {
    id: "laptop-repair",
    name: "Laptop Repair Service",
    description:
      "Expert diagnosis and repair — screen, keyboard, battery, fans, data recovery and upgrades.",
    longDescription:
      "Free diagnosis, honest quotes, genuine parts and a 90-day repair warranty. Whether it's a cracked screen, dead battery, overheating fan or water damage, we repair most laptops within 24-72 hours and can usually save your data.",
    price: 2500,
    compareAt: 5000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: Laptop,
    gradient: "from-slate-500 to-slate-700",
    image: img(3825586),
    highlight: "Free diagnosis",
    features: [
      "Free diagnosis & quote",
      "Screen, keyboard, battery repair",
      "Data recovery & transfer",
      "Genuine replacement parts",
      "90-day repair warranty",
    ],
    deliverables: ["Diagnostic report", "Replacement part warranty", "Cleaned & optimized machine"],
  },
  {
    id: "computer-upgrade",
    name: "Computer Upgrade Kit",
    description:
      "RAM, SSD and processor upgrades to give your existing machines a new life.",
    longDescription:
      "Before you buy a new computer, let us upgrade your current one. Adding an SSD and more RAM is the fastest, cheapest way to make an old machine feel brand new. Includes cloning of your existing drive so nothing is lost.",
    price: 8000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: Cpu,
    gradient: "from-blue-500 to-indigo-500",
    image: img(159776),
    features: [
      "SSD installation & cloning",
      "RAM upgrade",
      "Thermal paste & cleaning",
      "Speed benchmark report",
      "OS optimization",
    ],
    deliverables: ["Before/after benchmark", "Cloned drive (no data loss)", "12-month part warranty"],
  },
  {
    id: "wifi-setup",
    name: "Wi-Fi Setup (Single AP)",
    description:
      "Professional access point installation and configuration for home or small office.",
    longDescription:
      "Reliable Wi-Fi in every corner. We survey your space, install and configure a quality access point, and secure your network with a strong password and guest network. Ideal for homes and offices struggling with dead zones.",
    price: 3500,
    currency: "KES",
    billing: "once",
    category: "Networking",
    icon: Wifi,
    gradient: "from-cyan-500 to-blue-500",
    image: img(16134275),
    features: [
      "Access point installation",
      "Coverage survey",
      "Secure Wi-Fi configuration",
      "Guest network setup",
      "Speed optimization",
    ],
    deliverables: ["Coverage heatmap", "Network credentials card", "Quality hardware warranty"],
  },
  {
    id: "cctv-install",
    name: "CCTV Installation (4 Cameras)",
    description:
      "IP camera setup with mobile remote viewing so you can monitor from anywhere.",
    longDescription:
      "Protect your premises with a professional IP CCTV system. We supply and install 4 cameras with a network recorder, set up mobile remote viewing, and run clean, safe cabling. Everything is tested and handed over with a 1-year warranty.",
    price: 22000,
    compareAt: 30000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: Camera,
    gradient: "from-yellow-500 to-amber-500",
    tag: "Popular",
    image: img(1078850),
    features: [
      "4 IP cameras + NVR",
      "Mobile remote viewing",
      "Cabling & installation",
      "Night vision & motion alerts",
      "1-year warranty",
    ],
    deliverables: ["Camera placement plan", "Mobile app setup", "Storage configuration"],
  },
  {
    id: "cybersecurity-audit",
    name: "Cybersecurity Audit",
    description:
      "Full security assessment, firewall hardening and staff awareness training.",
    longDescription:
      "Find and fix the gaps before attackers do. We assess your systems, test for vulnerabilities, harden your firewall and VPN, deploy anti-malware, and train your team to spot phishing — the #1 way businesses get hacked.",
    price: 18000,
    currency: "KES",
    billing: "once",
    category: "Security",
    icon: Shield,
    gradient: "from-red-500 to-orange-500",
    image: img(60504),
    features: [
      "Vulnerability assessment",
      "Firewall & VPN hardening",
      "Anti-malware deployment",
      "Staff security training",
      "Written findings report",
    ],
    deliverables: ["Risk report with priorities", "Hardened firewall config", "Staff training session"],
  },
  {
    id: "cloud-backup",
    name: "Cloud Backup & Recovery",
    description:
      "Automated off-site backups with tested recovery, so you never lose data again.",
    longDescription:
      "Automatic, encrypted backups of your files, servers and databases to off-site cloud storage. We schedule, monitor and — most importantly — actually test restores, so when disaster strikes you're back online in hours, not days.",
    price: 5000,
    currency: "KES",
    billing: "monthly",
    category: "Cloud",
    icon: Cloud,
    gradient: "from-sky-500 to-cyan-400",
    image: img(1148820),
    features: [
      "Automatic daily backups",
      "Encrypted storage",
      "Tested disaster recovery",
      "Priority restore support",
      "Retention policy management",
    ],
    deliverables: ["Backup dashboard", "Recovery runbook", "Quarterly restore test"],
  },
  {
    id: "mpesa-integration",
    name: "M-Pesa Integration",
    description:
      "Wire M-Pesa STK push, C2B and B2B payments into your website or business system.",
    longDescription:
      "Let customers pay you directly in-app or on-site. We integrate M-Pesa STK push (Lipa na M-Pesa), C2B payments and confirmations into your website, mobile app or business system, complete with a transaction ledger and developer handover docs.",
    price: 30000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: Smartphone,
    gradient: "from-green-600 to-emerald-400",
    image: img(4968391),
    features: [
      "STK push checkout",
      "Payment confirmations",
      "Transaction ledger",
      "C2B integration",
      "Developer handover docs",
    ],
    deliverables: ["Working sandbox demo", "Production keys wired", "Transaction reporting"],
  },
  {
    id: "networking-vpn",
    name: "Networking & VPN Setup",
    description:
      "Secure remote access and site-to-site connectivity for hybrid teams and branches.",
    longDescription:
      "Give your team secure access from anywhere. We configure VPN clients, site-to-site tunnels between branches, access policies and full security hardening — so your staff work safely from home, the office, or on the road.",
    price: 6000,
    currency: "KES",
    billing: "once",
    category: "Networking",
    icon: Router,
    gradient: "from-purple-500 to-fuchsia-500",
    image: img(6476588),
    features: [
      "VPN client & server setup",
      "Site-to-site tunnels",
      "Access control policies",
      "Security hardening",
    ],
    deliverables: ["VPN credentials & guides", "Topology diagram", "Policy documentation"],
  },
  {
    id: "erp-implementation",
    name: "ERP Implementation",
    description:
      "End-to-end business systems — inventory, sales, accounting and HR in one platform.",
    longDescription:
      "Bring your whole business into one system. We analyze your workflows, configure an ERP (Odoo, ERPNext or custom), migrate your data, train your team and support you through go-live. Stop juggling spreadsheets — run your business on one source of truth.",
    price: 120000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: Building2,
    gradient: "from-orange-500 to-red-500",
    image: img(159888),
    features: [
      "Requirements analysis",
      "System configuration",
      "Data migration",
      "Team training & support",
      "Process automation",
    ],
    deliverables: ["Configured ERP environment", "Migrated data", "Training manual & sessions"],
  },
  {
    id: "server-rack",
    name: "Server & Rack Hardware Supply",
    description:
      "Supply and installation of servers, racks and enterprise storage for offices.",
    longDescription:
      "We source, supply and install enterprise servers, racks and storage — tailored to your budget. Includes rack mounting, cable management, cooling/power planning and full warranty support, so your infrastructure is built right the first time.",
    price: 145000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: HardDrive,
    gradient: "from-slate-600 to-slate-900",
    market: true,
    image: img(1148820),
    features: [
      "Server & storage sourcing",
      "Rack installation & cabling",
      "Cooling & power planning",
      "Warranty & support",
    ],
    deliverables: ["Infrastructure design", "Installed & tested rack", "Warranty documents"],
  },
  {
    id: "network-cabling",
    name: "Structured Cabling & Networking",
    description:
      "Cat6 structured cabling, patch panels and network rollout for offices and campuses.",
    longDescription:
      "Professional structured cabling that looks clean and performs reliably. Cat6 drops, patch panels, switches and full network rollout with testing, labeling and certification — built to grow with your business.",
    price: 45000,
    currency: "KES",
    billing: "once",
    category: "Networking",
    icon: LineChart,
    gradient: "from-indigo-500 to-blue-600",
    market: true,
    image: img(2582937),
    features: [
      "Cat6 structured cabling",
      "Patch panel & switch setup",
      "Cable testing & labeling",
      "Network certification",
    ],
    deliverables: ["Cabling diagram & labels", "Certified test results", "Switch configuration"],
  },
  {
    id: "domain-hosting",
    name: "Domain & Hosting",
    description:
      "Domain registration, business email and managed hosting with SSL for your website.",
    longDescription:
      "Everything your website needs to live on the internet: domain registration/renewal, fast and secure hosting, free SSL, business email and daily backups. We handle renewals so your site never goes down because of a forgotten payment.",
    price: 4500,
    currency: "KES",
    billing: "monthly",
    category: "Cloud",
    icon: Globe,
    gradient: "from-teal-500 to-emerald-500",
    image: img(1921326),
    features: [
      "Domain registration & renewals",
      "Managed hosting + SSL",
      "Business email setup",
      "Daily backups",
      "99.9% uptime",
    ],
    deliverables: ["Domain under your name", "SSL certificate live", "Email accounts configured"],
  },
  {
    id: "mobile-app",
    name: "Mobile App Development",
    description:
      "Android & iOS apps built with React Native or Flutter — one codebase, both stores.",
    longDescription:
      "From a simple MVP to a full product: we design, build and ship native-quality apps on Android and iOS from a single codebase. Includes M-Pesa and card payments, push notifications and app store publishing.",
    price: 80000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: Smartphone,
    gradient: "from-emerald-500 to-teal-500",
    tag: "New",
    image: img(1092644),
    features: [
      "iOS & Android from one codebase",
      "M-Pesa & card payments",
      "Push notifications",
      "App store publishing",
      "Ongoing support option",
    ],
    deliverables: ["TestFlight/APK builds", "Store listing assets", "Source code & docs"],
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing Package",
    description:
      "Social media management, content and paid ads that turn followers into customers.",
    longDescription:
      "A monthly marketing engine for your business: content calendar, social media management, ad campaigns on Meta & Google, and monthly performance reports. We focus on local reach that actually converts — not vanity metrics.",
    price: 20000,
    currency: "KES",
    billing: "monthly",
    category: "Marketing",
    icon: Megaphone,
    gradient: "from-pink-500 to-rose-500",
    image: img(265087),
    features: [
      "Social media management",
      "Content calendar & design",
      "Meta & Google ads",
      "Monthly performance reports",
      "Local audience targeting",
    ],
    deliverables: ["Content calendar", "Ad account management", "Monthly analytics report"],
  },
  {
    id: "website-care",
    name: "Website Care Plan",
    description:
      "Updates, backups, security patches and small edits so your site stays healthy.",
    longDescription:
      "Your website quietly breaks if nothing maintains it. We handle updates, backups, uptime monitoring and security patches, plus up to 2 hours of small edits each month. Ideal for businesses with an existing site they can't ignore.",
    price: 3000,
    currency: "KES",
    billing: "monthly",
    category: "Cloud",
    icon: Zap,
    gradient: "from-yellow-500 to-amber-500",
    image: img(230544),
    features: [
      "Monthly updates & patches",
      "Uptime monitoring",
      "Security scanning",
      "2h of edits per month",
      "Priority fix turnaround",
    ],
    deliverables: ["Monthly care report", "Uptime dashboard access", "Fast emergency fixes"],
  },
  {
    id: "data-recovery",
    name: "Data Recovery",
    description:
      "Recover files from crashed drives, corrupted media and failed storage — fast.",
    longDescription:
      "Lost photos, documents or a crashed drive? We recover data from hard drives, SSDs, memory cards and USB sticks. If it's software-recoverable we usually get it back same-day; hardware-level recovery takes longer but is often possible.",
    price: 5000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: HardDrive,
    gradient: "from-rose-500 to-red-500",
    image: img(159751),
    features: [
      "Crashed drive recovery",
      "Corrupted media recovery",
      "Same-day software recovery",
      "Data copied to new drive",
    ],
    deliverables: ["Recovery attempt report", "Recovered data on new media"],
  },
  {
    id: "printer-support",
    name: "Printer Repair & Setup",
    description:
      "Printer setup, toner/ink supply, driver fixes and network printing for offices.",
    longDescription:
      "Printers are notorious for 'just not working'. We install printers on Windows/Mac, fix driver and connectivity issues, set up network printing and shared queues, and supply toner/ink — keeping your office productive.",
    price: 1800,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: Printer,
    gradient: "from-slate-400 to-slate-600",
    image: img(159751),
    features: [
      "Installation on Windows/Mac",
      "Network & shared printing",
      "Driver & queue fixes",
      "Toner & ink supply",
    ],
    deliverables: ["Working network printing", "Driver/queue docs"],
  },
  {
    id: "pos-system",
    name: "POS System Installation",
    description:
      "Point-of-sale with inventory, M-Pesa payments and simple reports for retail & F&B.",
    longDescription:
      "Run your shop or restaurant on a modern POS: touch-screen till, inventory tracking, M-Pesa and card payments, staff permissions and daily sales reports. We install, train your team and support you monthly.",
    price: 18000,
    currency: "KES",
    billing: "once",
    category: "Software",
    icon: CreditCard,
    gradient: "from-fuchsia-500 to-purple-600",
    image: img(1148820),
    features: [
      "Touch-screen POS setup",
      "Inventory & stock alerts",
      "M-Pesa & card payments",
      "Daily sales reports",
      "Staff training",
    ],
    deliverables: ["Configured POS terminals", "Training sessions", "Support hotline"],
  },
  {
    id: "staff-training",
    name: "Staff IT Training",
    description:
      "Hands-on workshops on Microsoft 365, Google Workspace, data safety and AI tools.",
    longDescription:
      "Train your team to actually use the tools you already pay for. Practical, hands-on workshops in Excel, Google Workspace, Microsoft 365, cybersecurity basics and using AI tools productively — delivered at your office or online.",
    price: 15000,
    currency: "KES",
    billing: "once",
    category: "Training",
    icon: GraduationCap,
    gradient: "from-amber-500 to-yellow-600",
    image: img(3182773),
    features: [
      "Microsoft 365 / Google Workspace",
      "Excel & data skills",
      "Cybersecurity basics",
      "AI tools for work",
      "Certificates of completion",
    ],
    deliverables: ["Custom curriculum", "Training materials PDF", "Certificates"],
  },
  {
    id: "access-control",
    name: "Access Control & Biometrics",
    description:
      "Biometric door access, attendance tracking and secure entry for offices.",
    longDescription:
      "Control who enters your building and track staff attendance automatically. We supply and install fingerprint/face readers, configure schedules and permissions, and hand over clean attendance reports — no more manual registers.",
    price: 28000,
    currency: "KES",
    billing: "once",
    category: "Security",
    icon: Fingerprint,
    gradient: "from-violet-600 to-purple-700",
    image: img(100582),
    features: [
      "Biometric door readers",
      "Attendance tracking",
      "Schedules & permissions",
      "Exit & alarm integration",
      "Monthly reports",
    ],
    deliverables: ["Installed readers & software", "Staff enrollment", "Report training"],
  },
  {
    id: "ups-power",
    name: "UPS & Power Backup",
    description:
      "Protect your hardware from outages with UPS units, surge protection and power audits.",
    longDescription:
      "Nairobi outages damage hardware and corrupt data. We supply and install quality UPS units, surge protectors and power audits for your office — keeping servers, POS and workstations alive through outages.",
    price: 12000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: BatteryCharging,
    gradient: "from-green-500 to-lime-500",
    image: img(159888),
    features: [
      "UPS supply & installation",
      "Surge protection",
      "Power load audit",
      "Battery replacement service",
    ],
    deliverables: ["Power audit report", "Installed & tested UPS"],
  },
  {
    id: "refurb-laptops",
    name: "Refurbished Laptop Sales",
    description:
      "Quality-checked refurbished laptops with warranty — business and student ready.",
    longDescription:
      "Affordable, quality-checked refurbished laptops for businesses, schools and students. Every unit is cleaned, upgraded (SSD + RAM where possible), tested and sold with a warranty and setup service.",
    price: 28000,
    currency: "KES",
    billing: "once",
    category: "Hardware",
    icon: Laptop,
    gradient: "from-blue-500 to-cyan-500",
    tag: "New",
    image: img(18105),
    features: [
      "Quality-checked & tested",
      "SSD/RAM upgrades fitted",
      "Windows & Office setup",
      "Warranty included",
      "Business volume pricing",
    ],
    deliverables: ["Benchmark & test report", "Full setup & data transfer", "Warranty certificate"],
  },
  {
    id: "smart-office",
    name: "Smart Office / IoT Setup",
    description:
      "Smart lighting, sensors, energy monitoring and automation for modern offices.",
    longDescription:
      "Turn your office into a smart space: automated lighting, energy monitoring, temperature sensors and security integrations — controlled from one dashboard. Cut power bills and impress clients with a modern workspace.",
    price: 35000,
    currency: "KES",
    billing: "once",
    category: "IoT",
    icon: Brain,
    gradient: "from-cyan-500 to-teal-500",
    image: img(1229861),
    features: [
      "Smart lighting & automation",
      "Energy monitoring sensors",
      "Temperature & environment sensors",
      "Single dashboard control",
      "Phone & web controls",
    ],
    deliverables: ["Automation rules configured", "Dashboard access", "Sensor map"],
  },
];

export const shopCategories = [
  "All",
  ...Array.from(new Set(products.map((p) => p.category))),
];

export const DELIVERY_PROCESS = [
  {
    title: "Order & consult",
    description: "Add to cart or chat us — we clarify your needs and confirm scope.",
    icon: CalendarClock,
  },
  {
    title: "Quote & agree",
    description: "Fixed transparent price. We schedule work at your convenience.",
    icon: CreditCard,
  },
  {
    title: "We deliver",
    description: "Remote or on-site — installed, tested and handed over properly.",
    icon: Wrench,
  },
  {
    title: "Support & warranty",
    description: "Every job comes with follow-up support and a clear warranty.",
    icon: Shield,
  },
] as const;
