document.addEventListener('DOMContentLoaded', function () {
    const navBar = document.querySelector('nav');
    const btnNav = document.querySelector('.btn-nav');

    // Check if user is logged in
    const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
    const myBooksLink = navBar.querySelector('ul.main-nav li:nth-child(2) a');
    const complaints = navBar.querySelector('ul.main-nav li:nth-child(4) a');

    if (loggedInUser) {
        // User is logged in
        if (loggedInUser.admin) {
            // User is an admin
            // Replace 'My Books' link with 'New Book' link
            myBooksLink.href = 'add.html';
            myBooksLink.innerHTML = 'New Book';
            if (complaints) {
                complaints.remove();
            }
        }
        // User is a client
        // Remove sign up and log in buttons
        btnNav.innerHTML = '';
        // Append log out button
        const logOutButton = document.createElement('button');
        logOutButton.type = 'button';
        logOutButton.className = 'btn btn-logout';
        logOutButton.textContent = 'Log Out';
        logOutButton.addEventListener('click', function () {
            // Remove loggedInUser from session storage
            sessionStorage.removeItem('loggedInUser');
            // Redirect to login page
            window.location.href = 'Login.html';
        });
        btnNav.appendChild(logOutButton);
    } else {
        // User is not logged in
        // Display alert message and redirect to login page
        // Get the link to my_books.html
        // Add an event listener to the link
        myBooksLink.addEventListener('click', function (event) {
            // Prevent the default behavior of the link
            event.preventDefault();
            // User is not logged in
            // Display alert message and redirect to login page
            alert('You must log in to access this page.');
            window.location.href = 'Login.html';
        });
    }
});

if (window.location.pathname.includes("main.html")){
    document.addEventListener('DOMContentLoaded', function () {
        // Check if the user is logged in
        const loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));
        // Get all rows in the table
        if (loggedInUser ) {
            if (!loggedInUser.admin) {
                const addButton = document.getElementById('add');
                if (addButton) {
                    addButton.remove();
                }
            }
        } else {
            const addButton = document.getElementById('add');
            if (addButton) {
                addButton.remove();
            }
        }
    });
}