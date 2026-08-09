"use client";
import { createContext, useContext, useState, useEffect } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load wishlist from local storage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("jewel_exchange_wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error("Failed to parse wishlist from local storage:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage whenever wishlist changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("jewel_exchange_wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  const addToWishlist = (product) => {
    setWishlist((prev) => {
      if (!prev.find((item) => item.slug === product.slug)) {
        return [...prev, product];
      }
      return prev;
    });
  };

  const removeFromWishlist = (slug) => {
    setWishlist((prev) => prev.filter((item) => item.slug !== slug));
  };

  const toggleWishlist = (product) => {
    if (wishlist.find((item) => item.slug === product.slug)) {
      removeFromWishlist(product.slug);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (slug) => {
    return wishlist.some((item) => item.slug === slug);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
