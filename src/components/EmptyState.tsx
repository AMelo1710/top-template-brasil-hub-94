import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  onButtonClick
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center py-12">
        <Icon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">{title}</h1>
        <p className="text-muted-foreground mb-6">{description}</p>
        <Button onClick={onButtonClick}>{buttonText}</Button>
      </div>
    </div>
  );
};

export default EmptyState; 