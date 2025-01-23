'use strict';

// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const groceryContainer = document.querySelector('.grocery-container');
const groceryList = document.querySelector('.grocery-list');
const groceryInput = document.querySelector('#grocery');

const groceryItem = document.querySelector('.grocery-item');
const groceryTitle = document.querySelector('.title');

//  ****** SELECT ITEMS - buttons **********
const btnSubmit = document.querySelector('.submit-btn');
const btnEdit = document.querySelector('.edit-btn');
const btnDelete = document.querySelector('.delete-btn');
const btnClearAll = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = '';

// ****** FUNCTIONS **********

const displayAlert = function (msg, color) {
    alert.textContent = msg;
    alert.classList.add(`alert-${color}`); // 'red' or 'green'

    // remove alert in 4 sec
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${color}`);
    }, 2000);
}

const addNewItemToTheList = function (id, value) {
    console.log('adding new item mode');
    const html = `
        <article class="grocery-item" data-id="${id}">
            <p class="title">${value}</p>
            <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fas fa-edit"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fas fa-trash"></i>
            </button>
            </div>
        </article>
    `;
    groceryList.insertAdjacentHTML('beforeend', html);
    displayAlert('item added to the list', 'green');
    groceryContainer.classList.add('show-container');

    // add to local storage
    localStorage.setItem('grocery-list', JSON.stringify({ id: id, value: value }));

    groceryInput.value = '';
}

const addItem = function (event) {
    event.preventDefault();

    const id = new Date().getTime().toString();
    const value = groceryInput.value;

    // check for faulsy input - add alert & quit
    if (!value) {
        displayAlert('please, type an item', 'red');
        return;
    }

    // check the mode
    if (!editFlag) addNewItemToTheList(id, value);

    if (editFlag) {
        console.log('editing mode');
    }



}

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem)



// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********