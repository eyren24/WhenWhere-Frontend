import React from "react";

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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Inizio
            </label>
            <input
                type="datetime-local"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500"
                value={start}
                onChange={(e) => setStart(e.target.value)}
                step={60}
                required
            />
        </div>
        <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                Fine
            </label>
            <input
                type="datetime-local"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 disabled:opacity-60"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
                step={60}
                min={start}
                disabled={isInstant}
                required={!isInstant}
            />
        </div>
        <label className="col-span-full inline-flex items-center gap-3 text-sm text-gray-700">
            <input
                type="checkbox"
                className="size-4 accent-blue-600"
                checked={isInstant}
                onChange={(e) => setIsInstant(e.target.checked)}
            />
            <span>Evento istantaneo (senza fine)</span>
        </label>
    </div>
);
