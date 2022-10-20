import React from 'react';
import {Route, Routes} from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import Home from './Home';
import Recipes from './Recipes';

function Pages() {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/all-recipes' element={<Recipes/>} />
        <Route path='/add' element={<RecipeForm/>} />
        <Route path='/edit/:id' element={<RecipeForm/>} />
    </Routes>
  )
}

export default Pages