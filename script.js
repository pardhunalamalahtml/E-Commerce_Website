const cartinfo = document.getElementById("empty-cart");

let count = 0;
let cart = [];
let price = 0;
let total = 0;
let subtotal = 0;
const products = [
  {
    id: 1,
    category: "Audio",
    name: "Wireless Headphones",
    price: 1499,
  },
  {
    id: 2,
    category: "Acessories",
    name: "Wireless Mouse",
    price: 799,
  },
  {
    id: 3,
    category: "Accessories",
    name: "Mechanical Keyboard",
    price: 2499,
  },
  {
    id: 4,
    category: "Lifestyle",
    name: "Modern Chair",
    price: 3999,
  },
  {
    id: 5,
    category: "Gaming",
    name: "Wireless Gaming Controller",
    price: 1899,
  },
  {
    id: 6,
    category: "Accessories",
    name: "USB-C Hub",
    price: 1299,
  },
  {
    id: 7,
    category: "Fitness",
    name: "Smart Fitness Band",
    price: 2799,
  },
  {
    id: 8,
    category: "Home Office",
    name: "LED Desk Lamp",
    price: 999,
  },
];
const buttons = document.querySelectorAll(".add-btn");
const cartContainer = document.getElementById("cart-items");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let price = 0;
    const id = Number(button.dataset.id);
    const product = products.find((item) => item.id === id);
    if (product) {
      cart.push(product);
      cartContainer.insertAdjacentHTML("beforeend", renderCartItem(product));
      count++;
      price += product.price;
      console.log(price);
      updateCart();
    }
  });
});

function renderCartItem(item) {
  return `
  <div class="cart-items-display" data-id="${item.id}">
  <p class="category">${item.category}</p>
  <p class="product-name">${item.name}</p>
  <p class="product-price">${item.price}</p>
  <button class="remove-item">Remove from cart</button>
  </div>
  `;
}

const address = document.getElementById("address-form");
address.addEventListener("submit", (e) => {
  e.preventDefault();
  if (cart.length === 0) {
    alert(`Please add products to your cart first`);
    return;
  }
  const deliveryAddress = {
    name: document.getElementById("customer-name").value.trim(),
    phone: document.getElementById("customer-phone").value.trim(),
    pincode: document.getElementById("customer-pincode").value.trim(),
    address: document.getElementById("customer-address").value.trim(),
    city: document.getElementById("customer-city").value.trim(),
    state: document.getElementById("customer-state").value.trim(),
  };

  if(Object.values(deliveryAddress).some(value=>value==="")){
    alert("Please fill in all address fields.");
    return;
  }
  console.log("Delivery details:", deliveryAddress);
  alert("Delivery address saved successfully!");
});
function updateCart() {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("cart-count-1").textContent = count;
  console.log(total);
  const total_amount = addDiscount(total);
  const discount_amount = discount(total);
  document.getElementById("discount-block").textContent = `$${discount_amount}`;
  document.getElementById("cart-total").textContent = `$${total}`;
  if (total > 5000 || total === 0) {
    document.getElementById("free").textContent = "FREE";
  } else {
    document.getElementById("free").textContent = "$40";
  }

  document.getElementById("grand-total").textContent = `$${total_amount}`;

  if (cart.length === 0) {
    cartinfo.classList.remove("hidden");
  } else {
    cartinfo.classList.add("hidden");
  }
}

cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const itemElement = e.target.closest(".cart-items-display");
    const id = Number(itemElement.dataset.id);
    const index = cart.findIndex((item) => item.id === id);
    if (index !== -1) {
      cart.splice(index, 1);
      count--;
      itemElement.remove();
      updateCart();
    }
  }
});

function discount(price) {
  if (price > 10000) {
    const discount = 20 * price;
    return discount / 100;
  } else if (price > 5000) {
    const discount = 10 * price;
    return discount / 100;
  } else {
    return 0;
  }
}
function addDiscount(price) {
  if (price > 10000) {
    const discount = 0.2 * price;
    return price - discount;
  } else if (price > 5000) {
    const discount = 0.1 * price;
    return price - discount;
  } else if (price === 0) {
    return 0;
  } else {
    return price + 40;
  }
}
updateCart();

document.getElementById("checkout-btn").addEventListener("click", () => {
  if(!address){
    alert("Please save your address to delivery the items");
    return;
  }
  alert("PHONE PE KOTTU BRO EE NUMBER KI 9347682542");
});
// const remove = document.getElementBy("remove-item");
