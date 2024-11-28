import React, { useState } from "react";
import "./CheckboxList.css"; // Importation des styles

const brands = [
  "Apple",
  "Microsoft",
  "Dell",
  "Symphony",
  "Sony",
  "LG",
  "One Plus",
  "Google",
  "Samsung",
  "HP",
  "Xiaomi",
  "Panasonic",
  "Intel",
];

type SelectionState = {
  [brand: string]: boolean;
};

const CheckboxList: React.FC = () => {
  const [selectedBrands, setSelectedBrands] = useState<SelectionState>(
    brands.reduce((acc, brand) => ({ ...acc, [brand]: false }), {})
  );

  const handleCheckboxChange = (brand: string) => {
    setSelectedBrands((prevState) => ({
      ...prevState,
      [brand]: !prevState[brand],
    }));
  };

  return (
    <div className="checkbox-list">
      {brands.map((brand) => (
        <label key={brand} className="checkbox-item">
          <input
            type="checkbox"
            checked={selectedBrands[brand]}
            onChange={() => handleCheckboxChange(brand)}
            className="checkbox-input"
          />
          {brand}
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;