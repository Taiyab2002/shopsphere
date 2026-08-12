let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");
const totalItems = document.getElementById("total-items");

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function updateNavbarCount() {

    const cartCount =
        document.getElementById("cart-count");

    if (!cartCount) return;

    cartCount.textContent = cart.reduce(

        (sum, item) => sum + item.quantity,

        0

    );

}

function renderCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `

        <div class="empty-cart">

            <i class="fas fa-shopping-cart"></i>

            <h3>Your cart is empty</h3>

            <p>Add some amazing products to your cart.</p>

            <a href="shop.html"
               class="btn btn-primary mt-3">

                Continue Shopping

            </a>

        </div>

        `;

        subtotal.textContent = "$0.00";
        total.textContent = "$0.00";

        if (totalItems)
            totalItems.textContent = "0";

        updateNavbarCount();

        return;

    }

    let grandTotal = 0;
    let itemCount = 0;
        cart.forEach(item => {

        grandTotal += item.price * item.quantity;
        itemCount += item.quantity;

        cartItems.innerHTML += `

        <div class="card cart-item">

            <div class="card-body">

                <div class="d-flex align-items-center">

                    <img src="${item.image}"
                         alt="${item.name}">

                    <div class="cart-info ms-3">

                        <h5>${item.name}</h5>

                        <p class="mb-1">

                            $${item.price.toFixed(2)}

                        </p>

                        <small class="text-muted">

                            ${item.brand || ""}

                        </small>

                    </div>

                </div>

                <div class="quantity-control">

                    <button onclick="decreaseQuantity(${item.id})">

                        −

                    </button>

                    <span>

                        ${item.quantity}

                    </span>

                    <button onclick="increaseQuantity(${item.id})">

                        +

                    </button>

                </div>

                <div>

                    <strong>

                        $${(item.price * item.quantity).toFixed(2)}

                    </strong>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${item.id})">

                    <i class="fas fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    subtotal.textContent =
        "$" + grandTotal.toFixed(2);

    total.textContent =
        "$" + grandTotal.toFixed(2);

    if (totalItems)
        totalItems.textContent = itemCount;

    updateNavbarCount();

}

function increaseQuantity(id) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;

    item.quantity++;

    saveCart();

    renderCart();

}

function decreaseQuantity(id) {

    const item =
        cart.find(product => product.id === id);

    if (!item) return;

    if (item.quantity > 1) {

        item.quantity--;

    } else {

        cart = cart.filter(product => product.id !== id);

    }

    saveCart();

    renderCart();

}

function removeItem(id) {

    cart = cart.filter(product => product.id !== id);

    saveCart();

    renderCart();

}

const clearCartBtn =
    document.getElementById("clear-cart-btn");

if (clearCartBtn) {

    clearCartBtn.addEventListener("click", () => {

        if (!confirm("Clear all items from cart?")) return;

        cart = [];

        saveCart();

        renderCart();

    });

}

renderCart();
