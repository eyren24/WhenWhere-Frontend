import '../../assets/css/areaPersonale/Navbarpersonale.css';
import { IoMdAdd } from "react-icons/io";
import {Link} from "react-router";
import {IoHomeOutline} from "react-icons/io5";
import {FaRegUser} from "react-icons/fa";

export const NavbarPersonale = () => {
    return (
        <div id="navbody">
            <div className="navigation-card">
                <Link to="/" className="universal-link navbar-tab">
                    <IoHomeOutline className="icon navbar-icon" />
                </Link>

                <a href="#" className="tab">
                    <IoMdAdd className="icon nav-central-button"/>
                </a>

                <Link to="#" className="universal-link navbar-tab">
                    <FaRegUser className="icon navbar-icon" />
                </Link>

            </div>

        </div>
    );
};