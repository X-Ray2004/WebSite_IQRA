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

    }else {
       const addButton = document.getElementById('add');

        if (addButton) {
            addButton.remove();
        }
    }

    // // Loop through each row
    // tableRows.forEach(row => {
    //     // Get the book ID from the row's data attribute
    //     const Button = document.querySelector('.edit-btn');
    //     const bookId = Button.getAttribute('data-bookid');
    //     // Find the corresponding book object in your data
    //
    //     const book = books.find(book => book.ID === parseInt(bookId));
    //     // Check if the user is an admin
    //     if (loggedInUser ) {
    //         // If the user is an admin, remove the user buttons and attach the event listener for admin buttons
    //
    //         if (loggedInUser.admin){
    //
    //             const userButtons = row.querySelector('.userBTN');
    //             if (userButtons) {
    //                 userButtons.remove();
    //             }
    //
    //             // Attach event listener to the admin buttons
    //             const adminButton = row.querySelector('.adminBTN .edit-btn');
    //             adminButton.addEventListener('click', function (event) {
    //                 event.preventDefault();
    //
    //                 // Store the book details in session storage
    //                 sessionStorage.setItem('currentBook', JSON.stringify(book));
    //
    //                 // Redirect the user to the edit/delete page
    //                 window.location.href = 'Edit_delete.html';
    //             });
    //         } else {
    //             // If the user is logged in but not an admin, remove the admin buttons
    //             console.log("hi")
    //
    //             const adminButtons = row.querySelector('.adminBTN');
    //             if (adminButtons) {
    //                 adminButtons.remove();
    //             }
    //
    //         }
    //     } else {
    //         // If the user is not logged in, remove  and admin buttons
    //         const adminButtons = row.querySelector('.adminBTN');
    //         if (adminButtons) {
    //             adminButtons.remove();
    //         }
    //
    //         // Add event listener to the borrow button to redirect to login page
    //         const borrowButton = row.querySelector('.borrow-btn');
    //         borrowButton.addEventListener('click', function (event) {
    //             event.preventDefault();
    //             alert('You must log in to borrow books.');
    //             window.location.href = 'Login.html';
    //         });
    //     }
    // });
});


}