import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {RouterProvider} from "react-router-dom";

import {router} from "./router";
import {Provider} from "react-redux";
import {store} from "./store/store";
import {ThemeContext, ThemeProvider} from "./hoc";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <ThemeProvider>
            <RouterProvider router={router}/>
        </ThemeProvider>
        </Provider>
);
