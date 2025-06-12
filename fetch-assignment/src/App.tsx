import { Route, Routes } from 'react-router-dom';
import './App.css'
import { ToastContainer } from 'react-toastify';
import Login from './components/Login';
import SearchPage from './pages/SearchPage';
import Favorites from './pages/Favorites';
function App() {

  return (
    <>
    {/*  homepage - header, filters and results */}
   
    {/* Header */}
    {/* Login */}
    {/* Filters */}
    {/* Results */}

      {/* Routes */}
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/search' element={<SearchPage/>} />
        <Route path='/favorites' element={<Favorites/>} />
      </Routes>
      {/* toast container - to display taost messages*/}
      <ToastContainer/>
    </>
  )
}

export default App
