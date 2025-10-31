import "../../assets/css/customloader.css";
import {ClipLoader} from "react-spinners";

export const CustomLoader = ({color = "#000"}: { color?: string }) => {
    return (
        <div className="loader-wrapper">
            <ClipLoader color={color}/>
        </div>
    );
};
