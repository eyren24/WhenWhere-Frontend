import type { ResAgendaDTO } from "../../services/api";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

const isHex = (c?: string) =>
    !!c && /^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(c);

type Props = {
    agenda: ResAgendaDTO;
    onBack: () => void;
};

export const AgendaDetailTopbar = ({ agenda, onBack }: Props) => {
    const accent = isHex(agenda.tema) ? agenda.tema! : "#0ea5e9";

    return (
        <div className="agenda-topbar">
            <button
                type="button"
                onClick={onBack}
                className="agenda-back-button"
                style={{ borderColor: accent, color: accent }}
                aria-label="Torna alle agende"
                title="Torna alle agende"
            >
                ← Indietro
            </button>
            <div className="agenda-topbar-hint">
                Premi <kbd className="agenda-esc-key">Esc</kbd> per tornare
            </div>
        </div>
    );
};
