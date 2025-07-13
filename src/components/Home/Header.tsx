import React from 'react';
import { HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header: React.FC = () => {
  return (
    <header className="flex items-center bg-[rgb(199, 231, 249)] p-4 justify-between">
      <div className="flex w-12 items-center justify-end">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-primary hover:text-secondary transition-colors"
        >
          <HelpCircle className="w-6 h-6" />
        </Button>
      </div>
    </header>
  );
}; 