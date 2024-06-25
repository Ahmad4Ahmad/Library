import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";

const initialState =
{
    oldPassword: "",
    password: "",
    password1: ""
};

function ChangePassword()
{
    const [token] = useToken();
    const [formData, setFormData] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState("");
    const {oldPassword, password, password1} = formData;
    const navigate = useNavigate();
    const handleInputChange = (event) =>
    {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const changePass = async (event) =>
    {
        event.preventDefault();
        if (password !== password1)
        {
            setErrorMessage("New passwords do not match");
        }

        const formData = 
        {
            oldPassword,
            password
        };

        try
        {
            await axios.patch("http://localhost:5000/api/users/changepassword", formData, {headers: {Authorization: token}});
            navigate("/profile");
        }
        catch (error)
        {
            setErrorMessage(error.message);
        }
    }

    return (
        <div className="form-container">
            <form onSubmit={changePass}>
                <div className="form">
                    <h2>Change password</h2>
                    {errorMessage && <div className="fail">{errorMessage}</div>}
                    <div className="form-control">
                        <label htmlFor="oldpassword"><span className="label">Old password:</span></label>
                        <input value={formData.oldPassword} type="password" name="oldPassword" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password"><span className="label">New password:</span></label>
                        <input value={formData.password} type="password" name="password" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="password1"><span className="label">Confirm new password:</span></label>
                        <input value={formData.password1} type="password" name="password1" onChange={handleInputChange}></input>
                    </div>
                    <button className="form-btn" type="submit">Confirm</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword;