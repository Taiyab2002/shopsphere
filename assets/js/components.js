console.log("components.js loaded");

function getBasePath() {

    const host = window.location.hostname;

    if (host === "localhost") {

        return "/shopsphere/";

    }

    return window.location.pathname.includes("/pages/")
        ? "../"
        : "";

}

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        if (!response.ok) {

            throw new Error(file);

        }

        element.innerHTML = await response.text();

        if (
            id === "navbar-container" &&
            typeof updateNavbarCounters === "function"
        ) {

            updateNavbarCounters();

        }

        if (
            id === "navbar-container" &&
            typeof initializeAuthUI === "function"
        ) {

            initializeAuthUI();

        }

    }

    catch (error) {

        console.error(error);

    }

}

function updateNavbarCounters() {

    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    const cartCount =
        document.getElementById("cart-count");

    const wishlistCount =
        document.getElementById("wishlist-count");

    if (cartCount) {

        cartCount.textContent =
            cart.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

    }

    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}

document.addEventListener("DOMContentLoaded", async () => {

    const componentPath =
        getBasePath() + "components/";

    await loadComponent(
        "navbar-container",
        componentPath + "navbar.html"
    );

    await loadComponent(
        "footer-container",
        componentPath + "footer.html"
    );

    await loadComponent(
        "toast-container",
        componentPath + "toast.html"
    );

});