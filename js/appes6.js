class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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
    }

    showAlert(message, className) {
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
        setTimeout(function timeOut() {
            document.querySelector('.alert').remove();
        }, 3000);
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove();
        }
    }

    clearBookList() {
        const title = document.querySelector('#title').value = '';
        const author = document.querySelector('#author').value = '';
        const isbn = document.querySelector('#isbn').value = '';
    }
}

// Local Storage
class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book) {
            const ui = new UI;

            ui.addBookToList(book);
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn) {
        const books = Store.getBooks();

        books.forEach(function(book, index) {
            if(book.isbn === isbn) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// Dom Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

        // Add to local storage
        Store.addBook(book);

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
    ui.deleteBook(e.target);

    // Remove from LS
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    ui.showAlert('Book Deleted', 'delete');

    e.preventDefault();
});