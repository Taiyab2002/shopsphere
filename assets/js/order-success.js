const order = JSON.parse(localStorage.getItem("lastOrder"));

if (!order) {

    window.location.href = "shop.html";

}

const customerName =
    document.getElementById("customer-name");

const paymentMethod =
    document.getElementById("payment-method");

const totalPaid =
    document.getElementById("total-paid");

const orderId =
    document.getElementById("order-id");

const deliveryDate =
    document.getElementById("delivery-date");

const randomId =
    "SS-" +
    Math.floor(
        100000 + Math.random() * 900000
    );

const today = new Date();

today.setDate(today.getDate() + 5);

customerName.textContent =
    order.customer.fullname;

paymentMethod.textContent =
    order.payment;

totalPaid.textContent =
    order.total;

orderId.textContent =
    randomId;

deliveryDate.textContent =
    today.toDateString();