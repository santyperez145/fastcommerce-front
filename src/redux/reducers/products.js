import { createReducer } from "@reduxjs/toolkit"
import productsActions from "../actions/products"                  //importo las acciones

const { data_products, searched_products} = productsActions                              //desestructuro la accion para poder utilizarla

const initialState = {                                              //defino estado inicial
   products: [],
   searched_products: []
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
    .addCase(searched_products.fulfilled, (state, action)=>{
        console.log(action.payload)
        let newState = {
            ...state,
            searched_products: action.payload,
            //currentPage: action.payload,
        }
        console.log(newState)
        return newState
    })
)

export default productsReducer