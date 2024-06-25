import axios from "axios";
import Header from "../components/Header";
import { useState } from "react";

export default function Contact()
{
    const [emailValue, setEmailValue] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const sendMessage = async (event) =>
    {
        event.preventDefault();
        try
        {
            const response = await axios.post("http://localhost:5000/api/contactus", data);
            setSubject("");
            setMessage("");
            setSuccessMessage(response.data.message);
        }
        catch (error)
        {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <Header></Header>
            <div className="form-container">
                <div className="form">
                    <h2>Contact Us</h2>
                    {errorMessage && <div className="fail">{errorMessage}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
                    <div className="form-control">
                        <label htmlFor="email"><span className="label">Email Address:</span></label>
                        <input type="email" name="email" value={emailValue} onChange={(event) => setEmailValue(event.target.value)}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="sub"><span className="label">Subject:</span></label>
                        <input type="text" name="sub" value={subject} onChange={(event) => setSubject(event.target.value)}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="message"><span className="label">Message:</span></label>
                        <textarea cols={45} rows={6} name="message" value={message} onChange={(event) => setMessage(event.target.value)}></textarea>
                    </div>
                    <button className="form-btn" disabled={!emailValue || !subject || !message} onClick={sendMessage}>Send</button>
                </div>
            </div>
        </>
    );
}