const main = document.querySelector('#main');
const addUserBtn = document.querySelector('#add-user');
const doubleBtn = document.querySelector('#double');
const showMilBtn = document.querySelector('#show-millionaires');
const sortBtn = document.querySelector('#sort');
const calculateBtn = document.querySelector('#calculate-wealth');
const contentHeight = main.scrollHeight;

let data = [];

// Fetch Random User and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api');
  const data = await res.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    get money() {
      return this._money.toLocaleString('cs-CZ', {
        style: 'currency',
        currency: 'CZK',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping: true,
      });
    },
    _money: Math.floor(Math.random() * 10000000),
  };
  addData(newUser);
  checkNumOfPerson();
}

// Double values
function doubleMoney() {
  data = data.map(user => {
    return {
      ...user,
      _money: user._money * 2,
      get money() {
        return this._money.toLocaleString('cs-CZ', {
          style: 'currency',
          currency: 'CZK',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
          useGrouping: true,
        });
      },
    };
  });

  updateDOM();
}

// Sort users by richest
function sortByRichest() {
  data.sort((a, b) => b._money - a._money);
  updateDOM();
}

// Filter only millionaries $$$
function showMillionaires() {
  data = data.filter(user => user._money > 1000000);
  updateDOM();
}

// Calculate the total wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user._money), 0);
  const formattedWealth = wealth.toLocaleString('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    useGrouping: true,
  });
  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formattedWealth}</strong></h3>`;
  main.append(wealthEl);
}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    main.append(element);
  });
}

// Initialization
function init() {
  getRandomUser();
  getRandomUser();
  getRandomUser();
}

// CSS styles in scrollbar
function checkNumOfPerson() {
  if (data.length > 7) {
    main.classList.add('scrollable');
  } else {
    main.classList.remove('scrollable');
  }
}

// Event Listeners.
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByRichest);
showMilBtn.addEventListener('click', showMillionaires);
calculateBtn.addEventListener('click', calculateWealth);

// Start APP
init();
