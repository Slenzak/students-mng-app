import { useState, useEffect } from "react";
import { addStudentToClass, getClasses } from "../utility/storage";
import { useNavigate, useParams } from "react-router-dom";

const AddStudentPage = () => {
  const { className } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [average, setAverage] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const classData = getClasses().find((cls) => cls.name === className);
    if (classData) {
      setStudents(classData.students);
    }
  }, [className]);

  const validate = () => {
    if (firstName.length < 2 || lastName.length < 2) {
      return "Imię i nazwisko muszą mieć co najmniej 2 znaki";
    }
    const avg = parseFloat(average);
    if (isNaN(avg) || avg < 0 || avg > 6) {
      return "Średnia musi być liczbą od 0 do 6";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      setSuccess(false);
      return;
    }

    addStudentToClass(className, {
      firstName,
      lastName,
      average: parseFloat(average),
    });

    setSuccess(true);
    setError("");
    setFirstName("");
    setLastName("");
    setAverage("");

    const updatedClass = getClasses().find((cls) => cls.name === className);
    if (updatedClass) {
      setStudents(updatedClass.students);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-slate-300">Dodaj ucznia do klasy {className}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Imię"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="text"
          placeholder="Nazwisko"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <input
          type="number"
          placeholder="Średnia ocen"
          value={average}
          onChange={(e) => setAverage(e.target.value)}
          className="border rounded p-2 w-full"
          step="0.1"
        />
        {error && <div className="text-red-400">{error}</div>}
        {success && <div className="text-green-400">Uczeń dodany!</div>}
        <button className="bg-slate-800 text-slate-300 px-4 py-2 rounded" type="submit">
          Dodaj ucznia
        </button>
      </form>

      <hr className="my-6" />

      <h2 className="text-xl font-semibold text-slate-300">Uczniowie klasy {className}</h2>
      <table className="w-full border mt-2 bg-slate-400">
        <thead>
          <tr className="text-slate-300 bg-slate-500">
            <th className="border p-2">L.p.</th>
            <th className="border p-2">Imię</th>
            <th className="border p-2">Nazwisko</th>
            <th className="border p-2">Średnia</th>
          </tr>
        </thead>
        <tbody className="text-slate-100">
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Brak uczniów
              </td>
            </tr>
          ) : (
            students.map((student, idx) => (
              <tr key={idx}>
                <td className="border p-2 text-center">{idx + 1}</td>
                <td className="border p-2">{student.firstName}</td>
                <td className="border p-2">{student.lastName}</td>
                <td className="border p-2 text-center">{student.average}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <button onClick={() => navigate(`/class/${className}`)} className="absolute bottom-5 right-5 p-2.5 text-slate-300 bg-slate-800 rounded ">
        Powrot
      </button>
    </div>
  );
};

export default AddStudentPage;
