import '../../assets/css/aboutUs/Profile-Cards.css';
import '../../assets/css/aboutUs/About_Us.css';


type Person = {
    name: string;
    role: string;
    cv: string;
    photo: string;
};

const people: Person[] = [
    { name: 'Francesco Arronenzi', role: 'Frontend Developer ', cv: '/cv/Francescoarronenzi.pdf', photo: '/photos/Francescoarronenzi.jpg' },
    { name: 'Matteo Martelli', role: 'SQL Server/Frontend Developer', cv: '/cv/cv-anna.pdf', photo: '/photos/anna.jpg' },
    { name: 'Federico Renghi', role: 'Backend Developer', cv: '/cv/cv-luca.pdf', photo: '/photos/luca.jpg' },
    { name: 'Emiliano Della Ciana', role: 'Project Manager/Backend Developer', cv: '/cv/cv-sara.pdf', photo: '/photos/sara.jpg' },
    { name: 'Alessio Giovannucci', role: 'Frontend Developer', cv: '/cv/cv-giulia.pdf', photo: '/photos/giulia.jpg' },
];


const ProfileCard = () => {
    return (
        <div className="aboutus-background">
            <div className="card-grid">
                {people.map((person, index) => (
                    <div key={index} className="profile-card">
                        <img src={person.photo} alt={person.name} className="profile-photo" />
                        <h2>{person.name}</h2>
                        <p>{person.role}</p>

                        <a
                            href={person.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="card-button"
                        >
                            Visualizza CV
                        </a>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfileCard;