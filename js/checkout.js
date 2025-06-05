function loadCart(){
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const cartContainer = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    cartContainer.innerHTML = ""; // Clear previous items
    let total = 0;
    cartItems.forEach(product => {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-4";
        col.innerHTML = `
            <div class="card h-100">
<img src="${product.image}" class="card-img-top" style="height:200px; object-fit:cover;" alt="${product.name}">
                <div class="card-body">
                 <h5 class="card-title">${product.name}</h5>
                    <p class="card-text text-success fw-bold">$${product.price.toFixed(2)}</p>
                </div>
                `;
                cartContainer.appendChild(col);
        total += product.price; // Add product price to total
    });
totalAmount.textContent = total.toFixed(2);


}
function clearCart() {
    localStorage.removeItem("cartItems");
    loadCart();
    alert("Your cart has been cleared!");
document.getElementById("clearCartBtn").disabled = true;

}
loadCart();