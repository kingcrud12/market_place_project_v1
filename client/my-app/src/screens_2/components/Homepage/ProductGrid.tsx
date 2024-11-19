import React from "react";
import Image1 from "../../../assets_2/products/Image1.png";
import Image2 from "../../../assets_2/products/Image2.png";
import Image3 from "../../../assets_2/products/Image3.png";
import Image4 from "../../../assets_2/products/Image4.png";
import Image5 from "../../../assets_2/products/Image5.png";
import Image6 from "../../../assets_2/products/Image6.png";
import Image7 from "../../../assets_2/products/Image7.png";
import Image8 from "../../../assets_2/products/Image8.png";
import Image9 from "../../../assets_2/products/Image9.png";
import Image10 from "../../../assets_2/products/Image10.png";
import Image11 from "../../../assets_2/products/Image11.png";
import Image12 from "../../../assets_2/products/Image12.png";
import "./ProductGrid.css";

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  badge?: string; // Optionnel : pour afficher un badge
}

interface Section {
  title: string;
  products: Product[];
}

const sections: Section[] = [
  {
    title: "Flash Sale Today",
    products: [
      { id: 1, name: "Bose Sport Earbuds", price: "$1,500", image: Image1 },
      { id: 2, name: "Simple Mobile 4G LTE Prepaid Smartphone", price: "$1,500", image: Image2,  },
      { id: 3, name: "4K UHD LED Smart TV", price: "$1,500", image: Image3 },
    ],
  },
  {
    title: "Best Sellers",
    products: [
      { id: 4, name: "Samsung Galaxy S21 5G", price: "$1,500", image: Image4 },
      { id: 5, name: "Simple Mobile Galaxy 5G", price: "$1,500", image: Image5,  },
      { id: 6, name: "Sony DSC-HX8 High Zoom Camera", price: "$1,500", image: Image6 },
    ],
  },
  {
    title: "Top Rated",
    products: [
      { id: 7, name: "Portable Washing Machine", price: "$1,500", image: Image7 },
      { id: 8, name: "Sony DSC-HX8 High Zoom Camera", price: "$1,500", image: Image8,  },
      { id: 9, name: "Dell Optiplex 7000 Computer", price: "$1,500", image: Image9 },
    ],
  },
  {
    title: "New Arrival",
    products: [
      { id: 10, name: "TOZO T6 Wireless Earbuds", price: "$1,500", image: Image10 },
      { id: 11, name: "JBL FLIP 4 Bluetooth Speaker", price: "$1,500", image: Image11 },
      { id: 12, name: "Wyze Cam Pan 1080p", price: "$1,500", image: Image12 },
    ],
  },
];

const ProductGrid: React.FC = () => {
  return (
    <div className="product-grid-small">
      {sections.map((section) => (
        <div key={section.title} className="section-small">
          <span className="section-title-small">{section.title}</span>
          <ul className="product-list-small">
            {section.products.map((product) => (
              <li key={product.id} className="product-item-small">
                <div className="product-image-small">
                  <img src={product.image} alt={product.name} />
                  {product.badge && <span className="product-badge-small">{product.badge}</span>}
                </div>
                <div className="product-info-small">
                  <span className="product-name-small">{product.name}</span>
                  <span className="product-price-small">{product.price}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;