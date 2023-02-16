import React, { useState } from 'react';

function PdfViewer() {
    const [pdfFile, setPdfFile] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);

    const handlePdfUpload = (event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setPdfFile(file);
        setPdfUrl(url);
    };

    const handlePdfDownload = () => {
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = pdfFile.name;
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            {pdfUrl ? (
                <button onClick={handlePdfDownload}>Download PDF</button>
            ) : (
                <input type="file" accept=".pdf" onChange={handlePdfUpload} />
            )}
        </div>
    );
}

export default PdfViewer;
