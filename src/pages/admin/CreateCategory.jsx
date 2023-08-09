import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import UserInfo from '../../layouts/UserInfo';
import AdminMenu from '../../layouts/AdminMenu';
import { api, apiUrl, endpoints } from '../../utils/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewCategoryModalOpen, setIsNewCategoryModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [editedCategoryName, setEditedCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryCoverPhoto, setNewCategoryCoverPhoto] = useState('');

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
    setEditedCategoryName(category.name);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditCategory(null);
    setEditedCategoryName('');
  };

  const openNewCategoryModal = () => {
    setIsNewCategoryModalOpen(true);
  };

  const closeNewCategoryModal = () => {
    setIsNewCategoryModalOpen(false);
    setNewCategoryName('');
    setNewCategoryDescription('');
    setNewCategoryCoverPhoto('');
  };

  const handleEditCategory = async () => {
    try {
      const updatedCategory = {
        ...editCategory,
        name: editedCategoryName,
      };
      await api.put(apiUrl + `categories/edit/${editCategory._id}`, updatedCategory);
      fetchCategories();
      closeEditModal();
    } catch (error) {
      console.error('Error editing category:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      const newCategory = {
        name: newCategoryName,
        description: newCategoryDescription,
        cover_photo: newCategoryCoverPhoto,
      };
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
    <div className="flex flex-col items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
      <UserInfo />
      <AdminMenu />
      <h1 className='flex justify-center items-center text-center text-white font-bold text-2xl'>Categories</h1>
      <div className="lg:text-lg bg-gray-800 flex flex-col items-center text-white p-6 min-h-[500px] w-[40%] rounded-md shadow-lg">
        <button onClick={openNewCategoryModal} className='bg-white w-[150px] h-[50px] text-black'>New Category</button>
        <div className='flex flex-col justify-center items-center'>
        <table>
          {categories.map((category) => (
            <tr>
            <td className='py-[20px] px-[50px]' key={category._id}>
              {category.name}</td>
              <td className='py-[20px] px-[50px]' key={category.cover_photo}>
              {category.cover_photo}</td>
              <td className='py-[20px] px-[50px]'><button onClick={() => openEditModal(category)}>Edit</button></td>
              <td className='py-[20px] px-[50px]'><button onClick={() => handleDeleteCategory(category._id)}>Delete</button></td>
            
            </tr>
          ))}
        </table>
        </div>
        
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Category"
        >
          {editCategory && (
            <div>
              <input
                type="text"
                value={editedCategoryName}
                onChange={(e) => setEditedCategoryName(e.target.value)}
              />
              <button onClick={handleEditCategory}>Save</button>
              <button onClick={closeEditModal}>Cancel</button>
            </div>
          )}
        </Modal>
        <Modal
          isOpen={isNewCategoryModalOpen}
          onRequestClose={closeNewCategoryModal}
          contentLabel="Create Category"
        >
          <div>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
            <textarea
              placeholder="Description"
              value={newCategoryDescription}
              onChange={(e) => setNewCategoryDescription(e.target.value)}
            />
            <input
              type="text"
              placeholder="Cover Photo URL"
              value={newCategoryCoverPhoto}
              onChange={(e) => setNewCategoryCoverPhoto(e.target.value)}
            />
            <button onClick={handleCreateCategory}>Create</button>
            <button onClick={closeNewCategoryModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CategoriesPage;
