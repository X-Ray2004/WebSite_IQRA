
document.addEventListener('DOMContentLoaded', function () {
    alert("detials");
    const addCommentBtn = document.getElementById('addCommentBtn');
    addCommentBtn.addEventListener('click', function () {
        const review = document.getElementById('review').value;
        const bookId = '{{ book.id }}'; // Get the book ID from Django template

        // Send AJAX request to add comment
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/add-comment/', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Comment added successfully, do something if needed
                console.log('Comment added successfully');
            } else {
                // Error handling
                console.error('Error adding comment:', xhr.responseText);
            }
        };
        xhr.onerror = function () {
            console.error('Request failed');
        };
        xhr.send(JSON.stringify({ review: review, bookId: bookId }));
    });
});