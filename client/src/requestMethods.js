import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;
//const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken;
const TOKEN = () => {
    if (
      JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken
    ) {
      return JSON.parse(JSON.parse(localStorage.getItem('persist:root')).user)
        .currentUser.accessToken;
    } else { return '' }
};

//const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZDAyOWJjODg4YmU4ZDU5ZjIwY2FlNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MDIyMDE3MSwiZXhwIjoxNjYwNDc5MzcxfQ.HlnaRQEuu2zINUw6ZfRQW7aJw5DogtwQnTuvMf9YT_8";
//console.log(TOKEN);

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${TOKEN}`}
});