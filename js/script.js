document.addEventListener("DOMContentLoaded", () => {
    let navbar = document.querySelector('.navbar');
    let menuBtn = document.getElementById('menu-btn');
    let searchForm = document.querySelector('.search-form');
    let cartItem = document.querySelector('.cart-items-container');
    let checkoutBtn = document.getElementById('checkoutbtn');
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Load cart from localStorage and update UI
    updateCart();

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

    // Function to update the cart UI
    function updateCart() {
        cartItem.innerHTML = ""; // Clear previous cart items

        if (cart.length === 0) {
            let emptyMessage = document.createElement("p");
            emptyMessage.innerText = "Cart is Empty!";
            emptyMessage.style.textAlign = "center";
            emptyMessage.style.fontSize = "28px";
            emptyMessage.style.fontWeight = "bold";
            emptyMessage.style.marginTop = "20px";
            cartItem.appendChild(emptyMessage);
            return;
        }

        // Log cart to check if price exists
        console.log(cart);

        cart.forEach((item, index) => {
            let cartElement = document.createElement("div");
            cartElement.classList.add("cart-item");
            cartElement.innerHTML = `
                <span class="fas fa-times" onclick="removeFromCart(${index})"></span>
                <img src="${item.image}" alt="${item.name}" style="width:50px; height:50px; border-radius:5px; margin-right:10px;">
                <div class="content">
                    <h3>${item.name}</h3>
                    <div class="price">₹ ${item.price}</div> <!-- Ensure correct price format -->
                </div>
            `;
            cartItem.appendChild(cartElement);
        });

        // Add Checkout button if items exist
        if (cart.length > 0) {
            let checkoutButton = document.createElement("button");
            checkoutButton.innerText = "Checkout";
            checkoutButton.style.fontSize = "18px";
            checkoutButton.style.marginTop = "20px";
            checkoutButton.style.padding = "10px 20px";
            checkoutButton.style.backgroundColor = "#ff6347";
            checkoutButton.style.color = "white";
            checkoutButton.style.border = "none";
            checkoutButton.style.cursor = "pointer";

            checkoutButton.onclick = () => {
                if (confirm("Are you sure you want to place the order?")) {
                    localStorage.removeItem("cart"); // Clear cart data
                    cart = []; // Reset cart array
                    updateCart();
                    alert("Order placed successfully!");
                }
            };

            cartItem.appendChild(checkoutButton); // Append Checkout button
        }

        localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    }

    // Function to add items to the cart
    document.querySelectorAll(".btn").forEach((button, index) => {
        button.addEventListener("click", (event) => {
            event.preventDefault(); // Prevent default link behavior

            let menuItem = button.closest(".box");
            let itemName = menuItem.querySelector("h3").innerText;
            let itemPrice = menuItem.querySelector(".price").innerText.split("₹")[1].split("/")[0].trim(); // Extract price
            let itemImage = menuItem.querySelector("img").src; // Get image URL

            cart.push({ name: itemName, price: itemPrice, image: itemImage });
            updateCart();
        });
    });

    // Function to remove item from the cart
    window.removeFromCart = (index) => {
        cart.splice(index, 1);
        updateCart();
    };

    // Checkout Functionality - Clears the cart
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            if (confirm("Are you sure you want to place the order?")) {
                localStorage.removeItem("cart"); // Clear cart data
                cart = []; // Reset cart array
                updateCart();
                alert("Order placed successfully!");
            }
        };
    }
});
