import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

export default function Contact()
{
    const [emailValue, setEmailValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const validateEmail = (email) =>
    {
        return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const resetPassword = async (event) =>
    {
        event.preventDefault();
        if (!emailValue)
        {
            setErrorMessage("Please enter an email");
            return;
        }

        if(!validateEmail(emailValue))
        {
            setErrorMessage("Please enter a valid email");
            return;
        }

        const userData = {emailValue};
        try
        {
            const response = await axios.post("http://localhost:5000/api/users/forgotpassword", userData);
            setErrorMessage("");
            setSuccessMessage(response.data.message);
        }
        catch (error)
        {
            setErrorMessage(error.message);
        }

        setEmailValue("");
    };

    return (
        <div className="form-container">
            <div className="form">
                <h2>Forgot Your Password?</h2>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                {successMessage && <div className="success">{successMessage}</div>}
                <div className="form-control">
                    <label htmlFor="email"><span className="label">Email Address:</span></label>
                    <input type="email" name="email" value={emailValue} onChange={(event) => setEmailValue(event.target.value)}></input>
                </div>
                <button className="form-btn" disabled={!emailValue} onClick={resetPassword}>Reset Password</button>
                <span className="note" style={{marginTop: "20px"}}>
                    <span>
                        <Link to={"/signin"}>Sign In</Link>
                    </span>
                </span>
            </div>
        </div>
    );
}