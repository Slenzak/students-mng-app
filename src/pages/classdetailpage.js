import { useParams } from "react-router-dom";
import { getClassByName } from "../utility/storage";
import { useNavigate } from "react-router-dom";

const ClassDetailsPage = () => {
  const { className } = useParams();
  const classData = getClassByName(className);
  const navigate = useNavigate();
  const averageClass =
    classData.students.length === 0
      ? 0
      : (
          classData.students.reduce((sum, s) => sum + s.average, 0) /
          classData.students.length
        ).toFixed(2);

  return (
    <><div className="max-w-4xl mx-auto mt-10 space-y-6 relative">
      <div className="text-lg font-bold text-slate-300">Wychowawca: {classData.teacher}</div>
      <table className="w-full border border-collapse bg-slate-400">
        <thead>
          <tr className="bg-slate-500">
            <th className="border px-4 py-2 text-slate-300">L.p.</th>
            <th className="border px-4 py-2 text-slate-300">Imie</th>
            <th className="border px-4 py-2 text-slate-300">Nazwisko</th>
            <th className="border px-4 py-2 text-slate-300">Średnia</th>
          </tr>
        </thead>
        <tbody>
          {classData.students.map((student, index) => (
            <tr key={index}>
              <td className="border px-4 py-2 text-slate-100">{index + 1}</td>
              <td className="border px-4 py-2 text-slate-100">{student.firstName}</td>
              <td className="border px-4 py-2 text-slate-100">{student.lastName}</td>
              <td className="border px-4 py-2 text-slate-100">{student.average}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="font-semibold text-slate-300 relative">Średnia klasy: {averageClass}</div>
      <button onClick={() => navigate(`/class/${className}/add-student`)} className="bg-slate-800 text-slate-300 px-4 py-2 rounded absolute bottom-0 right-0">
          Dodaj ucznia
      </button>
      </div>
      <button onClick={() => navigate("/")} className="absolute bottom-5 right-5 p-2.5 text-slate-300 bg-slate-800 rounded ">
        Strona glowna
      </button>
    
    </>
  );
};

export default ClassDetailsPage;
