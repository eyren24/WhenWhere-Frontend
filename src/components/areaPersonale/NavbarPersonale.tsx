import '../../assets/css/areaPersonale/Navbarpersonale.css';
import {IoMdAdd} from "react-icons/io";
import {Link} from "react-router";
import {IoHomeOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";
import {CreateAgendaModal} from "../modals/CreateAgendaModal.tsx";
import {useState} from "react";

export const NavbarPersonale = () => {
    const [openAgenda, setOpenAgenda] = useState<boolean>(false);
    return (
        <>
            <div id="navbody">
                <div className="navigation-card">
                    <Link to="/" className="universal-link navbar-tab">
                        <IoHomeOutline className="icon navbar-icon"/>
                    </Link>

                    <button onClick={() => setOpenAgenda(true)} className="tab">
                        <IoMdAdd className="icon nav-central-button"/>
                    </button>

                    <Link to="#" className="universal-link navbar-tab">
                        <FaRegUser className="icon navbar-icon"/>
                    </Link>

                </div>

            </div>
            <CreateAgendaModal isOpen={openAgenda} onClose={() => setOpenAgenda(false)}/>
        </>
    );
};