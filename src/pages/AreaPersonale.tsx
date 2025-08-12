import '../assets/css/calendario.css';
import {useCallback, useEffect, useState} from "react";
import {useAgendaStore} from "../stores/AgendaStore.ts";
import type {ResAgendaDTO} from "../services/api";
import toast from "react-hot-toast";
import {Calendario} from "../components/areaPersonale/Calendario.tsx";
import {onAgendaChanged} from "../stores/lib/agendaBus.ts";

export const AreaPersonale = () => {
    const {getAll} = useAgendaStore();
    const [agende, setAgende] = useState<ResAgendaDTO[]>([]);

    const load = useCallback(() => {
        getAll()
            .then((res) => {
                if (res.success) {
                    setAgende(res.agenda || []);
                }
            })
            .catch((err) => toast.error(err));
    }, [getAll]);
    
    useEffect(() => {
        load();
        const off = onAgendaChanged(() => load());
        return () => off();
    }, [load])
    return (
        <>
            {agende.map((pincopallo, index) => (
                <Calendario agenda={pincopallo} key={index}/>
            ))}
        </>
    );
};