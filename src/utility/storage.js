import { InitalData } from "./initialdata";
const initData = () => {
    if (!localStorage.getItem("classes")) {
      localStorage.setItem("classes", JSON.stringify(InitalData));
    }
  };
  
  const getClasses = () => JSON.parse(localStorage.getItem("classes")) || [];
  
  const getClassByName = (name) =>
    getClasses().find((cls) => cls.name === name);
  
  const addStudentToClass = (className, student) => {
    const classes = getClasses();
    const index = classes.findIndex((cls) => cls.name === className);
    if (index !== -1) {
      classes[index].students.push(student);
      localStorage.setItem("classes", JSON.stringify(classes));
    }
  };
  
  export { initData, getClasses, getClassByName, addStudentToClass };
  