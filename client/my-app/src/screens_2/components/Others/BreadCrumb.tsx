import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './BreadCrumb.css';
import House from '../../../assets_2/icons/Regular/House.svg';
import CaretRight from '../../../assets_2/icons/Regular/CaretRight.svg';
import { Route } from '../../../routes';
import routes from '../../../routes'

function BreadCrumb () {
  const location = useLocation();

  const getParentRoute = (parentPath: string | undefined): Route | undefined => {
    return parentPath ? routes.find((r) => r.path === parentPath) : undefined;
  };
  

  // Fonction pour construire le chemin du breadcrumb
  const buildBreadcrumb = (currentPath: string): Route[] => {
    const breadcrumb: Route[] = [];
    let route: Route | undefined = routes.find((r) => r.path === currentPath);

    // Remonter dans la hiérarchie à l'aide de `parent`
    while (route) {
      breadcrumb.unshift(route); // Ajouter au début pour respecter l'ordre
      route = getParentRoute(route.parent); // Appeler la fonction pour trouver le parent
    }

    return breadcrumb;
  };

  // Construire le breadcrumb pour la route active
  // Construire le breadcrumb pour la route active
  const breadcrumbItems = buildBreadcrumb(location.pathname)
    .filter((route) => route.path !== '/'); // Exclure Home de la liste dynamique
    
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-item">
        {/* Affichage de l'élément Home avec son icône */}
        <Link to="/"  className="breadcrumb-item-home-link">
          <span className="breadcrumb-item-home">
          <img src={House} alt="Home" />
            Home</span>
        </Link>

        {/* Affichage des autres éléments du breadcrumb */}
        {breadcrumbItems.length > 0 && <img src={CaretRight} alt="" />}
        {breadcrumbItems.map((route, index) => (
          <React.Fragment key={route.path}>
            {index > 0 && <img src={CaretRight} alt="" />}
            <Link to={route.path} className={
                location.pathname === route.path
                  ? "breadcrumb-selection" // Classe active pour la page actuelle
                  : "breadcrumb-category" // Classe par défaut pour les autres pages
              }>
              {route.label}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
  
  export default BreadCrumb;