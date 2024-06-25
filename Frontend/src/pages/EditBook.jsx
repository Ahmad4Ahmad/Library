import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";

function EditBook()
{
    const initialState =
    {
        title: "",
        language: "",
        author: "",
        publisher: "",
        date: "",
        genre: "",
        pages: "",
        description: ""
    };

    const [token] = useToken();
    const [book, setBook] = useState(initialState);
    const [bookCover, setBookCover] = useState("");
    const [bookPdf, setBookPdf] = useState("");
    const [description, setDescription] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const {bookId} = useParams();
    const navigate = useNavigate();
    useEffect(() => 
    {
        const getSingleBook = async () =>
        {
            try
            {
                const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
                setBook(response.data);
            }
            catch (error)
            {
                console.error(error);
            }
        };

        getSingleBook();
    }, [bookId]);

    const handlePdfChange = (event) => 
    {
        setBookPdf(event.target.files[0]);
    };      

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

    const saveBook = async (event) =>
    {
        event.preventDefault();
        const formData = new FormData();
        formData.append("title", book?.title);
        formData.append("language", book.language);
        formData.append("author", book.author);
        formData.append("publisher", book.publisher);
        formData.append("date", book.date);
        formData.append("genre", book.genre);
        formData.append("pages", book.pages);
        if (description) 
        {
            formData.append("description", description);
        }
        else
        {
            formData.append("description", book.description);
        }

        if (bookPdf)
        {
            formData.append("pdf", bookPdf);
        }

        if (bookCover)
        {
            formData.append("cover", bookCover);
        }

        try 
        {    
            await axios.patch(`http://localhost:5000/api/books/${bookId}`, formData, {headers: {"Content-Type": "multipart/form-data", Authorization: token}});
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
                <h2>Edit Book</h2>
                <div className="form-edit">
                    {errorMessage && <div className="fail">{errorMessage}</div>}
                    <div className="form-control" style={{marginBottom: "20px"}}>
                        <label htmlFor="book"><span className="label">Book:</span></label>
                        <input accept=".pdf" type="file" name="book" onChange={handlePdfChange} style={{marginBottom: "0px"}}></input>
                        <span className="support">Supported files: PDF</span>
                    </div>
                    <div className="form-control">
                        <label htmlFor="title"><span className="label">Title:</span></label>
                        <input value={book?.title} type="text" name="title" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="language"><span className="label">Book Language:</span></label>
                        <input value={book?.language} type="text" name="language" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="author"><span className="label">Author:</span></label>
                        <input value={book?.author} type="text" name="author" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="publisher"><span className="label">Publisher:</span></label>
                        <input value={book?.publisher} type="text" name="publisher" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="genre"><span className="label">Genre:</span></label>
                        <input value={book?.genre} type="text" name="genre" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pages"><span className="label">Number of Pages:</span></label>
                        <input value={book?.pages} type="text" name="pages" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="date"><span className="label">Published On:</span></label>
                        <input value={book?.date} type="date" name="date" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="description"><span className="label">Description:</span></label>
                        <textarea value={book?.description} rows="4" name="description" onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-control">
                        <label htmlFor="cover"><span className="label">Cover:</span></label>
                        <input type="file" id="cover" name="cover" onChange={handleImageChange}></input>
                    </div>
                    <div className="btn-edit">
                        <button type="submit">Edit Book</button>
                    </div>
                    <div className="footer"></div>
                </div>
            </form>
        </div>
    );
}

export default EditBook