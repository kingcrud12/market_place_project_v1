import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProduct.css'; // Assurez-vous de créer ce fichier CSS

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null); // État pour l'image
  const [existingImageUrl, setExistingImageUrl] = useState(''); // URL de l'image existante
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch(`https://localhost:3000/market_place/v1/admin/product/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Inclure le token dans le header
          },
        });

        if (!response.ok) {
          throw new Error('Erreur lors de la récupération du produit');
        }

        const product = await response.json();
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setExistingImageUrl(product.imageUrl); // Récupérer l'URL de l'image existante
      } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Utilisation de FormData pour envoyer des données multipart
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price.toString());

    // Si une nouvelle image a été sélectionnée, on l'ajoute à FormData
    if (image) {
      formData.append('image', image);
    }

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`https://localhost:3000/market_place/v1/admin/product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`, // Inclure le token dans le header
        },
        body: formData, // Envoi du FormData
      });

      if (response.ok) {
        navigate('/admin/products');
      } else {
        const error = await response.json();
        alert(`Erreur : ${error.message}`);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error);
    }
  };

  return (
    <div className="edit-product-container">
      <h1>Modifier le produit</h1>
      <form className="edit-product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nom:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Prix:</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Image actuelle:</label>
          {existingImageUrl && (
            <div className="image-preview">
              <img src={existingImageUrl} alt="Produit" className="product-image" />
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="image">Nouvelle image:</label>
          <input
            id="image"
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>
        <button type="submit" className="submit-button">Modifier</button>
      </form>
    </div>
  );
};

export default EditProduct;
