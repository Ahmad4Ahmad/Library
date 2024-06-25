import Header from "../components/Header";
import Footer from "../components/Footer";
import PdfModal from "../components/PdfModal";
import ConfirmationModal from "../components/ConfirmationModal";
import axios from "axios";
import fileDownload from "js-file-download";
import { useToken } from "../auth/useToken";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./Book.css";

function Book()
{
    const [token] = useToken();
    const [review, setReview] = useState("");
    const [reviewToDelete, setReviewToDelete] = useState("");
    const [currentBook, setCurrentBook] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
    const {bookId} = useParams();
    const url = "http://localhost:5000/" + currentBook.pdf?.fileUrl.replace(/\\/g, '/');
    const options = 
    {
        year: "numeric",
        month: "long",
        day: "numeric",
    };

    useEffect(() => 
    {
        const getSingleBook = async () =>
        {
            try
            {
                const response = await axios.get(`http://localhost:5000/api/books/${bookId}`);
                setCurrentBook(response.data);
            }
            catch (error)
            {
                console.log(error);
            }
        };

        getSingleBook();
    }, [bookId]);

    const downloadFile = async () =>
    {
        try
        {
            const response = await axios.get(url, {responseType: "blob"});
            fileDownload(response.data, currentBook.pdf.fileName);
        }
        catch (error)
        {
            console.error(error);
        }
    };

    const sendReview = async (event) =>
    {
        event.preventDefault();
        try
        {
            const response = await axios.put("http://localhost:5000/api/books/addreview", {bookid: currentBook._id, review}, {headers: {Authorization: token}});
            setCurrentBook(response.data);
            setReview("");
        }
        catch (error)
        {
            console.error(error)
        }
    };

    const handleDelete = (reviewId) =>
    {
        setOpenConfirmationModal(true);
        setReviewToDelete(reviewId);
    };

    const deleteReview = async () =>
    {
        try 
        {
            const response = await axios.put("http://localhost:5000/api/books/deletereview", {bookId: currentBook._id, reviewId: reviewToDelete}, {headers: {Authorization: token}});
            setCurrentBook(response.data);
            setOpenConfirmationModal(false);
        }
        catch (error)
        {
            console.error(error);
        }
    };
   
    return (
        <div className="book">
            <Header></Header>
            <div className="top">
                <div className="poster-card">
                    <img className="poster shadow" src={currentBook?.cover?.filePath} alt="cover" />
                </div>
                <div className="title-card">
                    <h1 className="title"><span>{currentBook.title}</span></h1>
                    <div className="details-card">
                        <div className="author detail">author: <Link to={`/library/${currentBook?.author?.toLowerCase()}`}><span>{currentBook.author}</span></Link></div>
                        <div className="detail">Language: <span>{currentBook.language}</span></div>
                        <div className="detail">Publisher: <span>{currentBook.publisher}</span></div>
                        <div className="detail">Published on: <span>{new Date(currentBook.date).toLocaleString("en-US", options)}</span></div>
                        <div className="detail">Genre: <span>{currentBook.genre}</span></div>
                    </div>
                </div>
                <div className="pages-card">
                    <div className="pages">
                        <div className="number">{currentBook.pages}</div>
                        <div className="word">pages</div>
                    </div>
                </div>
                <div className="btns">
                    <button className="book-btn" onClick={() => setOpenModal(true)}>Read</button>
                    <button className="alt book-btn" onClick={downloadFile}>Download</button>
                </div>
            </div>
            <div className="bottom">
                <div className="about">
                    <h2 className="about-header">About this book</h2>
                    <div className="about-body" style={{color: "rgb(95,99,104)"}}>{currentBook.description}</div>
                </div>
                <div className="review-form">
                    <div className="form-control">
                        <label htmlFor="review"><span className="label">Add Review:</span></label>
                        <textarea rows={6} name="review" value={review} onChange={(event) => setReview(event.target.value)}></textarea>
                    </div>
                    <button className="form-btn" disabled={!review} onClick={sendReview}>Add Review</button>
                </div>
                <div className="reviews">
                    <h2 className="reviews-header">Reviews</h2>
                    <div className="reviews-number">{currentBook.reviews?.length} reviews</div>
                    <div className="reviews-list">
                        {currentBook.reviews?.map((review) =>
                        {
                            return (
                                <div key={review._id} className="review">
                                    <div className="review-header">
                                        <img src={review.user.photo} alt="user-" className="user-img" />
                                        <div className="user-name">{review.user.name}</div>
                                    </div>
                                    <span className="review-date" style={{ display: 'inline-block' }}>
                                        {new Date(review.createdAt).toLocaleString("en-US")}
                                        <svg onClick={() => handleDelete(review._id)} xmlns="http://www.w3.org/2000/svg" className="delete" height="20" viewBox="0 150 960 960" width="20" cursor={"pointer"} style={{ verticalAlign: 'middle', marginLeft: '50px' }}>
                                            <path fill="red" d="M261 936q-24.75 0-42.375-17.625T201 876V306h-41v-60h188v-30h264v30h188v60h-41v570q0 24-18 42t-42 18H261Zm438-630H261v570h438V306ZM367 790h60V391h-60v399Zm166 0h60V391h-60v399ZM261 306v570-570Z"/>
                                        </svg>
                                    </span>
                                    <div className="review-body">
                                        {review.text}
                                        <hr />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            {openModal && <PdfModal setOpenModal={setOpenModal} pdfUrl={"http://localhost:5000/" + currentBook.pdf?.fileUrl.replace(/\\/g, '/')}></PdfModal>}
            {openConfirmationModal && <ConfirmationModal message={"Are you sure you want to delete this review?"} title={"Delete Review"} delete={deleteReview} setOpenModal={setOpenConfirmationModal}></ConfirmationModal>}
            <Footer></Footer>
        </div>
    );
}

export default Book;