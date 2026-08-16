import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  currency: "USD" | "KES";
  billing?: "weekly" | "monthly" | "once";
  category?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  addItem: (item: Omit<CartItem, "qty">) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "dv-cart";

function readStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStorage);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable */
    }
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, item) => acc + item.qty, 0);
    const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);

    const addItem = (item: Omit<CartItem, "qty">) =>
      setItems((prev) => {
        const existing = prev.find((p) => p.id === item.id);
        if (existing) {
          return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p));
        }
        return [...prev, { ...item, qty: 1 }];
      });

    const removeItem = (id: string) => setItems((prev) => prev.filter((p) => p.id !== id));

    const updateQty = (id: string, qty: number) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((p) => p.id !== id) : prev.map((p) => (p.id === id ? { ...p, qty } : p))
      );

    const clear = () => setItems([]);

    return { items, count, total, addItem, removeItem, updateQty, clear };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
