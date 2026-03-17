const studentForm = document.getElementById("studentForm");
const nameInput = document.getElementById("name");
const gradeInput = document.getElementById("grade");
const studentList = document.getElementById("studentList");
const sortBtn = document.getElementById("sortBtn");

let students = JSON.parse(localStorage.getItem("students")) || [];

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent(name, grade) {
  students.push({ name, grade });
  saveStudents();
  renderStudents();
}

function deleteStudent(index) {
  students.splice(index, 1);
  saveStudents();
  renderStudents();
}

function renderStudents() {
  studentList.innerHTML = "";
  students.forEach((student, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="info">
        <span class="name">${student.name}</span>
        <span class="grade">${student.grade}</span>
      </div>
      <div class="actions">
        <button class="edit">✏️</button>
        <button class="delete">❌</button>
      </div>
    `;

    // Botón eliminar
    li.querySelector(".delete").addEventListener("click", () => deleteStudent(index));

    // Botón editar
    li.querySelector(".edit").addEventListener("click", () => {
      li.innerHTML = `
        <input type="text" class="editName" value="${student.name}">
        <input type="number" class="editGrade" value="${student.grade}">
        <button class="save">💾 Save</button>
        <button class="cancel">❌ Cancel</button>
      `;

      // Guardar cambios
      li.querySelector(".save").addEventListener("click", () => {
        const newName = li.querySelector(".editName").value.trim();
        const newGrade = parseInt(li.querySelector(".editGrade").value);

        if (newName && !isNaN(newGrade)) {
          students[index].name = newName;
          students[index].grade = newGrade;
          saveStudents();
          renderStudents();
        } else {
          alert("Invalid input");
        }
      });

      // Cancelar cambios
      li.querySelector(".cancel").addEventListener("click", () => {
        renderStudents();
      });
    });

    studentList.appendChild(li);
  });
}

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const grade = parseInt(gradeInput.value);

  if (name && !isNaN(grade)) {
    addStudent(name, grade);
    nameInput.value = "";
    gradeInput.value = "";
  }
});

sortBtn.addEventListener("click", function () {
  students.sort((a, b) => b.grade - a.grade);
  saveStudents();
  renderStudents();
});

renderStudents();
