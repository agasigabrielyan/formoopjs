// we have two classes Book and UI

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;            
    }
}

class UI {
    addBookToList( book ) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr');
    
        row.innerHTML = `
    
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href='' class='delete'>x</a></td>
    
        `;
        list.appendChild( row );
    }

    showAlert( message, className ) {
        const div = document.createElement('div');
        // Add className
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');


        // get form
        const form = document.querySelector('#book-form');


        // insert alert
        container.insertBefore(div, form);

        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);            
    }

    deleteBook( target ) {
        if( target.className === 'delete' ) {
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        document.getElementById('title').value = "";
        document.getElementById('author').value = "";
        document.getElementById('isbn').value = "";
    }
}

// eventListening 
document.getElementById('book-form').addEventListener('submit', function(e) {
    // get form values
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const isbn = document.getElementById('isbn').value;

    // instatiate book
    const book = new Book(title, author, isbn);

    // instatiate UI
    const ui = new UI();

    //validate 
    if( title==='' || author === '' || isbn === '' ) {
            // error alert
        ui.showAlert('Заполните все поля', 'error');            
    } else {
        // add book to list
        ui.addBookToList(book);
        ui.showAlert('Book added', 'success');
        ui.clearFields();
    }
});

document.getElementById('book-list').addEventListener('click',function(e) {
    e.preventDefault();
    const ui = new UI();
    ui.deleteBook(e.target);
});