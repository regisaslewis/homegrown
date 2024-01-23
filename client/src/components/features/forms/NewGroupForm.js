import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { getCurrentUser } from '../users/currentUserSlice';
import { addNewGroup } from '../groups/groupsSlice';

function NewGroupForm() {

    const history = useHistory();
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
            } catch (err) {
                console.error("Group not added", err)
            }
        }
    })

    return (
        <div>
            <h3>NewGroupForm goes here.</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Name:
                    <input name="name" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <b>{formik.errors.name}</b> : ""}
                </label>
                <label>Description:
                    <input name="description" value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description ? <b>{formik.errors.description}</b> : ""}
                </label>
                <input name="group_creator" defaultValue={formik.values.group_creator = currentUser.name} type='hidden' />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NewGroupForm