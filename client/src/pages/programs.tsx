import { useLoaderData } from "react-router-dom";

interface ProgramsProps {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
}

function Series() {
  const programs = useLoaderData() as ProgramsProps[];

  return (
    <div>
      {programs.length > 0 ? (
        programs.map((program) => (
          <div key={program.id}>
            <h4>{program.id}</h4>
            <h2>{program.title}</h2>
            <h3>{program.synopsis}</h3>
            <img src={program.poster} alt={program.title} />
            <h3>{program.country}</h3>
            <h4>{program.year}</h4>
          </div>
        ))
      ) : (
        <p>Aucune série trouvée</p>
      )}
    </div>
  );
}

export default Series;
