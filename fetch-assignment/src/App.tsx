import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SearchPage from './pages/SearchPage';
import Favorites from './components/Favorites';
import { FavoritesProvider } from './context/FavoritesContext';
function App() {

  return (
    <>
    {/*  homepage - header, filters and results */}
   
    {/* Header */}
    {/* Login */}
    {/* Filters */}
    {/* Results */}

      {/* Routes */}
      <FavoritesProvider>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/search' element={<SearchPage/>} />
        <Route path='/favorites' element={<Favorites/>} />
      </Routes>
      {/* toast container - to display taost messages*/}
      <ToastContainer/>
    </FavoritesProvider>
    </>
  )
}

export default App
