import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button} from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

const baseURL = 'https://puffpastrycrack.uk.r.appspot.com/';

function Recipes() {

    const location = useLocation();
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);

    const getRecipes = () => {
        axios.get(baseURL+'/get-recipes/All')
        .then((response) => {
            setRecipes(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const alertHandler = () =>{
        setShow(true);
        setTimeout(() => {
            setShow(false);
        }, 2000);
    }

    useEffect(() => {
        getRecipes();
        alertHandler();
    }, [])

    return (
        <div>
            {location.state? <Alert show={show} dismissible variant='success'>{location.state}</Alert> : ''}
            <h1>Recipes</h1>
            <Link to={'/manager/add'} className='btn btn-sm btn-success mb-2'>Add Recipe</Link>
            <table className='table table-striped'>
                <thead>
                    <tr >
                        <th style={{ width: '2.5%' }} className='table-dark'>#</th>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Type</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {recipes.length? recipes.map((recipe, index) => {
                        return (
                            <tr key={recipe.id}>
                                <th className='table-dark' scope="row">{index+1}</th>
                                <td>{recipe.name}</td>
                                <td>{recipe.type}</td>
                                <td style={{whiteSpace: 'nowrap'}}>
                                    <Link to={'/manager/edit/'+recipe.id} className='btn btn-sm btn-primary me-2'>Edit</Link>
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
                    }) :
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Recipes