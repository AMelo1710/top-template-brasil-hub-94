import React from 'react';
import { Bell, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-[rgb(199, 231, 249)] shadow-card">
      <h1 className="text-xl font-bold text-primary">Top Templates Brasil</h1>
      <div className="flex items-center space-x-3">
        <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
          <Bell className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full hover:scale-110 transition-all duration-200">
          <Mail className="h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header; 