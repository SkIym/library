// global
const tableDisplay = document.getElementById("main-table");
const newBook = document.getElementById("add-button");
const newBookFormContainer = document.getElementById("add-book-container");
const bodyOverlay = document.getElementById("cover-body");
const cancelNewBook = document.getElementById("cancel-add-button");
const newBookForm = document.getElementById("add-book-form");

const newBookTitle = document.getElementById("book-title");
const newBookAuthor = document.getElementById("book-author");
const newBookPages = document.getElementById("book-pages");
let newBookRead = document.getElementById("read-checkbox"); 

let addingBook = false;

const tableHeader = document.createElement("tr");
const tableTitle = document.createElement("th");
tableTitle.textContent = "Title";
const tableAuthor = document.createElement("th");
tableAuthor.textContent = "Author";
const tablePages = document.createElement("th");
tablePages.textContent = "Pages";
const tableStatus = document.createElement("th");
tableStatus.textContent = "Status";
const tableAction = document.createElement("th");
tableAction.textContent = "Action";

tableHeader.appendChild(tableTitle);
tableHeader.appendChild(tableAuthor);
tableHeader.appendChild(tablePages);
tableHeader.appendChild(tableStatus);
tableHeader.appendChild(tableAction);

// store books
let myLibrary = [{title: "HPTGOF", author: "Rowling", pages: "752"}];

// Book object generator
function Book(title, author, pages) {
  this.title = title; 
  this.author = author;
  this.pages = pages;
}

newBookForm.addEventListener("submit", (e) => {
  addBookToLibrary(e);
  loadLibraryToTable();
});
// Add Book to library array
function addBookToLibrary(e) {
  e.preventDefault();
  const addedBook = new Book(newBookTitle.value, newBookAuthor.value, newBookPages.value);
  console.log(addedBook)
  myLibrary.push(addedBook);
}

// Loads each book on the page
function loadLibraryToTable() {
  
  // refresh table
  tableDisplay.innerHTML = "";
  tableDisplay.appendChild(tableHeader);

  myLibrary.forEach((book) => {
    const bookRow = document.createElement("tr");

    const bookTitle = document.createElement("td");
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement("td");
    bookAuthor.textContent = book.author;

    const bookPages = document.createElement("td");
    bookPages.textContent = book.pages;

    const blankCell = document.createElement("td");
    blankCell.textContent = "";

    bookRow.appendChild(bookTitle)
    bookRow.appendChild(bookAuthor)
    bookRow.appendChild(bookPages)
    tableDisplay.appendChild(bookRow);
  });
  
}

// User wants to add new book
newBook.addEventListener("click", showNewBookForm);
function showNewBookForm() {
  newBookFormContainer.style.display = "block";
  bodyOverlay.style.display = "block";
}

cancelNewBook.addEventListener("click", hideNewBookForm);
function hideNewBookForm() {
  newBookFormContainer.style.display = "none";
  bodyOverlay.style.display = "none";
}

window.onload = () => {

  loadLibraryToTable();

};