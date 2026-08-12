const THEME_KEY = "shopsphere-theme";

function getSavedTheme() {

    return localStorage.getItem(THEME_KEY) || "light";

}

function saveTheme(theme) {

    localStorage.setItem(THEME_KEY, theme);

}

function getSystemTheme() {

    return window.matchMedia("(prefers-color-scheme: dark)").matches

        ? "dark"

        : "light";

}

function getActiveTheme() {

    const savedTheme = getSavedTheme();

    if (savedTheme === "system") {

        return getSystemTheme();

    }

    return savedTheme;

}

function applyTheme(theme) {

    const activeTheme =

        theme === "system"

            ? getSystemTheme()

            : theme;

    document.documentElement.setAttribute(

        "data-theme",

        activeTheme

    );

    updateThemeUI(theme);

}

function setTheme(theme) {

    saveTheme(theme);

    applyTheme(theme);

}
function updateThemeUI(selectedTheme) {

    const themeIcon =
        document.getElementById("theme-icon");

    if (themeIcon) {

        if (selectedTheme === "light") {

            themeIcon.className =
                "fas fa-sun";

        }

        else if (selectedTheme === "dark") {

            themeIcon.className =
                "fas fa-moon";

        }

        else {

            themeIcon.className =
                "fas fa-desktop";

        }

    }

    document
        .querySelectorAll(".theme-option")
        .forEach(item => {

            const check =
                item.querySelector(".theme-check");

            if (!check) return;

            if (
                item.dataset.theme === selectedTheme
            ) {

                check.style.visibility =
                    "visible";

            }

            else {

                check.style.visibility =
                    "hidden";

            }

        });

}

function initializeTheme() {

    applyTheme(
        getSavedTheme()
    );

}

document.addEventListener(
    "DOMContentLoaded",
    initializeTheme
);

window.matchMedia(
    "(prefers-color-scheme: dark)"
).addEventListener(
    "change",
    () => {

        if (
            getSavedTheme() === "system"
        ) {

            applyTheme("system");

        }

    }
);