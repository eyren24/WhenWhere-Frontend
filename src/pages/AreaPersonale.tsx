import {useEffect, useState} from "react";
import {useAgendaStore} from "../stores/AgendaStore.ts";
import type {ResAgendaDTO} from "../services/api";
import toast from "react-hot-toast";
import {Calendario} from "../components/calendario/Calendario.tsx";

export const AreaPersonale = () => {
    const {getAll} = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);
    useEffect(() => {
        getAll().then((res) => {
            if (res.success) {
                setAgende(res.agenda || []);
            }else {
                toast.error(res.error || "Errore imprevisto nel caricamento dell'agenda.")
            }
        }).catch((err) => toast.error(err));
    }, [getAll]);

    return (
        <>
            {agende.map((pincopallo, index) => (
                <Calendario agenda={pincopallo} key={index}/>
            ))}
        </>
    );
};