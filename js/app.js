// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// AddBookList prototype to UI
UI.prototype.addBookToList = function(book) {
    // tbody
    const list = document.querySelector('#book-list');

    // Create tr element
    const row = document.createElement('tr');

    //  Insert cols
    row.innerHTML = ` 
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    // Append to list
    list.appendChild(row);
};

UI.prototype.showAlert = function(message, className) {
    // Create an element
    const div = document.createElement('div');

    // Add Class Name
    div.className = `alert ${className}`;

    // Add message
    div.appendChild(document.createTextNode(message));

    // Get parent
    const container = document.querySelector('.container');

    // Get form
    const form = document.querySelector('#book-form');

    // Insert Before
    container.insertBefore(div, form);
    
    // set time out
    setTimeout(timeOut, 3000);
}

function timeOut() {
    document.querySelector('.alert').remove();
}

// Delete Book
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

// ClearBookList to UI
UI.prototype.clearBookList = function() {
    const title = document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value = '';
    const isbn = document.querySelector('#isbn').value = '';
};

// Event Listeners
document.querySelector('#book-form').addEventListener('submit', function(e) {

    // Get form values
    const title = document.querySelector('#title').value, 
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;

    // Instantiate Book
    const book = new Book(title, author, isbn);

    // Instantiate UI
    const ui = new UI();

    if (title === '' || author === '' || isbn === '') {
        // Show error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add Book to list
        ui.addBookToList(book);

        // Show success
        ui.showAlert('Successfully Added', 'success');

        // Clear Book List
        ui.clearBookList();
    }

    e.preventDefault();
});

// Event Listener for delete
document.querySelector('#book-list').addEventListener('click', function(e) {
    // Instantiate UI
    const ui = new UI();
    ui.deleteBook(e.target)

    ui.showAlert('Book Deleted', 'delete');

    e.preventDefault();
});