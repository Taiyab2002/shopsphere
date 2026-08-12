/* =====================================================
   ShopSphere Hero V3
   Part 1A
===================================================== */

const heroScene = document.querySelector(".hero-3d-scene");

if (heroScene) {

    const phone = document.querySelector(".hero-phone");

    const shoe = document.querySelector(".shoe-card");

    const watch = document.querySelector(".watch-card");

    const headphone = document.querySelector(".headphone-card");

    const phoneCard = document.querySelector(".phone-card");

    heroScene.addEventListener("mousemove", function (e) {

        const rect = heroScene.getBoundingClientRect();

        const x = e.clientX - rect.left;

        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 28;

        const moveY = (y - rect.height / 2) / 28;

        phone.style.transform =
            `translateX(-50%)
             rotateY(${moveX}deg)
             rotateX(${-moveY}deg)
             rotate(-8deg)`;

        shoe.style.transform =
            `translate(${moveX * -1.4}px,
                       ${moveY * -1.4}px)
             rotate(${moveX}deg)`;

        watch.style.transform =
            `translate(${moveX * 1.1}px,
                       ${moveY * -1.2}px)
             rotate(${moveX}deg)`;

        headphone.style.transform =
            `translate(${moveX * -1.2}px,
                       ${moveY * 1.2}px)
             rotate(${moveX}deg)`;

        phoneCard.style.transform =
            `translate(${moveX * 1.3}px,
                       ${moveY * 1.3}px)
             rotate(${moveX}deg)`;

    });
        heroScene.addEventListener("mouseleave", function () {

        phone.style.transform =
            "translateX(-50%) rotate(-8deg)";

        shoe.style.transform =
            "translate(0px,0px) rotate(-6deg)";

        watch.style.transform =
            "translate(0px,0px) rotate(8deg)";

        headphone.style.transform =
            "translate(0px,0px) rotate(-10deg)";

        phoneCard.style.transform =
            "translate(0px,0px) rotate(6deg)";

    });

}
/* =====================================================
   Entrance Animation
===================================================== */

window.addEventListener("load", () => {

    const items = document.querySelectorAll(
        ".floating-product,.hero-phone"
    );

    items.forEach((item, index) => {

        item.style.opacity = "0";

        item.style.transform += " scale(.8)";

        setTimeout(() => {

            item.style.transition =
                "all .8s ease";

            item.style.opacity = "1";

        }, index * 120);

    });

});