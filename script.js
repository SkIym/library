// global
const tableDisplay = document.getElementById("main-table");
const newBook = document.getElementById("add-button");
const newBookFormContainer = document.getElementById("add-book-container");
const bodyOverlay = document.getElementById("cover-body");
const cancelNewBook = document.getElementById("done-button");
const newBookForm = document.getElementById("add-book-form");
let removeBookBtns = [];
let statusBtns = [];

let newBookTitle = document.getElementById("book-title");
let newBookAuthor = document.getElementById("book-author");
let newBookPages = document.getElementById("book-pages");

const tableHeader = document.createElement("tr");
const tableTitle = document.createElement("th");
tableTitle.textContent = "Title";
tableTitle.style.width = "25vw";
const tableAuthor = document.createElement("th");
tableAuthor.textContent = "Author";
const tablePages = document.createElement("th");
tablePages.textContent = "Pages";
const tableStatus = document.createElement("th");
tableStatus.textContent = "Status";
tableStatus.style.width = "15%";
const tableAction = document.createElement("th");
tableAction.style.width = "15%";
tableAction.textContent = "Action";

tableHeader.appendChild(tableTitle);
tableHeader.appendChild(tableAuthor);
tableHeader.appendChild(tablePages);
tableHeader.appendChild(tableStatus);
tableHeader.appendChild(tableAction);

// store books
let myLibrary = [];

// Book object generator
function Book(title, author, pages) {
  this.title = title; 
  this.author = author;
  this.pages = pages;
}

// define changeStatus()
Book.prototype.changeStatus = function() {
  let btn = document.getElementById(`statusBtn${myLibrary.indexOf(this)}`)
  let status = btn.textContent;
  if (status == "Not Read") {
    btn.textContent = "Read";
    btn.classList.remove("not-read");
    btn.classList.add("yes-read");
    this.read = true
  }
  else {
    btn.textContent = "Not Read";
    btn.classList.remove("yes-read");
    btn.classList.add("not-read");
    this.read = false
  }
}

// Add Book to library array
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();
  updateNewBook();
  addBookToLibrary(e);
  loadLibraryToTable();
});

function addBookToLibrary(e) {
  e.preventDefault();
  const addedBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value);

  // reset input fields
  newBookTitle.value = "";
  newBookAuthor.value = "";
  newBookPages.value = "";
  myLibrary.push(addedBook);
}

// Loads each book on the page
function loadLibraryToTable() {

  // refresh table
  tableDisplay.innerHTML = "";
  tableDisplay.appendChild(tableHeader);

  myLibrary.forEach((book) => {

    let bookIndex = myLibrary.indexOf(book);
    const bookRow = document.createElement("tr");
    bookRow.id = `row${bookIndex}`;

    const bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("td");
    bookPages.textContent = book.pages;

    const bookStatus = document.createElement("td");
    const statusBtn = document.createElement("button");
    statusBtn.classList.add("change-status-btn");

    if(book.read) {
      statusBtn.classList.add("yes-read");  
      statusBtn.id = `statusBtn${bookIndex}`;
      statusBtn.value = `${bookIndex}`;
      statusBtn.textContent = "Read";

    }
    else {
      statusBtn.classList.add("not-read");  
      statusBtn.id = `statusBtn${bookIndex}`;
      statusBtn.value = `${bookIndex}`;
      statusBtn.textContent = "Not Read";
    }
    bookStatus.appendChild(statusBtn);

    const removeBook = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-book-btn");
    removeBtn.value = `${bookIndex}`;
    removeBtn.textContent = "Remove";
    removeBook.appendChild(removeBtn);


    bookRow.appendChild(bookTitle);
    bookRow.appendChild(bookAuthor);
    bookRow.appendChild(bookPages);
    bookRow.appendChild(bookStatus);
    bookRow.appendChild(removeBook);
    tableDisplay.appendChild(bookRow);
  });
  updateAuxButtons();
}

// Function to update new buttons
function updateAuxButtons() {
  removeBookBtns = Array.from(document.querySelectorAll(".remove-book-btn"));
  removeBookBtns.forEach((btn) => {
    btn.addEventListener("click", removeBookFromLibrary);
    btn.onmouseover = (e) => warnRemoval(e);
    btn.onmouseout = (e) => removeWarnRemoval(e);
  });
  
  statusBtns = Array.from(document.querySelectorAll(".change-status-btn"));
  statusBtns.forEach((btn) => {
    btn.addEventListener("click", () => {myLibrary[btn.value].changeStatus()});
  });
}

// Function to update newly added book
function updateNewBook() {
  newBookTitle = document.getElementById("book-title");
  newBookAuthor = document.getElementById("book-author");
  newBookPages = document.getElementById("book-pages");
  newBookRead = document.getElementById("read-checkbox"); 
}

// Remove Book from library array 
function removeBookFromLibrary(e) {
  let bookIndex = e.target.value;
  myLibrary.splice(bookIndex, 1);
  loadLibraryToTable();
}

// Warn user by highlighting row
function warnRemoval(e){
  let rowIndex = e.target.value;
  let row = document.getElementById(`row${rowIndex}`);
  row.classList.add("warn-row");
}

function removeWarnRemoval(e){
  let rowIndex = e.target.value;
  let row = document.getElementById(`row${rowIndex}`);
  row.classList.remove("warn-row");
}

// User wants to add new book
newBook.addEventListener("click", showNewBookForm);
function showNewBookForm() {
  newBookFormContainer.style.display = "flex";
  bodyOverlay.style.display = "block";
}

// User does not want to add a new book
cancelNewBook.addEventListener("click", hideNewBookForm);
function hideNewBookForm() {
  newBookFormContainer.style.display = "none";
  bodyOverlay.style.display = "none";
}

window.onload = () => {

  const defaultBook1 = new Book("First Book", "You-Know-Who", "666");
  myLibrary.push(defaultBook1);
  const defaultBook2 = new Book("Second Book", "He-Who-Must-Not-Be-Named", "420");
  myLibrary.push(defaultBook2);

  loadLibraryToTable();

};