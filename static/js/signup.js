document.querySelector('.auth-form').addEventListener('submit', function () {
    const btn = document.querySelector('.btn-auth-primary');
    btn.disabled = true;
    btn.textContent = 'Creating Account...';
    btn.style.opacity = '0.6';
    btn.style.cursor = 'not-allowed';
  });

  // Optional: Add functionality to make the flash message close buttons work
  document.querySelectorAll('.close-btn').forEach(button => {
    button.addEventListener('click', function() {
      this.parentElement.style.display = 'none';
    });
  });