import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const baseURL = 'https://puffpastrycrack.uk.r.appspot.com/'

function Recipes() {

    const [recipes, setRecipes] = useState([]);
    const getRecipes = () => {
        axios.get(baseURL+'/get-recipes/All')
        .then((response) => {
            setRecipes(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    useEffect(() => {
        getRecipes();
    }, [])

    return (
        <div>
            <h1>Recipes</h1>
            <Link to={'/add'} className='btn btn-sm btn-success mb-2'>Add Recipe</Link>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Type</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.map((recipe) => {
                        return (
                            <tr key={recipe.id}>
                                <td>{recipe.name}</td>
                                <td>{recipe.type}</td>
                                <td style={{whiteSpace: 'nowrap'}}>
                                    <Link to={'/edit/'+recipe.id} className='btn btn-sm btn-primary mr-1'>Edit</Link>
                                    <Button variant='btn btn-sm btn-danger'
                                        onClick={(e) => {
                                            e.preventDefault();
                                            axios.delete(baseURL+`/delete-recipe/${recipe.id}`)
                                                .then((response) => console.log(response))
                                                .catch((err) => console.log(err));
                                        }}
                                    >Delete</Button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Recipes