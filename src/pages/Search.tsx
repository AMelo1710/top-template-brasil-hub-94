import React from 'react';
import SearchBar from '@/components/Search/SearchBar';
import SearchFilters from '@/components/Search/SearchFilters';
import SearchResults from '@/components/Search/SearchResults';
import useSearch from '@/hooks/useSearch';

export default function Search() {
  const searchProps = useSearch();
  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <SearchBar
        searchTerm={searchProps.searchTerm}
        setSearchTerm={searchProps.setSearchTerm}
        showFilters={searchProps.showFilters}
        setShowFilters={searchProps.setShowFilters}
        resultsCount={searchProps.filteredResults.length}
      />
      {searchProps.showFilters && (
        <SearchFilters
          categories={searchProps.categories}
          selectedCategory={searchProps.selectedCategory}
          setSelectedCategory={searchProps.setSelectedCategory}
          toolFilters={searchProps.toolFilters}
          selectedTool={searchProps.selectedTool}
          setSelectedTool={searchProps.setSelectedTool}
          renderCategoryButton={searchProps.renderCategoryButton}
          renderToolButton={searchProps.renderToolButton}
        />
      )}
      <SearchResults
        results={searchProps.filteredResults}
        handleFavoriteToggle={searchProps.handleFavoriteToggle}
        handleSavedToggle={searchProps.handleSavedToggle}
        handleViewTemplate={searchProps.handleViewTemplate}
        isFavorite={searchProps.isFavorite}
        isSaved={searchProps.isSaved}
        renderCategoryTag={searchProps.renderCategoryTag}
        getPlatformBadge={searchProps.getPlatformBadge}
      />
    </div>
  );
}