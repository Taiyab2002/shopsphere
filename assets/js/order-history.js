(function () {

    const currentUser =
        JSON.parse(
            localStorage.getItem("currentUser")
        );

    const ordersContainer =
        document.getElementById("orders-container");

    if (!ordersContainer) {
        return;
    }

    if (!currentUser) {

        ordersContainer.innerHTML = `

        <div class="card shadow-sm border-0 rounded-4">

            <div class="card-body text-center py-5">

                <i class="fas fa-user-lock text-warning mb-3"
                   style="font-size:60px;"></i>

                <h4 class="fw-bold">
                    Login Required
                </h4>

                <p class="text-muted">
                    Please login to view your orders.
                </p>

                <a href="login.html"
                   class="btn btn-primary rounded-pill px-4">

                    Login

                </a>

            </div>

        </div>

        `;

        return;

    }

    const userIdentifiers = [

        currentUser.email,
        currentUser.identifier,
        currentUser.username,
        currentUser.phone

    ]

        .filter(value =>
            value !== null &&
            value !== undefined &&
            value !== ""
        )

        .map(value =>
            String(value)
                .trim()
                .toLowerCase()
        );


    function getUserOrders() {

        const orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        return orders.filter(order => {

            const orderIdentifiers = [

                order.user,
                order.customer?.email,
                order.customer?.identifier,
                order.customer?.username,
                order.customer?.phone

            ]

                .filter(value =>
                    value !== null &&
                    value !== undefined &&
                    value !== ""
                )

                .map(value =>
                    String(value)
                        .trim()
                        .toLowerCase()
                );


            return orderIdentifiers.some(
                identifier =>
                    userIdentifiers.includes(identifier)
            );

        });

    }


    function renderOrders() {

        const userOrders =
            getUserOrders();


        if (userOrders.length === 0) {

            ordersContainer.innerHTML = `

            <div class="card shadow-sm border-0 rounded-4">

                <div class="card-body text-center py-5">

                    <i class="fas fa-box-open text-secondary mb-3"
                       style="font-size:60px;"></i>

                    <h4 class="fw-bold">
                        No Orders Found
                    </h4>

                    <p class="text-muted">
                        You haven't placed any orders yet.
                    </p>

                    <a href="shop.html"
                       class="btn btn-primary rounded-pill px-4">

                        Continue Shopping

                    </a>

                </div>

            </div>

            `;

            return;

        }


        ordersContainer.innerHTML = "";


        userOrders
            .slice()
            .reverse()
            .forEach(order => {

                let itemsHTML = "";


                (order.items || []).forEach(item => {

                    const itemTotal =
                        Number(item.price || 0) *
                        Number(item.quantity || 0);


                    itemsHTML += `

                    <div class="d-flex align-items-center mb-3">

                        <img
                            src="${item.image}"
                            alt="${item.name}"
                            style="width:70px;height:70px;object-fit:contain"
                            class="me-3">

                        <div class="flex-grow-1">

                            <h6 class="mb-1">
                                ${item.name}
                            </h6>

                            <small class="text-muted">
                                Qty: ${item.quantity}
                            </small>

                        </div>

                        <strong>
                            ${itemTotal.toFixed(2)}
                        </strong>

                    </div>

                    `;

                });


                const isCancelled =
                    order.status === "Cancelled";


                ordersContainer.innerHTML += `

                <div class="card shadow border-0 rounded-4 mb-4">

                    <div class="card-body">

                        <div class="d-flex justify-content-between mb-3">

                            <div>

                                <h5 class="fw-bold mb-1">
                                    Order #${order.id}
                                </h5>

                                <small class="text-muted">
                                    ${order.date}
                                </small>

                            </div>


                            <span class="badge ${
                                isCancelled
                                    ? "bg-danger"
                                    : "bg-success"
                            } align-self-start">

                                ${
                                    isCancelled
                                        ? "Cancelled"
                                        : "Ordered"
                                }

                            </span>

                        </div>


                        <hr>


                        ${itemsHTML}


                        <hr>


                        <div class="d-flex justify-content-between">

                            <strong>
                                Total
                            </strong>

                            <strong class="text-primary">
                                ${order.total}
                            </strong>

                        </div>


                        <div class="d-flex justify-content-between mt-2">

                            <span>
                                Payment
                            </span>

                            <span>
                                ${order.payment}
                            </span>

                        </div>


                        ${
                            !isCancelled
                            ? `

                            <div class="text-end mt-3">

                                <button
                                    type="button"
                                    class="btn btn-danger rounded-pill px-4"
                                    onclick="cancelOrder('${order.id}')">

                                    <i class="fas fa-times-circle me-1"></i>

                                    Cancel Order

                                </button>

                            </div>

                            `
                            : `

                            <div class="text-end mt-3">

                                <span class="text-danger fw-semibold">

                                    <i class="fas fa-ban me-1"></i>

                                    This order has been cancelled.

                                </span>

                            </div>

                            `
                        }

                    </div>

                </div>

                `;

            });

    }


    /*
       =========================================
       CANCEL ORDER
       =========================================
    */

    window.cancelOrder = function (orderId) {

        let orders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];


        const orderIndex =
            orders.findIndex(
                order =>
                    String(order.id) === String(orderId)
            );


        if (orderIndex === -1) {

            if (typeof showToast === "function") {

                showToast(
                    "error",
                    "Order Not Found",
                    "The selected order could not be found."
                );

            }

            return;

        }


        const order =
            orders[orderIndex];


        const orderIdentifiers = [

            order.user,
            order.customer?.email,
            order.customer?.identifier,
            order.customer?.username,
            order.customer?.phone

        ]

            .filter(value =>
                value !== null &&
                value !== undefined &&
                value !== ""
            )

            .map(value =>
                String(value)
                    .trim()
                    .toLowerCase()
            );


        const belongsToUser =
            orderIdentifiers.some(
                identifier =>
                    userIdentifiers.includes(identifier)
            );


        if (!belongsToUser) {

            if (typeof showToast === "function") {

                showToast(
                    "error",
                    "Access Denied",
                    "You cannot cancel this order."
                );

            }

            return;

        }


        if (order.status === "Cancelled") {

            if (typeof showToast === "function") {

                showToast(
                    "info",
                    "Already Cancelled",
                    "This order has already been cancelled."
                );

            }

            return;

        }


        orders[orderIndex].status =
            "Cancelled";


        orders[orderIndex].cancelledAt =
            new Date().toLocaleString();


        localStorage.setItem(
            "orders",
            JSON.stringify(orders)
        );


        if (typeof showToast === "function") {

            showToast(
                "success",
                "Order Cancelled",
                `Order #${order.id} has been cancelled successfully.`
            );

        }


        renderOrders();

    };


    renderOrders();

})();