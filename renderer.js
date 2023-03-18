const counterElement = document.getElementById('counter');
const counterValueElement = document.getElementById('counter-value');
const nameInputElement = document.getElementById('name');
const pointsInputElement = document.getElementById('points');
const reasonInputElement = document.getElementById('reason');
const addButton = document.getElementById('add');
const subtractButton = document.getElementById('subtract');
const namesList = document.getElementById('names');
const formElement = document.querySelector('form');
const newNameInputElement = document.getElementById('new-name');
const addNameButton = document.getElementById('add-name');
const removeNameInputElement = document.getElementById('remove-name');
const removeButton = document.getElementById('remove');
const historyList = document.getElementById('history');

// Initialize the counter, the counter value, and the names array
let counter = parseInt(localStorage.getItem('counter')) || 0;
let counterValue = parseInt(localStorage.getItem('counterValue')) || 0; // Load the counter value from localStorage
const names = JSON.parse(localStorage.getItem('names')) || [
  { name: 'Anej', points: 0, history: [] },
  { name: 'Marko', points: 0, history: [] },
  { name: 'Tadej', points: 0, history: [] }
];

// Update the window title with the counter value every second
setInterval(() => {
  counter++;
  counterElement.textContent = `${counter}`;
}, 1000);

// Listen for the form submit event
formElement.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page
});

// Listen for the add button click event
addButton.addEventListener('click', () => {
  const name = nameInputElement.value.trim();
  const points = parseInt(pointsInputElement.value);
  const reason = reasonInputElement.value.trim();
  if (name && !isNaN(points)) {
    const index = names.findIndex((n) => n.name === name);
    if (index !== -1) {
      names[index].points += points;
      names[index].history.push({ action: 'add', points, reason, date: new Date() });
      updateNames();
      updateHistory();
      saveData();
    } else {
      console.log(`Error: ${name} does not exist`);
    }
  }
});

// Listen for the subtract button click event
subtractButton.addEventListener('click', () => {
  const name = nameInputElement.value.trim();
  const points = parseInt(pointsInputElement.value);
  const reason = reasonInputElement.value.trim();
  if (name && !isNaN(points)) {
    const index = names.findIndex((n) => n.name === name);
    if (index !== -1) {
      names[index].points -= points;
      names[index].history.push({ action: 'subtract', points, reason, date: new Date() });
      updateNames();
      updateHistory();
      saveData();
    } else {
      console.log(`Error: ${name} does not exist`);
    }
  }
});

// Listen for the add name button click event
addNameButton.addEventListener('click', () => {
  const name = newNameInputElement.value.trim();
  if (name) {
    const index = names.findIndex((n) => n.name === name);
    if (index === -1) {
      names.push({ name, points: 0, history: [] });
      updateNames();
      updateHistory();
      saveData();
    } else {
      console.log(`Error: ${name} already exists`);
    }
  }
})
removeButton.addEventListener('click', () => {
  const name = removeNameInputElement.value.trim();
  if (name) {
    const index = names.findIndex((n) => n.name === name);
    if (index !== -1) {
      names.splice(index, 1);
      updateNames();
      updateHistory();
      saveData();
    } else {
      console.log(`Error: ${name} does not exist`);
    }
  }
});
// Listen for the remove history button click event
historyList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') { // Check if the clicked element is a button
    const name = event.target.dataset.name;
    const index = names.findIndex((n) => n.name === name);
    if (index !== -1) {
      const historyIndex = event.target.dataset.index;
      names[index].history.splice(historyIndex, 1); // Remove the history entry from the array
      updateHistory(); // Update the history in the DOM
      saveData(); // Save the data to localStorage
    }
  }
});

// Display the names in the names list
function updateNames() {
  namesList.innerHTML = '';
  for (const name of names) {
    const li = document.createElement('li');
    li.textContent = `${name.name} (${name.points})`;
    namesList.appendChild(li);
  }
}

// Display the history in the history list
function updateHistory() {
  historyList.innerHTML = '';
  for (const name of names) {
    for (let i = 0; i < name.history.length; i++) {
      const entry = name.history[i];
      const li = document.createElement('li');
      const actionText = entry.action === 'add' ? 'added' : 'subtracted';
      li.textContent = `${name.name} ${actionText} ${entry.points} points for ${entry.reason} on ${entry.date.toLocaleString()} `;
      const button = document.createElement('button'); // Create a button to delete the history entry
      button.textContent = 'Delete';
      button.dataset.name = name.name;
      button.dataset.index = i;
      li.appendChild(button); // Append the button to the history entry
      historyList.appendChild(li);
    }
  }
}

// Save the data to localStorage
function saveData() {
  localStorage.setItem('counter', counter);
  localStorage.setItem('counterValue', counterValue); // Save the counter value to localStorage
  localStorage.setItem('names', JSON.stringify(names));
}

updateNames();
updateHistory();