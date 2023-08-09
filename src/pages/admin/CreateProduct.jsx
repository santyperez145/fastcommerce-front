import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UserInfo from '../../layouts/UserInfo';
import AdminMenu from '../../layouts/AdminMenu';
import { api, apiUrl } from '../../utils/api';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [editedProduct, setEditedProduct] = useState({
    name: '',
    description: [],
    cover_photo: [],
    category_id: '',
    price: 0,
    brand: '',
    stock: 0,
    offer: '',
  });

  const [newProduct, setNewProduct] = useState({
    name: '',
    description: [],
    cover_photo: [],
    category_id: '',
    price: 0,
    brand: '',
    stock: 0,
    offer: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get(apiUrl + 'products/readadmin');
      setProducts(response.data.response);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get(apiUrl + 'categories');
      setCategories(response.data.response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setEditedProduct(product);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProduct(null);
    setEditedProduct({
      name: '',
      description: [],
      cover_photo: [],
      category_id: '',
      price: 0,
      brand: '',
      stock: 0,
      offer: '',
    });
  };

  const openNewProductModal = () => {
    setIsNewProductModalOpen(true);
  };

  const closeNewProductModal = () => {
    setIsNewProductModalOpen(false);
    setNewProduct({
      name: '',
      description: '',
      cover_photo: '',
      category_id: '',
      price: 0,
      brand: '',
      stock: 0,
      offer: '',
    });
  };

  const handleEditProduct = async () => {
    try {
      await api.put(apiUrl + `products/edit/${editProduct._id}`, editedProduct);
      fetchProducts();
      closeEditModal();
    } catch (error) {
      console.error('Error editing product:', error);
    }
  };

  const handleCreateProduct = async () => {
    try {
      await api.post(apiUrl + 'products/create', newProduct);
      fetchProducts();
      closeNewProductModal();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await api.delete(apiUrl + `products/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
      <UserInfo />
      <AdminMenu />
      <h1 className='flex justify-center items-center text-center text-white font-bold text-2xl'>Products</h1>
      <div className="lg:text-lg bg-gray-800 flex flex-col items-center text-white p-6 min-h-[500px] w-[80%] rounded-md shadow-lg">
        <button onClick={openNewProductModal} className='bg-white w-[150px] h-[50px] text-black'>New Product</button>
        <div className='flex flex-col justify-center items-center'>
          <table>
            <thead>
              <tr>
                <th className='py-[20px] px-[50px]'>Name</th>
                <th className='py-[20px] px-[50px]'>Cover Photo</th>
                <th className='py-[20px] px-[50px]'>Price</th>
                <th className='py-[20px] px-[50px]'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr>
                  <td className='py-[20px] px-[50px]' key={product._id}>{product.name}</td>
                  <td className='py-[20px] px-[50px]' key={product.cover_photo}><img className='h-[100px] w-[100px]' src={product.cover_photo} alt={product.cover_photo} /></td>
                  <td className='py-[20px] px-[50px]' key={product.cover_photo}>{product.price}</td>
                  <td className='py-[20px] px-[50px]'><button onClick={() => openEditModal(product)}>Edit</button><button onClick={() => handleDeleteProduct(product._id)}>Delete</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Edit Modal */}
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Product"
        >
          <div>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
            />
            <textarea
              value={editedProduct.description}
              onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })}
            />
            <input
              type="text"
              value={editedProduct.cover_photo}
              onChange={(e) => setEditedProduct({ ...editedProduct, cover_photo: e.target.value })}
            />
            <select
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
            </select>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
            />
            <input
              type="text"
              value={editedProduct.brand}
              onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
            />
            <input
              type="number"
              value={editedProduct.stock}
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
            />
            <input
              type="text"
              value={editedProduct.offer}
              onChange={(e) => setEditedProduct({ ...editedProduct, offer: e.target.value })}
            />
            <button onClick={handleEditProduct}>Save</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </Modal>
        {/* New Product Modal */}
        <Modal
          isOpen={isNewProductModalOpen}
          onRequestClose={closeNewProductModal}
          contentLabel="Create Product"
        >
          <div>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cover Photo"
              value={newProduct.cover_photo}
              onChange={(e) => setNewProduct({ ...newProduct, cover_photo: e.target.value })}
            />
            <select
                value={selectedCategoryId}
                onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value })}>
                <option value="">Select a category</option>
                {categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
            ))}
            </select>
            <input
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
            <input
              type="text"
              placeholder="Offer ID"
              value={newProduct.offer}
              onChange={(e) => setNewProduct({ ...newProduct, offer: e.target.value })}
            />
            <button onClick={handleCreateProduct}>Create</button>
            <button onClick={closeNewProductModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsPage;
