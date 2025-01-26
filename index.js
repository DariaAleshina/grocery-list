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

//  ****** EDIT VIEW **********
let editFlag = false;
let editID = '';

//  ****** STORE GROCERY DATA **********
let groceryListItemsArray = [];

// ****** FUNCTIONS **********

const capitalizeWords = function (string) {
    return string
        .toLowerCase()
        .split(" ")
        .map(word => word[0].toUpperCase() + word.slice(1))
        .join(" ");
};

const setFormBackToDefaultSettings = function () {
    groceryInput.value = '';
    editFlag = false;
    editID = '';
    btnSubmit.textContent = 'add';
}

const renderItem = function (id, value) {
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
    groceryContainer.classList.add('show-container');
}

const getDataFromLocalStorageAndRender = function () {
    const data = JSON.parse(localStorage.getItem('grocery-list'));
    if (!data) return;
    groceryListItemsArray = data;
    groceryListItemsArray.forEach(item => {
        renderItem(item.id, item.value);
    });
}

const saveDataToLocalStorage = function () {
    localStorage.setItem('grocery-list', JSON.stringify(groceryListItemsArray));
}

const resetDataStorage = function () {
    localStorage.removeItem('grocery-list');
    location.reload();
}

const displayAlert = function (msg, color) {
    alert.textContent = msg;
    alert.classList.add(`alert-${color}`); // 'red' or 'green'

    // remove alert in 1 sec 
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${color}`);
    }, 1000);
}

const addNewItemToTheList = function (id, value) {
    // Capitalise incoming data
    value = capitalizeWords(value);

    // Display data
    renderItem(id, value);
    groceryContainer.classList.add('show-container');
    displayAlert('item added to the list', 'green');

    // Store data
    groceryListItemsArray.push({ id: id, value: value })
    saveDataToLocalStorage();
    setFormBackToDefaultSettings();
}

const editItem = function (editID, value) {
    value = capitalizeWords(value);

    // change data value in storage
    const index = groceryListItemsArray.findIndex(item => item.id === editID);
    groceryListItemsArray[index].value = value;
    saveDataToLocalStorage();

    // display value & alert
    document.querySelector(`[data-id="${editID}"]`).querySelector('.title').textContent = value;
    displayAlert('item edited', 'green')
    // set to default valuse
    setFormBackToDefaultSettings();

}

const deleteElement = function (itemEl) {
    const itemId = itemEl.dataset.id;
    const index = groceryListItemsArray.findIndex(item => item.id === itemId);
    groceryListItemsArray.splice(index, 1);
    saveDataToLocalStorage();
    displayAlert(`item "${itemEl.textContent}" was deleted`, 'red');
    itemEl.remove();
};

const submitForm = function (event) {
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

    if (editFlag) editItem(editID, value);

}

// ****** INITIAL APP SETUP **********
setFormBackToDefaultSettings();
getDataFromLocalStorageAndRender();

// ****** EVENT LISTENERS **********
// Form Submission
form.addEventListener('submit', submitForm)

// Edit-Delete buttons click
groceryList.addEventListener('click', function (event) {
    const clickedBtn = event.target.closest('button');
    if (!clickedBtn) return;

    const itemEl = event.target.closest('article');

    // if clicked delete
    if (clickedBtn.classList.contains('delete-btn')) deleteElement(itemEl);

    // if clicked edit
    if (clickedBtn.classList.contains('edit-btn')) {
        editFlag = true;
        groceryInput.value = itemEl.querySelector('.title').textContent;
        btnSubmit.textContent = 'edit';
        editID = itemEl.dataset.id;
    }
})

// Cleat-All button click
btnClearAll.addEventListener('click', resetDataStorage)
