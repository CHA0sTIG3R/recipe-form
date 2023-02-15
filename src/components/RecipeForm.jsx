import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, Formik, useField} from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const baseURL = 'https://backend-dot-puffpastrycrack.uk.r.appspot.com';

const MyTextArea = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label className='form-label' htmlFor={props.id || props.name}>{label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <ErrorMessage name={props.name} component={'div'} className='invalid-feedback'/>
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
        <input className={'form-control' + (form.errors.ingredients && form.touched.ingredients ? ' is-invalid' : '')} type="file" onChange={(e) => handleChange(e)} />
    );
}


function RecipeForm() {

    const [recipe, setRecipe] = useState({});
    const navigate = useNavigate();
    let params = useParams();

    async function postRecipe(data, setSubmitting){
        let updateUrl = data.image? `/update-recipe/img/${params.id}` : `/update-recipe/${params.id}`;
        let full_url = params.id? updateUrl: '/add-recipe';
        const formData = new FormData();
        Object.keys(data).forEach(key => formData.append(key, data[key]));
        await axios({
            method: 'post',
            url: baseURL+full_url,
            data: formData,
        })
        .then(response => {
            navigate('/manager', {state : response.data});
            setSubmitting(true)
        })
        .catch(error => {
            setSubmitting(false)
            console.log(error);
        });
    }

    useEffect(() => {

        const getRecipe = (id) => {
            axios.get(baseURL+`/get-recipe/${id}`)
              .then((response) => {
                
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
                validationSchema={Yup.object().shape({
                    name: Yup.string().required('Required'),
                    type: Yup.string().oneOf(['Pastry','Culinary'], 'Invalid Recipe Type')
                    .required('Required'),
                    image:Yup.mixed().when('params.id', {
                        is: params.id,
                        then: Yup.mixed().required('Required'),
                        }),
                    description: Yup.string().required('Required'),
                    ingredients: Yup.string().required('Required'),
                    directions: Yup.string().required('Required'),
                })}
                onSubmit = {(values, {setSubmitting}) => {
                    postRecipe(values, setSubmitting);
                }}>
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <div className='row pt-4 mb-4'>
                                <div className='form-group col-4'>
                                    <label htmlFor='name' className='form-label'>Recipe Name</label>
                                    <Field
                                        className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')}
                                        name='name'
                                    />
                                    <ErrorMessage name='name' component={'div'} className='invalid-feedback'/>
                                </div>
                                
                                <div className='form-group col'>
                                    <label htmlFor='type' className='form-label'>Recipe Type</label>
                                    <Field name='type' as='select' className={'form-select' + (errors.type && touched.type ? ' is-invalid' : '')}>
                                        <option value=''>Select Recipe Type</option>
                                        <option value='Pastry'>Pastry</option>
                                        <option value='Culinary'>Culinary</option>
                                    </Field>
                                    <ErrorMessage name='type' component={'div'} className='invalid-feedback'/>
                                </div>

                                <div className='form-group col'>
                                    <label htmlFor='image' className='form-label'>Recipe Image</label>
                                    <Field name='image' component={imageUploader} />
                                    <ErrorMessage name='image' component={'div'} className='invalid-feedback'/>
                                </div>
                            </div>

                            <div className='row mb-4'>
                                <div className='form-group col-7 mb-4'>
                                    <MyTextArea 
                                        className={'form-control' + (errors.description && touched.description ? ' is-invalid' : '')}
                                        label='Description'
                                        name='description'
                                        rows={3}
                                    />
                                </div>

                                <div className='form-group col-7'>
                                    <MyTextArea 
                                        className={'form-control' + (errors.ingredients && touched.ingredients ? ' is-invalid' : '')}
                                        label='Ingredients'
                                        name='ingredients'
                                        rows={5}
                                    />
                                </div>
                            </div>
                            
                            <div className='form-row mb-4'>
                                <div className='form-group col-7'>
                                    <MyTextArea 
                                        className={'form-control' + (errors.directions && touched.directions ? ' is-invalid' : '')}
                                        label='Directions'
                                        name='directions'
                                        rows={6}
                                    />
                                </div>
                            </div>
                            <div>
                                <Button disabled={isSubmitting} type='submit'>
                                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Save
                                </Button>
                                <Button variant='danger m-2' as={Link} to={params.id? './../..': './..'} >Cancel</Button>
                            </div>
                        </Form>
                    )}
            </Formik>
        </div>
    )
}

export default RecipeForm