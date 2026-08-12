let toastTimeout;

function showToast(type, title, message) {

    const toast =
        document.getElementById("shopsphere-toast");

    const toastTitle =
        document.getElementById("toast-title");

    const toastMessage =
        document.getElementById("toast-message");

    const toastIcon =
        document.getElementById("toast-icon");

    const closeBtn =
        document.getElementById("toast-close");

    if (
        !toast ||
        !toastTitle ||
        !toastMessage ||
        !toastIcon
    ) return;

    toast.classList.remove(
        "toast-success",
        "toast-error",
        "toast-warning",
        "toast-info",
        "show"
    );

    switch (type) {

        case "success":

            toast.classList.add("toast-success");

            toastIcon.className =
                "fas fa-check-circle";

            break;

        case "error":

            toast.classList.add("toast-error");

            toastIcon.className =
                "fas fa-times-circle";

            break;

        case "warning":

            toast.classList.add("toast-warning");

            toastIcon.className =
                "fas fa-exclamation-triangle";

            break;

        default:

            toast.classList.add("toast-info");

            toastIcon.className =
                "fas fa-info-circle";

    }

    toastTitle.textContent = title;

    toastMessage.textContent = message;

    toast.classList.add("show");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

    closeBtn.onclick = () => {

        toast.classList.remove("show");

    };

}
window.showToast = showToast;