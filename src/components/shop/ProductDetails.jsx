import { useShopContext } from '../../contexts/ShopContext';
import Modal from '../common/Modal';

const ProductDetails = () => {
  const { selectedProduct, isModalOpen, closeProductModal } = useShopContext();

  if (!selectedProduct || !isModalOpen) {
    return null;
  }

  const discountedPrice = selectedProduct.discount > 0
    ? selectedProduct.price * (1 - selectedProduct.discount / 100)
    : selectedProduct.price;

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeProductModal}
      title={selectedProduct.name}
    >
      <div className="product-details">
        <div className="product-detail-image">
          {/* In a real app, you'd use actual images */}
          <div className="placeholder-image large" aria-label={selectedProduct.name}></div>
        </div>
        
        <div className="product-detail-info">
          <h3>{selectedProduct.name}</h3>
          
          <div className="product-manufacturer">
            <strong>Manufacturer:</strong> {selectedProduct.manufacturer}
          </div>
          
          <div className="product-weight">
            <strong>Weight/Volume:</strong> {selectedProduct.weight}
          </div>
          
          <div className="product-price-detail">
            <strong>Price:</strong> 
            {selectedProduct.discount > 0 ? (
              <>
                <span className="original-price">₹{selectedProduct.price.toFixed(0)}</span>
                <span className="discounted-price">₹{discountedPrice.toFixed(0)}</span>
                <span className="discount-tag">({selectedProduct.discount}% OFF)</span>
              </>
            ) : (
              <span>₹{selectedProduct.price.toFixed(0)}</span>
            )}
          </div>
          
          <div className="product-availability-detail">
            <strong>Availability:</strong> 
            {selectedProduct.available ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>
          
          <div className="product-description">
            <strong>Description:</strong>
            <p>{selectedProduct.description}</p>
          </div>
          
          {selectedProduct.variants && selectedProduct.variants.length > 0 && (
            <div className="product-variants">
              <strong>Available Variants:</strong>
              <table className="variants-table">
                <thead>
                  <tr>
                    {Object.keys(selectedProduct.variants[0])
                      .filter(key => key !== 'available')
                      .map(key => (
                        <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                      ))}
                    <th>Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProduct.variants.map((variant, index) => (
                    <tr key={index}>
                      {Object.entries(variant)
                        .filter(([key]) => key !== 'available')
                        .map(([key, value]) => (
                          <td key={key}>
                            {key === 'price' ? `₹${Number(value).toFixed(0)}` : value}
                          </td>
                        ))}
                      <td>
                        {variant.available ? (
                          <span className="in-stock">In Stock</span>
                        ) : (
                          <span className="out-of-stock">Out of Stock</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetails; 