
import ProductPage from './components/Product'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Confirmation from './components/Confirmation'
import StoreContextProvider from './context/StoreContext'
import ProductContextProvider from './context/ProductContext'
import "./App.css"

function App() {
  return (
    <>
    <ProductContextProvider>
    <StoreContextProvider>
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<ProductPage />} /> 
       <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </BrowserRouter>
    </StoreContextProvider>
    </ProductContextProvider>
    
    </>
    )
}

export default App
