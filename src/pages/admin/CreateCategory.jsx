import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UserInfo from '../../layouts/UserInfo';
import AdminMenu from '../../layouts/AdminMenu';
import { api, apiUrl, endpoints } from '../../utils/api';

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

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  
  const [editedCategory, setEditedCategory] = useState({
    name: '',
    description: '',
    cover_photo: '',
  });

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    cover_photo: '',
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get(apiUrl + 'categories');
      setCategories(response.data.response);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const openEditModal = (category) => {
    setEditCategory(category);
    setEditedCategory(category);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCategory(null);
    setEditedCategory({
      name: '',
      description: '',
      cover_photo: '',
    });
  };

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false);
    setNewCategory({
      name: '',
      description: '',
      cover_photo: '',
    });

  };

  const handleEditCategory = async () => {
    try {

      await api.put(apiUrl + `categories/edit/${editCategory._id}`, editedCategory);
      fetchCategories();
      closeEditModal();
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await api.post(apiUrl + 'categories/create', newCategory);
      fetchCategories();
      closeNewCategoryModal();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await api.delete(apiUrl + `categories/delete/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="flex flex-col items-center bg-[url('/fondo-admin.jpg')] bg-cover py-9">
      <UserInfo />
      <AdminMenu />
      <h1 className='flex justify-center items-center text-center text-black font-bold text-2xl py-3'>Categories</h1>
      <div className="lg:text-lg bg-gray-800 flex flex-col items-center text-white p-6 min-h-[500px] w-[40%] rounded-md shadow-lg">
        <button onClick={openNewCategoryModal} className='bg-white w-[150px] h-[50px] text-black'>New Category</button>
        <div className='flex flex-col justify-center items-center'>
        <table>
            <thead>
              <tr>
                <th className='py-[20px] px-[50px]'>Name</th>
                <th className='py-[20px] px-[50px]'>Cover Photo</th>
                <th className='py-[20px] px-[50px]'>Edit</th>
                <th className='py-[20px] px-[50px]'>Delete</th>
              </tr>
            </thead>
            <tbody>

          {categories.map((category) => (
            <tr>
            <td className='text-center py-[20px] px-[50px]' key={category._id}>
              {category.name}</td>
              <td className='text-center py-[20px] px-[50px]' key={category.cover_photo}><img className='h-[100px] w-[100px] rounded-full' src={category.cover_photo} alt={category.cover_photo} />
              </td>
              <td className='text-center py-[20px] px-[50px]'><button onClick={() => openEditModal(category)}>Edit</button></td>
              <td className='text-center py-[20px] px-[50px]'><button onClick={() => handleDeleteCategory(category._id)}>Delete</button></td>
            
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Category"
          style={customModalStyles}
        >
          {editCategory && (
            <div className='bg-blue'
            style={modalContentStyles}>
              <input
                type="text"
                value={editedCategory.name}
                onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
                className='min-w-[15rem] h-[2.5rem]'
              />
              <textarea
              value={editedCategory.description}
              onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
              className='min-w-[15rem] resize-none'
            />
            <input
              type="text"
              value={editedCategory.cover_photo}
              onChange={(e) => setEditedCategory({ ...editedCategory, cover_photo: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
              <button className='bg-green-500 h-[2rem] w-[10rem]' onClick={handleEditCategory}>Save</button>
              <button className='bg-red-500 px-6 py-2 h-[2rem] w-[10rem]' onClick={closeEditModal}>Cancel</button>
            </div>
          )}
        </Modal>
        <Modal
          isOpen={isNewCategoryModalOpen}
          onRequestClose={closeNewCategoryModal}
          contentLabel="Create Category"
          style={customModalStyles}
        >
          <div style={modalContentStyles}>
          <input
              type="text"
              placeholder="Product Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <textarea
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              className='min-w-[15rem] resize-none'
            />
            <input
              type="text"
              placeholder="Cover Photo"
              value={newCategory.cover_photo}
              onChange={(e) => setNewCategory({ ...newCategory, cover_photo: e.target.value })}
              className='min-w-[15rem] h-[2.5rem]'
            />
            <button className='bg-green-500 h-[2rem] w-[10rem]' onClick={handleCreateCategory}>Create</button>
            <button className='bg-red-500 px-6 py-2 h-[2rem] w-[10rem]' onClick={closeNewCategoryModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoriesPage;