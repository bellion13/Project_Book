const btnLogin = document.querySelector(".button-login");
const inputEmailLog = document.querySelector(".input-login__email");
const inputPassLog = document.querySelector(".input-login__password");

const ACCOUNT_API = "https://64036281302b5d671c4e05dc.mockapi.io/taikhoan";

// tk admin : admin@gmail.com
// mk admin : admin

function showToast(message, type = "error") {
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
    backgroundColor: colors[type] || colors.error,
  }).showToast();
}

function setFieldError(el, hasError) {
  if (!el) return;
  if (hasError) {
    el.classList.add("input-error");
  } else {
    el.classList.remove("input-error");
  }
}

function handleLogin() {
  const emailVal = inputEmailLog ? inputEmailLog.value.trim() : "";
  const passVal = inputPassLog ? inputPassLog.value.trim() : "";
  const emailOk = emailVal.length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
  const passOk = passVal.length > 0;

  setFieldError(inputEmailLog, !emailOk);
  setFieldError(inputPassLog, !passOk);

  if (!emailOk || !passOk) {
    showToast("Vui lòng nhập email và mật khẩu hợp lệ.", "warning");
    return false;
  }

  fetch(ACCOUNT_API)
    .then((res) => res.json())
    .then((accounts) => {
      const found = accounts.find(
        (acc) => acc.email === emailVal && acc.password === passVal
      );
      if (!found) {
        showToast("Tài khoản hoặc mật khẩu không chính xác!", "error");
        return false;
      }
      if (found.role !== "admin") {
        showToast("Tài khoản này không có quyền quản trị.", "warning");
        return false;
      }
      showToast("Đăng nhập thành công!", "success");
      setTimeout(() => {
        window.location.href = "admin/admin.html";
      }, 300);
      return true;
    })
    .catch(() => {
      showToast("Không thể kết nối tài khoản. Vui lòng thử lại.", "error");
    });
}

btnLogin.addEventListener("click", handleLogin);

document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    handleLogin();
  }
});
