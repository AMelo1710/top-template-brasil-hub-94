import React from 'react';
import { Button } from '@/components/ui/button';

interface TemplateFiltersProps {
  showAllCategories: boolean;
  setShowAllCategories: (v: boolean) => void;
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  getVisibleCategories: () => string[];
  renderCategoryButton: (category: string, isActive: boolean, onClick: () => void) => React.ReactNode;
  toolFilters: string[];
  toolFilter: string;
  setToolFilter: (v: string) => void;
  renderToolButton: (tool: string, isActive: boolean, onClick: () => void) => React.ReactNode;
}

export default function TemplateFilters({
  showAllCategories,
  setShowAllCategories,
  activeCategory,
  setActiveCategory,
  getVisibleCategories,
  renderCategoryButton,
  toolFilters,
  toolFilter,
  setToolFilter,
  renderToolButton
}: TemplateFiltersProps) {
  return (
    <>
      {/* Categories */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center justify-center md:justify-start">
          <span className="mr-2">🏷️</span>
          Categorias
          <span className="ml-2">📚</span>
        </h2>
        {!showAllCategories ? (
          <div className="flex justify-center md:justify-start space-x-4 overflow-x-auto pb-2">
            {getVisibleCategories().slice(0, 4).map(category =>
              renderCategoryButton(category, activeCategory === category, () => setActiveCategory(category))
            )}
            <Button 
              variant="secondary" 
              className="flex-shrink-0 rounded-full"
              onClick={() => setShowAllCategories(true)}
            >
              Ver mais
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {getVisibleCategories().map(category =>
              renderCategoryButton(category, activeCategory === category, () => setActiveCategory(category))
            )}
            <Button 
              variant="secondary" 
              className="rounded-full"
              onClick={() => setShowAllCategories(false)}
            >
              Ocultar
            </Button>
          </div>
        )}
      </div>
      {/* Tool Filters */}
      <div>
        <h3 className="text-md font-medium text-foreground mb-3">Filtrar por ferramenta</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {toolFilters.map(tool =>
            renderToolButton(tool, toolFilter === tool, () => setToolFilter(tool))
          )}
        </div>
      </div>
    </>
  );
} 