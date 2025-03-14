document.addEventListener("DOMContentLoaded", () => {
    let navbar = document.querySelector('.navbar');
    let menuBtn = document.getElementById('menu-btn');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let checkoutBtn = document.getElementById('checkoutbtn');

    // Toggle Navbar
    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navbar.classList.toggle('active');
            searchForm.classList.remove('active');
            cartItem.classList.remove('active');
        });
    }

    // Toggle Search Form
    let searchBtn = document.querySelector('#search-btn');
    if (searchBtn) {
        searchBtn.onclick = () => {
            searchForm.classList.toggle('active');
            navbar.classList.remove('active');
            cartItem.classList.remove('active');
        };
    }

    // Toggle Cart Items
    let cartBtn = document.querySelector('#cart-btn');
    if (cartBtn) {
        cartBtn.onclick = () => {
            cartItem.classList.toggle('active');
            navbar.classList.remove('active');
            searchForm.classList.remove('active');
        };
    }

    // Hide elements on scroll
    window.onscroll = () => {
        navbar.classList.remove('active');
        searchForm.classList.remove('active');
        cartItem.classList.remove('active');
    };

    // Remove an item when clicking on the cross (X) button
    document.querySelectorAll(".cart-item .fas.fa-times").forEach(removeBtn => {
        removeBtn.addEventListener("click", () => {
            removeBtn.parentElement.remove();
        });
    });

    // Checkout Functionality - Clears the cart
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (confirm("Are you sure you want to place the order?")) {
                cartItem.innerHTML = ""; // Clears all cart items
                alert("Order placed successfully!");
            }
        };
    }
});
