// Select the form element
const signUpForm = document.getElementById('signUpForm');

// Add an event listener for the form submission
signUpForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the default form submission
  
  // Perform any necessary validations or operations here
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Optionally validate fields
  if (username && email && password) {
    // Redirect to the dashboard page
    window.location.href = '/dashboard.ejs'; // Adjust the path as necessary
  } else {
    // Show an error message if fields are not filled properly
    const message = document.getElementById('message');
    message.textContent = 'Please fill out all fields correctly.';
  }
});
