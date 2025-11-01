// ✅ 1️⃣ INDEX PAGE – Show all products from FakeStore API
if (window.location.pathname.includes("index.html") || window.location.pathname.endsWith("/")) {
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      let container = document.getElementById('product-list');
      container.innerHTML = ""; // Clear before adding
      data.forEach(p => {
        container.innerHTML += `
          <div class="product">
            <img src="${p.image}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id}, '${encodeURIComponent(p.title)}', ${p.price}, '${p.image}')">Add to Cart</button>
          </div>
        `;
      });
    })
    .catch(err => console.error("❌ Error loading products:", err));
}



// ✅ Navbar toggle content shift
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.getElementById('navbarTogglerDemo03');

navbarToggler.addEventListener('click', () => {
  document.body.classList.toggle('shift-down');
});


navbarCollapse.addEventListener('hidden.bs.collapse', () => {
  document.body.classList.remove('shift-down');
});


const button = document.getElementById("modeBtn");
    const body = document.body;

    // ✅ Check saved mode on page load
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "enabled") {
      body.classList.add("dark-mode");
    }

    // ✅ Toggle and save mode on click
    button.addEventListener("click", () => {
      body.classList.toggle("dark-mode");

      if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
    });

// //mode
// const button = document.getElementById("modeBtn");
//     const body = document.body;

//     button.addEventListener("click", () => {
//       body.classList.toggle("dark-mode");
//       if (body.classList.contains("dark-mode")) {
//         button.textContent = "☀️ Disable Dark Mode";
//       } else {
//         button.textContent = "🌙 Enable Dark Mode";
//       }
//     });





// ✅ 2️⃣ ADD TO CART (Save to LocalStorage)
function addToCart(id, title, price, image) {
  title = decodeURIComponent(title); // Decode safe title
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Optional: check if item already exists
  let exists = cart.find(item => item.id === id);
  if (exists) {
    alert(`${title} is already in the cart!`);
    return;
  }

  cart.push({ id, title, price, image });
  localStorage.setItem("cart", JSON.stringify(cart));

  // Popup to go to cart
  if (confirm(`${title} added to cart! \n\nDo you want to go to cart page?`)) {
    window.location.href = "cart.html";
  }
}

// ✅ 3️⃣ CART PAGE – Show all added items
if (window.location.pathname.includes("cart.html")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartDiv = document.getElementById("cart-items");
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    document.getElementById("total").innerText = "";
  } else {
    cart.forEach((item, i) => {
      total += item.price;
      cartDiv.innerHTML += `
        <div class="cart-item">
          <img src="${item.image}" width="50" alt="${item.title}">
          <span>${item.title}</span> - $${item.price.toFixed(2)}
          <button onclick="removeItem(${i})">Remove</button>
        </div>
      `;
    });
    document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
  }
}

// ✅ 4️⃣ REMOVE ITEM FROM CART
function removeItem(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // Refresh cart page
}

// ✅ 5️⃣ CHECKOUT BUTTON FUNCTION
function checkout() {
  window.location.href = "checkout.html";
}

// ✅ 6️⃣ CHECKOUT PAGE – Clear cart and return home
function clearCart() {
  localStorage.removeItem("cart");
  alert("Thank you for shopping with ShopSense 🛍️!");
  window.location.href = "index.html";
}

