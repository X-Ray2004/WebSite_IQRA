// static/js/form_validation.js
document.addEventListener('DOMContentLoaded', function () {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    let storedUser = JSON.parse(sessionStorage.getItem('loggedInUser')) || {}; // Initialize as empty object if sessionStorage is not available

    const prefillForm = () => {
        if (storedUser && storedUser.Name && storedUser.Email) {
            nameInput.value = storedUser.Name;
            emailInput.value = storedUser.Email;
            nameInput.disabled = true;
            emailInput.disabled = true;
        }
    };

    prefillForm();

    function validateForm() {
        let isValid = true;
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();

        if (name.length === 0) {
            isValid = false;
            document.getElementById('nameError').textContent = 'Name is required';
        } else {
            document.getElementById('nameError').textContent = '';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            isValid = false;
            document.getElementById('emailError').textContent = 'Invalid email format';
        } else {
            document.getElementById('emailError').textContent = '';
        }

        return isValid;
    }
});
