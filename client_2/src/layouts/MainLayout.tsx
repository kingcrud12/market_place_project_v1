import React from 'react'
import Header from './default/Header'
import Footer from './default/Footer'

function MainLayout({ children }) {
  return (
    <>
     <Header/>
        { children }
     <Footer/>
    </>
  )
}

export default MainLayout