import type { EventInput } from "@fullcalendar/core";
import type { ResEventoDTO } from "../../services/api";

/** Colori per stato (fallback sicuro) */
const mapStatoToColors = (stato?: string) => {
    switch ((stato || "").toLowerCase()) {
        case "pianificato":
            return { backgroundColor: "#e0f2fe", borderColor: "#bae6fd", textColor: "#0c4a6e" }; // azzurro chiaro
        case "in corso":
            return { backgroundColor: "#dcfce7", borderColor: "#bbf7d0", textColor: "#14532d" }; // verde chiaro
        case "completato":
            return { backgroundColor: "#ede9fe", borderColor: "#ddd6fe", textColor: "#3730a3" }; // viola chiaro
        case "annullato":
            return { backgroundColor: "#fee2e2", borderColor: "#fecaca", textColor: "#7f1d1d" }; // rosso chiaro
        case "rimandato":
            return { backgroundColor: "#fef9c3", borderColor: "#fde68a", textColor: "#713f12" }; // giallo chiaro
        default:
            return { backgroundColor: "#f3f4f6", borderColor: "#e5e7eb", textColor: "#111827" }; // grigio
    }
};

export const mapEvents = (events: ResEventoDTO[]): EventInput[] =>
    events.map((e) => {
        const start = new Date(e.dataInizio);
        let end = e.dataFine ? new Date(e.dataFine) : undefined;
        if (end && start.getTime() === end.getTime()) end = undefined;

        const { backgroundColor, borderColor, textColor } = mapStatoToColors(e.stato);

        return {
            id: String(e.id),
            title: e.titolo,
            start,
            end,
            backgroundColor,
            borderColor,
            textColor,
            // se preferisci classNames: puoi aggiungere classNames: ["fc-evt-" + (e.stato || "altro").toLowerCase()]
            extendedProps: {
                descrizione: e.descrizione,
                rating: e.rating,
                stato: e.stato,
                notifica: e.notifica,
                tagNome: (e as unknown as { tagNome?: string }).tagNome ?? "Sconosciuto",
            },
        };
    });
