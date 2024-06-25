import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";
import "./AddBook.css";

const initialState =
{
    title: "",
    language: "",
    author: "",
    publisher: "",
    date: "",
    genre: "",
    pages: ""
};

function AddBook()
{
    const [token] = useToken();
    const [book, setBook] = useState(initialState);
    const [bookCover, setBookCover] = useState("");
    const [bookPdf, setBookPdf] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {title, language, author, publisher, date, genre, pages} = book;
    const navigate = useNavigate();
    const handleInputChange = (event) => 
    {
        const {name, value} = event.target;
        if (name === "description")
        {
            setDescription(value);
        }
        else
        {
            setBook({...book, [name]: value.toLowerCase()});
        }
    };

    const handleImageChange = (event) =>
    {
        setBookCover(event.target.files[0]);
    };

    const handlePdfChange = (event) => 
    {
        setBookPdf(event.target.files[0]);
    };      

    const saveBook = async (event) =>
    {
        event.preventDefault();
        const formData = new FormData();
        formData.append("pdf", bookPdf);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("cover", bookCover);
        formData.append("language", language);
        formData.append("author", author);
        formData.append("publisher", publisher);
        formData.append("date", date);
        formData.append("genre", genre);
        formData.append("pages", pages);
        try 
        {    
            await axios.post("http://localhost:5000/api/books/", formData, {headers: {"Content-Type": "multipart/form-data", Authorization: token}});
            navigate("/profile");
        } 
        catch (error) 
        {
            setErrorMessage(error.massage);    
        }
    };

    return (
        <div>
            <form onSubmit={saveBook}>
                <div className="form-edit">
                    {errorMessage && <div className="fail">{errorMessage}</div>}
                    <div className="form-control" style={{marginBottom: "20px"}}>
                        <label htmlFor="book"><span className="label">Book:</span></label>
                        <input accept=".pdf" type="file" name="book" onChange={handlePdfChange} style={{marginBottom: "0px"}}></input>
                        <span className="support">Supported files: PDF</span>
                    </div>
                    <div className="form-control">
                        <label htmlFor="title"><span className="label">Title:</span></label>
                        <input type="text" name="title" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="language"><span className="label">Book Language:</span></label>
                        <input type="text" name="language" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="author"><span className="label">Author:</span></label>
                        <input type="text" name="author" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="publisher"><span className="label">Publisher:</span></label>
                        <input type="text" name="publisher" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="genre"><span className="label">Genre:</span></label>
                        <input type="text" name="genre" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pages"><span className="label">Number of Pages:</span></label>
                        <input type="text" name="pages" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date"><span className="label">Published On:</span></label>
                        <input type="date" name="date" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description"><span className="label">Description:</span></label>
                        <textarea rows="4" name="description" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="cover"><span className="label">Cover:</span></label>
                        <input type="file" id="cover" name="cover" onChange={handleImageChange}></input>
                    </div>
                    <div className="btn-edit">
                        <button type="submit">Add Book</button>
                    </div>
                    <div className="footer"></div>
                </div>
            </form>
        </div>
    );
}

export default AddBook;