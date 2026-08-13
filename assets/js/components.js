if (!window.shopSphereComponentsLoaded) {

    window.shopSphereComponentsLoaded = true;

    console.log("components.js loaded");

    function getBasePath() {

        const host = window.location.hostname;

        if (host === "localhost" || host === "127.0.0.1") {

            return "/shopsphere/";

        }

        return "/";

    }

    function fixComponentPaths(element) {

        if (!element) return;

        const basePath = getBasePath();

        const links =
            element.querySelectorAll(
                "a[data-route]"
            );

        links.forEach(link => {

            const route =
                link.getAttribute("data-route");

            if (!route) return;

            link.setAttribute(
                "href",
                basePath + route
            );

        });

    }

    async function loadComponent(id, file) {

        const element =
            document.getElementById(id);

        if (!element) return;

        try {

            const response =
                await fetch(file);

            if (!response.ok) {

                throw new Error(
                    "Failed to load component: " + file
                );

            }

            element.innerHTML =
                await response.text();

            fixComponentPaths(element);

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
            JSON.parse(
                localStorage.getItem("cart")
            ) || [];

        const wishlist =
            JSON.parse(
                localStorage.getItem("wishlist")
            ) || [];

        const cartCount =
            document.getElementById(
                "cart-count"
            );

        const wishlistCount =
            document.getElementById(
                "wishlist-count"
            );

        if (cartCount) {

            cartCount.textContent =
                cart.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                );

        }

        if (wishlistCount) {

            wishlistCount.textContent =
                wishlist.length;

        }

    }

    document.addEventListener(
        "DOMContentLoaded",
        async () => {

            const componentPath =
                getBasePath() +
                "components/";

            await loadComponent(
                "navbar-container",
                componentPath +
                "navbar.html"
            );

            await loadComponent(
                "footer-container",
                componentPath +
                "footer.html"
            );

            await loadComponent(
                "toast-container",
                componentPath +
                "toast.html"
            );

        }
    );

}