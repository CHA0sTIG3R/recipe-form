import React from 'react';
import { Field, Form, Formik, useField } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

const baseURL = 'http://localhost:8080/add-recipe';

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <div>{meta.error}</div>
            ): null}
        </div>
    );
};

function postRecipe(name, type, description, ingredients, directions){
    const Full_URL = `${baseURL}?name=${name}&type=${type}&description=${description}&ingredients=${ingredients}&directions=${directions}` ;
    axios.post(Full_URL).then(response => {
        console.log(response)
    });
}

function RecipeForm() {

    return (
        <div>
            <Formik
                initialValues = {{
                    name: '',
                    type: '',
                    description: '',
                    ingredients: '',
                    directions: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    type: Yup.string().oneOf(['Pastry','Culinary'], 'Invalid Recipe Type')
                    .required('Required'),
                    ingredients: Yup.string().required('Required'),
                    directions: Yup.string().required('Required'),
                })}
                onSubmit = {values => {
                    values.ingredients = values.ingredients.trim().split(',');
                    values.directions = values.directions.split(',')
                    console.log(JSON.stringify(values, null, 2));
                    postRecipe(values.name, values.type, values.ingredients, values.directions);
                }}>
                <Form>
                    <label>Recipe Name</label>
                    <Field
                        label='Recipe Name'
                        name='name'
                    />

                    <label>Recipe Type</label>
                    <Field label='Type' name='type' as='select' htmlFor='type'>
                        <option value=''>Select Recipe Type</option>
                        <option value='Pastry'>Pastry</option>
                        <option value='Culinary'>Culinary</option>
                    </Field>

                    <MyTextArea 
                        label='Description'
                        name='description'
                    />

                    <MyTextArea 
                        label='Ingredients'
                        name='ingredients'
                    />
                    
                    <MyTextArea 
                        label='Directions'
                        name='directions'
                    />
                    <button type='submit'>Submit</button>
                </Form>
            </Formik>
        </div>
    )
}

export default RecipeForm