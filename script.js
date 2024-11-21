// Catálogo atualizado com mais produtos
const products = [
    { id: 1, name: "Teclado Mecânico RGB", price: 250 },
    { id: 2, name: "Monitor Gamer 27''", price: 1500 },
    { id: 3, name: "Headset com Cancelamento de Ruído", price: 500 },
    { id: 4, name: "Mouse Gamer", price: 120 },
    { id: 5, name: "Placa de Vídeo RTX 3060", price: 2500 },
    { id: 6, name: "Notebook i7 16GB RAM", price: 4500 },
    { id: 7, name: "SSD 1TB", price: 600 },
    { id: 8, name: "Cadeira Gamer", price: 800 },
    { id: 9, name: "Console de Video-game", price: 2800 },
    { id: 10, name: "Smartphone 128GB", price: 2500 },
];

// Carrinho inicial
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Navegação dinâmica (Correção para aparecer "Minha Conta" após cadastro)
function updateAccountLink() {
    const accountLink = document.getElementById("account-link");
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));

    if (userDetails) {
        accountLink.textContent = "Minha Conta";
        accountLink.href = "account.html";
    } else {
        accountLink.textContent = "Cadastro";
        accountLink.href = "signup.html";
    }
}

// Exibir produtos
function loadProducts(filteredProducts = products) {
    const productList = document.getElementById("products");
    productList.innerHTML = "";
    filteredProducts.forEach((product) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${product.name} - R$${product.price.toFixed(2)}
            <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(li);
    });
}

// Pesquisar produtos
function searchProducts() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(query)
    );
    loadProducts(filteredProducts);
}

// Adicionar ao carrinho
function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} adicionado ao carrinho!`);
}

// Mostrar carrinho
function showCart() {
    const cartList = document.getElementById("cart");
    const totalDisplay = document.getElementById("total");
    cartList.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - R$${item.price.toFixed(2)}
            <button onclick="removeFromCart(${index})">Remover</button>
        `;
        cartList.appendChild(li);
    });

    totalDisplay.textContent = `Total: R$${total.toFixed(2)}`;
}

// Remover do carrinho
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    showCart();
}

// Finalizar compra
function finalizePurchase() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    alert("Obrigado pela compra! Aguardamos seu retorno.");
    cart = []; // Esvazia o carrinho
    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "index.html";
}

// Inicializar páginas
document.addEventListener("DOMContentLoaded", () => {
    updateAccountLink();

    if (document.title.includes("Catálogo")) {
        loadProducts();
    } else if (document.title.includes("Carrinho")) {
        showCart();
    }
});
