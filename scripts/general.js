if (!localStorage.getItem('todoList')) {
  const defaultValue = JSON.stringify([
    { title: 'Почистить зубы', completedDates: [] },
    { title: 'Почитать книгу', completedDates: [] },
  ]);

  localStorage.setItem('todoList', defaultValue);
}

let taskList = JSON.parse(localStorage.getItem('todoList'));

function getTodayFormatted() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const nowDate = date.toLocaleDateString(
    'ru-RU',
    `${day}`.padStart(2, '0'),
    `${month}`.padStart(2, '0'),
    `${year}`
  );
  return nowDate;
}

function getShortDateFormatted() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const nowDate = `${day}`.padStart(2, '0') + '.' + `${month}`.padStart(2, '0');
  return nowDate;
}

function getNDaysAgoFormatted(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const day = date.getDate();
  const month = date.getMonth() + 1;

  const nowDate = `${day}`.padStart(2, '0') + '.' + `${month}`.padStart(2, '0');
    return nowDate;
}

function getNDaysAgoFormattedFull(n) {
  const date = new Date();
  date.setDate(date.getDate() - n);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const nowDate = date.toLocaleDateString('ru-RU', `${day}`.padStart(2,'0'),`${month}`.padStart(2,'0'), `${year}`);
    return nowDate;
}

