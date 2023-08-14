import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UserInfo from '../../layouts/UserInfo';
import AdminMenu from '../../layouts/AdminMenu';
import { api, apiUrl } from '../../utils/api';

const customModalStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(45, 55, 72)', // Cambia el color de fondo del modal
    border: '1px solid #ccc', // Cambia el borde del modal
    borderRadius: '10px', // Cambia el radio de borde del modal
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Cambia la sombra del modal
    padding: '20px', // Cambia el relleno interno del modal
    width: '400px', // Ancho máximo del modal
  }
};

const modalContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem',
  alignItems: 'center',
  width: '100%', // Ancho del contenido del modal
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

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
      description: [],
      cover_photo: [],
      category_id: '',
      price: 0,
      brand: '',
      stock: 0,
      offer: '',
    });
  };

  const handleEditProduct = async () => {
    try {
      await api.put(apiUrl + `products/update/${editProduct._id}`, editedProduct);
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
    <div className="flex flex-col items-center bg-gray-200 text-black py-9">
      <UserInfo />
      <AdminMenu />
      <h1 className='flex justify-center items-center text-center text-black font-bold text-2xl py-3'>Products</h1>
      <div className="lg:text-lg bg-white flex flex-col items-center text-white p-6 min-h-[500px] w-[80vw] rounded-md shadow-lg">
        <button onClick={openNewProductModal} className='bg-white hover:text-orange-600 w-[150px] h-[50px] text-black'>New Product</button>
        <div className='flex flex-col justify-center items-center text-black'>
          <table className=''>
            <thead>
              <tr>
                <th className='py-[20px] px-[50px]'>Name</th>
                <th className='py-[20px] px-[50px]'>Cover Photo</th>
                <th className='py-[20px] px-[50px]'>Price</th>
                <th className='py-[20px] px-[50px]'>Stock</th>
                <th className='py-[20px] px-[50px]'>Edit</th>
                <th className='py-[20px] px-[50px]'>Delete</th>
              </tr>
            </thead>
            <tbody className='text-[25px]'>
              {products.map((product) => (
                <tr>
                  <td className='text-center py-[20px] px-[50px]' key={product._id}>{product.name}</td>
                  <td className='text-center py-[20px] px-[50px]' key={product.cover_photo}><img className='h-[100px] w-[100px] rounded-full' src={product.cover_photo[0]} alt={product.cover_photo} /></td>
                  <td className='text-center py-[20px] px-[50px]' key={product.price}>${product.price}</td>
                  <td className='text-center py-[20px] px-[50px]' key={product.stock}>{product.stock}</td>
                  <td className='text-center py-[20px] px-[50px]'><button onClick={() => openEditModal(product)} className='text-green-600'>Edit</button></td>
                  <td className='text-center py-[20px] px-[50px]'><button onClick={() => handleDeleteProduct(product._id)} className='text-orange-600'>Delete</button></td>
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
          style={customModalStyles}
        >
          <div style={modalContentStyles}>
            <input
              type="text"
              value={editedProduct.name}
              placeholder='Name'
              onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <textarea
              placeholder="Descripción Principal"
              value={editedProduct.description[0]?.resum || ''}
              onChange={(e) =>
                setNewProduct({
                  ...editedProduct,
                  description: [
                    { ...editedProduct.description[0], resum: e.target.value },
                    ...(editedProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] resize-none'
            />

            <input
              placeholder="Material"
              value={editedProduct.description[0]?.material || ''}
              onChange={(e) =>
                setNewProduct({
                  ...editedProduct,
                  description: [
                    { ...editedProduct.description[0], material: e.target.value },
                    ...(editedProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />

            <input
              placeholder="Condición"
              value={editedProduct.description[0]?.condition || ''}
              onChange={(e) =>
                setNewProduct({
                  ...editedProduct,
                  description: [
                    { ...editedProduct.description[0], condition: e.target.value },
                    ...(editedProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />

            <input
              placeholder="Color"
              value={editedProduct.description[0]?.color || ''}
              onChange={(e) =>
                setNewProduct({
                  ...editedProduct,
                  description: [
                    { ...editedProduct.description[0], color: e.target.value },
                    ...(editedProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              value={editedProduct.cover_photo.join(', ')}
              placeholder='Cover Photo. If you insert many, split with ","'
              onChange={(e) => setEditedProduct({ ...editedProduct, cover_photo: e.target.value.split(', ') })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <select
                value={editedProduct.category_id}
                onChange={(e) => setEditedProduct({ ...editedProduct, category_id: e.target.value })}
                className='min-w-[15rem] h-[2.5rem]'
                >
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
              placeholder='Price'
              onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              value={editedProduct.brand}
              placeholder='Brand'
              onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="number"
              value={editedProduct.stock}
              placeholder='Stock'
              onChange={(e) => setEditedProduct({ ...editedProduct, stock: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              value={editedProduct.offer}
              placeholder='Offer'
              onChange={(e) => setEditedProduct({ ...editedProduct, offer: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <button className='bg-green-500 h-[2rem] w-[10rem]' onClick={handleEditProduct}>Save</button>
            <button className='bg-red-500 px-6 py-2 h-[2rem] w-[10rem]' onClick={closeEditModal}>Cancel</button>
          </div>
        </Modal>
        {/* New Product Modal */}
        <Modal
          isOpen={isNewProductModalOpen}
          onRequestClose={closeNewProductModal}
          contentLabel="Create Product"
          style={customModalStyles}
        >
          <div style={modalContentStyles}>
            <input
              type="text"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <textarea
              placeholder="Descripción Principal"
              value={newProduct.description[0]?.resum || ''}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: [
                    { ...newProduct.description[0], resum: e.target.value },
                    ...(newProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] resize-none'
            />

            <input
              placeholder="Material"
              value={newProduct.description[0]?.material || ''}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: [
                    { ...newProduct.description[0], material: e.target.value },
                    ...(newProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />

            <input
              placeholder="Condición"
              value={newProduct.description[0]?.condition || ''}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: [
                    { ...newProduct.description[0], condition: e.target.value },
                    ...(newProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />

            <input
              placeholder="Color"
              value={newProduct.description[0]?.color || ''}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: [
                    { ...newProduct.description[0], color: e.target.value },
                    ...(newProduct.description.slice(1)) // Preserve other items in the array
                  ]
                })
              }
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              placeholder='Cover Photo. If you insert many, split with ","'
              value={newProduct.cover_photo.join(', ')}
              onChange={(e) => setNewProduct({ ...newProduct, cover_photo: e.target.value.split(', ') })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <select
                value={newProduct.category_id}
                onChange={(e) => setNewProduct({...newProduct, category_id: e.target.value })}
                className='min-w-[15rem] h-[2.5rem]'
                >
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
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              placeholder="Brand"
              value={newProduct.brand}
              onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="number"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <input
              type="text"
              placeholder="Offer"
              value={newProduct.offer}
              onChange={(e) => setNewProduct({ ...newProduct, offer: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <button className='bg-green-500 h-[2rem] w-[10rem]' onClick={handleCreateProduct}>Create</button>
            <button className='bg-red-500 px-6 py-2 h-[2rem] w-[10rem]' onClick={closeNewProductModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default ProductsPage;
