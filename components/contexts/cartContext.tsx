"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

/* ================= TYPES ================= */

export interface CartItem {
  productId: string;
  productName: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface CheckoutData {
  name: string;
  email: string;
  whatsapp: string;
  deliveryDate: Date;
  deliveryMethod: "entrega" | "retirada";
  address?: string;
}

interface Order {
  items: CartItem[];
  total: number;
}

interface CartContextType {
  items: CartItem[];
  checkoutData: CheckoutData | null;
  lastOrder: Order | null;
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (
    productId: string,
    size: string,
    quantity: number
  ) => void;
  clearItems: () => void;
  clearCart: () => void;
  setCheckoutData: (data: CheckoutData) => void;
  setLastOrder: (order: Order) => void;
  total: number;
  itemCount: number;
}

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | undefined>(undefined);

/* ================= PROVIDER ================= */

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [checkoutData, setCheckoutData] =
    useState<CheckoutData | null>(null);
  const [lastOrder, setLastOrder] =
    useState<Order | null>(null);

  /* LOCAL STORAGE */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  /* ADD */
  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size
        );

        if (existing) {
          return prev.map((i) =>
            i.productId === item.productId &&
            i.size === item.size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }

        return [...prev, { ...item, quantity: 1 }];
      });
    },
    []
  );

  /* REMOVE */
  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (i) =>
          !(i.productId === productId && i.size === size)
      )
    );
  }, []);

  /* UPDATE */
  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size);
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
    [removeItem]
  );

  /* CLEAR */
  const clearItems = useCallback(() => {
    setItems([]);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCheckoutData(null);
  }, []);

  /* DERIVED */
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
  if (!context)
    throw new Error("useCart must be used within CartProvider");
  return context;
};