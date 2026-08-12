const wishlistContainer = document.getElementById("wishlist-items");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveWishlist() {

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function updateNavbarCounters() {

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

function addToCart(id) {

    const product =
        wishlist.find(item => item.id === id);

    if (!product) return;

    const existing =
        cart.find(item => item.id === id);

    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }

    saveCart();

    updateNavbarCounters();

}
function removeFromWishlist(id) {

    wishlist = wishlist.filter(item => item.id !== id);

    saveWishlist();

    updateNavbarCounters();

    renderWishlist();

}

function renderWishlist() {

    if (!wishlistContainer) return;

    wishlistContainer.innerHTML = "";

    if (wishlist.length === 0) {

        wishlistContainer.innerHTML = `

        <div class="col-12 text-center py-5">

            <h3>Your wishlist is empty! </h3>

            <a href="shop.html"
               class="btn btn-primary mt-3">

                Continue Shopping

            </a>

        </div>

        `;

        return;

    }

    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

        <div class="col-lg-3 col-md-6">

            <div class="card h-100">

                <img src="${product.image}"
                     class="card-img-top"
                     alt="${product.name}">

                <div class="card-body text-center">

                    <h5>${product.name}</h5>

                    <p class="text-muted">

                        $${product.price.toFixed(2)}

                    </p>

                    <div class="d-grid gap-2">

                        <button
                            class="btn btn-primary add-cart-btn"
                            data-id="${product.id}">

                            Add to Cart

                        </button>

                        <button
                            class="btn btn-outline-danger remove-btn"
                            data-id="${product.id}">

                            Remove

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    document.querySelectorAll(".add-cart-btn").forEach(button => {

        button.addEventListener("click", function () {

            addToCart(Number(this.dataset.id));

            alert("Product added to cart!");

        });

    });

    document.querySelectorAll(".remove-btn").forEach(button => {

        button.addEventListener("click", function () {

            removeFromWishlist(Number(this.dataset.id));

        });

    });

}

document.addEventListener("DOMContentLoaded", () => {

    updateNavbarCounters();

    renderWishlist();

});