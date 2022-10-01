import {createSlice} from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState:{
        products:[],
        billingAddress:{
          firstname:"",
          lastname:"",
          streetAddress:"",
          postalCode:"",
          city:"",
          country: "",
          phonenumber:"",
          email:"",
          comment: ""
        },
        deliveryAddress:{
          firstname:"",
          lastname:"",
          streetAddress:"",
          postalCode:"",
          city:"",
          country: "",
          phonenumber:"",
          email:"",
        },
        deliveryMethod: "",
        deliveryPrice: 0,
        deliverySameAsBilling: false,
        quantity:0,
        total:0,
    },
    reducers:{
        saveCustomerInformation: (state, action)=>{
            // save billingAddress
            state.billingAddress['firstname'] = action.payload.firstName;
            state.billingAddress['lastname'] = action.payload.lastName;
            state.billingAddress['streetAddress'] = action.payload.streetAddress;
            state.billingAddress['postalCode'] = action.payload.postalCode;
            state.billingAddress['city'] = action.payload.city;
            state.billingAddress['country'] = action.payload.country;
            state.billingAddress['phonenumber'] = action.payload.phonenumber;
            state.billingAddress['email'] = action.payload.email;
            state.billingAddress['comment'] = action.payload.comment;

            // save deliverySameAsBilling
            state.deliverySameAsBilling = action.payload.deliverySameAsBilling;

            // save deliveryAddress
            state.deliveryAddress['firstname'] = action.payload.deliveryAddress_firstName;
            state.deliveryAddress['lastname'] = action.payload.deliveryAddress_lastName;
            state.deliveryAddress['streetAddress'] = action.payload.deliveryAddress_streetAddress;
            state.deliveryAddress['postalCode'] = action.payload.deliveryAddress_postalCode;
            state.deliveryAddress['city'] = action.payload.deliveryAddress_city;
            state.deliveryAddress['country'] = action.payload.deliveryAddress_country;
            state.deliveryAddress['phonenumber'] = action.payload.deliveryAddress_phonenumber;
            state.deliveryAddress['email'] = action.payload.deliveryAddress_email;
        },
        saveDeliveryMethod: (state, action)=>{
          // save payment method
          state.deliveryMethod = action.payload.deliveryMethod;
          state.deliveryPrice = action.payload.deliveryPrice;
          //state.total += 8.00; //action.payload.deliveryPrice;
        },
        addProduct: (state, action)=>{
            const itemInCart = state.products.find((item) => item._id === action.payload._id);
            if (itemInCart) {
              itemInCart.quantity += action.payload.quantity;
            } else {
              state.quantity += 1;
              state.products.push(action.payload);
            }
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
            streetAddress:"",
            postalCode:"",
            city:"",
            country: "",
            phonenumber:"",
            email:"",
            comment: ""
          };
          state.deliveryAddress = {
            firstname:"",
            lastname:"",
            streetAddress:"",
            postalCode:"",
            city:"",
            country: "",
            phonenumber:"",
            email:"",
          };
          state.deliveryMethod= "";
          state.deliveryPrice= 0;
          state.deliverySameAsBilling = false;
          state.quantity = 0;
          state.total = 0;
        },
    },
});

export const {saveCustomerInformation, saveDeliveryMethod, deliveryAddress, addProduct, increaseProduct, decreaseProduct, deleteProduct, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;