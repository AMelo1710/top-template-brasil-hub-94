import React from 'react';
import { Button } from '@/components/ui/button';

interface SearchFiltersProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  toolFilters: string[];
  selectedTool: string;
  setSelectedTool: (v: string) => void;
  renderCategoryButton: (category: string, isActive: boolean, onClick: () => void) => React.ReactNode;
  renderToolButton: (tool: string, isActive: boolean, onClick: () => void) => React.ReactNode;
}

export default function SearchFilters({
  categories,
  selectedCategory,
  setSelectedCategory,
  toolFilters,
  selectedTool,
  setSelectedTool,
  renderCategoryButton,
  renderToolButton
}: SearchFiltersProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="w-full text-sm font-medium text-foreground mb-2">Categorias:</p>
        <div className="flex flex-wrap gap-2">
          {categories.map(category =>
            renderCategoryButton(category, selectedCategory === category, () => setSelectedCategory(category))
          )}
        </div>
      </div>
      <div>
        <p className="w-full text-sm font-medium text-foreground mb-2">Ferramentas:</p>
        <div className="flex flex-wrap gap-2">
          {toolFilters.map(tool =>
            renderToolButton(tool, selectedTool === tool, () => setSelectedTool(tool))
          )}
        </div>
      </div>
    </div>
  );
} 