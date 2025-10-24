import type { ResAgendaDTO } from "../../services/api";
import { AgendaCard } from "./AgendaCard.tsx";
import { SkeletonCard } from "./SkeletonCard.tsx";
import "../../assets/css/areaPersonale/unified-agenda-ui.css";
type Props = {
    agende: ResAgendaDTO[];
    isLoading: boolean;
    onOpen: (agenda: ResAgendaDTO) => void;
    onDelete: (agendaId: number) => void;
    onCreate: () => void;
    onRefresh: () => void;
};

export const AgendaGrid = ({ agende, isLoading, onOpen, onDelete }: Props) => {
    return (
        <div className="agenda-grid-wrapper">
            <div className="agenda-grid">
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : (
                    agende.map((agenda) => (
                        <AgendaCard
                            key={agenda.id}
                            agenda={agenda}
                            onOpen={onOpen}
                            onDelete={onDelete}
                        />
                    ))
                )}
            </div>
        </div>
    );
};
