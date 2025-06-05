const user = localStorage.getItem("loggedInUser");
if(!user) {
  window.location.href = "index.html"; // Redirect to login if not logged in
}
document.getElementById("welcomeUser").textContent = `Hello, ${user}!`;

function updateCartCounter() {
  const cart = JSON.parse(localStorage.getItem("cartItems")) || [];
  const cartCount = document.getElementById("cartCount");
  cartCount.textContent = cart.length;
}
updateCartCounter();
fetch("../product.json")
    .then(response => response.json())
    .then(products => {
        const productList = document.getElementById("productlist");
       
        products.forEach(product => {
        const col = document.createElement("div");
col.className = "col-12 col-sm-6 col-md-4 col-lg-3 mb-4";
        col.innerHTML = `
        <div class="card h-100">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <p class="card-text">${product.description}</p>
                <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
        `;
       
    col.querySelector(".add-to-cart").addEventListener("click", function() {
            let cart = JSON.parse(localStorage.getItem("cartItems")) || [];//set empty array if cartItems is null
            cart.push(product);
            localStorage.setItem("cartItems", JSON.stringify(cart));
            updateCartCounter();
            alert(`${product.name} has been added to your cart!`);
        })
        productList.appendChild(col);
        })
    })
