import React from 'react';
import { Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div>
        <h1>Recipe Manager</h1>
        <p>Create, Update and Delete your recipes</p>
        <Button variant='outline-success' onClick={(e) => {
            e.preventDefault();
            navigate('/all-recipes');
        }} >Manage Recipes</Button>
    </div>
  )
}

export default Home