import {HomeSlider} from "../components/home/HomeSlider.tsx";
import '../assets/css/home/home.css';

export const Home = () => {
    return (
        <main className="min-h-[100dvh] text-white">
            <HomeSlider />

            {/* Quick Actions / Feature grid */}
            <section className="quick-section">
                <h3>Inizia in un attimo</h3>
                <div className="quick-grid">
                    <div className="quickcard">
                        <h4>Crea una nuova Agenda</h4>
                        <p>Temi e colori personalizzati per ogni progetto o viaggio.</p>
                    </div>

                    <div className="quickcard">
                        <h4>Nuova Nota/Evento</h4>
                        <p>Titolo, descrizione, luogo, tag, inizio/fine e rating.</p>
                    </div>

                    <div className="quickcard">
                        <h4>Promemoria Email</h4>
                        <p>Avvisi automatici per gli eventi che si avvicinano.</p>
                    </div>
                </div>
            </section>

        </main>
    )
}