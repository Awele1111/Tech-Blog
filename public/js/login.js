async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();

    if (username && password) {
        const response = await fetch(`/api/users/login`, {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" }
        });

        // check the response status
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        };
    };
};

// signup form submission
async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();

    if (username && email && password) {
        const response = await fetch(`/api/users`, {
            method: "POST", 
            body: JSON.stringify({ username, email, password }),
            headers: { "Content-Type": "application/json" }
        });

        console.log("entered signup");

        // check the response status
        if (response.ok) {
            document.location.replace("/dashboard");
        } else {
            alert(response.statusText);
        };
    };
};

// event listeners
document.querySelector(".login-form").addEventListener("submit", loginFormHandler);
document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
