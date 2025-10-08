
import type {ResAgendaDTO} from "../../services/api";
import {AgendaCard} from "./AgendaCard.tsx";
import {SkeletonCard} from "./SkeletonCard.tsx";

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
        <div className="px-4 sm:px-6">
            {isLoading ? (
                <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : (
                <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {agende.map((agenda) => (
                        <AgendaCard
                            key={agenda.id}
                            agenda={agenda}
                            onOpen={onOpen}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
