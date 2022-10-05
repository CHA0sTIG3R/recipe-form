import React from 'react';
import { Field, Form, Formik, useField} from 'formik';
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

function imageUploader(props){
    const {field, form} = props;

    const handleChange = async (e) => {
        const img = e.currentTarget.files[0];
        form.setFieldValue(field.name, img);
    };

    return (
        <div>
            <input type="file" onChange={(e) => handleChange(e)} />
        </div>
    );
}

function postRecipe(data){
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    axios({
        method: 'post',
        url: baseURL,
        data: formData,
    })
    .then(response => {
        console.log(response)
    })
    .catch(error => {
        console.log(error)
    });
}

function RecipeForm() {

    return (
        <div>
            <Formik
                initialValues = {{
                    name: '',
                    type: '',
                    image: null,
                    description: '',
                    ingredients: '',
                    directions: '',
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    type: Yup.string().oneOf(['Pastry','Culinary'], 'Invalid Recipe Type')
                    .required('Required'),
                    image: Yup.mixed().required('You gotta submit a file'),
                    description: Yup.string().required('Required'),
                    ingredients: Yup.string().required('Required'),
                    directions: Yup.string().required('Required'),
                })}
                onSubmit = {values => {
                    values.ingredients = values.ingredients.split(/\n/);
                    values.directions = values.directions.split(/\n/)
                    console.log(JSON.stringify(values, null, 2));
                    postRecipe(values);
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

                    <label>Recipe Image</label>
                    <Field name='image' component={imageUploader} />

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