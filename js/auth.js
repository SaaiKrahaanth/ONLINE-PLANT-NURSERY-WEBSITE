document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');

  const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      const name = document.getElementById('signupName').value;
      const email = document.getElementById('signupEmail').value;
      const password = document.getElementById('signupPassword').value;
      const role = document.getElementById("signupRole").value;

      const users = getUsers();
      if (users.find(u => u.email === email)) {
        alert("Email already registered");
        return;
      }

      users.push({ name, email, password, role });
      localStorage.setItem("users", JSON.stringify(users));//convert the array to a string
      alert("Signup successful! Please Log in.");
      window.location.href = "index.html";
    });
  }

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("loginEmail").value;
      const password = document.getElementById("loginPassword").value;

      const users = getUsers();
      const user = users.find(u => u.email === email && u.password === password);//find the user with the given email and password

      if (user) {
        localStorage.setItem("loggedInUser", user.name);
        localStorage.setItem("userRole", user.role);

        if (user.role === "Admin") {
          window.location.href = "admin-dashboard.html";
        } else {
          window.location.href = "userdashboard.html";
        }
      } else {
        alert("Invalid Username or Password. Please Try again!");
      }
    });
  }
});
