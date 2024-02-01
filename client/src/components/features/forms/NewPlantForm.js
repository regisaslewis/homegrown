import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Formik, useFormik } from 'formik';
import * as yup from "yup";

import { addNewPlant } from '../plants/plantsSlice';
import { selectAllPlantFamilies, setFormVisibility } from '../plant_families/plantFamiliesSlice';

function NewPlantForm() {

    const dispatch = useDispatch();
    const allPlantFamilies = useSelector(selectAllPlantFamilies)

    const familyOptions = allPlantFamilies.map(e => <option key={e.id} value={e.id}>{e.name}</option>)

    const formSchema = yup.object().shape({
        name: yup.string().required("Name is necessary.").min(4).max(26),
        description: yup.string().required("Description is necessary.").min(4),
        image: yup.string(),
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            image: "",
            family_id: 1,
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit:(values) => {
            try {
                dispatch(addNewPlant(values))
                dispatch(setFormVisibility());
            } catch (err) {
                console.error("Did not add new Plant.", err)
            }
        }
    })
    
    return (
        <div>
            <h3>NewPlantForm goes here</h3>
            <form autoComplete='off' onSubmit={formik.handleSubmit}>
                <label>Name:
                    <input name='name' value={formik.values.name} onChange={formik.handleChange} />
                    {formik.errors.name ? <b>{formik.errors.name}</b>: ""}
                </label>
                <label>Description:
                    <input name='description' value={formik.values.description} onChange={formik.handleChange} />
                    {formik.errors.description ? <b>{formik.errors.description}</b>: ""}
                </label>
                <label>Image:
                    <input name='image' value={formik.values.image} onChange={formik.handleChange} />
                    {formik.errors.image ? <b>{formik.errors.image}</b>: ""}
                </label>
                <label>Plant Family:
                <select name="family_id" type="number" value={formik.values.family_id} onChange={formik.handleChange}>
                    {familyOptions}
                </select>
                </label>
                <button type="submit">Submit</button>
            </form>
            <p>______________________</p>
        </div>
    )
}

export default NewPlantForm