import "./App.css";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import MainPage from "./pages/mainpage";
import { useEffect } from "react";
import ClassDetailsPage from "./pages/classdetailpage";
import AddStudentPage from "./pages/addstudentpage";
import { initData } from "./utility/storage";
function App() {
    useEffect(() =>{
      initData();
    },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/class/:className" element={<ClassDetailsPage />}/>
        <Route path="/class/:className/add-student" element={<AddStudentPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
