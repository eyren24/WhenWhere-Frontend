export const SkeletonCard = () => {
    return (
        <div
            className="
        rounded-2xl border p-4
        bg-white/70 backdrop-blur-md
        shadow-[0_10px_30px_rgba(0,0,0,0.08)]
        ring-1 ring-black/5
      "
            style={{ borderColor: "#e5e7eb" }} // gray-200
        >
            <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="mt-2 h-3 w-64 bg-gray-200 rounded animate-pulse" />
            <div className="mt-4 rounded-xl border border-gray-100 bg-white/60 backdrop-blur-sm p-2">
                <div className="h-4 w-24 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="grid grid-cols-7 gap-[2px]">
                    {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-sm animate-pulse" />
                    ))}
                </div>
            </div>
        </div>
    );
};
