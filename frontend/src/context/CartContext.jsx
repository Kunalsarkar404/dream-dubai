import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        // During development, provide a fallback to prevent errors
        if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
            console.warn('useCart must be used within a CartProvider. Returning default values.');
            return {
                cartItems: [],
                addToCart: () => { },
                removeFromCart: () => { },
                updateQuantity: () => { },
                clearCart: () => { },
                getCartTotal: () => 0,
                getCartCount: () => 0
            };
        }
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        // Load cart from localStorage on init
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, selectedColor, selectedColorHex, selectedSize, quantity) => {
        const cartItem = {
            id: `${product.id}-${selectedColor}-${selectedSize}`,
            productId: product.id,
            name: product.name,
            price: product.price,
            currency: product.currency,
            image: product.images[0],
            color: selectedColor,
            colorHex: selectedColorHex,
            size: selectedSize,
            quantity: quantity,
            category: product.category
        };

        setCartItems(prevItems => {
            // Check if item already exists
            const existingItemIndex = prevItems.findIndex(
                item => item.id === cartItem.id
            );

            if (existingItemIndex > -1) {
                // Update quantity if item exists
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].quantity += quantity;
                return updatedItems;
            } else {
                // Add new item
                return [...prevItems, cartItem];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;

        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getCartTotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((count, item) => count + item.quantity, 0);
    };

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartCount
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
