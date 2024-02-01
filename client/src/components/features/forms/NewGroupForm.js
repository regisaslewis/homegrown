import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { getCurrentUser } from '../users/currentUserSlice';
import { addNewGroup, setFormVisibility } from '../groups/groupsSlice';

function NewGroupForm() {

    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUser);

    const formSchema = yup.object().shape({
        name: yup.string().required("Must give a group name.").min(4).max(22),
        description: yup.string().required("Say something about yourself!").min(6),
        group_creator: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            try {
                dispatch(addNewGroup(values))
                dispatch(setFormVisibility(false))
            } catch (err) {
                console.error("Group not added", err)
            }
        }
    })

    formik.values.group_creator = currentUser.name

    return (
        <div>
            <h3 className='formTitle'>Add a new Group.</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name ? <b>{formik.errors.name}</b> : ""}
                <label>Description:</label>
                <textarea name="description" value={formik.values.description} onChange={formik.handleChange} />
                {formik.errors.description ? <b>{formik.errors.description}</b> : ""}
                <button className='submitBut' type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewGroupForm