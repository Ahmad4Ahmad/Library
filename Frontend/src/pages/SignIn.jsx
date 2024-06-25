import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToken } from "../auth/useToken";
import "./SignIn.css";

export default function SignIn()
{
    const [token, setToken] = useToken();
    const [email, setEmailValue] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const onSignIn = async (event) =>
    {
        event.preventDefault();
        const userData = {email, password};
        try
        {
            const response = await axios.post("http://localhost:5000/api/users/signin", userData, {withCredentials: true, credentials: 'include'});
            const {token} = response.data;
            setToken(token);
            navigate("/");
        }
        catch(error)
        {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="form-container">
            <div className="form">
                <h2>Sign In</h2>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <div className="form-control">
                    <label htmlFor="email"><span className="label">Email Address:</span></label>
                    <input type="email" name="email" value={email} onChange={(event) => setEmailValue(event.target.value)}></input>
                </div>
                <div className="form-control">
                    <label htmlFor="pass"><span className="label">Password:</span></label>
                    <input type="password" name="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
                </div>
                <button className="form-btn" disabled={!email || !password} onClick={onSignIn}>Sign in</button>
                <span className="note">
                    <span>
                        Don't have an account?&nbsp;
                        <Link to={"/Register"}>Register</Link>
                    </span>
                </span>
                <span className="note" style={{marginTop: "5px"}}>
                    <span>
                        <Link to={"/forgot-password"}>Forgot your password?</Link>
                    </span>
                </span>
            </div>
        </div>
    );
}