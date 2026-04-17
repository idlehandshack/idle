document.querySelector(".auth-form").addEventListener("submit", function () {
  const btn = document.querySelector(".btn-auth-primary");
  btn.disabled = true;
  btn.textContent = "Logging in...";
  btn.style.opacity = "0.6";
  btn.style.cursor = "not-allowed";
});

document.querySelectorAll(".close-btn").forEach((button) => {
  button.addEventListener("click", function () {
    this.parentElement.style.display = "none";
  });
});
