

import { useState, useEffect } from 'react';
// Importa il CSS specifico per lo slider.
// Assicurati che il percorso sia './Asset/CSS/AboutUs.css' e che il file esista lì.
import '../../assets/css/aboutUs/slider.css';



// Array di dati per le slide
const slidesData = [
    {
        image: null,
        title: 'La Nostra Visione',
        text: 'Immagina un mondo dove ogni viaggio è un\'opportunità per connettersi. Creiamo la piattaforma che rende questo possibile, unendo esploratori e luoghi unici.',
    },
    {
        image: null,
        title: 'Esplora e Condividi',
        text: 'Scopri gemme nascoste e punti d\'interesse consigliati dalla nostra community. Condividi le tue esperienze e ispira la prossima avventura di qualcun altro.',
    },
    {
        image: null,
        title: 'Pianificazione Intuitiva',
        text: 'Organizza i tuoi itinerari con facilità. La nostra agenda intelligente ti aiuta a tenere traccia di eventi e impegni, rendendo ogni viaggio senza stress.',
    },
    {
        image: null,
        title: 'Unisciti alla Community',
        text: 'Entra a far parte di una rete globale di viaggiatori. Accedi a risorse esclusive, consigli personalizzati e un supporto costante per le tue esplorazioni.',
    },
];

// Definizione del componente Slider (rinominato con 'S' maiuscola)
export const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // Logica per lo scorrimento automatico delle slide
    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prevSlide) =>
                (prevSlide + 1) % slidesData.length
            );
        }, 5000); // Cambia slide ogni 5 secondi

        // Funzione di cleanup: ferma l'intervallo quando il componente si smonta
        return () => clearInterval(slideInterval);
    }, []);

    // Funzioni per la navigazione manuale con le frecce
    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.length);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) =>
            (prevSlide - 1 + slidesData.length) % slidesData.length
        );
    };

    return (
        <div className="slider-wrapper">
            {/* Bottone freccia sinistra */}
            <button className="slider-arrow prev" onClick={goToPrevSlide}>&#10094;</button>

            {/* Contenitore della slide corrente */}
            <div className="slide">
                <img
                    src={slidesData[currentSlide].image || ""}
                    alt={slidesData[currentSlide].title}
                    className="slide-image"
                />
                <div className="slide-overlay">
                    <h2 className="slide-title">{slidesData[currentSlide].title}</h2>
                    <p className="slide-text">{slidesData[currentSlide].text}</p>
                    {/* Bottone "Accedi" */}
                    <button className="access-button">Accedi</button>
                </div>
            </div>

            {/* Bottone freccia destra */}
            <button className="slider-arrow next" onClick={goToNextSlide}>&#10095;</button>

            {/* Navigazione con i "pallini" */}
            <div className="dot-navigation">
                {slidesData.map((_, index) => (
                    <span
                        key={index} // Chiave unica per ogni elemento nella lista
                        className={`dot ${currentSlide === index ? 'active' : ''}`} // Aggiunge classe 'active' alla slide corrente
                        onClick={() => setCurrentSlide(index)} // Cambia slide al click sul pallino
                    ></span>
                ))}
            </div>
        </div>
    );
};
