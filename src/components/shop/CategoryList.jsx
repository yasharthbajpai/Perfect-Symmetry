import { useShopContext } from '../../contexts/ShopContext';

const CategoryList = () => {
  const { categories, selectedCategory, setSelectedCategory, loading, error } = useShopContext();

  if (loading) {
    return <div className="loading">Loading categories...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="category-list">
      <h2>Categories</h2>
      <div className="categories">
        {categories.map(category => (
          <div 
            key={category.id}
            className={`category-item ${selectedCategory === category.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="category-image">
              {/* In a real app, you'd use actual images */}
              <div className="placeholder-image" aria-label={category.name}></div>
            </div>
            <h3>{category.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList; 