//require('file-loader?name=[name].[ext]!./index.html')
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/OmnesBold.ttf';
import { Tooltip } from '@radix-ui/react-tooltip';



const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);




