// ==========================
// 1. CART ARRAY
// ==========================
let cart = [];

// ==========================
// 2. SELECT ELEMENTS
// ==========================
const buttons = document.querySelectorAll(".buy-btn");
const paymentBox = document.querySelector(".payment");
const closeBtn = document.querySelector(".close");

const searchBox = document.getElementById("searchBox");
const searchButton = document.getElementById("searchButton");

// ==========================
// 3. ADD TO CART FUNCTION
// ==========================

const overlay = document.getElementById("overlay");
buttons.forEach(button => {
    button.addEventListener("click", () => {
        
        let time = 1;
        if(time === 1){                      // Need to fix this part //
          for(let i=0 ; i <= time ; i++){     //************************//
            overlay.style.display = "flex";
            paymentBox.style.display = "flex";
          }
        }
        else{
          const card = button.parentElement;

          const name = card.querySelector("h2").innerText;

          // FIX PRICE (handle promo items)
          let price;

          const newPrice = card.querySelector(".new");

          if (newPrice) {
              price = parseInt(newPrice.innerText.replace(/\D/g, ""));
          } else {
              const priceText = card.querySelector(".price").innerText;
              price = parseInt(priceText.replace(/\D/g, ""));
          }

          addToCart(name, price); // ✅ USE THIS
        }
  });
});
// ==========================
// 4. ADD ITEM TO CART
// ==========================
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({
      name: name,
      price: price,
      quantity: 1
    });
  }

  updateTotalUI();
}

// ==========================
// 5. REMOVE ITEM
// ==========================
function removeFromCart(name) {
  cart = cart.filter(item => item.name !== name);
  console.log("Cart:", cart);
}

// ==========================
// 6. CHANGE QUANTITY
// ==========================
function changeQuantity(name, amount) {
  const item = cart.find(item => item.name === name);

  if (!item) return;

  item.quantity += amount;

  if (item.quantity <= 0) {
    removeFromCart(name);
  }

  updateTotalUI();
}

// ==========================
// 7. CLOSE/OPEN PAYMENT BOX 
// ==========================

closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  paymentBox.style.display = "none";
});

// ==========================
// 8. SEARCH FUNCTION
// ==========================
searchButton.addEventListener("click", searchItem);

function searchItem() {
  const value = searchBox.value.toLowerCase().trim();

  const items = document.querySelectorAll(".food-card, .popular-card, .promo-card");

  let found = false;

  items.forEach((item) => {
    const name = item.querySelector("h2").innerText.toLowerCase();

    if (name.includes(value)) {
      item.scrollIntoView({ behavior: "smooth", block: "center" });

      // Highlight
      item.style.border = "3px solid red";

      setTimeout(() => {
        item.style.border = "";
      }, 2000);

      found = true;
    }
  });

  if (!found) {
    alert("Item not found ❌");
  }
}

function calculateTotal() {
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  return total;
}

function updateTotalUI() {
  const totalItems = document.getElementById("totalItems");
  const totalPrice = document.getElementById("totalPrice");

  let itemCount = 0;

  cart.forEach(item => {
    itemCount += item.quantity;
  });

  totalItems.innerText = itemCount;
  totalPrice.innerText = calculateTotal();
}


