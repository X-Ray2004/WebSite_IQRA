document.addEventListener('DOMContentLoaded', function () {
    console.log('hi');
    const form = document.querySelector('.form form');
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log('hi');
        // Retrieve books array from local storage
        let books = JSON.parse(localStorage.getItem('mybooks')) || [];
        
        // Get form data
        const bookName = document.getElementById('bookName').value.trim();
        const authorName = document.getElementById('auther').value.trim();
        const url = document.getElementById('url').value.trim();
        const edition = document.getElementById('Edition').value.trim();
        const publishingHouse = document.getElementById('Publishing').value.trim();
        const description = document.getElementById('description').value.trim();

        // Validate form data
        if (bookName.length < 3 || authorName.length < 3) {
            alert('Book name and author name must be at least 3 characters long.');
            return;
        }

        // Validate URL format
        const urlPattern = /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\.[a-zA-Z]{2,})?$/;
        if (!urlPattern.test(url) && !url.includes('image/')) {
            alert('Invalid URL format. Please enter a valid URL.');
            return;
        }

        // Check if the provided URL points to a valid image
        const img = new Image();
        img.onload = function() {
            // Image loaded successfully, proceed with form submission

            // Create a new Book object
            const newBook = {
                Name: bookName,
                Author: authorName,
                Url: url,
                Edition: edition,
                PublishingHouse: publishingHouse,
                Description: description
            };
            
            // Add the new Book object to the books array
            books.push(newBook);

            // Update books array in local storage
            localStorage.setItem('mybooks', JSON.stringify(books));

            // Redirect to another page or display a success message
            // Example: window.location.href = 'books.html';
            alert('Book added successfully!');
            window.location.href = 'main.html';
        };
        img.onerror = function() {
            // Error loading the image, notify the user
            alert('The provided URL does not point to a valid image.');
        };
        img.src = url;
    });
});
