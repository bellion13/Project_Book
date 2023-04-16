const btnLogin = document.querySelector(".button-login");
const inputEmailLog = document.querySelector(".input-login__email");
const inputPassLog = document.querySelector(".input-login__password");

var accounts = [
  { username: "admin123@gmail.com", password: "admin" },

];

btnLogin.addEventListener("click", () => {
  console.log(inputEmailLog, inputPassLog);
  for (var i = 0; i < accounts.length; i++) {
    if (
      accounts[i].username === inputEmailLog.value &&
      accounts[i].password === inputPassLog.value
    ) {
      location.assign("http://127.0.0.1:5500/admin/admin.html");
      return true;
    }
  }

  alert("Tài khoản hoặc mật khẩu không chính xác!");
  return false;
});
