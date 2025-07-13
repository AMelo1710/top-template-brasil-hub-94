import React from 'react';
import TemplateCard from '@/components/TemplateCard';

interface TemplateListProps {
  templates: any[];
  handleFavoriteToggle: (template: any) => void;
  handleSavedToggle: (template: any) => void;
  handleViewTemplate: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  renderCategoryTag: (category: string) => React.ReactNode;
  getPlatformBadge: (tool: string) => React.ReactNode;
}

export default function TemplateList({
  templates,
  handleFavoriteToggle,
  handleSavedToggle,
  handleViewTemplate,
  isFavorite,
  isSaved,
  renderCategoryTag,
  getPlatformBadge
}: TemplateListProps) {
  if (!templates.length) {
    return <div className="text-center text-muted-foreground py-10">Nenhum resultado encontrado para esta categoria/ferramenta.</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template, idx) => (
        <TemplateCard
          key={template.id}
          template={template}
          idx={idx}
          handleFavoriteToggle={handleFavoriteToggle}
          handleSavedToggle={handleSavedToggle}
          handleViewTemplate={handleViewTemplate}
          isFavorite={isFavorite}
          isSaved={isSaved}
          renderCategoryTag={renderCategoryTag}
          getPlatformBadge={getPlatformBadge}
        />
      ))}
    </div>
  );
} 