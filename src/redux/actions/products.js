import { createAsyncThunk } from "@reduxjs/toolkit"
import Swal from "sweetalert2";
import { api } from "../../utils/api";


const data_products = createAsyncThunk(
    'data_products', async() => {
        try {
            let { data } = await api.get(`https://fastcommerce-back-production.up.railway.app/api/products`,)
            console.log(data)
            console.log(data.response)
            return data.response
      
          } catch (error) {
            console.log(error)
            return null
          }
    }                                    
)

const searched_products = createAsyncThunk(
  'searched_products', async({search}) => {
    try {
      let {data} = await api.get(`https://fastcommerce-back-production.up.railway.app/api/products?name=${search}`);
      console.log(data)
      // Actualiza el estado local de los productos filtrados
      //setSearchedProducts(searchedProducts);
      //console.log(searchedProducts)
      return data.response
      //navigate('/products/search-results')
    } catch (error) {
      console.error('Products not search', error);
    }
  }                                    
)

const productsActions = { data_products, searched_products }
export default productsActions