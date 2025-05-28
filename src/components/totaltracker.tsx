import React, { createContext, useContext, useState, ReactNode } from "react";

interface TotalTrackerContextType {
  totalPremium: number | null;
  setTotalPremium: (value: number | null) => void;
}

const TotalTrackerContext = createContext<TotalTrackerContextType | undefined>(undefined);

export const useTotalTracker = () => {
  const context = useContext(TotalTrackerContext);
  if (!context) {
    throw new Error("useTotalTracker must be used within a TotalTrackerProvider");
  }
  return context;
};

export const TotalTrackerProvider = ({ children }: { children: ReactNode }) => {
  const [totalPremium, setTotalPremium] = useState<number | null>(null);

  return (
    <TotalTrackerContext.Provider value={{ totalPremium, setTotalPremium }}>
      {children}
    </TotalTrackerContext.Provider>
  );
};
