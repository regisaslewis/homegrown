import React  from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

function Login() {

    const history = useHistory();

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter a username."),
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
            
        }


    })
    return (
        <div>
            <h2>Login Page</h2>
        </div>
    )
}

export default Login;