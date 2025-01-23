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
const addItem = function (event) {
    event.preventDefault();

}

// ****** EVENT LISTENERS **********
form.addEventListener('submit', addItem)



// ****** LOCAL STORAGE **********

// ****** SETUP ITEMS **********