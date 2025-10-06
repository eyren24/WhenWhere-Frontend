
export const QuickCard = ({ title, desc }: { title: string; desc: string }) => {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:bg-white/[0.08]">
            <h4 className="text-base font-semibold leading-tight">{title}</h4>
            <p className="text-sm text-white/70 mt-1">{desc}</p>
        </div>
    );
};