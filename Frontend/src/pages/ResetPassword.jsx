import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const initialState = 
{
    password: "",
    password1: ""
};

function ResetPassword()
{
    const [formData, setFormData] = useState(initialState);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {password, password1} = formData;
    const {resetToken} = useParams();
    const handleInputChange = (event) => 
    {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const reset = async (event) =>
    {
        event.preventDefault();
        if (password.length < 6)
        {
            setErrorMessage("Password must be more the 6 characters");
            return;
        }

        if (password !== password1)
        {
            setErrorMessage("Passwords do not match");
            return;
        }

        const userData =
        {
            password,
            password1
        };

        try
        {
            const response = await axios.put(`http://localhost:5000/api/users/resetpassword/${resetToken}`, userData);
            setErrorMessage("");
            setFormData(initialState);
            setSuccessMessage(response.data.message);
        }
        catch (error)
        {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={reset}>
                <div className="form">
                    <h2>Reset password</h2>
                    {errorMessage && <div className="fail">{errorMessage}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
                    <div className="form-control">
                        <label htmlFor="password"><span className="label">New password:</span></label>
                        <input value={formData.password} type="password" name="password" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password1"><span className="label">Confirm new password:</span></label>
                        <input value={formData.password1} type="password" name="password1" onChange={handleInputChange}></input>
                    </div>
                    <button className="form-btn" type="submit">Reset password</button>
                </div>
            </form>
        </div>
    );
}

export default ResetPassword;