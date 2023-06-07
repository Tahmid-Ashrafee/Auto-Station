var loginLink = document.getElementById("loginLink");
var registerLink = document.getElementById("registerLink");
var loginForm = document.getElementById("loginForm");
var registerForm = document.getElementById("registerForm");

loginLink.addEventListener("click", function() {
    loginForm.style.display = "block";
    registerForm.style.display = "none";
});

registerLink.addEventListener("click", function() {
    registerForm.style.display = "block";
    loginForm.style.display = "none";
});

function handleLogin(event) {
    event.preventDefault();
    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Check if the email and password match with the stored data in local storage
    var storedData = localStorage.getItem("userData");
    if (storedData) {
        var userData = JSON.parse(storedData);
        var userFound = false;

        for (var i = 0; i < userData.length; i++) {
            if (userData[i].email === email && userData[i].password === password) {
                userFound = true;
                break;
            }
        }

        if (userFound) {
            alert("Login successful!");
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("loggedInUser", email);
            window.location.href = "home.html"; // Redirect to the homepage
        } else {
            alert("Invalid email or password.");
        }
    } else {
        alert("User does not exist. Please register.");
    }
}

function handleRegistration(event) {
    event.preventDefault();
    var username = document.getElementById("registerUsername").value;
    var email = document.getElementById("registerEmail").value;
    var phoneNumber = document.getElementById("registerPhoneNumber").value;
    var password = document.getElementById("registerPassword").value;

    // Validate the input fields
    if (!username || !email || !phoneNumber || !password) {
        alert("Please fill in all the fields.");
        return;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Invalid email format.");
        return;
    }

    // Validate phone number format
    var phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        alert("Invalid phone number format. Please enter a 10-digit number.");
        return;
    }

    // Get the existing user data from local storage
    var storedData = localStorage.getItem("userData");
    var userData = [];

    if (storedData) {
        userData = JSON.parse(storedData);
    }

    // Check if the email already exists
    var emailExists = false;
    for (var i = 0; i < userData.length; i++) {
        if (userData[i].email === email) {
            emailExists = true;
            break;
        }
    }

    if (emailExists) {
        alert("Email already exists. Please choose a different email.");
    } else {
        // Add the new user to the user data array
        userData.push({
            username: username,
            email: email,
            phoneNumber: phoneNumber,
            password: password
        });

        // Save the updated user data in local storage
        localStorage.setItem("userData", JSON.stringify(userData));

        alert("Registration successful! Please login.");
        loginForm.style.display = "block";
        registerForm.style.display = "none";
    }
}

function handleSearch() {
    // Get the input values
    var searchInput = document.getElementById("searchInput").value;
    var category = document.getElementById("category").value;
    var checkbox = document.getElementById("checkbox").checked;
    var radio = document.querySelector('input[name="radio"]:checked').value;

    // Perform your search logic here

    // Example: Display the search values in the console
    console.log("Search Input:", searchInput);
    console.log("Category:", category);
    console.log("Checkbox:", checkbox);
    console.log("Radio:", radio);

    // Clear the table body
    var tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";

    // Example: Add new rows to the table
    var newRow1 = "<tr><td>Data 7</td><td>Data 8</td><td>Data 9</td></tr>";
    var newRow2 = "<tr><td>Data 10</td><td>Data 11</td><td>Data 12</td></tr>";
    tableBody.innerHTML += newRow1;
    tableBody.innerHTML += newRow2;
}

var loggedInUser = localStorage.getItem("loggedInUser");
var loggedInUserElement = document.getElementById("loggedInUser");
var usernameElement = document.getElementById("username");
if (loggedInUser) {
    loggedInUserElement.innerText = "Logged in as: " + loggedInUser;
    usernameElement.innerText = loggedInUser;
}

function handleLogout() {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html"; // Redirect to the login page
}


// Function to handle entry form submission
// Function to handle car entry form submission
function handleCarEntry(event) {
  event.preventDefault();

  // Get form values
  var carName = document.getElementById("carName").value;
  var carType = document.getElementById("carType").value;
  var carDescription = document.getElementById("carDescription").value;
  var carStatus = document.getElementById("carStatus").checked ? "Upcoming" : "Available";

  // Create an object for the car entry
  var carEntry = {
      name: carName,
      type: carType,
      description: carDescription,
      status: carStatus
  };

  // Save the car entry to local storage
  var carEntries = JSON.parse(localStorage.getItem("carEntries")) || [];
  carEntries.push(carEntry);
  localStorage.setItem("carEntries", JSON.stringify(carEntries));

  // Reset the form
  document.getElementById("carName").value = "";
  document.getElementById("carType").value = "gasoline";
  document.getElementById("carDescription").value = "";
  document.getElementById("carStatus").checked = false;

  // Redirect to the home page
  location.href = "home.html";
}

// Function to display the car entries in the table
function displayCarEntries() {
  var carEntries = JSON.parse(localStorage.getItem("carEntries")) || [];
  var tableBody = document.querySelector("#carTable tbody");
  tableBody.innerHTML = "";

  carEntries.forEach(function (carEntry) {
      var row = document.createElement("tr");
      row.innerHTML = `
          <td>${carEntry.name}</td>
          <td>${carEntry.type}</td>
          <td>${carEntry.description}</td>
          <td>${carEntry.status}</td>
          <td>
          <button onclick="editCarEntry(${index})">Edit</button>
          <button onclick="deleteCarEntry(${index})">Delete</button>
      </td>
      `;
      tableBody.appendChild(row);
  });
}
// Function to edit a car entry
function editCarEntry(index) {
    var carEntries = JSON.parse(localStorage.getItem("carEntries")) || [];
    var carEntry = carEntries[index];

    // Populate the form with the car entry data
    document.getElementById("carName").value = carEntry.name;
    document.getElementById("carType").value = carEntry.type;
    document.getElementById("carDescription").value = carEntry.description;
    document.getElementById("carStatus").checked = carEntry.status === "Upcoming";

    // Remove the car entry from the local storage
    carEntries.splice(index, 1);
    localStorage.setItem("carEntries", JSON.stringify(carEntries));

    // Update the table display
    displayCarEntries();
}

// Function to delete a car entry
function deleteCarEntry(index) {
    var carEntries = JSON.parse(localStorage.getItem("carEntries")) || [];

    // Remove the car entry from the local storage
    carEntries.splice(index, 1);
    localStorage.setItem("carEntries", JSON.stringify(carEntries));

    // Update the table display
    displayCarEntries();
}


// Check if the user is logged in and display the appropriate content
function checkLoggedInUser() {
  var loggedInUser = localStorage.getItem("loggedInUser");
  if (loggedInUser) {
      document.getElementById("username").textContent = loggedInUser;
      document.getElementById("loggedInUser").textContent = "Logged in as: " + loggedInUser;
      document.getElementById("loginForm").style.display = "none";
      document.getElementById("registerForm").style.display = "none";
      displayCarEntries();
  } else {
      document.getElementById("username").textContent = "";
      document.getElementById("loggedInUser").textContent = "";
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registerForm").style.display = "block";
  }
}

// Function to handle logout
function handleLogout() {
  localStorage.removeItem("loggedInUser");
  checkLoggedInUser();
}

// Add event listeners
document.getElementById("loginLink").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("loginForm").style.display = "block";
  document.getElementById("registerForm").style.display = "none";
});

document.getElementById("registerLink").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("registerForm").style.display = "block";
});

document.getElementById("loginForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var username = document.getElementById("loginUsername").value;
  localStorage.setItem("loggedInUser", username);
  checkLoggedInUser();
});

document.getElementById("registerForm").addEventListener("submit", function (event) {
  event.preventDefault();
  var username = document.getElementById("registerUsername").value;
  localStorage.setItem("loggedInUser", username);
  checkLoggedInUser();
});

// Check logged in user on page load
checkLoggedInUser();