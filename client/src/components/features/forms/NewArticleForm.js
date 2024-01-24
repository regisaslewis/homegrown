import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { getCurrentUser } from '../users/currentUserSlice';
import { selectAllPlants } from '../plants/plantsSlice';
import { addNewArticle } from '../articles/articlesSlice';

function NewArticleForm() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);
    const allPlants = useSelector(selectAllPlants)

    const plantOptions = allPlants.map(e => <option key={e.id} value={e.id}>{e.name}</option>)

    const formSchema = yup.object().shape({
        success_rating: yup.number().required().min(1).max(5),
        body: yup.string().required("Please describe your care").min(5),
        likes: yup.number(),
        user_id: yup.number(),
        plant_id: yup.number(),
    })

    const formik = useFormik({
        initialValues: {
            success_rating: 1,
            body: "",
            likes: 0,
            user_id: 0,
            plant_id: 1,
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            try {
                dispatch(addNewArticle(values))
            } catch (err) {
                console.error("Article did not post.", err)
            }
        }
    })

    formik.values.user_id = currentUser.id

    return (
        <div>
            <h3>NewArticleForm goes here</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Success Rating:
                    <select name="success_rating" type="number" value={formik.values.success_rating} onChange={formik.handleChange}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </label>
                <label>Body:
                    <textarea name='body' value={formik.values.body} onChange={formik.handleChange} />
                    {formik.errors.body ? <b>{formik.errors.body}</b> : ""}
                </label>
                <label>Pick a Plant:
                    <select name="plant_id" value={formik.values.plant_id} onChange={formik.handleChange}>
                        {plantOptions}    
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewArticleForm