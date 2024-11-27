'use client';
import { favContext } from "@/types/charsTypes";
import { createContext, useState, useContext, ReactNode } from "react";

// Define the context with a default value that matches the expected type
const FavContext = createContext<favContext | undefined>(undefined);

export function FavWrapper({ children }: { children: ReactNode }) {
  const [fav, setFav] = useState<string[]>([]);

  return (
    <FavContext.Provider value={{ fav, setFav }}>
      {children}
    </FavContext.Provider>
  );
}

// Custom hook to use the FavContext
export function useFavContext() {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFavContext must be used within a FavWrapper");
  }
  return context;
}
