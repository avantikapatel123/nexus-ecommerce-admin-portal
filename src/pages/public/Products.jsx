import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchProductsPaginated } from '../../services/api';
import { useLikes } from '../../context/LikesContext';
import SearchBar from '../../components/common/SearchBar';
import ProductList from '../../components/product/ProductList';
import useDebounce from '../../hooks/useDebounce';
import Loader from '../../components/common/Loader';
import ErrorMessage from '../../components/common/ErrorMessage';
import { Sparkles, Heart } from 'lucide-react';

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'fragrances', label: 'Fragrances' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'groceries', label: 'Groceries' },
  { id: 'favorites', label: 'Favorites ♥' },
];

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('filter') || 'all';
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const { likedProducts } = useLikes();
  
  const observerTarget = useRef(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['products-infinite', activeTab, debouncedSearch],
    queryFn: ({ pageParam = 1 }) =>
      fetchProductsPaginated({
        pageParam,
        limit: 6,
        category: activeTab,
        search: debouncedSearch,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: activeTab !== 'favorites',
  });

  useEffect(() => {
    const target = observerTarget.current;
    if (!target || !hasNextPage || activeTab === 'favorites') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.unobserve(target);
  }, [hasNextPage, fetchNextPage, activeTab, observerTarget]);

  // Combine remote pages or show local liked products based on selected tab
  const displayedProducts = activeTab === 'favorites'
    ? likedProducts.filter((product) => {
        const term = debouncedSearch.toLowerCase();
        return (
          product.title.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term)
        );
      })
    : data?.pages.flatMap((page) => page.items) || [];

  const handleTabChange = (tabId) => {
    setSearchParams({ filter: tabId });
  };

  return (
    <section className="products-section">
      <div className="section-heading">
        <div>
          <h2>
            {activeTab === 'favorites' ? 'Your Wishlist' : 'Explore Catalog'}{' '}
            <Sparkles className="sparkle-icon" size={20} />
          </h2>
          <p className="subtitle">
            {activeTab === 'favorites'
              ? 'Products you’ve liked and saved'
              : 'Seamless infinite catalog powered by TanStack Query'}
          </p>
        </div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      {/* Categories Tab Bar */}
      <div className="categories-tab-bar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => handleTabChange(cat.id)}
            type="button"
          >
            {cat.id === 'favorites' && <Heart size={14} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {isLoading && <Loader />}
      {isError && <ErrorMessage message={error?.message} />}

      {!isLoading && !isError && (
        <>
          {displayedProducts.length === 0 ? (
            <div className="empty-search-state animate-fade-in">
              <p>No products found matching your request.</p>
            </div>
          ) : (
            <ProductList products={displayedProducts} />
          )}

          {/* Infinite Scroll target marker */}
          {activeTab !== 'favorites' && hasNextPage && (
            <div ref={observerTarget} className="infinite-scroll-trigger">
              {isFetchingNextPage ? (
                <div className="pagination-spinner-wrapper">
                  <div className="mini-spinner"></div>
                  <span>Loading more items...</span>
                </div>
              ) : (
                <span className="scroll-indicator-dot">• • •</span>
              )}
            </div>
          )}

          {!hasNextPage && activeTab !== 'favorites' && displayedProducts.length > 0 && (
            <div className="end-of-catalog-banner">
              <span>You’ve viewed the entire catalog.</span>
            </div>
          )}
        </>
      )}
    </section>
  );
}
