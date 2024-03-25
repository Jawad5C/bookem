document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.info');
    const bookList = document.querySelector('.booklist');

    // Retrieve stored book entries from local storage
    const storedBooks = JSON.parse(localStorage.getItem('books')) || [];

    // Function to display stored book entries
    function displayStoredBooks() {
        storedBooks.forEach(book => {
            const bookEntry = createBookEntry(book);
            bookList.appendChild(bookEntry);
        });
    }

    // Display stored book entries on page load
    displayStoredBooks();

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form input values
        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const imageUrl = document.getElementById('url').value;
        const price = document.getElementById('price').value;
        // const stock = document.getElementById('stock').value;
        const stockSelect = document.getElementById('stock');
        const stock = stockSelect.options[stockSelect.selectedIndex].text;

        // Create book object
        const book = { title, author, imageUrl, price, stock };

        // Create a new book entry
        const bookEntry = createBookEntry(book);

        // Append the new book entry to the book list
        bookList.appendChild(bookEntry);

        // Reset the form
        form.reset();

        // Store the new book entry in local storage
        storedBooks.push(book);
        localStorage.setItem('books', JSON.stringify(storedBooks));
    });

    // Function to create a book entry element
    function createBookEntry(book) {
        const bookEntry = document.createElement('div');
        bookEntry.classList.add('book-entry');
        bookEntry.innerHTML = `
            <h2>Title: ${book.title}</h2>
            <p>Author: ${book.author}</p>
            <img src="${book.imageUrl}" alt="Book cover">
            <p>Price: ${book.price}</p>
            <p>Stock: ${book.stock}</p>
        `;

        // Create delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', function () {
            // Remove the book entry from the DOM
            bookList.removeChild(bookEntry);
            // Remove the book entry from local storage
            const index = storedBooks.indexOf(book);
            if (index !== -1) {
                storedBooks.splice(index, 1);
                localStorage.setItem('books', JSON.stringify(storedBooks));
            }
        });

        // Append delete button to book entry
        bookEntry.appendChild(deleteButton);

        return bookEntry;
    }
});