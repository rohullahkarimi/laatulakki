import axios from "axios";

const BASE_URL = "https://tester.laatulakki.fi/api/";

const TOKEN = () => {
    if (
      JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken
    ) {
      return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken;
    } else { return '' }
};
//console.log(TOKEN);



export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});