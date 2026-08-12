let users =
    JSON.parse(localStorage.getItem("users")) || [];

const registerForm =
    document.getElementById("register-form");

const loginForm =
    document.getElementById("login-form");

function saveUsers() {

    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );

}

function setCurrentUser(user) {

    localStorage.setItem(
        "currentUser",
        JSON.stringify(user)
    );

}

function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem("currentUser")
    );

}

function goHome() {

    if (
        window.location.pathname.includes("/pages/")
    ) {

        window.location.href =
            "../index.html";

    }

    else {

        window.location.href =
            "index.html";

    }

}

function logout() {

    localStorage.removeItem(
        "currentUser"
    );

    showToast(
        "info",
        "Logged Out",
        "You have been logged out successfully."
    );

    setTimeout(() => {

        goHome();

    }, 1200);

}

/* ==========================
   REGISTER
========================== */

if (registerForm) {

    registerForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const full_name = document.getElementById("register-name").value.trim();

        const username = document.getElementById("register-username").value.trim();

        const identifier = document.getElementById("register-email").value.trim();

        const password = document.getElementById("register-password").value;

        const confirmPassword = document.getElementById("register-confirm-password").value;

        if (password !== confirmPassword) {

            showToast(
                "warning",
                "Password Mismatch",
                "Passwords do not match."
            );

            return;

        }

        const formData = new FormData();

        formData.append("full_name", full_name);

        formData.append("username", username);

        formData.append("identifier", identifier);

        formData.append("password", password);

       const response = await fetch("../backend/register.php", {
    method: "POST",
    body: formData
});

console.log("HTTP Status:", response.status);

const text = await response.text();

console.log("PHP Response:", text);

const data = JSON.parse(text);

        if (data.status === "success") {

            showToast(
                "success",
                "Registration Successful",
                data.message
            );

            setTimeout(() => {

                window.location.href = "login.html";

            }, 1500);

        }

        else {

            showToast(
                "error",
                "Registration Failed",
                data.message
            );

        }

    });

}
/* ==========================
   LOGIN SYSTEM
========================== */

function findUser(identifier, password) {

    identifier =
        identifier
            .trim()
            .toLowerCase();

    return users.find(user =>

        (

            (user.email &&
                user.email.toLowerCase() === identifier)

            ||

            (user.username &&
                user.username.toLowerCase() === identifier)

            ||

            (user.phone &&
                user.phone === identifier)

        )

        &&

        user.password === password

    );

}

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const identifier =
            document.getElementById("login-email").value.trim();

        const password =
            document.getElementById("login-password").value;

        const formData = new FormData();

        formData.append("identifier", identifier);

        formData.append("password", password);

        const response = await fetch("../backend/login.php", {

            method: "POST",

            body: formData

        });

        const data = await response.json();

        if (data.status === "success") {

            localStorage.setItem(
                "currentUser",
                JSON.stringify(data.user)
            );

            showToast(
                "success",
                "Login Successful",
                "Welcome back, " + data.user.full_name + "!"
            );

            setTimeout(() => {

                window.location.href = "../index.html";

            }, 1500);

        }

        else {

            showToast(
                "error",
                "Login Failed",
                data.message
            );

        }

    });

}

/* ==========================
   NAVBAR AUTH UI
========================== */

function initializeAuthUI() {

    const currentUser =
        getCurrentUser();

    const loginLink =
        document.getElementById("nav-login");

    const registerLink =
        document.getElementById("nav-register");

    const userMenu =
        document.getElementById("nav-user");

    const userName =
        document.getElementById("nav-username");

    const logoutBtn =
        document.getElementById("logout-btn");

    if (!userMenu) return;

    if (currentUser) {

        if (loginLink) {

            loginLink.style.display =
                "none";

        }

        if (registerLink) {

            registerLink.style.display =
                "none";

        }

        userMenu.style.display =
            "block";

        if (userName) {

            userName.textContent =
                currentUser.name;

        }

        if (logoutBtn) {

            logoutBtn.onclick =
                logout;

        }

    }

    else {

        userMenu.style.display =
            "none";

    }

}

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAuthUI();

    }
);
/* ==========================
   PASSWORD TOGGLE
========================== */

const togglePassword =
    document.getElementById("toggle-password");

const passwordInput =
    document.getElementById("login-password");

if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

                this.innerHTML =
                    '<i class="fas fa-eye-slash"></i>';

            }

            else {

                passwordInput.type = "password";

                this.innerHTML =
                    '<i class="fas fa-eye"></i>';

            }

        }
    );

}

/* ==========================
   CHECKOUT PROTECTION
========================== */

(function () {

    const currentUser =
        getCurrentUser();

    if (

        window.location.pathname.includes("checkout.html")

        &&

        !currentUser

    ) {

        showToast(
            "warning",
            "Login Required",
            "Please login before proceeding to checkout."
        );

        setTimeout(() => {

            window.location.href =
                "login.html";

        }, 1500);

    }

})();

/* ==========================
   INITIALIZATION
========================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        initializeAuthUI();

    }
);