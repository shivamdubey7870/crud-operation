import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductPage.css';

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 10.99, description: 'Description 1' },
    { id: 2, name: 'Product 2', price: 20.99, description: 'Description 2' },
  ]);
  const [editing, setEditing] = useState(null);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' });

  useEffect(() => {
    const user = localStorage.getItem('loggedInUser') || localStorage.getItem('authData');
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  const handleAdd = () => {
    if (newProduct.name && newProduct.price && newProduct.description) {
      setProducts([...products, { ...newProduct, id: Date.now() }]);
      setNewProduct({ name: '', price: '', description: '' });
    }
  };

  const handleEdit = (product) => {
    setEditing(product.id);
    setNewProduct({ ...product });
  };

  const handleUpdate = () => {
    setProducts(products.map(p => p.id === editing ? { ...newProduct, id: editing } : p));
    setEditing(null);
    setNewProduct({ name: '', price: '', description: '' });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('authData');
    navigate('/');
  };

  return (
    <div className="product-page">
      <h2>Product Management</h2>
      <button onClick={handleLogout} className="logout-btn">Logout</button>
      <div className="add-product">
        <h3>{editing ? 'Edit Product' : 'Add Product'}</h3>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <button onClick={editing ? handleUpdate : handleAdd}>
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && <button onClick={() => { setEditing(null); setNewProduct({ name: '', price: '', description: '' }); }}>Cancel</button>}
      </div>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.description}</td>
              <td>
                <button onClick={() => handleEdit(product)}>Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;