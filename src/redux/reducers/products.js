import { createReducer } from "@reduxjs/toolkit"
import productsActions from "../actions/products"                  //importo las acciones

const { data_products, } = productsActions                              //desestructuro la accion para poder utilizarla

const initialState = {                                              //defino estado inicial
   products: [],
   //currentPage: 1,
}

const productsReducer = createReducer(initialState, 
    (builder) => builder
    .addCase(data_products.fulfilled, (state, action)=>{
        console.log(action.payload)
        let newState = {
            ...state,
            products: action.payload,
            //currentPage: action.payload,
        }
        console.log(newState)
        return newState
    })
)

export default productsReducer