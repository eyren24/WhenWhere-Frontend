import "../../assets/css/areaPersonale/unified-agenda-ui.css";

export const SkeletonCard = () => {
    return (
        <div className="skeleton-card-wrapper">
            <div className="skeleton-card-title" />
            <div className="skeleton-card-subtitle" />
            <div className="skeleton-card-inner">
                <div className="skeleton-card-bar" />
                <div className="skeleton-card-grid">
                    {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className="skeleton-card-cell" />
                    ))}
                </div>
            </div>
        </div>
    );
};
