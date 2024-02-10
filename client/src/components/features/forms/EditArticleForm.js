import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { selectArticleById, editArticle, deleteArticle, setEditFormVisibility } from '../articles/articlesSlice';
import { useFormik } from 'formik';
import * as yup from "yup";

function EditArticleForm({articleItem}) {
    
    const { id } = articleItem;
    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();
    const article = useSelector((state) => selectArticleById(state, Number(id)))

    function handleCancel() {
        dispatch(setEditFormVisibility(0));
    }

    const formSchema = yup.object().shape({
        success_rating: yup.number().positive().integer().required().min(1).max(5),
        body: yup.string().required().min(5)
    });

     const formik = useFormik({
        initialValues: {
            success_rating: article.success_rating,
            body: article.body,
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            try {
                dispatch(editArticle(values))
                dispatch(setEditFormVisibility(0))
            } catch (err) {
                console.error("Could not edit", err)
            }
        }
     })
     formik.values.id = article.id;
     formik.values.user_id = article.user.id;
     formik.values.plant_id = article.plant.id;
     formik.values.likes = article.likes;

     function handleDelete() {
        dispatch(deleteArticle({id: id}));
        if (location.pathname !== "/articles/") {
            history.goBack();
        }        
     }
     
    return (
        <div className='editFormContainer'>
            <h3 className='formTitle'>Corrections, Updates, Etc.</h3>
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
                <button className='submitBut' type="submit">Edit</button>
            </form>
            <div className="editExitButtons">
                <button onClick={() => handleCancel()}>Cancel</button>
                <button className='delete' onClick={handleDelete}>Delete Article</button>
            </div>
        </div>
    )
}

export default EditArticleForm