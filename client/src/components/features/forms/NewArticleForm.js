import React from'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { getCurrentUser } from '../users/currentUserSlice';
import { checkSession } from '../users/currentUserSlice';
import { addNewArticle, setNewFormVisibility } from '../articles/articlesSlice';

function NewArticleForm() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    function findOptions() {
        if (currentUser.articles) {
            let currentUserArticlePlants = currentUser.articles.map(e => e.plant_id)
            let po = currentUser.plants.filter(e => !currentUserArticlePlants.includes(e.id))
            if (po.length) {
                return po.map(e => <option key={e.id} value={Number(e.id)}>{e.name}</option>);
            } else {
                return <option>No New Plants</option>
            }
        }
    }

    const formSchema = yup.object().shape({
        success_rating: yup.number().positive().integer().required().min(1).max(5),
        body: yup.string().required("Please describe your care").min(5),
        likes: yup.number(),
        dislikes: yup.number(),
        user_id: yup.number(),
        plant_id: yup.number().positive().integer().required(),
    })

    const formik = useFormik({
        initialValues: {
            success_rating: 1,
            body: "",
            likes: 0,
            dislikes: 0,
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values, {resetForm}) => {
            if (values.plant_id) {
                try {
                    dispatch(addNewArticle(values))
                    dispatch(checkSession())
                    dispatch(setNewFormVisibility(false))
                } catch (err) {
                    console.error("Article did not post.", err)
                } finally {
                    resetForm();
                }
            } else {
                console.error("not a proper selection")
            }
        }
    })

    return (
        <div>
            <h3 className='formTitle'>NewArticleForm goes here</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Success Rating:</label>
                <select name="success_rating" type="number" value={formik.values.success_rating} onChange={formik.handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                <label>Body:</label>
                <textarea name='body' value={formik.values.body} onChange={formik.handleChange} />
                {formik.errors.body ? <b>{formik.errors.body}</b> : ""}
                <label>Pick a Plant:</label>
                <select type="number" name="plant_id" value={formik.values.plant_id} onChange={formik.handleChange}>
                    <option>Select a Plant:</option>
                    {findOptions()}
                </select>
                <button className='submitBut' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewArticleForm;