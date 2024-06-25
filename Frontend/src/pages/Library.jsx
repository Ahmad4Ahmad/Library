import axios from "axios";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Library.css";

function Library()
{
    const [books, setbooks] = useState([]);
    const {author} = useParams();
    useEffect(() =>
    {
        const getBooksByAuthor = async () =>
        {
            const response = await axios.get(`http://localhost:5000/api/books/getbooksbyauthor/${author}`);
            setbooks(response.data);
        }

        getBooksByAuthor();
    }, [author]);

    return (
        <>
            <Header></Header>
            <div className="body">
                <p>{author+"'s Books" }</p>
                <div className="grid-container">
                    {books.map((book) =>
                    {
                        return (<Link key={book._id} to={`/book/${book._id}`}><div><img src={book.cover.filePath}></img><hr />{book.title}</div></Link>);
                    })}
                </div>
            </div>
        </>
    );
}

export default Library;