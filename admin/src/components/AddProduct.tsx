import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddProduct.css'; // Importer le fichier CSS pour les styles

const AddProduct: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation du formulaire
    if (!name || !description || !price || !image) {
      alert("Tous les champs sont obligatoires, y compris l'image.");
      return;
    }

    // Utiliser FormData pour les données multipart/form-data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('image', image);

    try {
      const response = await fetch('https://localhost:3000/market_place/v1/admin/product', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formData, // Envoyer le formData
      });

      if (response.ok) {
        navigate('/admin/products');
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit:', error);
    }
  };

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Ajouter un nouveau produit</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="add-product-form">
        <div className="form-group">
          <label>Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea-field"
          />
        </div>

        <div className="form-group">
          <label>Prix:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            required
            className="input-file"
          />
        </div>

        <button type="submit" className="submit-button">Ajouter le produit</button>
      </form>
    </div>
  );
};

export default AddProduct;
