let div = document.querySelector("div");
console.log(div);

let table = document.body.firstElementChild;

for (let i = 0; i < table.rows.length; i++) {
    let row = table.rows[i];
    row.cells[i].style.backgroundColor = 'red';
}

let elem = document.querySelector('[data-widget-name]');
console.log(elem.getAttribute('data-widget-name'));

let selector = 'a[href*="://"]:not([href^="http://internal.com"])';
let links = document.querySelectorAll(selector);

links.forEach(link => link.style.color = 'orange');

function clear(elem) {
    while (elem.firstChild) {
      elem.firstChild.remove();
    }
}

clear(elem)

let data = {
    "Рыбы": {
      "форель": {},
      "лосось": {}
    },

    "Деревья": {
      "Огромные": {
        "секвойя": {},
        "дуб": {}
      },
      "Цветковые": {
        "яблоня": {},
        "магнолия": {}
      }
    }
};

function createTree(container, obj) {
    container.append(createTreeDom(obj));
}

function createTreeDom(obj) {
    if (!Object.keys(obj).length) return;

    let ul = document.createElement('ul');

    for (let key in obj) {
      let li = document.createElement('li');
      li.innerHTML = key;

      let childrenUl = createTreeDom(obj[key]);
      if (childrenUl) {
        li.append(childrenUl);
      }

      ul.append(li);
    }

    return ul;
}

let container = document.getElementById('container');
createTree(container, data);

function createCalendar(elem, year, month) {

    let mon = month - 1; 
    let d = new Date(year, mon);

    let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

    for (let i = 0; i < getDay(d); i++) {
      table += '<td></td>';
    }

    while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';

      if (getDay(d) % 7 == 6) {
        table += '</tr><tr>';
      }

      d.setDate(d.getDate() + 1);
    }

    if (getDay(d) != 0) {
      for (let i = getDay(d); i < 7; i++) {
        table += '<td></td>';
      }
    }

    table += '</tr></table>';

    elem.innerHTML = table;
}

function getDay(date) { 
    let day = date.getDay();
    if (day == 0) day = 7; 
    return day - 1;
}

createCalendar(calendar, 2012, 9);

let timerId;

function update() {
  let clock = document.getElementById('clock');
  let date = new Date();

  let hours = date.getHours();
  if (hours < 10) hours = '0' + hours;
  clock.children[0].innerHTML = hours;

  let minutes = date.getMinutes();
  if (minutes < 10) minutes = '0' + minutes;
  clock.children[1].innerHTML = minutes;

  let seconds = date.getSeconds();
  if (seconds < 10) seconds = '0' + seconds;
  clock.children[2].innerHTML = seconds;
}

function clockStart() {
  timerId = setInterval(update, 1000);
  update(); 
}

function clockStop() {
  clearInterval(timerId);
}

clockStart();

document.getElementById('hider').onclick = function() {
  document.getElementById('text').hidden = true;
}

let menuElem = document.getElementById('sweeties');
let titleElem = menuElem.querySelector('.title');

titleElem.onclick = function() {
  menuElem.classList.toggle('open');
};

let panes = document.querySelectorAll('.pane');

  for(let pane of panes) {
    pane.insertAdjacentHTML("afterbegin", '<button class="remove-button">[x]</button>');
    pane.firstChild.onclick = () => pane.remove();
}

let selectedOption = genres.options[genres.selectedIndex];
alert( selectedOption.value );

let newOption = new Option("Классика", "classic");
genres.append(newOption);

newOption.selected = true;

function showCover() {
  let coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';

  // убираем возможность прокрутки страницы во время показа модального окна с формой
  document.body.style.overflowY = 'hidden';

  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById('cover-div').remove();
  document.body.style.overflowY = '';
}

function showPrompt(text, callback) {
  showCover();
  let form = document.getElementById('prompt-form');
  let container = document.getElementById('prompt-form-container');
  document.getElementById('prompt-message').innerHTML = text;
  form.text.value = '';

  function complete(value) {
    hideCover();
    container.style.display = 'none';
    document.onkeydown = null;
    callback(value);
  }

  form.onsubmit = function() {
    let value = form.text.value;
    if (value == '') return false; // игнорируем отправку пустой формы

    complete(value);
    return false;
  };

  form.cancel.onclick = function() {
    complete(null);
  };

  document.onkeydown = function(e) {
    if (e.key == 'Escape') {
      complete(null);
    }
  };

  let lastElem = form.elements[form.elements.length - 1];
  let firstElem = form.elements[0];

  lastElem.onkeydown = function(e) {
    if (e.key == 'Tab' && !e.shiftKey) {
      firstElem.focus();
      return false;
    }
  };

  firstElem.onkeydown = function(e) {
    if (e.key == 'Tab' && e.shiftKey) {
      lastElem.focus();
      return false;
    }
  };

  container.style.display = 'block';
  form.elements.text.focus();
}

document.getElementById('show-button').onclick = function() {
  showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
    alert("Вы ввели: " + value);
  });
};

showPrompt("Введите что-нибудь<br>...умное :)", function(value) {
  alert(value);
});