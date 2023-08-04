import React from 'react'; // Make sure you have this import
import {useLocation} from "react-router-dom"

const Success = () => {
    const location = useLocation();
    console.log(location)
    return (
        <div>Success</div>
    )
}

export default Success