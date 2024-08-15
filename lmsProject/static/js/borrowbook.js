document.addEventListener('DOMContentLoaded', function () {
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

        // Retrieve myBooks array from local storage
        let myBooks = JSON.parse(localStorage.getItem('mybooks')) || [];

        // Update availability of the book
        const foundBookIndex = myBooks.findIndex(book => book.Name === currentBookData.Name);
        if (foundBookIndex !== -1) {
            myBooks[foundBookIndex].Available = false;
            // Update myBooks array in local storage
            localStorage.setItem('mybooks', JSON.stringify(myBooks));
        }

        // Retrieve logged-in user from session storage
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

        // Update the user's borrowed books list
        loggedInUser.BorrowedBooks.push(currentBookData);

        // Update logged-in user in session storage
        sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
        let myUsers = JSON.parse(localStorage.getItem('myUsers')) || [];
        const userIndex = myUsers.findIndex(user => user.ID === loggedInUser.ID);
        if (userIndex !== -1) {
            myUsers[userIndex] = loggedInUser;
            localStorage.setItem('myUsers', JSON.stringify(myUsers));
        }
        // Display success message or perform other actions
        alert('Book borrowed successfully!');
         window.location.href = 'my_books.html';
    });
});
