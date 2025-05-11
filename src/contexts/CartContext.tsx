
import { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { CartItem, Product } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

interface CartContextType {
  cart: CartState;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );

      if (existingItem) {
        // If item exists, update quantity
        const updatedItems = state.items.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems + quantity,
          totalAmount:
            state.totalAmount +
            (product.salePrice || product.price) * quantity,
        };
      } else {
        // Add new item
        const newItem: CartItem = {
          product,
          quantity,
        };

        return {
          ...state,
          items: [...state.items, newItem],
          totalItems: state.totalItems + quantity,
          totalAmount:
            state.totalAmount +
            (product.salePrice || product.price) * quantity,
        };
      }
    }

    case "REMOVE_ITEM": {
      const { id } = action.payload;
      const itemToRemove = state.items.find((item) => item.product.id === id);

      if (!itemToRemove) return state;

      const updatedItems = state.items.filter((item) => item.product.id !== id);

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems - itemToRemove.quantity,
        totalAmount:
          state.totalAmount -
          (itemToRemove.product.salePrice || itemToRemove.product.price) *
            itemToRemove.quantity,
      };
    }

    case "UPDATE_QUANTITY": {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product.id === id);

      if (!existingItem) return state;

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        const updatedItems = state.items.filter(
          (item) => item.product.id !== id
        );

        return {
          ...state,
          items: updatedItems,
          totalItems: state.totalItems - existingItem.quantity,
          totalAmount:
            state.totalAmount -
            (existingItem.product.salePrice || existingItem.product.price) *
              existingItem.quantity,
        };
      }

      // Update quantity
      const quantityDiff = quantity - existingItem.quantity;
      const updatedItems = state.items.map((item) =>
        item.product.id === id ? { ...item, quantity } : item
      );

      return {
        ...state,
        items: updatedItems,
        totalItems: state.totalItems + quantityDiff,
        totalAmount:
          state.totalAmount +
          (existingItem.product.salePrice || existingItem.product.price) *
            quantityDiff,
      };
    }

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState, () => {
    // Load cart from localStorage
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : initialState;
    }
    return initialState;
  });

  const { toast } = useToast();

  useEffect(() => {
    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id: productId } });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
