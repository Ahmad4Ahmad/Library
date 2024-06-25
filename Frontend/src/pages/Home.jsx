import Header from "../components/Header";
import Search from "../components/Search";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home()
{
    const [search, setSearch] = useState("");
    const [books, setBooks] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    useEffect(() =>
    {
        const getBooks = async () =>
        {
            try
            {
                const response = await axios.get("http://localhost:5000/api/books/");
                setBooks(response.data);
            }
            catch (error)
            {
                console.error(error);
            }
        };

        getBooks();
    }, []);

    const handleSearch = (event) =>
    {
        event.preventDefault();
        const filteredBooks = books.filter((book) =>
        {
            return book.title.toLowerCase().includes(search.toLowerCase()) || book.genre.toLowerCase().includes(search.toLowerCase());
        });
        setFilteredResults(filteredBooks);
    };

    return (
        <>
            <Header></Header>
            <Search value={search} onChange={(event) => setSearch(event.target.value)} onClick={handleSearch}></Search>
            {(search && filteredResults) ? 
            <div className="body">
                <p>{`Search Results: `}<span>{search.toLowerCase()}</span></p>
                <div className="grid-container">
                    {filteredResults.map((result) =>
                    (
                        <Link key={result._id} to={`/book/${result._id}`}><div><img src={result.cover.filePath} alt="cover" /><hr />{result.title}</div></Link>
                    ))}
                </div>
            </div> :
            <div className="main">
                <Carousel books={books}></Carousel>
                <Carousel books={books} genre="Thriller"></Carousel>
                <Carousel books={books} genre="Fantasy"></Carousel>
                <Carousel books={books} genre="Educational"></Carousel>
                <Carousel books={books} genre="Comics"></Carousel>
            </div>}
            <Footer></Footer>
        </>
    );
}

export default Home;