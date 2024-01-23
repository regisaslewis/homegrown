import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { addNewUser } from "../users/usersSlice";
import { loginUser } from "../users/currentUserSlice";


function Signup() {

    const history = useHistory();
    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name.").min(4).max(16),
        climate: yup.string().required("Must enter a climate.").min(3),
        experience_level: yup.string().required("Must enter experience level."),
        password: yup.string().required("Must enter a password.").min(5).max(20),
        confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match.").required("Passwords must match.")
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            climate: "",
            experience_level: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
                try {
                dispatch(addNewUser(values));
                dispatch(loginUser({name: values.name, password: values.password}))
                history.push("/")
            } catch (err) {
                console.error("Failed to add user", err)
            }
        }
    })

    return (
        <div>
            <h2>Signup Page</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Name:<input name="name" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name ? <b style={{"color": "red"}}>{formik.errors.name}</b> : ""}</label>
                <label>Climate:<input name="climate" value={formik.values.climate} onChange={formik.handleChange} />
                {formik.errors.climate ? <b style={{"color": "red"}}>{formik.errors.climate}</b> : ""}</label>                
                <label>Experience Level:<input name="experience_level" value={formik.values.experience_level} onChange={formik.handleChange} />
                {formik.errors.experience_level ? <b style={{"color": "red"}}>{formik.errors.experience_level}</b> : ""}</label>                
                <label>Password:<input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" />
                {formik.errors.password ? <b style={{"color": "red"}}>{formik.errors.password}</b> : ""}</label>                
                <label>Confirm Password:<input name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} type="password" />
                {formik.errors.confirmPassword ? <b style={{"color": "red"}}>{formik.errors.confirmPassword}</b> : ""}</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;