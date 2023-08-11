import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios";
import Swal from "sweetalert2";


const data_products = createAsyncThunk(
    'data_products', async() => {
        try {
            let { data } = await axios.get(`http://localhost:8080/api/products`)
            console.log(data)
            console.log(data.response)
            return data.response
      
          } catch (error) {
            console.log(error)
            return null
          }
    }                                    
)

const productsActions = { data_products, }
export default productsActions