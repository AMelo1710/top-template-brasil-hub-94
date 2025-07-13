import React from 'react';
import { useLocation } from 'react-router-dom';
import { Home, Search, Heart, Bookmark, ShoppingCart, User, MoreHorizontal } from 'lucide-react';

interface NavItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  path: string;
  onClick?: () => void;
}

interface BottomNavigationProps {
  onMoreClick: () => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ onMoreClick }) => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: Home, label: 'Início', path: '/plataform/' },
    { icon: Search, label: 'Buscar', path: '/plataform/search' },
    { icon: Heart, label: 'Favoritos', path: '/plataform/favorites' },
    { icon: Bookmark, label: 'Salvos', path: '/plataform/saved' },
    { icon: ShoppingCart, label: 'Carrinho', path: '/plataform/cart' },
    { icon: User, label: 'Perfil', path: '/plataform/profile' },
    { icon: MoreHorizontal, label: 'Mais', path: '', onClick: onMoreClick },
  ];

  const handleNavigation = (path: string, onClick?: () => void) => {
    if (onClick) {
      onClick();
    } else if (path) {
      // Navigation logic will be handled by parent component
      window.location.href = path;
    }
  };

  return (
    <nav className="z-50 fixed bottom-0 left-0 right-0 bg-card shadow-lg rounded-t-2xl border-t-2 border-t-[rgb(199, 231, 249)]">
      <div className="flex justify-around py-3 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.label}
              onClick={() => handleNavigation(item.path, item.onClick)}
              className={`flex flex-col items-center justify-center transition-all duration-300 p-2 rounded-lg hover:scale-110 ${
                isActive 
                  ? 'text-accent transform -translate-y-1' 
                  : 'text-muted-foreground hover:text-accent hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation; 