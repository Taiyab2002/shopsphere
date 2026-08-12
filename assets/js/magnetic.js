/* ==========================================================
   MAGNETIC BUTTONS
========================================================== */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {

    const text = button.querySelector("span");

    button.addEventListener("mousemove", (e) => {

        const rect = button.getBoundingClientRect();

        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform =
            `translate(${x * 0.18}px, ${y * 0.18}px)`;

        if (text) {

            text.style.transform =
                `translate(${x * 0.10}px, ${y * 0.10}px)`;

        }

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "translate(0,0)";

        if (text) {

            text.style.transform = "translate(0,0)";

        }

    });

});