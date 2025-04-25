const initData = () => {
    if (!localStorage.getItem("classes")) {
      const sample = [
        {
          name: "1A",
          teacher: "Piotr Dobosz",
          students: [
            { firstName: "Michal", lastName: "Wieczorek", average: 4.75 },
            { firstName: "Mateusz", lastName: "Góral", average: 1.5 }
          ]
        },
        {
          name: "2B",
          teacher: "Patryk Jaksender",
          students: [
            { firstName:"Milosz", lastName:"Gruca", average:5.5},
            { firstName:"Ksawier", lastName:"Babelewski", average:4.25}
          ]
        },
        {
            name: "1C",
            teacher: "Profesor Adrian Bak",
            students: [
                { firstName:"Krzys",lastName:"Chudaszek", average:5.5},
                { firstName:"Jakub",lastName:"Chudaszek", average:6}
            ]
        }
      ];
      localStorage.setItem("classes", JSON.stringify(sample));
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
  