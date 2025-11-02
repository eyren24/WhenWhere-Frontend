import { useEffect, useRef, useState } from "react";
import "../../assets/css/home/Slider.css";

type Caption = { title: string; text: string; highlight?: string };

const imageList: string[] = Object.entries(
    import.meta.glob<{ default: string }>('/src/assets/imgs/slider/*', {
        eager: true,
    })
)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);

const scrollToFeature = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("feature-spotlight")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const captions: ReadonlyArray<Caption> = [
    { title: "La Nostra Visione", text: "Organizza luoghi, idee e momenti in un’unica agenda.", highlight: "Agende tematiche a colori" },
    { title: "Pianificazione Intuitiva", text: "Eventi e note personalizzabili in pochi tap.", highlight: "Aggiorna velocemente" },
    { title: "Colleziona Ricordi", text: "Valuta esperienze e tieni traccia di tutto.", highlight: "Tag intelligenti" },
    { title: "Promemoria che contano", text: "Alert puntuali quando serve davvero.", highlight: "Email reminder" },
];

const AUTOPLAY_MS = 4500;

export function HomeSlider() {
    const [idx, setIdx] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setIdx((i) => (i + 1) % imageList.length);
        }, AUTOPLAY_MS);
        return () => { if (timerRef.current) clearInterval(timerRef.current); };
    }, [idx]);

    const cap = captions[idx % captions.length];

    const touchStartX = useRef<number | null>(null);
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const onTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) {
            setIdx(i => dx < 0 ? (i + 1) % imageList.length : (i - 1 + imageList.length) % imageList.length);
        }
        touchStartX.current = null;
    };

    return (
        <section className="slider-wrapper" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <div className="slider-track">
                {imageList.map((src, i) => (
                    <div key={i} className={`slider-frame ${i === idx ? "active" : ""}`}>
                        <img src={src} alt={`Slide ${i}`} />
                        <div className="slider-overlay" />
                        <div className="slider-gradient" />
                    </div>
                ))}
            </div>

            <div className="slider-content">
                <div className="slider-card">
                    <h2 className="slider-title">{cap.title}</h2>
                    <p className="slider-text">{cap.text}</p>
                    {cap.highlight && <div className="slider-pill">🏷️ {cap.highlight}</div>}

                    <div className="slider-cta">
                        <a href="/agende" className="cta cta--solid">📅 Crea Agenda</a>
                        <a href="#feature-spotlight" onClick={scrollToFeature} className="cta cta--soft">⭐ Scopri la Novità</a>
                    </div>

                    <div key={idx} className="slider-progress">
                        <div className="slider-bar" style={{ animationDuration: `${AUTOPLAY_MS}ms` }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
