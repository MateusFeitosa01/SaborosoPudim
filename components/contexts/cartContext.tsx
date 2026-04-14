"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

/* ================= CONTEXT ================= */

const CartContext = createContext<any>(undefined);

/* ================= PROVIDER ================= */

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  // 🔥 SEM localStorage no init (SSR-safe)
  const [items, setItems] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const [checkoutData, setCheckoutData] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  /* ================= HYDRATION ================= */
  useEffect(() => {
    const stored = localStorage.getItem("cart");

    if (stored) {
      setItems(JSON.parse(stored));
    }

    setHydrated(true);
  }, []);

  /* ================= PERSIST ================= */
  useEffect(() => {
    if (hydrated) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items, hydrated]);

  /* ================= ACTIONS ================= */

  const addItem = useCallback((item: any) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.productId === item.productId && i.size === item.size
      );

      if (existing) {
        return prev.map((i) =>
          i.productId === item.productId && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((i) => !(i.productId === productId && i.size === size))
        );
        return;
      }

      setItems((prev) =>
        prev.map((i) =>
          i.productId === productId && i.size === size
            ? { ...i, quantity }
            : i
        )
      );
    },
    []
  );

  const clearItems = useCallback(() => setItems([]), []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCheckoutData(null);
  }, []);

  /* ================= DERIVED ================= */

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        checkoutData,
        lastOrder,
        addItem,
        removeItem,
        updateQuantity,
        clearItems,
        clearCart,
        setCheckoutData,
        setLastOrder,
        total,
        itemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/* ================= HOOK ================= */

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};