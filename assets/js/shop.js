/* ==========================================================
   SHOPSPHERE SHOP.JS
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const productContainer = document.getElementById("product-list");

const searchInput = document.getElementById("search-input");

const categoryFilter = document.getElementById("category-filter");

const sortFilter = document.getElementById("sort-filter");

const pagination = document.getElementById("pagination");

const resultsCount = document.getElementById("results-count");


/* ==========================================================
   LOCAL STORAGE
========================================================== */

let cart =
JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
JSON.parse(localStorage.getItem("wishlist")) || [];


/* ==========================================================
   PRODUCT DATA
========================================================== */

let filteredProducts = [...products];

let currentPage = 1;

const productsPerPage = 8;


/* ==========================================================
   STORAGE HELPERS
========================================================== */

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

function saveWishlist(){

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

}


/* ==========================================================
   NAVBAR COUNTERS
========================================================== */

function updateCartCount(){

    const badge =
    document.getElementById("cart-count");

    if(!badge) return;

    const total = cart.reduce(

        (sum,item)=>sum+item.quantity,

        0

    );

    badge.textContent = total;

}

function updateWishlistCount(){

    const badge =
    document.getElementById("wishlist-count");

    if(!badge) return;

    badge.textContent = wishlist.length;

}


/* ==========================================================
   TOAST
========================================================== */

function showShopToast(message){

    if(typeof window.showToast==="function"){

        window.showToast(

            "success",

            "Success",

            message

        );

    }

}
/* ==========================================================
   WISHLIST
========================================================== */

function isInWishlist(id){

    return wishlist.some(

        item => item.id === id

    );

}

function toggleWishlist(id){

    const product =

    products.find(

        item => item.id === id

    );

    if(!product) return;

    const index = wishlist.findIndex(

        item => item.id === id

    );

    if(index === -1){

        wishlist.push(product);

        showShopToast(

            product.name + " added to wishlist."

        );

    }

    else{

        wishlist.splice(index,1);

        showShopToast(

            product.name + " removed from wishlist."

        );

    }

    saveWishlist();

    updateWishlistCount();

    renderProducts();

}


/* ==========================================================
   CART
========================================================== */

function addToCart(id){

    const product =

    products.find(

        item => item.id === id

    );

    if(!product) return;

    const existing =

    cart.find(

        item => item.id === id

    );

    if(existing){

        existing.quantity++;

    }

    else{

        cart.push({

            ...product,

            quantity:1

        });

    }

    saveCart();

    updateCartCount();

    showShopToast(

        product.name + " added to cart."

    );

}


/* ==========================================================
   PRODUCT CARD
========================================================== */

function createProductCard(product){

    return `

<div class="col-lg-3 col-md-6 d-flex">

<div class="card product-card premium-product-card h-100 w-100">

<div class="product-image-wrapper">

<span class="product-badge">

NEW

</span>

<button

class="wishlist-btn"

data-id="${product.id}">

<i class="${
isInWishlist(product.id)
?
'fas fa-heart text-danger'
:
'far fa-heart'
}"></i>

</button>

<img

src="${product.image}"

class="card-img-top"

alt="${product.name}">

<div class="product-overlay">

<a

href="product.html?id=${product.id}"

class="quick-view-btn">

<i class="fa-solid fa-eye me-2"></i>

Quick View

</a>

</div>

</div>

<div class="card-body text-center d-flex flex-column">

<small class="product-category">

${product.category}

</small>

<h5 class="card-title">

${product.name}

</h5>

<div class="rating">

★★★★★

</div>

<div class="price-row">

<span class="price">

$${product.price.toFixed(2)}

</span>

</div>

<button

class="btn btn-primary add-cart-btn mt-auto"

data-id="${product.id}">

<i class="fa-solid fa-cart-shopping me-2"></i>

Add To Cart

</button>

</div>

</div>

</div>

`;

}
/* ==========================================================
   RENDER PRODUCTS
========================================================== */

