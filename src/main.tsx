import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {loader as rootLoader} from './routes/root'
import { Provider } from 'react-redux'
import store from "./store";

const router = createBrowserRouter([
    {
        path: "/?country=:country?",
        element: <App/>,
        loader: rootLoader,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>,
    </Provider>
)
