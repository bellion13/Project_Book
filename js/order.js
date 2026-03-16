$(function () {
  apiProvince = (prodvince) => {
    let district;

    prodvince.forEach((element) => {
      $("#province").append(
        `<option value="${element.code}">${element.name}</option>`
      );
    });
    $("#province").change(function () {
      $("#district").html('<option value="-1">Chọn quận/huyện</option>');
      $("#town").html('<option value = "-1"> Chọn phường/xã </option>');
      let value = $(this).val();
      $.each(prodvince, function (index, element) {
        if (element.code == value) {
          district = element.districts;
          $.each(element.districts, function (index, element1) {
            $("#district").append(
              `<option value="${element1.code}">${element1.name}</option>`
            );
          });
        }
      });
    });
    $("#district").change(function () {
      $("#town").html('<option value = "-1"> Chọn phường/xã </option>');
      let value = $(this).val();
      $.each(district, function (index, element) {
        if (element.code == value) {
          element.wards.forEach((element1) => {
            $("#town").append(
              `<option value="${element1.code}">${element1.name}</option>`
            );
          });
        }
      });
    });
  };
  prodvince = JSON.parse(data);
  apiProvince(prodvince);
});

function parsePrice(value) {
  if (typeof value === "number") return value;
  const digits = String(value || "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

function formatPrice(value) {
  return Number(value).toLocaleString("vi-VN") + " đ";
}

function renderCheckoutFromCart() {
  const list = document.getElementById("checkout_products");
  const emptyState = document.querySelector(".checkout-empty");
  const summary = document.querySelector(".order-summary");
  const subtotalEl = document.querySelector(".total_subtotal");
  const shippingEl = document.querySelector(".total_shipping");
  const grandTotalEl = document.querySelector(".grand_total");
  const couponInput = document.getElementById("checkout_coupon");
  const couponBox = document.querySelector(".coupon-applied");
  const couponName = document.querySelector(".coupon-name");
  const couponInvalid = document.querySelector(".coupon-invalid");

  if (!list) return;

  const cartItems = JSON.parse(window.localStorage.getItem("shoppingCart")) || [];
  if (cartItems.length === 0) {
    list.innerHTML = "";
    if (emptyState) emptyState.style.display = "block";
    if (summary) summary.style.display = "none";
    if (subtotalEl) subtotalEl.textContent = formatPrice(0);
    if (shippingEl) shippingEl.textContent = formatPrice(0);
    if (grandTotalEl) grandTotalEl.textContent = formatPrice(0);
    return;
  }

  if (emptyState) emptyState.style.display = "none";
  if (summary) summary.style.display = "block";

  let subtotal = 0;
  list.innerHTML = cartItems
    .map((item) => {
      const price = parsePrice(item.price);
      const total = price * item.count;
      subtotal += total;
      return `
        <div class="checkout_products_item">
          <div class="checkout_products_item_img">
            <img class="img-order" src="${item.img}" alt="${item.name}">
          </div>
          <div class="checkout_products_item_detail">
            <div class="checkout_products_item_name">${item.name}</div>
            <div class="checkout_products_item_price">${formatPrice(price)}</div>
            <div class="checkout_products_item_qty">${item.count}</div>
            <div class="checkout_products_item_total">${formatPrice(total)}</div>
          </div>
        </div>
      `;
    })
    .join("");

  const coupon = couponInput ? couponInput.value.trim().toLowerCase() : "";
  const freeShipByCoupon = coupon === "fahasa";
  const freeShipByTotal = subtotal >= 130000;
  const freeShip = freeShipByCoupon || freeShipByTotal;
  if (couponBox) {
    couponBox.style.display = freeShipByCoupon ? "flex" : "none";
  }
  if (couponName && freeShipByCoupon) {
    couponName.textContent = "fahasa";
  }
  if (couponInvalid) {
    couponInvalid.style.display = "none";
  }
  const shipping = subtotal > 0 ? (freeShip ? 0 : 15000) : 0;
  const grandTotal = subtotal + shipping;

  if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
  if (shippingEl) shippingEl.textContent = formatPrice(shipping);
  if (grandTotalEl) grandTotalEl.textContent = formatPrice(grandTotal);
}

document.addEventListener("DOMContentLoaded", renderCheckoutFromCart);

function setFieldError(el, hasError) {
  if (!el) return;
  if (hasError) {
    el.classList.add("input-error");
  } else {
    el.classList.remove("input-error");
  }
}

function showToast(message, type = "error") {
  if (typeof Toastify !== "function") return;
  const colors = {
    success: "#2E7D32",
    warning: "#F9A825",
    error: "#C92127",
  };
  Toastify({
    text: message,
    duration: 2200,
    gravity: "top",
    position: "right",
    close: false,
    backgroundColor: colors[type] || colors.error,
  }).showToast();
}

function validateCheckoutForm() {
  const alertBox = document.querySelector(".order-alert");
  const fullname = document.getElementById("shipping_fullname");
  const email = document.getElementById("shipping_email");
  const phone = document.getElementById("shipping_telephone");
  const province = document.getElementById("province");
  const district = document.getElementById("district");
  const town = document.getElementById("town");
  const street = document.getElementById("shipping_street");

  const errors = [];

  const fullNameVal = fullname ? fullname.value.trim() : "";
  const emailVal = email ? email.value.trim() : "";
  const phoneVal = phone ? phone.value.trim() : "";
  const streetVal = street ? street.value.trim() : "";

  const emailOk = emailVal.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  const phoneOk = phoneVal.length > 0 && /^[0-9]{9,11}$/.test(phoneVal);
  const provinceOk = province && province.value !== "-1";
  const districtOk = district && district.value !== "-1";
  const townOk = town && town.value !== "-1";

  if (!fullNameVal) errors.push("Vui lòng nhập Họ và tên.");
  if (!emailOk) errors.push("Email không hợp lệ.");
  if (!phoneOk) errors.push("Số điện thoại không hợp lệ.");
  if (!provinceOk) errors.push("Vui lòng chọn Tỉnh/Thành.");
  if (!districtOk) errors.push("Vui lòng chọn Quận/Huyện.");
  if (!townOk) errors.push("Vui lòng chọn Phường/Xã.");
  if (!streetVal) errors.push("Vui lòng nhập địa chỉ nhận hàng.");

  setFieldError(fullname, !fullNameVal);
  setFieldError(email, !emailOk);
  setFieldError(phone, !phoneOk);
  setFieldError(province, !provinceOk);
  setFieldError(district, !districtOk);
  setFieldError(town, !townOk);
  setFieldError(street, !streetVal);

  if (alertBox) {
    if (errors.length) {
      alertBox.textContent = errors[0];
      alertBox.style.display = "block";
    } else {
      alertBox.textContent = "";
      alertBox.style.display = "none";
    }
  }

  if (errors.length) {
    showToast(errors[0], "error");
  }

  return errors.length === 0;
}

function handleCheckoutConfirm() {
  const cartItems = JSON.parse(window.localStorage.getItem("shoppingCart")) || [];
  if (cartItems.length === 0) {
    const alertBox = document.querySelector(".order-alert");
    if (alertBox) {
      alertBox.textContent = "Giỏ hàng trống. Vui lòng quay lại giỏ hàng.";
      alertBox.style.display = "block";
    }
    showToast("Giỏ hàng trống. Vui lòng quay lại giỏ hàng.", "error");
    return;
  }

  if (!validateCheckoutForm()) return;

  window.localStorage.removeItem("shoppingCart");
  alert("Đặt hàng thành công!");
  window.location.href = "./index.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.querySelector(".btn-confirm");
  const couponBtn = document.getElementById("checkout_btn_coupon");
  const couponInput = document.getElementById("checkout_coupon");
  const alertBox = document.querySelector(".order-alert");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", handleCheckoutConfirm);
  }
  if (couponBtn) {
    couponBtn.addEventListener("click", () => {
      if (!couponInput) return;
      const code = couponInput.value.trim().toLowerCase();
      if (code !== "fahasa") {
        if (alertBox) {
          alertBox.textContent = "Mã không hợp lệ. Vui lòng thử lại.";
          alertBox.style.display = "block";
        }
        const couponBox = document.querySelector(".coupon-applied");
        if (couponBox) couponBox.style.display = "none";
        const couponInvalid = document.querySelector(".coupon-invalid");
        if (couponInvalid) couponInvalid.style.display = "block";
        return;
      }
      if (alertBox) {
        alertBox.textContent = "";
        alertBox.style.display = "none";
      }
      const couponInvalid = document.querySelector(".coupon-invalid");
      if (couponInvalid) couponInvalid.style.display = "none";
      renderCheckoutFromCart();
    });
  }
});
