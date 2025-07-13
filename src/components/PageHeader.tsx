import React from 'react';
import { LucideIcon } from 'lucide-react';

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  itemCount: number;
  iconClassName?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  icon: Icon,
  title,
  itemCount,
  iconClassName = "text-primary"
}) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold text-primary flex items-center">
        <Icon className={`w-6 h-6 mr-2 ${iconClassName}`} />
        {title}
      </h1>
      <span className="text-muted-foreground">{itemCount} item(s)</span>
    </div>
  );
};

export default PageHeader; 