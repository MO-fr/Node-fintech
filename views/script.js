// Select the form element
const signUpForm = document.getElementById('signUpForm');

// Add an event listener for the form submission
signUpForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission

  // Perform any necessary validations or operations here
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const message = document.getElementById('message'); // Error message element
  
  // Clear any previous error messages
  message.textContent = '';
  message.style.display = 'none';

  // Validation
  if (!username || !email || !password) {
    message.textContent = '⚠️ Please fill out all fields correctly.';
    message.style.display = 'block';
    return;
  }

  if (password.length < 6) {
    message.textContent = '⚠️ Password must be at least 6 characters long!';
    message.style.display = 'block';
    return;
  }

  // Redirect to the dashboard page if validation passes
  window.location.href = '/dashboard.ejs'; // Adjust the path as necessary
});
