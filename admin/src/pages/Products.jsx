import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import Table from '../components/common/Table';
import SearchBar from '../components/common/SearchBar';
import Pagination from '../components/common/Pagination';
import StatusBadge from '../components/common/StatusBadge';
import Modal from '../components/common/Modal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { setFilters } from '../redux/slices/productSlice';
import { fetchProducts, createProduct as createProductThunk, updateProduct as updateProductThunk, deleteProduct as deleteProductThunk } from '../redux/thunks/productThunks';
import { productCategories, availableColors, availableSizes, categoryRequiresOptions } from '../utils/constants';
import { productsAPI } from '../services/api';
import './Products.css';

// Placeholder image (simple gray square SVG)
const PLACEHOLDER_IMAGE = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCA1MCA1MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNTAiIGhlaWdodD0iNTAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMjAgMjBMMzAgMzBNMzAgMjBMMjAgMzAiIHN0cm9rZT0iIzlDQTNCNCIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=';

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, currentPage, totalPages, filters } = useSelector((state) => state.products);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // Store actual File objects
  const [imagePreviews, setImagePreviews] = useState(['']); // Store preview URLs
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    status: 'active',
    description: '',
    images: [''],
    colors: [],
    sizes: [],
  });

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage }));
  }, [dispatch, currentPage, filters]);

  const handleSearch = (value) => {
    dispatch(setFilters({ search: value }));
  };

  const handleCategoryFilter = (e) => {
    dispatch(setFilters({ category: e.target.value }));
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      stock: '',
      status: 'active',
      description: '',
      images: [''],
      colors: [],
      sizes: [],
    });
    setImageFiles([]);
    setImagePreviews(['']);
    setShowAddModal(true);
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      status: product.status,
      description: product.description || '',
      images: product.images || [''],
      colors: product.colors || [],
      sizes: product.sizes || [],
    });
    setImageFiles([]);
    setImagePreviews(product.images || ['']);
    setShowEditModal(true);
  };

  const handleCloseModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setSelectedProduct(null);
    setImageFiles([]);
    setImagePreviews(['']);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (index, file) => {
    if (file) {
      // Store the actual file
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = file;
      setImageFiles(newImageFiles);

      // Create preview URL
      const imageUrl = URL.createObjectURL(file);
      const newPreviews = [...imagePreviews];
      newPreviews[index] = imageUrl;
      setImagePreviews(newPreviews);

      // Also update formData images for consistency
      const newImages = [...formData.images];
      newImages[index] = imageUrl;
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleClearImage = (index) => {
    // Clear the specific image but keep the input row
    const newImageFiles = [...imageFiles];
    newImageFiles[index] = null;
    setImageFiles(newImageFiles);

    const newPreviews = [...imagePreviews];
    newPreviews[index] = '';
    setImagePreviews(newPreviews);

    const newImages = [...formData.images];
    newImages[index] = '';
    setFormData({ ...formData, images: newImages });
  };

  const handleAddImage = () => {
    if (imagePreviews.length < 6) {
      setImagePreviews([...imagePreviews, '']);
      setImageFiles([...imageFiles, null]);
      setFormData({ ...formData, images: [...formData.images, ''] });
    }
  };

  const handleRemoveImage = (index) => {
    if (imagePreviews.length > 1) {
      const newPreviews = imagePreviews.filter((_, i) => i !== index);
      setImagePreviews(newPreviews);

      const newImageFiles = imageFiles.filter((_, i) => i !== index);
      setImageFiles(newImageFiles);

      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleColorToggle = (color) => {
    const newColors = formData.colors.includes(color)
      ? formData.colors.filter((c) => c !== color)
      : [...formData.colors, color];
    setFormData((prev) => ({ ...prev, colors: newColors }));
  };

  const handleSizeToggle = (size) => {
    const newSizes = formData.sizes.includes(size)
      ? formData.sizes.filter((s) => s !== size)
      : [...formData.sizes, size];
    setFormData((prev) => ({ ...prev, sizes: newSizes }));
  };

  const handleSubmitAdd = async (e) => {
    e.preventDefault();
    try {
      // Upload images first if there are any files
      let imageUrls = [];
      const filesToUpload = imageFiles.filter(file => file !== null);

      if (filesToUpload.length > 0) {
        const formDataUpload = new FormData();
        filesToUpload.forEach(file => {
          formDataUpload.append('images', file);
        });

        const uploadResponse = await productsAPI.uploadImages(formDataUpload);
        imageUrls = uploadResponse.data.data;
      }

      // Create product with uploaded image URLs
      const productData = {
        ...formData,
        images: imageUrls,
      };

      await dispatch(createProductThunk(productData));
      handleCloseModals();
      dispatch(fetchProducts({ page: currentPage }));
    } catch (error) {
      console.error('Error adding product:', error);
      alert(error.response?.data?.message || 'Failed to add product');
    }
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      // Upload new images if there are any files
      let newImageUrls = [];
      const filesToUpload = imageFiles.filter(file => file !== null);

      if (filesToUpload.length > 0) {
        const formDataUpload = new FormData();
        filesToUpload.forEach(file => {
          formDataUpload.append('images', file);
        });

        const uploadResponse = await productsAPI.uploadImages(formDataUpload);
        newImageUrls = uploadResponse.data.data;
      }

      // Build final images array from imagePreviews
      // For each preview:
      // - If it's a blob URL (new upload), replace with corresponding server URL
      // - If it's already a server URL, keep it
      let uploadIndex = 0;
      const finalImages = imagePreviews
        .filter(preview => preview) // Remove empty strings
        .map(preview => {
          if (preview.startsWith('blob:')) {
            // Replace blob URL with uploaded server URL
            return newImageUrls[uploadIndex++];
          }
          // Keep existing server URL
          return preview;
        })
        .filter(img => img); // Remove any undefined values

      const productData = {
        ...formData,
        images: finalImages,
      };

      await dispatch(updateProductThunk(selectedProduct._id, productData));
      handleCloseModals();
      dispatch(fetchProducts({ page: currentPage }));
    } catch (error) {
      console.error('Error updating product:', error);
      alert(error.response?.data?.message || 'Failed to update product');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await dispatch(deleteProductThunk(id));
        dispatch(fetchProducts({ page: currentPage }));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const columns = [
    {
      header: 'Image',
      key: 'images',
      width: '80px',
      render: (row) => (
        <div className="product-image">
          <img
            src={row.images?.[0] || PLACEHOLDER_IMAGE}
            alt={row.name}
            onError={(e) => e.target.src = PLACEHOLDER_IMAGE}
          />
        </div>
      ),
    },
    { header: 'Name', key: 'name' },
    { header: 'Category', key: 'category' },
    {
      header: 'Price',
      key: 'price',
      render: (row) => `AED ${row.price}`,
    },
    { header: 'Stock', key: 'stock' },
    {
      header: 'Colors',
      key: 'colors',
      render: (row) => row.colors?.length > 0 ? `${row.colors.length} colors` : '-',
    },
    {
      header: 'Sizes',
      key: 'sizes',
      render: (row) => row.sizes?.length > 0 ? `${row.sizes.length} sizes` : '-',
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} type="product" />,
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <div className="action-buttons">
          <button
            className="btn-icon btn-edit"
            onClick={() => handleOpenEditModal(row)}
            title="Edit"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => handleDelete(row._id)}
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen message="Loading products..." />;
  }

  return (
    <div className="products-page">
      <div className="page-header">
        <div>
          <h1>Product Management</h1>
          <p className="page-subtitle">Manage your products inventory</p>
        </div>
        <button className="btn-primary" onClick={handleOpenAddModal}>
          <FiPlus size={20} />
          Add Product
        </button>
      </div>

      <div className="filters-bar">
        <SearchBar
          value={filters.search}
          onChange={handleSearch}
          placeholder="Search products..."
        />
        <select value={filters.category} onChange={handleCategoryFilter} className="filter-select">
          <option value="">All Categories</option>
          {productCategories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <Table columns={columns} data={products} loading={loading} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => dispatch(setFilters({ currentPage: page }))}
      />

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={handleCloseModals}
        title="Add New Product"
        size="large"
      >
        <form onSubmit={handleSubmitAdd} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (AED) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Product Images (Max 6) */}
          <div className="form-group">
            <label>Product Images (Max 6) *</label>
            <div className="image-inputs">
              {imagePreviews.map((img, index) => (
                <div key={index} className="image-input-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                    required={index === 0 && !img}
                  />
                  {img && (
                    <div className="image-preview-wrapper">
                      <img src={img} alt={`Preview ${index + 1}`} className="image-preview" />
                      <button
                        type="button"
                        className="btn-clear-image"
                        onClick={() => handleClearImage(index)}
                        title="Clear image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {imagePreviews.length > 1 && (
                    <button
                      type="button"
                      className="btn-icon btn-delete"
                      onClick={() => handleRemoveImage(index)}
                      title="Remove row"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {imagePreviews.length < 6 && (
                <button
                  type="button"
                  className="btn-outline btn-small"
                  onClick={handleAddImage}
                >
                  + Add Image
                </button>
              )}
            </div>
          </div>

          {/* Colors (Only for Activewear, Women, Men, Kids) */}
          {categoryRequiresOptions(formData.category) && (
            <div className="form-group">
              <label>Available Colors</label>
              <div className="checkbox-dropdown">
                <div className="checkbox-list">
                  {availableColors.map((color) => (
                    <label key={color.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.colors.includes(color.value)}
                        onChange={() => handleColorToggle(color.value)}
                      />
                      <span className="color-indicator" style={{ backgroundColor: color.hex }}></span>
                      <span>{color.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sizes (Only for Activewear, Women, Men, Kids) */}
          {categoryRequiresOptions(formData.category) && (
            <div className="form-group">
              <label>Available Sizes</label>
              <div className="checkbox-dropdown">
                <div className="checkbox-list">
                  {(formData.category === 'Kids' ? availableSizes.kids : availableSizes.clothing).map((size) => (
                    <label key={size} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.sizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={handleCloseModals}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Product Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={handleCloseModals}
        title="Edit Product"
        size="large"
      >
        <form onSubmit={handleSubmitEdit} className="product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter product name"
              />
            </div>
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {productCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price (AED) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
            <div className="form-group">
              <label>Stock *</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="3"
            />
          </div>

          {/* Product Images (Max 6) */}
          <div className="form-group">
            <label>Product Images (Max 6) *</label>
            <div className="image-inputs">
              {imagePreviews.map((img, index) => (
                <div key={index} className="image-input-row">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(index, e.target.files[0])}
                    required={index === 0 && !img}
                  />
                  {img && (
                    <div className="image-preview-wrapper">
                      <img src={img} alt={`Preview ${index + 1}`} className="image-preview" />
                      <button
                        type="button"
                        className="btn-clear-image"
                        onClick={() => handleClearImage(index)}
                        title="Clear image"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  {imagePreviews.length > 1 && (
                    <button
                      type="button"
                      className="btn-icon btn-delete"
                      onClick={() => handleRemoveImage(index)}
                      title="Remove row"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
              {imagePreviews.length < 6 && (
                <button
                  type="button"
                  className="btn-outline btn-small"
                  onClick={handleAddImage}
                >
                  + Add Image
                </button>
              )}
            </div>
          </div>

          {/* Colors (Only for Activewear, Women, Men, Kids) */}
          {categoryRequiresOptions(formData.category) && (
            <div className="form-group">
              <label>Available Colors</label>
              <div className="checkbox-dropdown">
                <div className="checkbox-list">
                  {availableColors.map((color) => (
                    <label key={color.value} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.colors.includes(color.value)}
                        onChange={() => handleColorToggle(color.value)}
                      />
                      <span className="color-indicator" style={{ backgroundColor: color.hex }}></span>
                      <span>{color.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sizes (Only for Activewear, Women, Men, Kids) */}
          {categoryRequiresOptions(formData.category) && (
            <div className="form-group">
              <label>Available Sizes</label>
              <div className="checkbox-dropdown">
                <div className="checkbox-list">
                  {(formData.category === 'Kids' ? availableSizes.kids : availableSizes.clothing).map((size) => (
                    <label key={size} className="checkbox-item">
                      <input
                        type="checkbox"
                        checked={formData.sizes.includes(size)}
                        onChange={() => handleSizeToggle(size)}
                      />
                      <span>{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={handleCloseModals}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Update Product
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Products;
