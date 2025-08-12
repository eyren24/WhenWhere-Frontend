const AGENDA_CHANGED = "agenda:changed";

const agendaBus = new EventTarget();

export function emitAgendaChanged() {
    agendaBus.dispatchEvent(new Event(AGENDA_CHANGED));
}

export function onAgendaChanged(handler: () => void) {
    const listener = () => handler();
    agendaBus.addEventListener(AGENDA_CHANGED, listener);
    return () => agendaBus.removeEventListener(AGENDA_CHANGED, listener);
}
