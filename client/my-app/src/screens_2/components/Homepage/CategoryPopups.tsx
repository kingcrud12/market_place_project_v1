import React, { useState, useRef, useEffect } from "react";
import SubCategoryPopups from "./SubCategoryPopups";
import IconRight from "../../../assets_2/icons/Regular/CaretRight.svg";
import Image1 from "../../../assets_2/products/Image1.png";
import Image2 from "../../../assets_2/products/Image2.png";
import Image3 from "../../../assets_2/products/Image3.png";
import "./CategoryPopups.css";

export interface Category {
  id: number;
  name: string;
  subcategories?: { id: number; name: string }[];
}

interface CategoryPopupsProps {
  categories: Category[];
  isOpen: boolean;
  onClose: () => void;
}

const CategoryPopups: React.FC<CategoryPopupsProps> = ({ categories, isOpen, onClose }) => {
  const [openCategory, setOpenCategory] = useState<number | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const toggleCategory = (categoryId: number) => {
    setOpenCategory(openCategory === categoryId ? null : categoryId); // Ouvre ou ferme une catégorie
  };

  useEffect(() => {
    // Ferme le sous-menu lors du clic à l'extérieur
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setOpenCategory(null);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="popup-menu" ref={popupRef}>
      <ul className="categories">
        {categories.map((category) => (
          <li
            key={category.id}
            className="popup-item"
            onClick={() => toggleCategory(category.id)}
            style={{ cursor: category.subcategories ? "pointer" : "default" }}
          >
            <span>{category.name}</span>
            {category.subcategories && <img src={IconRight} alt="category-icon" className="category-icon" />}
            
            {openCategory === category.id && category.subcategories && (
              <SubCategoryPopups
                subcategories={category.subcategories}
                featuredSection={{
                  title: "FEATURED PHONES", // Exemple de titre pour la section
                  products: [
                    // Exemple de produits pour cette catégorie
                    { id: 1, name: "Samsung Galaxy S21", price: "$160", image: Image1 },
                    { id: 2, name: "iPhone 12 Pro", price: "$1,000", image: Image2 },
                    { id: 3, name: "Sony Camera", price: "$2,300", image: Image3 },
                  ],
                }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPopups;