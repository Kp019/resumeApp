import { useParams } from 'react-router-dom';
import { Viewer } from '@react-pdf-viewer/core';
import { Worker } from '@react-pdf-viewer/core';

const Modal = () => {
  const { url } = useParams();
  console.log(url);
  

  return (
    <div className="pdf-viewer">
      <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
        <Viewer fileUrl={`/Server/uploads/${url}`} />
      </Worker>
    </div>
  );
};

export default Modal;