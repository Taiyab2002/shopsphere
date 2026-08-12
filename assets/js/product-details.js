const params = new URLSearchParams(window.location.search);

const productId = Number(params.get("id"));

if (!productId) {

    window.location.href = "shop.html";

}

const product = products.find(item => item.id === productId);
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let quantity = 1;

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(

        (sum, item) => sum + item.quantity,

        0

    );

}

if (!product) {

    window.location.href = "shop.html";

}
document.getElementById("product-image").src = product.image;

document.getElementById("product-name").textContent = product.name;

document.getElementById("product-price").textContent =
"$" + product.price.toFixed(2);

document.getElementById("product-description").textContent =
product.description;

document.getElementById("full-description").textContent =
product.description;

document.getElementById("product-brand").textContent =
product.brand;

document.getElementById("spec-brand").textContent =
product.brand;

document.getElementById("spec-category").textContent =
product.category;

document.getElementById("spec-rating").textContent =
product.rating + " ★";

document.getElementById("spec-reviews").textContent =
product.reviews;

document.getElementById("product-review").textContent =
product.rating + " (" + product.reviews + " Reviews)";

let stars = "";

const fullStars = Math.floor(product.rating);

for (let i = 0; i < fullStars; i++) {

    stars += '<i class="fas fa-star"></i>';

}

if (product.rating % 1 >= 0.5) {

    stars += '<i class="fas fa-star-half-alt"></i>';

}

document.getElementById("product-rating").innerHTML = stars;
const quantityInput = document.getElementById("quantity");

document.getElementById("plus-btn").addEventListener("click", () => {

    quantity++;

    quantityInput.value = quantity;

});

document.getElementById("minus-btn").addEventListener("click", () => {

    if (quantity > 1) {

        quantity--;

        quantityInput.value = quantity;

    }

});

quantityInput.addEventListener("change", () => {

    quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {

        quantity = 1;

    }

    quantityInput.value = quantity;

});

document.getElementById("add-cart-btn").addEventListener("click", () => {

    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {

        existingProduct.quantity += quantity;

    } else {

        cart.push({

            ...product,

            quantity: quantity

        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();

   showToast(product.name + " added to cart!");

});

updateCartCount();
const relatedContainer = document.getElementById("related-products");

if (relatedContainer) {

    const relatedProducts = products.filter(item =>
        item.category === product.category &&
        item.id !== product.id
    );

    relatedProducts.slice(0, 3).forEach(item => {

        relatedContainer.innerHTML += `

        <div class="col-lg-4 col-md-6">

            <div class="card product-card h-100">

                <img src="${item.image}"
                     class="card-img-top"
                     alt="${item.name}">

                <div class="card-body text-center">

                    <h5 class="card-title">

                        ${item.name}

                    </h5>

                    <p class="text-muted">

                        $${item.price.toFixed(2)}

                    </p>

                    <div class="d-grid gap-2">

                        <a href="product.html?id=${item.id}"
                           class="btn btn-outline-primary">

                            View Details

                        </a>

                        <button
                            class="btn btn-primary related-add-cart"
                            data-id="${item.id}">

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        </div>

        `;

    });

    document.querySelectorAll(".related-add-cart").forEach(button => {

        button.addEventListener("click", function () {

            const id = Number(this.dataset.id);

            const selectedProduct = products.find(p => p.id === id);

            const existing = cart.find(item => item.id === id);

            if (existing) {

                existing.quantity++;

            } else {

                cart.push({

                    ...selectedProduct,
                    quantity: 1

                });

            }

            localStorage.setItem("cart", JSON.stringify(cart));

            updateCartCount();

            showToast(selectedProduct.name + " added to cart!");

        });

    });

}
function showToast(message) {

    const toastMessage = document.getElementById("toast-message");

    toastMessage.textContent = message;

    const toastElement = document.getElementById("cartToast");

    const toast = new bootstrap.Toast(toastElement);

    toast.show();

}