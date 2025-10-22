// Contact form validation and handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  const successMessage = document.getElementById('contact-success');
  
  // Form fields
  const nameField = document.getElementById('contact-name');
  const emailField = document.getElementById('contact-email');
  const subjectField = document.getElementById('contact-subject');
  const messageField = document.getElementById('contact-message');
  
  // Error elements
  const nameError = document.getElementById('contact-name-error');
  const emailError = document.getElementById('contact-email-error');
  const subjectError = document.getElementById('contact-subject-error');
  const messageError = document.getElementById('contact-message-error');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Clear all errors
  function clearAllErrors() {
    [nameError, emailError, subjectError, messageError].forEach(error => {
      error.textContent = '';
      error.style.display = 'none';
    });
    
    [nameField, emailField, subjectField, messageField].forEach(field => {
      field.setAttribute('aria-invalid', 'false');
      field.classList.remove('error');
    });
  }

  // Show error for a specific field
  function showError(field, errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    field.setAttribute('aria-invalid', 'true');
    field.classList.add('error');
    field.focus();
  }

  // Validate individual field
  function validateField(field, errorElement, fieldName) {
    const value = field.value.trim();
    
    if (!value) {
      showError(field, errorElement, `${fieldName} is required.`);
      return false;
    }
    
    if (field === emailField && !emailRegex.test(value)) {
      showError(field, errorElement, 'Please enter a valid email address.');
      return false;
    }
    
    if (field === messageField && value.length < 10) {
      showError(field, errorElement, 'Message must be at least 10 characters long.');
      return false;
    }
    
    // Clear error if validation passes
    errorElement.textContent = '';
    errorElement.style.display = 'none';
    field.setAttribute('aria-invalid', 'false');
    field.classList.remove('error');
    return true;
  }

  // Validate entire form
  function validateForm() {
    clearAllErrors();
    
    let isValid = true;
    
    // Validate each field
    if (!validateField(nameField, nameError, 'Full name')) {
      isValid = false;
    }
    
    if (!validateField(emailField, emailError, 'Email address')) {
      isValid = false;
    }
    
    if (!validateField(subjectField, subjectError, 'Subject')) {
      isValid = false;
    }
    
    if (!validateField(messageField, messageError, 'Message')) {
      isValid = false;
    }
    
    return isValid;
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    
    if (validateForm()) {
      // Hide any previous success message
      successMessage.style.display = 'none';
      
      // Simulate form submission (in a real app, this would send data to server)
      setTimeout(() => {
        successMessage.style.display = 'block';
        successMessage.scrollIntoView({ behavior: 'smooth' });
        form.reset();
        clearAllErrors();
      }, 500);
    }
  }

  // Real-time validation on blur
  nameField.addEventListener('blur', () => {
    validateField(nameField, nameError, 'Full name');
  });
  
  emailField.addEventListener('blur', () => {
    validateField(emailField, emailError, 'Email address');
  });
  
  subjectField.addEventListener('blur', () => {
    validateField(subjectField, subjectError, 'Subject');
  });
  
  messageField.addEventListener('blur', () => {
    validateField(messageField, messageError, 'Message');
  });

  // Clear errors on input
  [nameField, emailField, subjectField, messageField].forEach(field => {
    field.addEventListener('input', () => {
      if (field.getAttribute('aria-invalid') === 'true') {
        validateField(field, document.getElementById(field.id + '-error'), field.previousElementSibling.textContent.replace(' *', ''));
      }
    });
  });

  // Form submission
  form.addEventListener('submit', handleSubmit);
});
