import React from "react";
import { Circles } from 'react-loader-spinner'
import styled from 'styled-components'
export const cx = (...classNames) =>
  classNames.filter(Boolean).join(" ");


const LoaderCenter = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform: -webkit-translate(-50%, -50%);
  transform: -moz-translate(-50%, -50%);
  transform: -ms-translate(-50%, -50%);
  color:darkred;
`;


// because we use sanity-next-image
// vercel throws error when using normal imports
export const MyLoader = () => {
  return (
    <LoaderCenter>
      <Circles
        height="80"
        width="80"
        color="#00D8D6"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </LoaderCenter>
  )
};
