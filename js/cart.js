
let cart;
var shoppingCart = (function () {
  cart = [];

  // Constructor
  function Item(name, price, count, id, img) {
    const priceNumber = parsePrice(price);
    this.name = name;
    this.price = priceNumber;
    this.count = count;
    this.id = id;
    this.img = img;
  }

  function parsePrice(value) {
    if (typeof value === "number") return value;
    const digits = String(value || "").replace(/[^\d]/g, "");
    return digits ? Number(digits) : 0;
  }

  function formatPrice(value) {
    return Number(value).toLocaleString("vi-VN") + " đ";
  }

  // Save cart
  function saveCart() {
    window.localStorage.setItem("shoppingCart", JSON.stringify(cart));
  }

  // Load cart
  function loadCart() {
    cart = JSON.parse(window.localStorage.getItem("shoppingCart"));
  }
  if (window.localStorage.getItem("shoppingCart") != null) {
    loadCart();
  }
  var obj = {};

  // Add to cart
  obj.addItemToCart = function (name, price, count, id, img) {
    for (var item in cart) {
      if (cart[item].id === id) {
        cart[item].count++;
        saveCart();
        return;
      }
    }
    var item = new Item(name, price, count, id, img);
    console.log(item);
    cart.push(item);
    saveCart();
  };

  

  // Clear cart
  // obj.clearCart = function () {
  //   cart = [];
  //   saveCart();
  // };

  // Count cart
  obj.totalCount = function () {
    var totalCount = 0;
    for (var item in cart) {
      totalCount += cart[item].count;
    }
    return totalCount;
  };

  // Total cart
  obj.totalCart = function () {
    var totalCart = 0;
    for (var item in cart) {
      totalCart += parsePrice(cart[item].price) * cart[item].count;
    }
    return Number(totalCart.toFixed(2));
  };
    obj.removeItemFromCart = function (id) {
      for (var item in cart) {
        if (cart[item].id === id) {
          cart[item].count--;
          if (cart[item].count === 0) {
            cart.splice(item, 1);
          }
          break;
        }
      }
      saveCart();
    };

    // Remove all items from cart
    obj.removeItemFromCartAll = function (id) {
      for (var item in cart) {
        if (cart[item].id === id) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    };
  // List cart
  obj.listCart = function () {
    var cartCopy = [];
    for (i in cart) {
      item = cart[i];
      itemCopy = {};
      for (p in item) {
      itemCopy[p] = item[p];
    }
    itemCopy.total = Number(parsePrice(item.price) * item.count).toFixed(2);
    itemCopy.priceNumber = parsePrice(item.price);
    itemCopy.totalNumber = parsePrice(item.price) * item.count;
    cartCopy.push(itemCopy);
  }
    console.log(cartCopy);
    return cartCopy;
  };

  return obj;
})();

function showToast(message, type = "success") {
  if (typeof Toastify !== "function") return;
  const colors = {
    success: "#2E7D32",
    warning: "#F9A825",
    error: "#C92127",
  };
  Toastify({
    text: message,
    duration: 2000,
    gravity: "top",
    position: "right",
    close: false,
    backgroundColor: colors[type] || colors.success,
  }).showToast();
}

// render ra màn hình
function displayCart() {
  var cartArray = shoppingCart.listCart();
  const listProductCart = document.querySelector(".list-product-cart");
  const total = document.querySelector(".total-price-number");
  const emptyState = document.querySelector(".cart-empty");
  const summaryBlocks = document.querySelectorAll(".cart-summary");
  updateCartCount();
  if (!listProductCart || !total) {
    return;
  }

  if (emptyState) {
    emptyState.style.display = cartArray.length === 0 ? "block" : "none";
  }
  if (summaryBlocks && summaryBlocks.length) {
    const showSummary = cartArray.length > 0;
    summaryBlocks.forEach((el) => {
      el.style.display = showSummary ? "block" : "none";
    });
  }

  cartArray.map((e) => console.log(e));
  let totalNumber = 0;

  for (i of cartArray) {
    totalNumber += parseInt(i.totalNumber || i.total, 10) || 0;
  }
  total.innerHTML = Number(totalNumber).toLocaleString("vi-VN") + " đ";
  listProductCart.innerHTML = cartArray.map((dataProduct) => {
    console.log(dataProduct.img);
    return `
    <tr class="box-container">
  <td><img class="cart-img" src="${dataProduct.img}" alt=""></td>
  <td class="title">${dataProduct.name}</td>
  <td> 
  <div class="product-quantity">
    <div class="input-group">
      <button class="quantity-btn minus-btn" onclick=remove1Cart(${dataProduct.id})>-</button>
      <input type="number" class="quantity-input" value=${dataProduct.count}>
      <button class="quantity-btn plus-btn"  name="${dataProduct.name}" id="item_${dataProduct.id}" onclick=add1Cart(${dataProduct.priceNumber || dataProduct.price},${dataProduct.id},"${dataProduct.img}")>+</button>
      </div>
      </div></td>
      <td class="pricee">${Number(dataProduct.priceNumber || dataProduct.price).toLocaleString("vi-VN")} đ</td>
      <td><button class="delete" onclick =removeCart(${dataProduct.id})>Xóa</button></td>
      </tr> 
      `;
  })
  .join(" ");
  
} 

displayCart();
// cộng  số lượng
function add1Cart(price, id, img) {
  let name = document.querySelector(`#item_${id}`).name;
  shoppingCart.addItemToCart(name, price, 1, id, img);
  displayCart();
  showToast("Đã tăng số lượng", "success");
}
// trừ số lượng
function remove1Cart(id) {
  shoppingCart.removeItemFromCart(id);
  displayCart();
  showToast("Đã giảm số lượng", "warning");
}
// xoá
function removeCart(id) {
  shoppingCart.removeItemFromCartAll(id);
  displayCart();
  showToast("Đã xoá sản phẩm", "error");
}


function updateCartCount() {
  var cartCountElem = document.querySelector(".cart-count");
  if (!cartCountElem) return;
  var totalCount = 0;
  for (var item in cart) {
    totalCount += cart[item].count;
  }
  cartCountElem.innerHTML = totalCount;
  if (totalCount > 0) {
    cartCountElem.style.display = "inline-block";
  } else {
    cartCountElem.style.display = "none";
  }
}

