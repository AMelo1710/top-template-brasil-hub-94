export interface Template {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  date: string;
  price: number;
  freeLink: string;
  noAdsLink: string;
}

export interface User {
  name: string;
  username: string;
  email: string;
  avatar: string;
}

export interface AppContextType {
  favorites: Template[];
  saved: Template[];
  cart: Template[];
  user: User;
  addToFavorites: (template: Template) => void;
  removeFromFavorites: (id: string) => void;
  addToSaved: (template: Template) => void;
  removeFromSaved: (id: string) => void;
  addToCart: (template: Template) => void;
  removeFromCart: (id: string) => void;
  updateUser: (userData: Partial<User>) => void;
  isFavorite: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isInCart: (id: string) => boolean;
} 