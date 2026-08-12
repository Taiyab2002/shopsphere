/* ==========================================================
   SCROLL REVEAL SYSTEM
========================================================== */

const revealElements = document.querySelectorAll(

    ".reveal, .reveal-left, .reveal-right, .reveal-scale"

);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active");

            }

        });

    },

    {

        threshold: 0.15,

        rootMargin: "0px 0px -60px 0px"

    }

);

revealElements.forEach((element) => {

    revealObserver.observe(element);

});