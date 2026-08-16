import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, Bot, ArrowLeftRight, Wallet } from "lucide-react";
import { useAppPlatform } from "@/hooks/use-app-platform";
import { useCart } from "@/lib/cart";

const TABS = [
  { path: "/", label: "Home", icon: Home },
  { path: "/shop", label: "Shop", icon: ShoppingBag },
  { path: "/ai-assistant", label: "Chat", icon: Bot },
  { path: "/trade", label: "Trade", icon: ArrowLeftRight },
  { path: "/pay", label: "Pay", icon: Wallet, isCart: true },
] as const;

export function BottomTabBar() {
  const { pathname } = useLocation();
  const { showTabBar, isTelegram } = useAppPlatform();
  const { count } = useCart();

  if (!showTabBar) return null;

  const activePath =
    TABS.find((tab) => (tab.path === "/" ? pathname === "/" : pathname.startsWith(tab.path)))?.path ??
    "/";

  return (
    <nav
      aria-label="Primary app navigation"
      className={`fixed bottom-0 inset-x-0 z-50 pointer-events-none ${
        isTelegram ? "" : "lg:hidden"
      }`}
    >
      <div
        className="pointer-events-auto mx-auto max-w-lg px-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2"
        style={{
          paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
          paddingRight: "max(0.75rem, env(safe-area-inset-right))",
        }}
      >
        <div className="relative rounded-3xl glass-card shadow-2xl border border-border/70 px-2 py-2">
          <div className="grid grid-cols-5 items-end">
            {TABS.map((tab) => {
              const isActive = tab.path === activePath;
              const Icon = tab.icon;
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  aria-label={`${tab.label}${tab.isCart && count > 0 ? ` (${count} items)` : ""}`}
                  className="relative flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5"
                >
                  {isActive && (
                    <motion.div
                      layoutId="bottom-tab-active"
                      className="absolute inset-0 rounded-2xl bg-gradient-to-b from-primary/25 to-primary/5 border border-primary/30"
                      transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                    />
                  )}
                  <span className="relative flex items-center justify-center">
                    {isActive && (
                      <motion.span
                        layoutId="bottom-tab-glow"
                        className="absolute -inset-1.5 rounded-full bg-primary/20 blur-md"
                        transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                      />
                    )}
                    <Icon
                      className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    {tab.isCart && count > 0 && (
                      <AnimatePresence>
                        <motion.span
                          key={count}
                          initial={{ scale: 0.4, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.4, opacity: 0 }}
                          className="absolute -top-2 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-accent to-primary text-white text-[10px] font-bold flex items-center justify-center shadow-lg"
                        >
                          {count > 99 ? "99+" : count}
                        </motion.span>
                      </AnimatePresence>
                    )}
                  </span>
                  <span
                    className={`relative text-[10px] font-semibold leading-none ${
                      isActive ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {tab.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
