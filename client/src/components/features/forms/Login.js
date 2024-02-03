import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";

import { selectAllUsers } from "../users/usersSlice";
import { loginUser } from "../users/currentUserSlice";
import { selectAllGroups, setGroups, fetchGroups } from "../groups/groupsSlice";

function Login() {

    const history = useHistory();
    const dispatch = useDispatch();
    const allUsers = useSelector(selectAllUsers)
    const allUserNames = allUsers.map(e => e.name)
    const allGroups = useSelector(selectAllGroups)

    const formSchema = yup.object().shape({
        name: yup.string().test({ message: () => "Not a registered user.", test(value) {return allUserNames.includes(value)}}).required("Must enter a username."),
        password: yup.string().required("Must enter a password.")
    })
    
    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            try {
                if (allUserNames.includes(formik.values.name)) {
                    dispatch(loginUser(values));
                    dispatch(fetchGroups())
                    dispatch(setGroups(allGroups))
                    history.push("/")
                }
            } catch (err) {
                console.error("failed to log in", err)
            }
        }

    })
    return (
        <div id="login" className="formContainer">
            <h2 className="formTitle">Login</h2>
            <form autoComplete="off" onSubmit={formik.handleSubmit}>
                <label>Name:</label>
                <input name="name" value={formik.values.name} onChange={formik.handleChange} />                
                {formik.errors.name ? <p style={{"color": "red"}}>{formik.errors.name}</p> : ""}
                <label>Password:</label>
                <input name="password" value={formik.values.password} onChange={formik.handleChange} type="password" />
                {formik.errors.password ? <p style={{"color": "red"}}>{formik.errors.password}</p> : ""}
                <button className="submitBut" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Login;