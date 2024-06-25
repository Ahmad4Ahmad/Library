import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About()
{
    return (
        <>
            <Header></Header>
            <br></br>
            <br></br>
            <div style={{"margin": "60px auto", "width": "60%"}}>
                <h1 style={{fontFamily: "caveat", fontSize: "4rem"}}>YOUR PLACE TO READ</h1><br></br>
                <h1>About</h1>
                <p>
                    LIBRARY is a web application where the user reads or downloads a free books, review the books and interacts with other users.
                </p><br></br>
                <p>
                    Users can also upload a new book to the library by filling out a form with book's title, author, genre and a cover
                    image, this project was created to provide a platform for amateur writers to share their work and recieve feedback 
                    from other users.
                </p>
            </div>
            <Footer></Footer>
        </>
    );
}