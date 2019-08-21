const ul = document.querySelector(`ul`);
const li = document.getElementsByClassName(`task`);
const inputSearch = document.querySelector('.searchInput');
const inputAdd = document.querySelector('.addInput');
const divOfTask = document.querySelector('.listOfTask span');
const form = document.querySelector('form');
const data = {
  numberOfTask: li.length,
}
const toDoList = []
divOfTask.textContent = li.length;
const removeTask = (e) => {
  // e.target.parentNode.remove();
  const index = e.target.parentNode.dataset.key;

  toDoList.splice(index, 1);
  renderList();
  divOfTask.textContent = li.length;
  // e.target.parentNode.style.color = 'red';
  // const index = e.target.dataset.key;
  // document.querySelector(`li[data-key="${index}"]`).remove();

}
document.querySelectorAll('button[data-key]').forEach(item => item.addEventListener('click', removeTask));


const searchTask = (e) => {

  const searchTxt = e.target.value.toLowerCase();
  let tasks = [...toDoList];
  tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchTxt));
  ul.textContent = "";
  if (searchTxt == "") {
    renderList();
  } else {
    tasks.forEach((li) => {
      ul.appendChild(li)
      // divOfTask.textContent = tasks.length;
    });
  }
  if (tasks) {
    divOfTask.textContent = li.length;
  } else {
    divOfTask.textContent = 0;
  }
}
inputSearch.addEventListener('input', searchTask);

const addTasks = (e) => {
  e.preventDefault();
  const index = li.length + 1;
  const tittleTask = inputAdd.value;
  if (inputAdd.value !== "") {
    const createNewTask = document.createElement('li');
    createNewTask.className = "task"
    createNewTask.innerHTML = tittleTask + `<div data-key="${index}"></div>`;
    toDoList.push(createNewTask);
    renderList();
    ul.appendChild(createNewTask);


    createNewTask.querySelector('div').addEventListener('click', removeTask);
    divOfTask.textContent = li.length;
  }
}
form.addEventListener('submit', addTasks);

const renderList = () => {
  ul.textContent = "";
  toDoList.forEach((toDoElement, key) => {
    toDoElement.dataset.key = key;
    ul.appendChild(toDoElement);
    inputAdd.value = "";
  })
}