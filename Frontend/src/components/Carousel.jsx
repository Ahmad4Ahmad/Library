import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import "./Carousel.css";

export default function Carousel(props)
{
    const scrollContainerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isAtEnd, setIsAtEnd] = useState(false);
    const handleNextClick = (scrollAmount) =>
    {
        if (scrollContainerRef.current) 
        {
            scrollContainerRef.current.scrollLeft += scrollAmount;
        }

        setScrollPosition(scrollContainerRef.current.scrollLeft);
    };

    useEffect(() => 
    {
        // Update the scroll position and check if at the end when the scroll position changes
        if (scrollContainerRef.current)
        {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setScrollPosition(scrollLeft);
            setIsAtEnd(scrollLeft === scrollWidth - clientWidth);
        }
    }, [scrollPosition]);

    return (
        <div>
            <section>
                <header className="carousel-header">
                    <div className="carousel-title">
                        <span>{props.genre ? props.genre : "New release"}</span>
                    </div>
                </header>
                <div className="carousel-container">
                    <div className="carousel" ref={scrollContainerRef}>
                    {props.genre ? (
                            // If props.genre exists, render filteredBooks
                            props.books
                            .filter((book) => book.genre.toLowerCase() === props.genre.toLowerCase())
                            .map((book) => (
                                <div key={book._id} className="carousel-item-card">
                                    <div className="carousel-item">
                                        <Link to={`/book/${book._id}`}>
                                            <img className="item-img" src={book.cover.filePath} alt="cover" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        ) : (
                            // Otherwise, render all books
                            props.books.map((book) => (
                                <div key={book._id} className="carousel-item-card">
                                    <div className="carousel-item">
                                        <Link to={`/book/${book._id}`}>
                                            <img className="item-img" src={book.cover.filePath} alt="cover" />
                                        </Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                    <div className={`arow arow-left ${scrollPosition === 0 ? "arrow-hidden" : ""}`} onClick={() => handleNextClick(-1000)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L9.83 12z" />
                        </svg>
                    </div>
                    <div className={`arow arow-right ${isAtEnd === true ? "arrow-hidden" : ""}`} onClick={() => handleNextClick(1000)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L14.17 12z" />
                        </svg>
                    </div>
                </div>
            </section>
        </div>
    );
}