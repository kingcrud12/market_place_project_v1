import React from 'react';
import './BreadCrumb.css';
import House from '../../../assets_2/icons/Regular/House.svg';
import CaretRight from '../../../assets_2/icons/Regular/CaretRight.svg';

function BreadCrumb () {
    return (
  
      <div className='breadcrumb'>
       <div className='breadcrumb-item'>
        <img src={House} alt='Home' />
        <span className= 'breadcrumb-category'>Home</span>
        <img src={CaretRight} alt='' />
        <span className= 'breadcrumb-selection'>Sign in</span>
        </div> 
      
      </div>
    );
  };
  
  export default BreadCrumb;