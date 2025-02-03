  // Form validation
  (function() {
    'use strict';
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  })();

  // Password strength validation
  const passwordInput = document.getElementById('password');
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*]/.test(password);
    const isLongEnough = password.length >= 8;

    if (hasLetter && hasNumber && hasSymbol && isLongEnough) {
      this.setCustomValidity('');
    } else {
      this.setCustomValidity('Password must meet all requirements');
    }
  });