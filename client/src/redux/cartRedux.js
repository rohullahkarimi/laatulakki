import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:[],
        billingAddress:{
            firstname:"",
            lastname:"",
        },
        deliveryAddress:{
          firstname:"",
          lastname:"",
        },
        deliverySameAsBilling: false,
        quantity:0,
        total:0,
    },
    reducers:{
        saveCustomerInformation: (state, action)=>{
            // save billingAddress
            state.billingAddress['firstname'] = action.payload.firstName;
            state.billingAddress['lastname'] = action.payload.lastName;

            // save deliverySameAsBilling
            state.deliverySameAsBilling = action.payload.deliverySameAsBilling;

            // save deliveryAddress
            state.deliveryAddress['firstname'] = action.payload.deliveryAddress_firstName;
            state.deliveryAddress['lastname'] = action.payload.deliveryAddress_lastName;
        },
        addProduct: (state, action)=>{
            const itemInCart = state.products.find((item) => item._id === action.payload._id);
            if (itemInCart) {
              itemInCart.quantity += action.payload.quantity;
            } else {
              state.quantity += 1;
              state.products.push(action.payload);
              state.total += action.payload.price * action.payload.quantity;
            }
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
            const item = state.products.find((item) => item._id === action.payload.id);
            if (item.quantity === 1) {
              item.quantity = 1
            } else {
              item.quantity--;
              state.total -= action.payload.price;
            }
        },
        deleteProduct: (state, action) => {
          state.products.splice(
            state.products.findIndex((i) => i._id === action.payload.id),
            1
          );
          if(state.quantity === 1){
            state.quantity = 0;
            state.total = 0;
          }else{
            state.total -= action.payload.total;
            state.quantity -= 1;
          }
          
        },
        emptyCart: (state) => {
          state.products = [];
          state.billingAddress = {
            firstname:"",
            lastname:"",
          };
          state.deliveryAddress = {
            firstname:"",
            lastname:"",
          };
          state.deliverySameAsBilling = false;
          state.quantity = 0;
          state.total = 0;
        },
    },
});

export const {saveCustomerInformation, deliveryAddress, addProduct, increaseProduct, decreaseProduct, deleteProduct, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;