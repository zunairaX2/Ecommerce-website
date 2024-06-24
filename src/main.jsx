import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from './Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import Contact from './components/Contact/Contact.jsx';
import Github, { githubInfoLoader } from './components/Github/Github.jsx';
import Products from './components/Products/Products.jsx';
import SingleProduct from './components/Products/SingleProduct.jsx';
import FeaturesCard from './components/FeaturesCard/FeaturesCard.jsx';
import SingleFeature from './components/FeaturesCard/SingleFeature.jsx'; // Correct import
import Cart from './components/Cart/Cart.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='products' element={<Products />} />
      <Route path='products/:id' element={<SingleProduct />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='products/categories' element={<FeaturesCard />} />
      <Route path='products/categories/:name' element={<SingleFeature />} /> 
      <Route path='cart' element={<Cart/>}/>
      <Route 
        loader={githubInfoLoader}
        path='github' 
        element={<Github />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
