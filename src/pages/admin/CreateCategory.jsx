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
    <div className="flex flex-col items-center h-screen bg-[url('/fondo-admin.jpg')] bg-cover">
      <UserInfo />
      <AdminMenu />
      <h1 className='flex justify-center items-center text-center text-white font-bold text-2xl'>Categories</h1>
      <div className="lg:text-lg bg-gray-800 flex flex-col items-center text-white p-6 min-h-[500px] w-[40%] rounded-md shadow-lg">
        <button onClick={openNewCategoryModal} className='bg-white w-[150px] h-[50px] text-black'>New Category</button>
        <div className='flex flex-col justify-center items-center'>
        <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Cover Photo</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
          {categories.map((category) => (
            <tr>
            <td className='py-[20px] px-[50px]' key={category._id}>
              {category.name}</td>
              <td className='py-[20px] px-[50px]' key={category.cover_photo}><img className='h-[100px] w-[100px]' src={category.cover_photo} alt={category.cover_photo} />
              </td>
              <td className='py-[20px] px-[50px]'><button onClick={() => openEditModal(category)}>Edit</button></td>
              <td className='py-[20px] px-[50px]'><button onClick={() => handleDeleteCategory(category._id)}>Delete</button></td>
            
            </tr>
          ))}
        </tbody>
        </table>
        </div>
        
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Category"
        >
          {editCategory && (
            <div className='bg-blue'>
              <input
                type="text"
                value={editedCategory.name}
                onChange={(e) => setEditedCategory({ ...editedCategory, name: e.target.value })}
              />
              <textarea
              value={editedCategory.description}
              onChange={(e) => setEditedCategory({ ...editedCategory, description: e.target.value })}
            />
            <input
              type="text"
              value={editedCategory.cover_photo}
              onChange={(e) => setEditedCategory({ ...editedCategory, cover_photo: e.target.value })}
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
              placeholder="Product Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <textarea
              placeholder="Description"
              value={newCategory.description}
              onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Cover Photo"
              value={newCategory.cover_photo}
              onChange={(e) => setNewCategory({ ...newCategory, cover_photo: e.target.value })}
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
