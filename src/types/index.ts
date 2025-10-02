// Type definitions for TypeScript

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface NavigationProps {
  navigation: any;
  route: any;
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  style?: any;
}

export interface CardProps {
  title?: string;
  children: React.ReactNode;
}

export interface HeaderProps {
  title: string;
}

// Screen Props Types
export interface ScreenProps {
  navigation?: any;
  route?: any;
}

// API Types
export interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  timeout?: number;
}

// Storage Types
export interface StorageData {
  [key: string]: any;
}

// Theme Types
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
}
