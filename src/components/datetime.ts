export const pad2 = (n: number): string => (n < 10 ? `0${n}` : `${n}`);


export const toDatetimeLocal = (iso: string): string => {
    const d = new Date(iso); // ISO UTC
    // Converti in locale prima di formattare
    const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
    return `${local.getFullYear()}-${pad2(local.getMonth() + 1)}-${pad2(local.getDate())}T${pad2(
        local.getHours()
    )}:${pad2(local.getMinutes())}`;
};


export const isSameInstant = (aIso: string, bIso: string): boolean => {
    return new Date(aIso).getTime() === new Date(bIso).getTime();
};
