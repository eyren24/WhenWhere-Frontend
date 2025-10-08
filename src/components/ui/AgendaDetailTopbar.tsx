import type {ResAgendaDTO} from "../../services/api";

const isHex = (c?: string) => !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

type Props = {
    agenda: ResAgendaDTO;
    onBack: () => void;
};

export const AgendaDetailTopbar = ({ agenda, onBack }: Props) => {
    const accent = isHex(agenda.tema) ? agenda.tema! : "#0ea5e9";
    return (
        <div className="mb-3 flex items-center justify-between">
            <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition bg-white/60 backdrop-blur ring-1 ring-inset"
                aria-label="Torna alle agende"
                title="Torna alle agende"
                style={{ borderColor: accent, color: accent }}
            >
                ← Indietro
            </button>
            <div className="text-sm text-gray-500">
                Premi <kbd className="px-1.5 py-0.5 rounded border bg-white/70">Esc</kbd> per tornare
            </div>
        </div>
    );
};
