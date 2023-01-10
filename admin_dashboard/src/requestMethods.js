import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL; //"https://tester.laatulakki.fi/api/";


const TOKEN = () => {
   

  const persistRoot = JSON.parse(localStorage.getItem('persist:root'));

  if (persistRoot) {
    return JSON.parse(persistRoot.user).currentUser?.accessToken;
  }else{
    return '';
  }
};
//console.log(TOKEN);



export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN()}`}
});