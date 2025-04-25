import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClasses } from "../utility/storage";

const MainPage = () => {
  const [selectedClass, setSelectedClass] = useState("");
  const [classNames, setClassNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setClassNames(getClasses().map((cls) => cls.name));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClass) {
      navigate(`/class/${selectedClass}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
      <select
          className="border rounded p-2 w-full"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="">Wybierz klasę</option>
          {classNames.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Zobacz szczegóły
        </button>
      </form>
    </div>
  );
};

export default MainPage;
