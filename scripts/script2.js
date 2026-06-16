const tableBody = document.querySelector('.doneHab');
const rowDate = document.querySelector('.rowDate tr');
const boxDone = document.querySelector('.habitDone');
const target = document.querySelector('.target');
const mainBlock = document.querySelector('.mainBlock');

function renderTable() {
  tableBody.innerHTML = '';
  rowDate.innerHTML = '';
  rowDate.insertAdjacentHTML('beforeend', `<th></th>`);

  for (let i = 6; i >= 0; i--) {
    rowDate.insertAdjacentHTML(
      'beforeend',
      `<th>${getNDaysAgoFormatted(i)}</th>`
    );
  }

  taskList.forEach((task) => {
    tableBody.insertAdjacentHTML(
      'beforeend',
      `
        <tr>
          <td>${task.title}</td>
            ${new Array(7).fill(null).map((_, index) => `
              <td>${task.completedDates.includes(getNDaysAgoFormattedFull(6 - index)) ? '✅': '❌'}</td>
            `).join('')}
        </tr>
      `
    );
  });
}

renderTable();

function habitBox() {
boxDone.innerHTML = '';
taskList.forEach((task) => {
  const count = sumDays(task.completedDates); 
  boxDone.insertAdjacentHTML('beforeend', 
    `
     <div class="blocks">
      <p class = "${ count === 7 ?  'done' : 'notDone'}">${Math.round((count * 100)/7)}%</p>
      <div class="textBlock">
      <h3 class="titleHab">${task.title}</h3>
      <p class="target">${count} from 7 days target</p>
      </div>
      <p class = "${ count === 7 ?  'done' : 'notDone'}">${ count === 7 ? 'Achieved' : 'Unachieved'}</p>
    </div>
    `
  );
});
}

habitBox ();

function sumDays (dates) {
  let sum = 0;
 for (let i = 0; i < 7; i++) {
  let date = getNDaysAgoFormattedFull(i);
  if (dates.includes(date)) {
    sum++;
  }
 }
 return sum;
} 

function createBlock () {
const strike = currentStrike(taskList, 'completedDates');
const longStrike = longestStrike(taskList, 'completedDates'); 
mainBlock.insertAdjacentHTML('beforeend', 
`<h1 style="font-size: 36px;">${strike} Days</h1>
      <p1 style="font-size: 14px;">Your current strike!</p1>
      <h2 style="font-size: 24px;">${longStrike} Days</h2>
      <p2 style="font-size: 11px;">Your longest strike</p2>`
);
};

createBlock();

function currentStrike (array, dateArray) {
  let sumStrike = 0;
  for (let i = 0; i < 7; i++) {
  let date = getNDaysAgoFormattedFull(i);
  if (array.every(item => item[dateArray].includes(date))) {
    sumStrike++;
  }
  }
  return sumStrike;
};

function longestStrike (array, dateArray){
let sumStrike = 0;
let longest = 0;
  for (let i = 0; i < 7; i++) {
  let date = getNDaysAgoFormattedFull(i);
  if (array.every(item => item[dateArray].includes(date))) {
    sumStrike++;
      if (sumStrike > longest) {
   longest = sumStrike;
  }
  }else {
    sumStrike = 0;
  }
}
  return longest;
}


