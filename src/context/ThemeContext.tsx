import React, { createContext, useContext, useState, ReactNode } from 'react';

// 1. تعريف أنواع الأدوار المتاحة
export type UserRole = 'buyer' | 'seller' | null;

// 2. تعريف واجهة (Interface) للمزود
interface ThemeContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

// 3. إنشاء الـ Context
const ThemeContext = createContext<ThemeContextType>({
  role: null,
  setRole: () => {},
});

// 4. إنشاء الـ Provider (المزود)
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<UserRole>(null);

  return (
    <ThemeContext.Provider value={{ role, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 5. إنشاء الـ Hook للاستخدام السهل في أي مكون
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};