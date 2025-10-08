import {HomeSlider} from "../components/home/HomeSlider.tsx";
import '../assets/css/home/home.css';

export const Home = () => {
    return (
        <main className="min-h-[100dvh] text-white">
            <HomeSlider />

            {/* Quick Actions / Feature grid */}
            <section className="relative w-full py-16 px-6 bg-gradient-to-t from-[#01ace2]/40 to-transparent">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-8 text-center text-black">
                        Inizia in un attimo
                    </h2>

                    <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
                        {/* Card 1 */}
                        <div className="relative flex-1 min-w-0 rounded-2xl bg-white/60 border border-white/50 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.2)] p-6 text-left overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-lg font-semibold mb-2 text-black">
                                    Crea una nuova Agenda
                                </h4>
                                <p className="text-[0.95rem] text-black/90 leading-snug">
                                    Temi e colori personalizzati per ogni progetto o viaggio
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="relative flex-1 min-w-0 rounded-2xl bg-white/60 border border-white/50 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.2)] p-6 text-left overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-lg font-semibold mb-2 text-black">
                                    Nuova Nota/Evento
                                </h4>
                                <p className="text-[0.95rem] text-black/90 leading-snug">
                                    Aggiungi un evento da ricordare, un pensiero da annotare o altro ancora
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="relative flex-1 min-w-0 rounded-2xl bg-white/60 border border-white/50 backdrop-blur-md shadow-[0_4px_25px_rgba(0,0,0,0.2)] p-6 text-left overflow-hidden">
                            <div className="relative z-10">
                                <h4 className="text-lg font-semibold mb-2 text-black">
                                    Promemoria Email
                                </h4>
                                <p className="text-[0.95rem] text-black/90 leading-snug">
                                    Attiva le notifiche mail per essere notificato degli eventi futuri
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/*  LINEA DI DIVISIONE WIP


            <div className="relative w-full flex justify-center items-center my-16">
                 Scia curva
                <div className="w-2/3 h-[3px] bg-gradient-to-r from-transparent via-sky-400 to-sky-600 rounded-full
                  [mask-image:linear-gradient(to_right,transparent,black,black,transparent)]" />

                 Piccolo aereo alla fine
                <img
                    src="/src/assets/imgs/icons/plane-icon.png" // 👉 sostituisci con il tuo path corretto, es: "/src/assets/logo_plane.png"
                    alt="Aereo"
                    className="absolute right-[16.5%] w-6 rotate-[8deg] drop-shadow-md"
                />
            </div>*/}



            <section className="relative w-full bg-[#9adef4] text-black overflow-hidden py-20">
                <div className="max-w-6xl mx-auto px-6 md:px-10">
                    <div className="flex flex-col md:flex-row rounded-2xl shadow-xl overflow-hidden bg-white/80 backdrop-blur-md">

                        {/* Area Testuale */}
                        <div className="md:w-1/2 w-full p-10 flex flex-col justify-center">
                            <h2 className="text-3xl font-bold mb-4">
                                Il tuo spazio personale, ovunque tu sia
                            </h2>
                            <p className="text-lg leading-relaxed">
                                Gestisci progetti, idee e appuntamenti in modo semplice e visivo.
                                Personalizza ogni dettaglio e tieni tutto sotto controllo con facilità.
                            </p>
                        </div>

                        {/* Area Immagine */}
                        <div
                            className="md:w-1/2 w-full h-64 md:h-auto bg-cover bg-center"
                            style={{
                                backgroundImage:
                                    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80')"
                            }}
                        ></div>

                    </div>
                </div>
            </section>







        </main>
    )
}