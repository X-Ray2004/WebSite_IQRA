// static/js/borrow_book.js
document.addEventListener('DOMContentLoaded', function () {
    alert('Please wait while we are processing your request');
    // Retrieve current book data
    const currentBookData = JSON.parse(sessionStorage.getItem('currentBook'));
    const borrowedBooksContainer = document.querySelector('.box');

    // Create a bookDiv element
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('borrow');

    // Set the inner HTML using template literals and class attributes
    bookDiv.innerHTML = `
            <div class="cover">
                <img src="${currentBookData.Url}" alt="">
            </div>
            <div class="info">
                <h2>${currentBookData.Name}</h2>
                <p>${currentBookData.AutherName}</p>
                <div class="date">
                    <form id="borrowForm" action="" method="post">
                        <p>From</p>
                        <input type="date">
                        <p>To</p>
                        <input type="date">
                        <br><br>
                        <input type="submit" class="btn borrowbtn">
                    </form>
                </div>
            </div>
    `;

    // Append the bookDiv to the container
    borrowedBooksContainer.appendChild(bookDiv);

    // Event listener for form submission
    const borrowForm = document.getElementById('borrowForm');
    borrowForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Your existing JavaScript logic for handling form submission
        // ...

        // Redirect to my_books.html after successful submission
        window.location.href = 'my_books.html';
    });
});
