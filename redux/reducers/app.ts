import { createSlice } from '@reduxjs/toolkit'
import { AppStateType, CartItem, Category, Product } from 'types'

const initialState: AppStateType = {
  products: [],
  categories: [],
  cart: [],
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setProducts:(state, { payload }: { payload: Product[] }) =>{
      state.products = payload
    },
    setCategories(state, { payload }: { payload: Category[] }) {
      state.categories = payload
    },
    setCart(state, { payload }: { payload: CartItem[] }) {
      state.cart = payload
    },
    changeCartQty(state, { payload }: { payload: CartItem }) {
      if(state.cart.length<1){
        state.cart.push(payload)
      }else{
        const item=state.cart.find((item)=>item.slug==payload.slug)
        if(!item){
          state.cart.push(payload)
        }else{
          item.quantity+=payload.quantity
          if(item.quantity<1){
           state.cart= state.cart.filter((i) => i.slug !== item.slug)
          }
        }
      }
    },
  },
})

export const { setProducts, setCategories, setCart, changeCartQty } = appSlice.actions

export default appSlice.reducer
