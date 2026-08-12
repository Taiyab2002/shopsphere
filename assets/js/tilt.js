/* ==========================================================
   PREMIUM 3D TILT
========================================================== */

const tiltCards = document.querySelectorAll(".tilt");

tiltCards.forEach((card) => {

    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = -(y - centerY) / 12;
        const rotateY = (x - centerX) / 12;

        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-6px)
        `;

        const image = card.querySelector("img");

        if(image){

            image.style.transform = `
                translateZ(25px)
                scale(1.04)
            `;

        }

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;

        const image = card.querySelector("img");

        if(image){

            image.style.transform = `
                translateZ(0)
                scale(1)
            `;

        }

    });

});