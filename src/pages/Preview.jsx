import Navbar from '../componentes/Navbar'
import Footer from '../componentes/Footer'
import CVPreview from '../componentes/CVPreview';

import "../styles/Preview.css";

function Preview() {
    return (
        <>
            <Navbar />

            <main className="preview-page">

                <div className="preview-header">
                    <h1>Vista previa del CV</h1>

                    <p>
                        Revisa tu información antes de exportar el PDF.
                    </p>
                </div>

                <CVPreview />

            </main>

            <Footer />
        </>
    );
}

export default Preview;