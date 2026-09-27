
import './Admin.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import {Routes, Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct'
import ProductList from '../../Components/ProductList/ProductList'

const Admin = () => {
  return (
    <div className='admin'>
      <Sidebar/>
      <Routes>
        <Route path='/add-product' element={<AddProduct/>}/>
        <Route path='/list-product' element={<ProductList/>}/>
      </Routes>
    </div>
  )
}

export default Admin
