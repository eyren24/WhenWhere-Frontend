import { useState } from "react";
import "../../assets/css/home/FeatureSpotlight.css";

const themeColors = ["#5d8aa8", "#e52b50", "#908435", "#03ace4"];

export const FeatureSpotlight = () => {
    const [activeColor, setActiveColor] = useState(themeColors[0]);

    return (
        <section id="feature-spotlight" className="spotlight-section">
            <div className="spotlight-container">
                <div className="spotlight-text">
                    <h2>🎉 Novità: Personalizza la tua Agenda</h2>
                    <p>Scegli il colore che preferisci e rendi unica la tua agenda. Visualizza eventi, note e promemoria con uno stile personale.</p>
                </div>

                <div className="agenda-preview">
                    <div className="calendar-box" style={{ borderTopColor: activeColor }}>
                        <div className="calendar-header">Ottobre 2025</div>
                        <div className="calendar-grid">
                            {["Lun","Mar","Mer","Gio","Ven","Sab","Dom"].map(d => <div className="calendar-day-label" key={d}>{d}</div>)}
                            {Array.from({ length: 31 }, (_, i) => <div className="calendar-day" key={i + 1}>{i + 1}</div>)}
                        </div>
                    </div>

                    <div className="color-selector">
                        <div style={{ display: "flex", gap: "14px" }}>
                            {themeColors.map(color => (
                                <div
                                    key={color}
                                    className={`color-dot ${activeColor === color ? "active" : ""}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setActiveColor(color)}
                                />
                            ))}
                        </div>
                        <span className="selector-label">Anteprima Colore Agenda</span>
                    </div>
                </div>
            </div>
        </section>
    );
};
