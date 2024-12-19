import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '../types/product';
import { CartItem, CartState } from '../types/cart';

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.productId === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.productId === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price
        };
      }
      return {
        ...state,
        items: [...state.items, { productId: action.payload._id, product: action.payload, quantity: 1 }],
        total: state.total + action.payload.price
      };
    }
    case 'REMOVE_ITEM': {
      const item = state.items.find(item => item.productId === action.payload);
      if (!item) return state;
      return {
        ...state,
        items: state.items.filter(item => item.productId !== action.payload),
        total: state.total - (item.product.price * item.quantity)
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.productId === action.payload.productId);
      if (!item) return state;
      const quantityDiff = action.payload.quantity - item.quantity;
      return {
        ...state,
        items: state.items.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (item.product.price * quantityDiff)
      };
    }
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};