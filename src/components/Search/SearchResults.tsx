import React, { useMemo } from 'react';
import TemplateCard from '@/components/TemplateCard';
import { Search as SearchIcon } from 'lucide-react';
// Remover import { getValidTemplateIds, getTemplateById } from '@/data/templates';

interface SearchResultsProps {
  results: any[];
  handleFavoriteToggle: (template: any) => void;
  handleSavedToggle: (template: any) => void;
  handleViewTemplate: (id: string) => void;
  isFavorite: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  renderCategoryTag: (category: string) => React.ReactNode;
  getPlatformBadge: (tool: string) => React.ReactNode;
}

export default function SearchResults({
  results,
  handleFavoriteToggle,
  handleSavedToggle,
  handleViewTemplate,
  isFavorite,
  isSaved,
  renderCategoryTag,
  getPlatformBadge
}: SearchResultsProps) {
  // Filtrar apenas os resultados que têm templates válidos
  const validResults = useMemo(() => {
    // Remover lógica de filtragem por IDs válidos
    return results
      .map(result => {
        // Buscar o template completo do arquivo templates.ts
        // Remover lógica de busca por ID local
        return result; // Fallback para o item original
      });
  }, [results]);

  if (!validResults.length) {
    return (
      <div className="text-center py-12">
        <SearchIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Nenhum resultado encontrado
        </h3>
        <p className="text-muted-foreground">
          Tente ajustar sua busca ou explorar nossas categorias
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {validResults.map((template, idx) => (
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
          showActions={true}
          showDate={true}
          showTags={false}
          favoriteIcon="heart"
          savedIcon="bookmark"
        />
      ))}
    </div>
  );
} 