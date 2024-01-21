import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { addNewUser } from "../users/usersSlice"


function Signup() {

    const history = useHistory();
    const dispatch = useDispatch();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a name.").min(4).max(16),
        climate: yup.string().required("Must enter a climate.").min(5),
        experience_level: yup.string().required("Must enter experience level."),
        password: yup.string().required("Must enter a password."),
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
                dispatch(addNewUser(values)).unwrap();
                history.push("/users")
            } catch (err) {
                console.error("Failed to add user", err)
            }
        }
    })

    return (
        <div>
            <h2>Signup Page</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} />
                <label>Climate:</label>
                <input name="climate" value={formik.values.climate} onChange={formik.handleChange} />
                <label>Experience Level:</label>
                <input name="experience_level" value={formik.values.experience_level} onChange={formik.handleChange} />
                <label>Password:</label>
                <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" />
                <label>Confirm Password:</label>
                <input name="confirmPassword" value={formik.values.confirmPassword} onChange={formik.handleChange} type="password" />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup;