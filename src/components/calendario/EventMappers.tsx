import type { EventInput } from "@fullcalendar/core";
import type { ResEventoDTO } from "../../services/api";

/**
 * Mappa ResEventoDTO[] -> EventInput[] per FullCalendar.
 * - Se start === end, rimuove end (evento puntuale).
 * - Propaga campi utili in extendedProps.
 */
export const mapEvents = (events: ResEventoDTO[]): EventInput[] =>
    events.map((e) => {
        const start = new Date(e.dataInizio);
        let end = e.dataFine ? new Date(e.dataFine) : undefined;
        if (end && start.getTime() === end.getTime()) end = undefined;

        return {
            id: String(e.id),
            title: e.titolo,
            start,
            end,
            extendedProps: {
                descrizione: e.descrizione,
                rating: e.rating,
                stato: e.stato,
                notifica: e.notifica,
                tagNome: (e as unknown as { tagNome?: string }).tagNome ?? "Sconosciuto"
            }
        };
    });
