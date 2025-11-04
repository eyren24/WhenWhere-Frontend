import "../../assets/css/statsCard.css";

interface Props {
    title: string;
    value: number | string;
    accent?: "blue" | "green" | "red" | "gray";
}

export const StatsCard = ({ title, value, accent = "blue" }: Props) => {
    return (
        <div className={`StatsCard StatsCard--${accent}`}>
            <h3 className="StatsCard__title">{title}</h3>
            <p className="StatsCard__value">{value}</p>
        </div>
    );
};
