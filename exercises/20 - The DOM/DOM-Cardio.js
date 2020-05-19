// Make a div
const div1 = document.createElement('div');

// add a class of wrapper to it
div1.classList.add('wrapper');

// put it into the body
document.body.appendChild(div1);

// make an unordered list
const uList = document.createElement('ul');

// add three list items with the words "one, two three" in them
const li1 = document.createElement('li');
li1.textContent = 'one';
uList.insertAdjacentElement('afterbegin', li1);

const li2 = document.createElement('li');
li2.textContent = 'two';
uList.insertAdjacentElement('beforeend', li2);

const li3 = document.createElement('li');
li3.textContent = 'three';
uList.insertAdjacentElement('beforeend', li3);

// put that list into the above wrapper
div1.insertAdjacentElement('afterbegin', uList);

// create an image
const img = document.createElement('img');
// set the source to an image
img.src = 'https://picsum.photos/500';
// set the width to 250
img.width = 250;
// add a class of cute
img.classList.add('cute');
// add an alt of Cute Puppy
img.alt = 'Cute Puppy';
// Append that image to the wrapper
div1.appendChild(img);

// with HTML string, make a div, with two paragraphs inside of it
const divString = `
  <div>
    <p>Paragraph one</p>
    <p>Paragraph two</p>
  </div>
`;

// put this div before the unordered list from above
uList.insertAdjacentHTML('beforebegin', divString);

// add a class to the second paragraph called warning
div1.firstElementChild.lastElementChild.classList.add('warning');

// remove the first paragraph
div1.firstElementChild.lastElementChild.remove();

// create a function called generatePlayerCard that takes in three arguments: name, age, and height
// have that function return html that looks like this:
// <div class="playerCard">
//   <h2>NAME — AGE</h2>
//   <p>They are HEIGHT and AGE years old. In Dog years this person would be AGEINDOGYEARS. That would be a tall dog!</p>
// </div>
function generatePlayerCard(name, age, height) {
    const divString = `
    <div class="playerCard">
      <h2>${name} — ${age}</h2>
      <p>They are ${height} and ${age} years old. In Dog years this person would be ${age * 7}. That would be a tall dog!</p>
      <button class="button" type="button">Delete</button>
    </div>
    `;
    const myFragment = document.createRange().createContextualFragment(divString);
    return myFragment;
}; 

// make a new div with a class of cards
const div3 = document.createElement('div');
div3.classList.add('cards');

// Have that function make 4 cards
const card1 = generatePlayerCard('Dan', 55, 180);
const card2 = generatePlayerCard('Bob', 32, 190);
const card3 = generatePlayerCard('Chris', 22, 170);
const card4 = generatePlayerCard('Steve', 40, 185);

// append those cards to the div
div3.appendChild(card1);
div3.appendChild(card2);
div3.appendChild(card3);
div3.appendChild(card4);

// put the div into the DOM just before the wrapper element
div1.insertAdjacentElement('beforebegin', div3);

// Bonus, put a delete Button on each card so when you click it, the whole card is removed
// select all the buttons!
const buttons = document.querySelectorAll('.button');

// make out delete function
function del(event) {
  const clickedButton = event.currentTarget;
  clickedButton.parentElement.remove();
}

// loop over them and attach a listener
buttons.forEach(e => e.addEventListener('click', del));
