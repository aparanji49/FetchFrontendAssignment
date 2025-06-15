import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css'
import { toast, ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SearchPage from './pages/SearchPage';
import Favorites from './components/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
import { useEffect, useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("fetch_username");
    setIsAuthenticated(!!user);
  }, []);

  useEffect(() => {
    // Show toast if unauthenticated user tries to access protected route
    if (isAuthenticated === false && location.pathname !== "/") {
      toast.info("Please login to access that page");
    }
  }, [isAuthenticated, location.pathname]);

  if (isAuthenticated === null) {
    // Auth still loading - show blank or spinner
    return <div>Loading your pawfect session...</div>;
  }
  return (
    <>


      {/* Routes */}
      <FavoritesProvider>

      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/search' element={isAuthenticated ? <SearchPage/> : <Navigate to="/" replace/>} />
        <Route path='/favorites' element={isAuthenticated ? <Favorites/> : <Navigate to="/" replace/>} />
      </Routes>
      {/* toast container - to display taost messages*/}
      <ToastContainer position='top-center' autoClose={3000}/>
    </FavoritesProvider>
    </>
  )
}

export default App
