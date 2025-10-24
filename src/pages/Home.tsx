import { HomeSlider } from "../components/home/HomeSlider";
import { FeatureSpotlight } from "../components/home/FeatureSpotlight";
import "../assets/css/home/home.css";

export const Home = () => {
    return (
        <main className="home-main">
            <HomeSlider />
            <FeatureSpotlight />
        </main>
    );
};
