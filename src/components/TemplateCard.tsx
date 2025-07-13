import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/app';

interface TemplateCardProps {
  template: Template;
  onRemove: (template: Template) => void;
  onViewTemplate: (templateId: string) => void;
  removeIcon: React.ReactNode;
  emoji: string;
  removeIconClassName?: string;
}

const TemplateCard: React.FC<TemplateCardProps> = ({
  template,
  onRemove,
  onViewTemplate,
  removeIcon,
  emoji,
  removeIconClassName = "text-red-500 hover:text-red-700"
}) => {
  return (
    <Card className="hover:shadow-hover transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-lg text-primary flex items-center justify-between">
          {template.title}
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onRemove(template)}
            className={removeIconClassName}
          >
            {removeIcon}
          </Button>
        </CardTitle>
      </CardHeader>

      <div className={`h-32 ${template.color || 'bg-muted'} flex items-center justify-center relative overflow-hidden`}>
        <div className="text-4xl">{emoji}</div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <CardContent className="p-4 space-y-4">
        <p className="text-muted-foreground text-sm">{template.description}</p>
        
        <Button 
          className="w-full"
          onClick={() => onViewTemplate(template.id)}
        >
          Ver Template
        </Button>
      </CardContent>
    </Card>
  );
};

export default TemplateCard; 