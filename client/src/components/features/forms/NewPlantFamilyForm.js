import React from 'react'
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from "yup";

import { addNewPlantFamily, setFormVisibility } from '../plant_families/plantFamiliesSlice';

function NewPlantFamilyForm() {

    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must give a name.").min(3).max(22),
        description: yup.string().required("Descibe the family.").min(3),
        image: yup.string()
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            try {
                dispatch(addNewPlantFamily(values))
                dispatch(setFormVisibility())
            } catch (err) {
                console.error("Didn't add plant family", err)
            }
        }
    })

    return (
        <div>
            <h3>NewPlantFamilyForm goes here</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Name:
                    <input name="name" value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <b>{formik.errors.name}</b>: ""}
                </label>
                <label>Description:
                    <input name="description" value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description ? <b>{formik.errors.description}</b>: ""}
                </label>
                <label>Image:
                    <input name="image" value={formik.values.image} onChange={formik.handleChange} />
                </label>
                <button type='submit'>Submit</button>
            </form>
            </div>
    )
}

export default NewPlantFamilyForm;