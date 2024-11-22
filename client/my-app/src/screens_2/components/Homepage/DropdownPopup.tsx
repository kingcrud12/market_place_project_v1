import React, { useState, useRef, useEffect } from "react";
import Carret from '../../../assets_2/icons/Regular/Multi-Currency/Regular/CaretDown.svg';
import IconCheck from '../../../assets_2/icons/Multi-Language/Duotone/Check.svg'
import "./DropdownPopup.css";

interface DropdownPopupProps {
  label: string; // Texte visible par défaut (e.g., "Eng")
  options: { id: number; label: string; shortLabel?: string; icon?: string }[]; // Options avec icône et texte abrégé
  onOptionSelect: (option: { id: number; label: string; shortLabel: string; icon?: string }) => void; // Callback lors de la sélection
}

const DropdownPopup: React.FC<DropdownPopupProps> = ({
  label,
  options,
  onOptionSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{
    id: number;
    icon?: string;
    shortLabel: string;
  }>({id:-1, icon: undefined, shortLabel: label }); // Initialisation de l'option sélectionnée
  const popupRef = useRef<HTMLDivElement>(null);

  const togglePopup = () => setIsOpen(!isOpen);

  const closePopup = () => setIsOpen(false);

  // Fermer le popup si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        closePopup();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleOptionSelect = (option: { id: number; label: string; shortLabel?: string; icon?: string }) => {
    const shortLabel = option.shortLabel ?? option.label;
    setSelectedOption({id:option.id, icon: option.icon, shortLabel });
    onOptionSelect({...option, shortLabel});
    closePopup();
  };

  return (
    <div className="dropdown" ref={popupRef}>
      <button className="dropdown-toggle" onClick={togglePopup}>
        {selectedOption.icon && (
          <img src={selectedOption.icon} alt="Selected flag" className="dropdown-flag" />
        )}
        {selectedOption.shortLabel}
        <img 
            src={Carret}
            alt="Dropdown Icon"
            className={`dropdown-caret ${isOpen ? 'rotated' : ''}`}
        />
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {options.map((option) => (
            <li
              key={option.id}
              className={`dropdown-item ${
                option.id === selectedOption.id ? "selected" : ""
              }`} // Ajout de la classe dynamique
              onClick={() => handleOptionSelect(option)}
            >
                <div className='option-container'>
               <div className='option-text'>   {/* Icône (drapeau) */}
              {option.icon && (
                <img src={option.icon} alt={`${option.label} flag`} className="dropdown-flag" />
                )}
                {/* Texte de l'option */}
              {option.label}
              </div>
              {/* Coche si l'option est sélectionnée */}
              {option.id === selectedOption.id && (
                  <span className="check-icon"><img src={IconCheck} alt="check" /></span> // Ajout de la coche
                  )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownPopup;