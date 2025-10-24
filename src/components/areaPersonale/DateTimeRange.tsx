import React from "react";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";

interface DateTimeRangeProps {
    start: string;
    end: string;
    setStart: (v: string) => void;
    setEnd: (v: string) => void;
    isInstant: boolean;
    setIsInstant: (v: boolean) => void;
}

export const DateTimeRange: React.FC<DateTimeRangeProps> = ({
                                                                start,
                                                                end,
                                                                setStart,
                                                                setEnd,
                                                                isInstant,
                                                                setIsInstant,
                                                            }) => (
    <div className="datetime-range-wrapper">
        <div className="datetime-range-field">
            <label className="datetime-range-label">Inizio</label>
            <input
                type="datetime-local"
                className="datetime-range-input"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                step={60}
                required
            />
        </div>
        <div className="datetime-range-field">
            <label className="datetime-range-label">Fine</label>
            <input
                type="datetime-local"
                className="datetime-range-input"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                step={60}
                min={start}
                disabled={isInstant}
                required={!isInstant}
            />
        </div>
        <label className="datetime-range-checkbox">
            <input
                type="checkbox"
                className="datetime-range-check"
                checked={isInstant}
                onChange={(e) => setIsInstant(e.target.checked)}
            />
            <span>Evento istantaneo (senza fine)</span>
        </label>
    </div>
);
