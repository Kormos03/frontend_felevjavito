//import './style.css'
import { Person, People } from './People';

const people: Person[] = [];

function newestVolunteer() {
  let id: number = 0;
  for (const element of people) {
    id = element.id;
  }
  let newestVolunteer = people.find(volunteer => volunteer.id == id);
  if (newestVolunteer) {
    document.getElementById('legujabbOnkentes')!.textContent = 'Legújabb Önkéntes: ' + newestVolunteer.name + ', ' + newestVolunteer.age + ', ' + newestVolunteer.city;
  }
}


function numberOfVolunteer() {
  let sum = 0;
  for (const element of people) {
    sum++;
  }
  document.getElementById('onkentesekSzama')!.textContent = 'Önkéntesek száma: ' + sum.toString();
}

function averageAge() {
  let sum = 0;
  for (const element of people) {
    sum += element.age;
  }
  document.getElementById('atlagEletkor')!.textContent = 'Átlagéletkor: ' + Math.round((sum / people.length)).toString();
}

function addPeople() {
  try {
    const name = (document.getElementById('nameInp') as HTMLInputElement).value;
    const age = parseInt((document.getElementById('ageInp') as HTMLInputElement).value);
    const city = (document.getElementById('cityInp') as HTMLInputElement).value;
    if (name.trim() == '' || name == null) { document.getElementById('errorMessage')!.textContent = 'A név mező nem lehet üres!'; return }
    if (age < 1 || isNaN(age) || age > 130) { document.getElementById('errorMessage')!.textContent = 'A kor mezőnek számnak kell lennie és 1 és 130 között kell lennie!'; return }
    if (city.trim() == '' || city == null) { document.getElementById('errorMessage')!.textContent = 'A város mező nem lehet üres!'; return }
    let id: number = 1;
    for (const element in people) {
      console.log(element)
      id++;
    }
    const newPerson: Person = { id, name, age, city };
    console.log(newPerson)
    people.push(newPerson);
    console.log(people);
    loadPeople(people);
    averageAge();
    numberOfVolunteer();
    newestVolunteer();
  }
  catch (e) {
    document.getElementById('errorMessage')!.textContent = e.message;
  }
}

function removeMind() {
  const rem = document.getElementById('lista');
  rem!.innerHTML = ``;
}

async function loadPeople(emberek: Person[]) {
  removeMind();
  for (const element of emberek) {
    const li = document.createElement('li');
    li.textContent = `
    Név: ${element.name}
    Kor: ${element.age}
    Város: ${element.city}
    `;
    const lista = document.getElementById('lista');
    if (lista) {
      lista.appendChild(li);
    }
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  let eredmeny = await fetch('people.json')
  if (!eredmeny.ok) {
    throw new Error('Hiba a fálj betöltésekor');
  }
  let emberek = await eredmeny.json() as Person[];
  emberek.forEach((elem) => {
    people.push(elem);
  })

  loadPeople(people);
  averageAge();
  numberOfVolunteer();
  newestVolunteer();
  document.getElementById('submitInp')!.addEventListener('click', addPeople);

})
