import React from 'react';
import {Route, Routes} from 'react-router-dom';
import RecipeForm from '../components/RecipeForm';
import Home from './Home';
import Recipes from './Recipes';

function Pages() {
  return (
    <div className='container pt-4 pb-4'>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/manager' element={<Recipes/>} />
          <Route path='/manager/add' element={<RecipeForm/>} />
          <Route path='/manager/edit/:id' element={<RecipeForm/>} />
      </Routes>
    </div>
  )
}

export default Pages