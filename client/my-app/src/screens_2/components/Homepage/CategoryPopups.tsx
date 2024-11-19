import React from 'react';
import IconRight from '../../../assets_2/icons/Regular/CaretRight.svg'
import './CategoryPopups.css'; // Crée un fichier CSS spécifique si besoin

// Interface pour les catégories
export interface Category {
  id: number;
  name: string;
  icon?: string;
}

// Props que ce composant recevra
interface CategoryPopupsProps {
  categories: Category[]; // Liste des catégories à afficher
  isOpen: boolean; // Contrôle si le popup est ouvert
  onClose: () => void; // Fonction pour fermer le popup
}

const CategoryPopups: React.FC<CategoryPopupsProps> = ({ categories, isOpen, onClose }) => {
  if (!isOpen) return null; // Ne rien afficher si le popup est fermé

  return (
    <div className="popup-menu">
      <ul>
        {categories.map((category) => (
          <li key={category.id} className="popup-item">
            {category.name}
            <img src={IconRight} alt="category-icon" className="category-icon" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPopups;