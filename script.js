let selectedImages = [];

// Function to select or deselect an image
function selectImage(imageName) {
    const index = selectedImages.indexOf(imageName);
    const imageElement = document.querySelector(`img[onclick="selectImage('${imageName}')"]`);
    
    if (index > -1) {
        // Deselect image
        selectedImages.splice(index, 1);
        imageElement.style.border = "2px solid transparent"; // Remove border
    } else {
        // Select image
        selectedImages.push(imageName);
        imageElement.style.border = "2px solid #007BFF"; // Add border
    }
}

// Similar functionality for login images, but uses the same `selectImage` function
function selectLoginImage(imageName) {
    const index = selectedImages.indexOf(imageName);
    const imageElement = document.querySelector(`img[onclick="selectLoginImage('${imageName}')"]`);

    if (index > -1) {
        // Deselect image
        selectedImages.splice(index, 1);
        imageElement.style.border = "2px solid transparent"; // Remove border
    } else {
        // Select image
        selectedImages.push(imageName);
        imageElement.style.border = "2px solid #007BFF"; // Add border
    }
}

async function signUp() {
    console.log("Sign up initiated");
    const userId = document.getElementById('signup-userid').value.trim();
    console.log("User ID: ", userId);
    console.log("Selected Images: ", selectedImages);

    if (userId && selectedImages.length > 0) {
        const response = await fetch('http://localhost:3000/signup', {  // Include port here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, sequence: selectedImages })
        });

        const result = await response.json();
        document.getElementById('signup-message').textContent = result.message;
        clearSelection();
    } else {
        alert("Please enter a User ID and select at least one image for your password.");
    }
}

async function logIn() {
    const userId = document.getElementById('login-userid').value.trim();
    if (userId && selectedImages.length > 0) {
        const response = await fetch('http://localhost:3000/login', {  // Include port here
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, sequence: selectedImages })
        });

        const result = await response.json();
        document.getElementById('login-message').textContent = result.message;
        clearSelection();
    } else {
        alert("Please enter a User ID and select at least one image for your password.");
    }
}


// Function to clear selections and inputs
function clearSelection() {
    selectedImages = []; // Clear the selected images
    document.getElementById('signup-userid').value = ""; // Clear signup input
    document.getElementById('login-userid').value = ""; // Clear login input
    const allImages = document.querySelectorAll('.selectable-image');
    allImages.forEach(img => {
        img.style.border = "2px solid transparent"; // Reset border
    });
}

// Function to show login form
function showLogin() {
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    clearSelection(); // Clear previous selection when switching forms
}

// Function to show signup form
function showSignUp() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
    clearSelection(); // Clear previous selection when switching forms
}
