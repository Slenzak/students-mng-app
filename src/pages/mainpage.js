import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getClasses,initData } from "../utility/storage";

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
  useEffect(() =>{
    initData();
  },[]);

  return (
    <div className="max-w-md mx-auto mt-10 ">
      <form onSubmit={handleSubmit} className="space-y-4 relative">
      <select
          className="border rounded p-2 w-full"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
        >
          <option value="" disabled>Wybierz klasę</option>
          {classNames.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <button type="submit" className="bg-slate-800 text-slate-300 px-4 py-2 rounded absolute top-8 right-0">
          Zobacz szczegóły
        </button>
      </form>
    </div>
  );
};

export default MainPage;
