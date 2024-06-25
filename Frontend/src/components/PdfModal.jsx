import { Document, Page, pdfjs } from "react-pdf"
import { useState, useRef, useEffect, memo } from "react";
import "./PdfModal.css";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfModal = memo(function PdfModal(props)
{
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const containerRef = useRef(null);
  
    useEffect(() => 
    {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => 
        {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const totalPages = numPages || 0;
            const currentPage = Math.ceil((scrollTop / (scrollHeight - clientHeight)) * totalPages);
            setPageNumber(currentPage);
        };

        container.addEventListener('scroll', handleScroll);
        return () => container.removeEventListener('scroll', handleScroll);
    }, [numPages]);

    const handleModal = (event) =>
    {
        if (event.target.className === "modal")
        {
            props.setOpenModal(false);
        }

        return;
    };

    const onDocumentLoadSuccess = ({ numPages }) =>
    {
        setNumPages(numPages);
    };

    const onDocumentLoadError = (error) =>
    {
        console.error('Error while loading document!', error);
    };

    return (
        <div className="modal" onClick={handleModal}>
            <svg className="close" onClick={() => props.setOpenModal(false)} xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="28">
                <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
            <div className="pdf-container" ref={containerRef}>
                <Document file={props.pdfUrl} onLoadError={onDocumentLoadError} onLoadSuccess={onDocumentLoadSuccess}>
                    {Array.from(new Array(numPages), (el, index) => (
                        <Page  key={`page_${index + 1}`} pageNumber={index + 1} className="pdf-page" width={350} scale={1.7}></Page>
                    ))}
                </Document>
                <div className="page-number">
                    <span>{pageNumber} of {numPages}</span>
                </div>
            </div>
        </div>
    )
});

export default PdfModal;