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

const ProfileCard = () => {
    return (
        <section className="flex flex-col justify-center items-center text-center font-sans bg-gradient-to-b from-white via-sky-50 to-white min-h-screen py-20 px-6">
            {/* Titolo con effetto animato e look aziendale */}
            <h1
                className="
          relative inline-block text-5xl font-extrabold text-gray-800 mb-12 tracking-tight
          opacity-0 translate-y-3 animate-[fadeIn_0.8s_ease-out_forwards]
          before:content-[''] before:absolute before:left-0 before:bottom-0
          before:h-[4px] before:w-0 before:rounded-full
          before:bg-gradient-to-r before:from-sky-500 before:to-cyan-400
          before:animate-[underlineGrow_1s_ease-out_forwards_0.6s]
        "
            >
                Il nostro team
            </h1>

            {/* Griglia delle card */}
            <div className="flex flex-wrap justify-center items-center gap-10">
                {people.map((person, index) => (
                    <div
                        key={index}
                        className="
              group relative w-[270px] h-[380px]
              bg-white/70 backdrop-blur-md
              border border-sky-100 rounded-2xl shadow-md
              p-6 flex flex-col items-center text-center
              transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              hover:-translate-y-3 hover:shadow-2xl hover:bg-white/90
            "
                        style={{ animation: `fadeUp 0.6s ease-out ${index * 0.1}s forwards`, opacity: 0 }}
                    >
                        <div className="relative">
                            <img
                                src={person.photo}
                                alt={person.name}
                                className="w-28 h-28 object-cover rounded-full border-4 border-sky-100 shadow-sm transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-sky-400/20 to-cyan-400/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        <h2 className="text-lg font-semibold text-gray-800 mt-6">{person.name}</h2>
                        <p className="text-sky-700 text-sm font-medium mb-6">{person.role}</p>

                        {/* Bottone elegante */}
                        <a
                            href={person.cv}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                mt-auto inline-block w-4/5 py-2.5 text-sm font-semibold
                text-white bg-gradient-to-r from-sky-500 to-cyan-500
                rounded-xl shadow-md transition-all duration-300
                hover:shadow-lg hover:from-sky-600 hover:to-cyan-600
                active:scale-95
              "
                        >
                            Visualizza CV
                        </a>
                    </div>
                ))}
            </div>

            {/* Animazioni custom */}
            <style>
                {`
          @keyframes fadeIn {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes underlineGrow {
            to {
              width: 100%;
            }
          }
          @keyframes fadeUp {
            0% {
              opacity: 0;
              transform: translateY(20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
            </style>
        </section>
    );
};

export default ProfileCard;