function renderProducts(){

    if(!productContainer) return;

    productContainer.innerHTML = "";

    if(filteredProducts.length===0){

        productContainer.innerHTML=`

        <div class="col-12 text-center py-5">

            <h3>No Products Found</h3>

        </div>

        `;

        if(resultsCount){

            resultsCount.textContent="Showing 0 Products";

        }

        pagination.innerHTML="";

        return;

    }

    const start=(currentPage-1)*productsPerPage;

    const end=start+productsPerPage;

    const visibleProducts=

    filteredProducts.slice(start,end);

    visibleProducts.forEach(product=>{

        productContainer.innerHTML+=

        createProductCard(product);

    });

    if(resultsCount){

        resultsCount.textContent=

        `Showing ${filteredProducts.length} Products`;

    }

    renderPagination();

    initializeProductEvents();

}


/* ==========================================================
   PAGINATION
========================================================== */

function renderPagination(){

    if(!pagination) return;

    pagination.innerHTML="";

    const totalPages=Math.ceil(

        filteredProducts.length/productsPerPage

    );

    if(totalPages<=1) return;

    pagination.innerHTML+=`

    <li class="page-item ${currentPage===1?"disabled":""}">

        <button class="page-link"

        data-page="prev">

            <i class="fa-solid fa-angle-left"></i>

        </button>

    </li>

    `;

    for(let i=1;i<=totalPages;i++){

        pagination.innerHTML+=`

        <li class="page-item ${i===currentPage?"active":""}">

            <button

            class="page-link"

            data-page="${i}">

                ${i}

            </button>

        </li>

        `;

    }

    pagination.innerHTML+=`

    <li class="page-item ${currentPage===totalPages?"disabled":""}">

        <button class="page-link"

        data-page="next">

            <i class="fa-solid fa-angle-right"></i>

        </button>

    </li>

    `;

    pagination.querySelectorAll(".page-link")

    .forEach(btn=>{

        btn.onclick=()=>{

            const page=btn.dataset.page;

            if(page==="prev" && currentPage>1){

                currentPage--;

            }

            else if(page==="next" && currentPage<totalPages){

                currentPage++;

            }

            else if(!isNaN(page)){

                currentPage=Number(page);

            }

            renderProducts();

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        };

    });

}


/* ==========================================================
   PRODUCT EVENTS
========================================================== */

function initializeProductEvents(){

    document.querySelectorAll(".add-cart-btn")

    .forEach(btn=>{

        btn.onclick=()=>{

            addToCart(

                Number(btn.dataset.id)

            );

        };

    });

    document.querySelectorAll(".wishlist-btn")

    .forEach(btn=>{

        btn.onclick=(e)=>{

            e.preventDefault();

            e.stopPropagation();

            toggleWishlist(

                Number(btn.dataset.id)

            );

        };

    });

}
/* ==========================================================
   FILTERS
========================================================== */

function applyFilters() {

    const keyword = searchInput.value.toLowerCase().trim();

    const category = categoryFilter.value;

    const sort = sortFilter.value;

    filteredProducts = products.filter(product => {

        const matchSearch =
            product.name.toLowerCase().includes(keyword);

        const matchCategory =
            category === "All" ||
            product.category === category;

        return matchSearch && matchCategory;

    });

    switch (sort) {

        case "low-high":

            filteredProducts.sort((a, b) => a.price - b.price);

            break;

        case "high-low":

            filteredProducts.sort((a, b) => b.price - a.price);

            break;

        case "a-z":

            filteredProducts.sort((a, b) =>
                a.name.localeCompare(b.name));

            break;

        case "z-a":

            filteredProducts.sort((a, b) =>
                b.name.localeCompare(a.name));

            break;

    }

    currentPage = 1;

    renderProducts();

}

/* ==========================================================
   EVENTS
========================================================== */

searchInput.addEventListener("input", applyFilters);

categoryFilter.addEventListener("change", applyFilters);

sortFilter.addEventListener("change", applyFilters);

/* ==========================================================
   INIT
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    updateCartCount();

    updateWishlistCount();

    applyFilters();

});