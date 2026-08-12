/* ==========================================================
   RIPPLE EFFECT
========================================================== */

const rippleButtons = document.querySelectorAll(".magnetic");

rippleButtons.forEach((button) => {

    button.addEventListener("click", function (e) {

        const oldRipple = this.querySelector(".ripple");

        if (oldRipple) {

            oldRipple.remove();

        }

        const ripple = document.createElement("span");

        ripple.classList.add("ripple");

        const rect = this.getBoundingClientRect();

        const size = Math.max(rect.width, rect.height);

        ripple.style.width = size + "px";
        ripple.style.height = size + "px";

        ripple.style.left =
            (e.clientX - rect.left - size / 2) + "px";

        ripple.style.top =
            (e.clientY - rect.top - size / 2) + "px";

        this.appendChild(ripple);

        ripple.addEventListener("animationend", () => {

            ripple.remove();

        });

    });

});