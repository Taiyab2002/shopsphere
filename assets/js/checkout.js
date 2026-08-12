const USD_TO_BDT = 122;

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const checkoutItems =
    document.getElementById("checkout-items");

const subtotal =
    document.getElementById("checkout-subtotal");

const total =
    document.getElementById("checkout-total");

const checkoutForm =
    document.getElementById("checkout-form");

const currencySelect =
    document.getElementById("currency");

const paymentSelect =
    document.getElementById("payment");

const paymentNote =
    document.getElementById("payment-note");

const deliveryText =
    document.getElementById("delivery-text");


function formatPrice(price) {

    if (currencySelect.value === "USD") {

        return "$" + price.toFixed(2);

    }

    return "৳" + (price * USD_TO_BDT).toLocaleString(

        undefined,

        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }

    );

}


function updatePaymentOptions() {

    if (currencySelect.value === "USD") {

        paymentSelect.innerHTML = `

            <option>Credit Card</option>

            <option>PayPal</option>

        `;

        paymentNote.className =
            "alert alert-info";

        paymentNote.textContent =
            "International payment is selected.";

        deliveryText.textContent =
            "7-14 Business Days";

    }

    else {

        paymentSelect.innerHTML = `

            <option>Cash on Delivery</option>

            <option>bKash</option>

            <option>Nagad</option>

        `;

        paymentNote.className =
            "alert alert-success";

        paymentNote.textContent =
            "Pay securely using Bangladeshi payment methods.";

        deliveryText.textContent =
            "Dhaka: 1-2 Days | Outside Dhaka: 3-5 Days";

    }

}


function renderCheckout() {

    checkoutItems.innerHTML = "";

    let grandTotal = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `

        <div class="text-center py-5">

            <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>

            <h5>Your cart is empty</h5>

            <a href="shop.html"
               class="btn btn-primary mt-3">

               Continue Shopping

            </a>

        </div>

        `;

        subtotal.textContent =
            formatPrice(0);

        total.textContent =
            formatPrice(0);

        return;

    }


    cart.forEach(item => {

        grandTotal +=
            item.price * item.quantity;

        checkoutItems.innerHTML += `

        <div class="d-flex justify-content-between align-items-center mb-3">

            <div class="d-flex align-items-center">

                <img
                    src="${item.image}"
                    style="width:70px;height:70px;object-fit:contain;">

                <div class="ms-3">

                    <h6 class="mb-1">
                        ${item.name}
                    </h6>

                    <small class="text-muted">
                        Qty : ${item.quantity}
                    </small>

                </div>

            </div>

            <strong>
                ${formatPrice(item.price * item.quantity)}
            </strong>

        </div>

        `;

    });


    subtotal.textContent =
        formatPrice(grandTotal);

    total.textContent =
        formatPrice(grandTotal);

}


currencySelect.addEventListener("change", () => {

    updatePaymentOptions();

    renderCheckout();

});


checkoutForm.addEventListener("submit", function (e) {

    e.preventDefault();


    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );


    /*
       Get the logged-in user's real identifier.
       Different backend versions may return
       email, identifier, username or phone.
    */

    const accountIdentifier =
        currentUser
            ? (
                currentUser.email ||
                currentUser.identifier ||
                currentUser.username ||
                currentUser.phone ||
                ""
            )
            : "";


    const orderData = {

        id:
            "SS-" +
            Math.floor(
                100000 +
                Math.random() * 900000
            ),

        date:
            new Date().toLocaleDateString(),

        user:
            accountIdentifier,

        items:
            cart,

        currency:
            currencySelect.value,

        payment:
            paymentSelect.value,

        total:
            total.textContent,

        customer: {

            fullname:
                document.getElementById("fullname").value,

            phone:
                document.getElementById("phone").value,

            email:
                document.getElementById("email").value,

            address:
                document.getElementById("address").value,

            city:
                document.getElementById("city").value,

            zip:
                document.getElementById("zip").value

        }

    };


    console.log(
        "ORDER SAVED FOR USER:",
        accountIdentifier
    );

    console.log(
        "ORDER DATA:",
        orderData
    );


    localStorage.setItem(
        "lastOrder",
        JSON.stringify(orderData)
    );


    let orders =
        JSON.parse(
            localStorage.getItem("orders")
        ) || [];


    orders.push(orderData);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    localStorage.removeItem("cart");


    window.location.href =
        "order-success.html";

});


updatePaymentOptions();

renderCheckout();