import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:[],
        userData:[],
        quantity:0,
        total:0,
    },
    reducers:{
        addUserData: (state, action)=>{
            state.userData = [];
            state.userData.push(action.payload);
        },
        addProduct: (state, action)=>{
            state.quantity += 1;
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity;
        },
        increaseProduct: (state, action) => {
            state.products.findIndex((i) => 
                i._id === action.payload.id
                ? i.quantity += 1
                : console.log("Product not found!")
            )
            state.total += action.payload.price;
        },
        decreaseProduct: (state, action) => {
            state.products.findIndex((i) => 
                i._id === action.payload.id
                ? i.quantity -= 1
                : console.log("Product not found!")
            )
            state.total -= action.payload.price;
        },
        deleteProduct: (state, action) => {
          state.products.splice(
            state.products.findIndex((i) => i._id === action.payload.id),
            1
          );
          state.quantity -= 1;
          state.total -= action.payload.total;
        },
        emptyCart: (state) => {
          state.products = [];
          state.userData = [];
          state.quantity = 0;
          state.total = 0;
        },
    },
});

export const {addUserData, addProduct, increaseProduct, decreaseProduct, deleteProduct, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;