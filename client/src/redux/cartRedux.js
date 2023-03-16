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
        deliveryPrice: null,
        deliverySameAsBilling: true,
        quantity:0,
        promoCode: "",
        promoPercentage: 0,
        discountAmount: 0,
        total:0,
        message: ""
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
            state.message = action.payload.comment;

            // save deliverySameAsBilling
            if(action.payload.deliverySameAsBilling){
              state.deliverySameAsBilling = false;

              // delivery not same as billing
              state.deliveryAddress['firstname'] = action.payload.deliveryAddress_firstName;
              state.deliveryAddress['lastname'] = action.payload.deliveryAddress_lastName;
              state.deliveryAddress['streetAddress'] = action.payload.deliveryAddress_streetAddress;
              state.deliveryAddress['postalCode'] = action.payload.deliveryAddress_postalCode;
              state.deliveryAddress['city'] = action.payload.deliveryAddress_city;
              state.deliveryAddress['country'] = action.payload.deliveryAddress_country;
              state.deliveryAddress['phonenumber'] = action.payload.deliveryAddress_phonenumber;
              state.deliveryAddress['email'] = action.payload.deliveryAddress_email;
            }else{
              state.deliverySameAsBilling = true;
            }
        },
        saveDeliveryMethod: (state, action)=>{
          // save payment method
          state.deliveryMethod = action.payload.deliveryMethod;
          state.deliveryPrice = action.payload.deliveryPrice;
          //state.total += action.payload.deliveryPrice;
        },
        addProduct: (state, action)=>{
            const itemInCart = state.products.find((item) => item._id === action.payload._id && item.size === action.payload.size);

            if (itemInCart) {
              // if same product with size
              itemInCart.quantity += action.payload.quantity;
            } else {
              state.quantity += 1;
              state.products.push(action.payload);
            }
            if(action.payload.discount){
              var price = action.payload.price - (action.payload.price * (action.payload.discount / 100)).toFixed(2);
              state.total += price * action.payload.quantity;
            }else{
              state.total += action.payload.price * action.payload.quantity;
            }

            // update discount amount 
            state.discountAmount = (state.total * state.promoPercentage) / 100;
           
        },
        increaseProduct: (state, action) => {
            state.products.findIndex((i) => 
                i._id === action.payload.id
                ? i.quantity += 1
                : console.log("Product not found!")
            )

            if(action.payload.discount){
              var price = action.payload.price - (action.payload.price * (action.payload.discount / 100)).toFixed(2);
              state.total += price;
            }else{
              state.total += action.payload.price;
            }

            // update discount amount 
            state.discountAmount = (state.total * state.promoPercentage) / 100;
           
        },
        decreaseProduct: (state, action) => {
            const item = state.products.find((item) => item._id === action.payload.id);
            if (item.quantity === 1) {
              item.quantity = 1
            } else {
              item.quantity--;

              // decrease total amount
              if(action.payload.discount){
                var price = action.payload.price - (action.payload.price * (action.payload.discount / 100)).toFixed(2);
                state.total -= price;
              }else{
                state.total -= action.payload.price;
              }
            }

            // update discount amount 
            state.discountAmount = (state.total * state.promoPercentage) / 100;
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

          // update discount amount 
          state.discountAmount = (state.total * state.promoPercentage) / 100;
          
        },
        addPromoCode: (state, action) => {
          state.promoCode = action.payload.promoCode;
          state.promoPercentage = action.payload.percentage;
          state.discountAmount  = action.payload.discountAmount;
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
          state.deliveryPrice= null;
          state.deliverySameAsBilling = true;
          state.quantity = 0;
          state.total = 0;
          state.promoCode = "";
          state.promoPercentage = 0;
          state.discountAmount = 0;
          state.message = "";
        },
    },
});

export const {saveCustomerInformation, saveDeliveryMethod, deliveryAddress, addProduct, increaseProduct, decreaseProduct, deleteProduct, addPromoCode, emptyCart} = cartSlice.actions;
export default cartSlice.reducer;