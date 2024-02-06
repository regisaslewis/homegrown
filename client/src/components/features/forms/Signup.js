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
            group: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            try {
                dispatch(addNewUser(values));
                setTimeout(() => {
                    dispatch(loginUser({name: values.name, password: values.password}))
                    history.push("/")
                }, "1500")
            } catch (err) {
                console.error("Failed to add user", err)
            }
        }
    })

    return (
        <div id="signup" className="formContainer">
            <h2 className="formTitle">Signup</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} />
                {formik.errors.name ? <b style={{"color": "red"}}>{formik.errors.name}</b> : ""}
                <label>Climate:</label>
                <input name="climate" value={formik.values.climate} onChange={formik.handleChange} />
                {formik.errors.climate ? <b style={{"color": "red"}}>{formik.errors.climate}</b> : ""}                
                <label>Experience Level:</label>
                <input name="experience_level" value={formik.values.experience_level} onChange={formik.handleChange} />
                {formik.errors.experience_level ? <b style={{"color": "red"}}>{formik.errors.experience_level}</b> : ""}                
                <label>Password:</label>
                <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" />
                {formik.errors.password ? <b style={{"color": "red"}}>{formik.errors.password}</b> : ""}                
                <label>Confirm Password:</label>
                <input name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} type="password" />
                {formik.errors.confirmPassword ? <b style={{"color": "red"}}>{formik.errors.confirmPassword}</b> : ""}
                <button className="submitBut" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;