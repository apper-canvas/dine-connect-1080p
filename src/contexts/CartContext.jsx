import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  // Load cart from localStorage on initial load
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  // Update cart total whenever cart changes
  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setCartTotal(total);
    
    // Save cart to localStorage
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cart]);

  // Add item to cart
  const addToCart = (item, quantity = 1, notes = '') => {
    setCart(currentCart => {
      // Check if item already exists in cart
      const existingItemIndex = currentCart.findIndex(
        cartItem => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedCart = [...currentCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
          notes: notes || updatedCart[existingItemIndex].notes
        };
        return updatedCart;
      } else {
        // Add new item
        return [...currentCart, { ...item, quantity, notes }];
      }
    });
  };

  // Update item quantity in cart
  const updateCartItemQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart(currentCart => 
      currentCart.map(item => 
        item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Update item notes in cart
  const updateCartItemNotes = (itemId, notes) => {
    setCart(currentCart => 
      currentCart.map(item => 
        item.id === itemId 
          ? { ...item, notes } 
          : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCart(currentCart => 
      currentCart.filter(item => item.id !== itemId)
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cart,
    cartTotal,
    addToCart,
    updateCartItemQuantity,
    updateCartItemNotes,
    removeFromCart,
    clearCart,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}