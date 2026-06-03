const MainDate = document.querySelector('h1');
const doneFull = document.querySelector('.done-full');

MainDate.textContent = 'План на ' + getDateAndMonth();

function getDateAndMonth() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const monthObject = {
    0: 'января',
    1: 'февраля',
    2: 'марта',
    3: 'апреля',
    4: 'мая',
    5: 'июня',
    6: 'июля',
    7: 'августа',
    8: 'сентября',
    9: 'октября',
    10: 'ноября',
    11: 'декабря',
  };

  const DayMonth = `${day} ${monthObject[month]}`; 
  return DayMonth;
}


const taskForm = document.querySelector('form.checkbox-form');
const input = document.querySelector('#addHabit');
const button = document.querySelector('#add-new-habit');

button.addEventListener('click', handleAddTask);

function handleAddTask() {
  taskList.push({ title: input.value, completedDates: [] }); 
  localStorage.setItem('todoList', JSON.stringify(taskList));
  renderList(); 
  input.value = ''; 
}

function handleCheckboxClick(title) {
  taskList.forEach((task) => {
    if (task.title === title) {
      if (!task.completedDates.includes(getTodayFormatted())) {
        task.completedDates.push(getTodayFormatted());
      } else {
        task.completedDates = task.completedDates.filter((item) => {
          return item !== getTodayFormatted();
        });
      }

      localStorage.setItem('todoList', JSON.stringify(taskList));
    }
  });
}

function deleteHabbit(title) {
  const index = taskList.findIndex((task) => {
    return task.title === title;
  });
  taskList.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(taskList));
  renderList();
}

function renderList() {
  taskForm.innerHTML = '';
  taskList.forEach((task) => {
    taskForm.insertAdjacentHTML(
      'beforeend',
      `
        <div class="del">
          <label>
            <!-- если в массиве completedDates есть сегодняшняя дата, значит задача сегодня была выполнена -->
            <input type="checkbox" ${
              task.completedDates.includes(getTodayFormatted()) ? 'checked' : ''
            } class="checkbox" onchange="handleCheckboxClick('${task.title}')">
            <span>${task.title}</span>
          </label>
          <svg onclick="deleteHabbit('${
            task.title
          }')" width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="delete.svg"></use>
          </svg>
        </div>
        <br>
    `
    );
  });
}

renderList();

const allHabits = taskList.length;
const habToday = doneToday(taskList, 'completedDates');
function delBlock (){
doneFull.insertAdjacentHTML ('beforeend',
    ` <div class="done">
        <div class="taskWidgetProgressRing">
            <svg class="taskWidgetProgressRing__svg" width="130" height="130">
              <circle
                class="taskWidgetProgressRing__background"
                cx="65"
                cy="65"
                r="57"
                stroke-width="16"
              />
              <circle
                class="taskWidgetProgressRing__circle"
                cx="65"
                cy="65"
                r="57"
                stroke-width="16"
              />
            </svg>
            <div class="taskWidgetProgressRing__text"></div>
          </div>
          <div class="text">
          <p>${habToday} of ${allHabits} habits</p>
          <p>completed today!</p>
          </div>
          <svg class="pencil"  width="276" height="140" viewBox="0 0 276 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <use href="pencil.svg"></use>
          </svg>
</div>
`
);
}

delBlock();

function doneToday(array, dateArray) {
  let sum = 0;
array.forEach((elem) => {
  if (elem[dateArray].includes(getTodayFormatted())) {
  sum++;
  }
})
return sum;
};

const circle = document.querySelector('.taskWidgetProgressRing__circle');
const text = document.querySelector('.taskWidgetProgressRing__text');

const radius = circle.r.baseVal.value; 
const circumference = 2 * Math.PI * radius; 

circle.style.strokeDasharray = circumference; 
const offset =
  circumference - (habToday / allHabits) * circumference; 
circle.style.strokeDashoffset = offset; 
text.textContent = `${
  Math.round((habToday / allHabits) * 100) || 0
}%`;
