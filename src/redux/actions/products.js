import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import Swal from "sweetalert2";


const data_products = createAsyncThunk(
    'data_products', async() => {
        try {
            let { data } = await axios.get(`http://localhost:8080/api/products`,)
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
      let {data} = await axios.get(`http://localhost:8080/api/products?name=${search}`);
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