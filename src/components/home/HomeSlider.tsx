import Slider from "react-slick";
import { useEffect, useState } from "react";
import "../../assets/css/home/slider.css";

const allImages = import.meta.glob(
    "/src/assets/imgs/slider/*.{jpg,jpeg,png,webp}",
    { eager: true, import: "default" }
);

const captions = [
    {
        title: 'La Nostra Visione',
        text: 'Immagina un mondo dove ogni viaggio è un\'opportunità per connettersi. Creiamo la piattaforma che rende questo possibile, unendo esploratori e luoghi unici.'
    },
    {
        title: 'Esplora e Condividi',
        text: 'Scopri gemme nascoste e punti d\'interesse consigliati dalla nostra community. Condividi le tue esperienze e ispira la prossima avventura di qualcun altro.'
    },
    {
        title: 'Pianificazione Intuitiva',
        text: 'Organizza i tuoi itinerari con facilità. La nostra agenda intelligente ti aiuta a tenere traccia di eventi e impegni, rendendo ogni viaggio senza stress.'
    },
    {
        title: 'Unisciti alla Community',
        text: 'Entra a far parte di una rete globale di viaggiatori. Accedi a risorse esclusive, consigli personalizzati e un supporto costante per le tue esplorazioni.'
    },

];

export const HomeSlider = () => {
    const [images, setImages] = useState<string[]>([]);

    useEffect(() => {
        const loaded = Object.values(allImages) as string[];
        console.log("Immagini caricate:", loaded);
        setImages(loaded);
    }, []);

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 3000,
        pauseOnHover: true,
        autoplay: true,
        autoplaySpeed: 1000,
        slidesToShow: 1,
        swipeToSlide: true,
        slidesToScroll: 1
    };

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {images.map((image, i) => (
                    <div key={i} className="carousel-slide">
                        <img src={image} className="carousel-image" />
                        <div className="carousel-caption">
                            <h2>{captions[i]?.title ?? "Titolo mancante"}</h2>
                            <p>{captions[i]?.text ?? "Descrizione mancante"}</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};
