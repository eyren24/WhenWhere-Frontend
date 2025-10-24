import React from "react";
import "../../assets/css/aboutUs/Profile-Cards.css";

type Person = {
    name: string;
    role: string;
    cv: string;
    photo: string;
};

const people: Person[] = [
    { name: "Francesco Arronenzi", role: "Frontend Developer", cv: "/cv/Francescoarronenzi.pdf", photo: "/photos/Francescoarronenzi.jpg" },
    { name: "Matteo Martelli", role: "SQL Server/Frontend Developer", cv: "/cv/cv-anna.pdf", photo: "/photos/anna.jpg" },
    { name: "Federico Renghi", role: "Backend Developer", cv: "/cv/Federicorenghi.pdf", photo: "/photos/federicorenghi.png" },
    { name: "Emiliano Della Ciana", role: "Project Manager/Backend Developer", cv: "/cv/emilianodellaciana.pdf", photo: "/photos/emilianodellaciana.jpg" },
    { name: "Alessio Giovannucci", role: "Frontend Developer", cv: "/cv/cv-giulia.pdf", photo: "/photos/giulia.jpg" },
];

const ProfileCard: React.FC = () => {
    return (
        <section className="about-us-container">
            <h1 className="fancy-underline">Il nostro team</h1>

            <div className="P-card-grid">
                {people.map((person, index) => (
                    <div key={index} className="profile-card" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="profile-photo-wrapper">
                            <img src={person.photo} alt={person.name} className="profile-photo" />
                        </div>
                        <div className="card-details">
                            <h2>{person.name}</h2>
                            <p>{person.role}</p>
                        </div>
                        <a href={person.cv} target="_blank" rel="noopener noreferrer" className="card-button">
                            Visualizza CV
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProfileCard;
