import React, { useState, useEffect } from 'react';
import { Field, Form, Formik, useField} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL = 'https://puffpastrycrack.uk.r.appspot.com/';

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




function RecipeForm() {

    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();
    let params = useParams();

    function postRecipe(data){
        let res;
        let updateUrl = data.image? `/update-recipe/img/${params.id}` : `/update-recipe/${params.id}`;
        let full_url = params.id? updateUrl: '/add-recipe';
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        axios({
            method: 'post',
            url: baseURL+full_url,
            data: formData,
        })
        .then(response => {
            console.log(response)
            res = response;
        })
        .catch(error => {
            console.log(error)
        });
    
        return res;
    }

    useEffect(() => {

        const getRecipe = (id) => {
            axios.get(baseURL+`/get-recipe/${id}`)
              .then((response) => {
                console.log(response.data);
                setRecipe(response.data);
              })
              .catch((err) => {
                console.log(err)
              })
        };
    
        const effectHandler = (id) => {
            return id? getRecipe(id) : '';
        }

        effectHandler(params.id);
    }, [params.id]);

    return (
        <div>
            <Formik
                enableReinitialize={true}
                initialValues = {{
                    name: recipe?.name??'',
                    type: recipe?.type??'',
                    image: null,
                    description: recipe?.description??'',
                    ingredients: recipe?.ingredients?.join('\n')??'',
                    directions: recipe?.directions?.join('\n')??'',
                }}
                validationSchema={Yup.object({
                    name: Yup.string().required('Required'),
                    type: Yup.string().oneOf(['Pastry','Culinary'], 'Invalid Recipe Type')
                    .required('Required'),
                    
                    description: Yup.string().required('Required'),
                    ingredients: Yup.string().required('Required'),
                    directions: Yup.string().required('Required'),
                })}
                onSubmit = {values => {
                    console.log(JSON.stringify(postRecipe(values)));
                    navigate('/all-recipes')
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