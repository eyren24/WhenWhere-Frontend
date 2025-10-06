import { useEffect, useMemo, useRef, useState } from "react";
import Slider, { type Settings as SlickSettings } from "react-slick";
import { motion, AnimatePresence } from "framer-motion";
import { animate } from "animejs";
import {
    FiCalendar,
    FiMapPin,
    FiTag,
    FiStar,
    FiBell,
    FiChevronRight,
} from "react-icons/fi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Tipi
type Caption = {
    title: string;
    text: string;
    icon?: React.ReactElement;
    highlight?: string;
};

// Immagini (Vite) — URL statici con glob eager
const imagesMap = import.meta.glob("/src/assets/imgs/slider/*.{jpg,jpeg,png,webp}", {
    eager: true,
    import: "default",
}) as Record<string, string>;

// Captions per lo storytelling WhenWhere
const captions: ReadonlyArray<Caption> = [
    {
        title: "La Nostra Visione",
        text:
            "Ogni viaggio è un'opportunità per connettersi: organizza luoghi, idee e momenti in un’unica agenda.",
        icon: <FiCalendar className="inline-block -mt-1" />,
        highlight: "Crea agende tematiche con colori coerenti.",
    },
    {
        title: "Esplora e Condividi",
        text:
            "Scopri gemme nascoste dalla community e aggiungile alle tue note con luogo e tag.",
        icon: <FiMapPin className="inline-block -mt-1" />,
        highlight: "Tag intelligenti e ricerca veloce.",
    },
    {
        title: "Pianificazione Intuitiva",
        text:
            "Titolo, descrizione, stato, inizio/fine e rating: tutto nella stessa nota, senza stress.",
        icon: <FiStar className="inline-block -mt-1" />,
        highlight: "Rating evento da 1 a 5.",
    },
    {
        title: "Promemoria che contano",
        text:
            "Ricevi una mail quando un evento si avvicina, così non perdi nulla di importante.",
        icon: <FiBell className="inline-block -mt-1" />,
        highlight: "Promemoria email puntualissimi.",
    },
];

export function HomeSlider() {
    // Ordine stabile delle immagini
    const images = useMemo<string[]>(
        () => Object.values(imagesMap).sort((a, b) => a.localeCompare(b, "it-IT")),
        []
    );

    // In caso di mismatch immagini <-> captions, ciclo le captions
    const slidesCount = Math.max(images.length, captions.length);
    const safeImages = useMemo<string[]>(
        () =>
            Array.from({ length: slidesCount }).map(
                (_, i) => images[i % Math.max(1, images.length)]
            ),
        [images, slidesCount]
    );

    const [active, setActive] = useState<number>(0);
    const [progressKey, setProgressKey] = useState<number>(0);
    const underlineRanRef = useRef<Set<number>>(new Set());

    // Effetto underline sul titolo (anime.js) ad ogni slide attiva
    useEffect(() => {
        const id = `heading-${active}`;
        const target = `#${id} .underline-el`;

        if (!underlineRanRef.current.has(active)) {
            animate(target, {
                width: ["0%", "100%"],
                duration: 900,
                easing: "easeOutQuad",
            });
            underlineRanRef.current.add(active);
        } else {
            animate(target, {
                width: ["0%", "100%"],
                duration: 650,
                easing: "easeOutSine",
            });
        }
    }, [active]);

    // Slider settings (react-slick)
    const settings: SlickSettings = {
        dots: false,
        arrows: false,
        infinite: true,
        fade: true,
        speed: 700,
        autoplay: true,
        autoplaySpeed: 4500,
        pauseOnHover: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (_current, next) => {
            setActive(next);
            setProgressKey((k) => k + 1); // reset progress bar
        },
    };

    return (
        <section className="relative w-full h-[72vh] md:h-[82vh]">
            <div className="absolute inset-0">
                <Slider {...settings}>
                    {safeImages.map((img, i) => (
                        <div key={`slide-${i}`} className="relative">
                            {/* Immagine full-bleed */}
                            <img
                                src={img}
                                alt=""
                                className="pointer-events-none select-none w-full h-[72vh] md:h-[82vh] object-cover"
                                draggable={false}
                            />

                            {/* Vignetta + sfuma: migliore leggibilità */}
                            <div className="absolute inset-0 bg-black/30" />
                            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                    ))}
                </Slider>
            </div>

            {/* Overlay contenuti */}
            <div className="relative z-10 h-full">
                <div className="mx-auto flex h-full max-w-6xl items-end px-4 pb-8">
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={`cap-${active}`}
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{ duration: 0.35 }}
                                className="max-w-2xl rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                            >
                                <div id={`heading-${active}`} className="relative pb-2">
                                    <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
                    <span className="align-middle mr-2 text-white/80">
                      {captions[active % captions.length].icon}
                    </span>
                                        {captions[active % captions.length].title}
                                    </h2>
                                    {/* underline animata con anime.js */}
                                    <span className="underline-el absolute left-0 -bottom-0.5 block h-0.5 w-0 bg-white/90" />
                                </div>

                                <p className="text-white/85">
                                    {captions[active % captions.length].text}
                                </p>

                                {captions[active % captions.length].highlight && (
                                    <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-sm text-white/85">
                                        <FiTag /> {captions[active % captions.length].highlight}
                                    </div>
                                )}

                                {/* CTA Row */}
                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                    <CTA href="/agende">
                                        <FiCalendar />
                                        Crea Agenda
                                    </CTA>
                                    <CTA href="/note/nuova" variant="soft">
                                        <FiMapPin />
                                        Nuova Nota/Evento
                                    </CTA>
                                    <CTA href="/impostazioni/promemoria" variant="ghost">
                                        <FiBell />
                                        Promemoria Email
                                    </CTA>
                                </div>

                                {/* Progress bar dell’autoplay (Framer Motion) */}
                                <motion.div
                                    key={progressKey}
                                    className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/15"
                                >
                                    <motion.div
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 4.3, ease: "linear" }}
                                        className="h-full bg-white/90"
                                    />
                                </motion.div>

                                {/* Micro-pill informazioni evento tipo (esempio UI) */}
                                <div className="mt-3 flex items-center gap-3 text-xs text-white/70">
                  <span className="inline-flex items-center gap-1">
                    <FiTag /> Luogo / Tag / Stato
                  </span>
                                    <span>•</span>
                                    <span className="inline-flex items-center gap-1">
                    <FiStar /> Rating 4.8/5
                  </span>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}

function CTA({
                 href,
                 children,
                 variant = "solid",
             }: {
    href: string;
    children: React.ReactNode;
    variant?: "solid" | "soft" | "ghost";
}) {
    const common =
        "inline-flex items-center gap-2 rounded-xl px-3.5 py-2 text-sm transition focus:outline-none focus:ring-2 focus:ring-white/40";
    const styles: Record<typeof variant, string> = {
        solid:
            "bg-white text-neutral-900 hover:bg-white/90 " +
            "shadow-[0_6px_20px_rgba(255,255,255,0.15)]",
        soft:
            "bg-white/15 text-white hover:bg-white/25 border border-white/15",
        ghost:
            "bg-transparent text-white hover:bg-white/10 border border-white/10",
    } as const;

    return (
        <a className={`${common} ${styles[variant]}`} href={href}>
            <span className="-mt-[1px]">{children}</span>
            <FiChevronRight className="opacity-80" />
        </a>
    );
}
