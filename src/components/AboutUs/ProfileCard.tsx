// TeamPage.tsx
import React from "react";

type Person = {
    name: string;
    role: string;
    cv: string;
    photo: string;
};

const people: Person[] = [
    { name: "Francesco Arronenzi", role: "Frontend Developer", cv: "/cv/Francescoarronenzi.pdf", photo: "/photos/Francescoarronenzi.jpg" },
    { name: "Matteo Martelli", role: "SQL Server / Frontend Developer", cv: "/cv/Matteomartelli.pdf", photo: "/photos/Matteomartelli.jpg" },
    { name: "Federico Renghi", role: "Backend Developer", cv: "/cv/Federicorenghi.pdf", photo: "/photos/federicorenghi.png" },
    { name: "Emiliano Della Ciana", role: "Project Manager / Backend Developer", cv: "/cv/emilianodellaciana.pdf", photo: "/photos/emilianodellaciana.jpg" },
    { name: "Alessio Giovannucci", role: "Frontend Developer", cv: "/cv/Alessiogiovannucci.pdf", photo: "/photos/Alessiogiovannucci.png" },
];

const TeamPage: React.FC = () => {
    return (
        <section className="team-section">
            <h1 className="section-title">Il nostro team</h1>
            <div className="team-grid">
                {people.map((person, index) => (
                    <a
                        href={person.cv}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="card"
                        style={{ animationDelay: `${index * 0.1}s` }}
                        key={index}
                    >
                        <div className="card-photo">
                            <img src={person.photo} alt={person.name} loading="lazy" />
                        </div>
                        <div className="card-info">
                            <h2>{person.name}</h2>
                            <p>{person.role}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
};

export default TeamPage;
