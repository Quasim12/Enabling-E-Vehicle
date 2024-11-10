import React from 'react';
import { NavBar } from './components/navBar/NavBar';
import AppRoutes from './routes/AppRoutes';
import { Footer } from './components/footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;