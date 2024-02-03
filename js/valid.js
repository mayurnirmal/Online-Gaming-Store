function validateForm() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    var usernamePattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passwordPattern = /^.{8,}$/;
    
    if (!usernamePattern.test(username)) {
      alert("Username must have at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long.");
      return;
    }
    
    if (!passwordPattern.test(password)) {
      alert("Password must be at least 8 characters long.");
      return;
    }
    
    alert("Login successful!");
  }