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
        discountAndTotalAmountBasedOnProducts: (state, action) => {
          
          var discountAmountByProduction = 0;
          var productCurrentPrice = 0;
          var total = 0;
          state.products.filter(item=> {
        
            if(item.discount){
              // total calculation
              var price = item.price - (item.price * (item.discount / 100)).toFixed(2);
              total += price * item.quantity;

              // cannot get discount from already dicounted product
              discountAmountByProduction += 0
            }else{
              productCurrentPrice = item.price * item.quantity;

              // total calculation 
              total += productCurrentPrice;

              // discount
              discountAmountByProduction += (productCurrentPrice * state.promoPercentage) / 100
            }
            return discountAmountByProduction
          })

          // Test 
          //console.log(total.toFixed(2))
          //console.log(discountAmountByProduction)

          state.discountAmount =  discountAmountByProduction
          state.total = Number(total.toFixed(2));
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

            // update discount amount and total
            cartSlice.caseReducers.discountAndTotalAmountBasedOnProducts(state, action); //(state.total * state.promoPercentage) / 100;
           
        },
        increaseProduct: (state, action) => {
            state.products.findIndex((i) => 
                i._id === action.payload.id
                ? i.quantity += 1
                : console.log("Product not found!")
            )

            // update discount amount and total
            cartSlice.caseReducers.discountAndTotalAmountBasedOnProducts(state, action); 
           
        },
        decreaseProduct: (state, action) => {
            const item = state.products.find((item) => item._id === action.payload.id);
            if (item.quantity === 1) {
              item.quantity = 1
            } else {
              item.quantity--;
            }

            // update discount amount and total
            cartSlice.caseReducers.discountAndTotalAmountBasedOnProducts(state, action); 
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
            //state.total -= action.payload.total;
            state.quantity -= 1;
          }

         // update discount amount and total
         cartSlice.caseReducers.discountAndTotalAmountBasedOnProducts(state, action); 
          
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