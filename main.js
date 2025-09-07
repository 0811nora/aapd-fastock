import "./assets/scss/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";

console.log("Hello world");

const scrollBtn = document.querySelector(".scroll-top-btn");

// 監聽點擊事件
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 購物車按鈕的點擊事件
document.querySelectorAll(".inCardCart").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
});
// 愛心按鈕的點擊事件
document.querySelectorAll(".inCardFav").forEach((button) => {
  button.addEventListener("click", function () {
    this.classList.toggle("is-active");
  });
});

// offcanvas submenu
document.addEventListener("DOMContentLoaded", function () {
  const sharedSubMenu = document.getElementById("sharedSubMenu");

  if (sharedSubMenu) {
    sharedSubMenu.addEventListener("show.bs.offcanvas", function (event) {
      const triggerElement = event.relatedTarget;

      // 取得標題和分類的文字
      const newTitle = triggerElement.getAttribute("data-title");
      const newCategory = triggerElement.getAttribute("data-category");

      // 取得子選單的標題 h5 元素
      const subMenuTitle = document.getElementById("sharedSubMenuLabel");
      // 取得子選單中的分類 h3 元素
      const categoryTitle = document.getElementById("categoryTitle");

      if (subMenuTitle) {
        // 更新主標題
        subMenuTitle.textContent = newTitle;
      }

      if (categoryTitle) {
        // 更新分類標題
        categoryTitle.textContent = newCategory;
      }
    });
  }
});

// 登入狀態切換
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loggedOut = document.getElementById("loggedOut");
  const loggedIn = document.getElementById("loggedIn");

  // click登入
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loggedOut.style.display = "none";
    loggedIn.style.display = "flex";
  });

  // click登出
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    loggedIn.style.display = "none";
    loggedOut.style.display = "flex";
  });
});

// pc checkout modal js
// credit card number
document
  .getElementById("cardNumberInput")
  .addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = formattedInput;
  });

// expiry date
document
  .getElementById("expiryDateInput")
  .addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2, 4);
    }
    e.target.value = input;
  });

// 結帳按鈕啟用與否的驗證
const form = document.querySelector(".needs-validation");
const checkoutButton = document.getElementById("goToCheckout");
const requiredInputs = form.querySelectorAll("[required]");

// 監聽所有必填欄位的輸入事件
form.addEventListener("input", () => {
  let allFieldsValid = true;
  requiredInputs.forEach((input) => {
    // 檢查每個必填欄位是否有效
    if (!input.checkValidity()) {
      allFieldsValid = false;
    }
  });
  // 檢查所有欄位都有效後，才啟用結帳按鈕
  checkoutButton.disabled = !allFieldsValid;
});

// Bootstrap 表單驗證
// 確保只使用這一個區塊來處理表單提交
(function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        // 先阻止預設提交行為
        event.preventDefault();
        event.stopPropagation();

        // 檢查表單是否有效
        if (form.checkValidity()) {
          // 表單有效，執行跳轉
          window.location.href = "checkout.html";
        }
        // 無論如何都要加上 was-validated class 來顯示驗證狀態
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

// mobile checkout offcanvas js
// credit card number
document
  .getElementById("mobCardNumberInput")
  .addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");
    const formattedInput = input.match(/.{1,4}/g)?.join(" ") || "";
    e.target.value = formattedInput;
  });

// expiry date
document
  .getElementById("mobExpiryDateInput")
  .addEventListener("input", function (e) {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 2) {
      input = input.substring(0, 2) + "/" + input.substring(2, 4);
    }
    e.target.value = input;
  });

// 結帳按鈕啟用與否的驗證
const mobForm = document.querySelector("#headerMobCheckout .needs-validation");
const mobCheckoutButton = mobForm.querySelector("#goToCheckout");
const mobRequiredInputs = mobForm.querySelectorAll("[required]");

// 監聽所有必填欄位的輸入事件
mobForm.addEventListener("input", () => {
  let allFieldsValid = true;
  mobRequiredInputs.forEach((input) => {
    // 檢查每個必填欄位是否有效
    if (!input.checkValidity()) {
      allFieldsValid = false;
    }
  });
  // 檢查所有欄位都有效後，才啟用結帳按鈕
  mobCheckoutButton.disabled = !allFieldsValid;
});

// Bootstrap 表單驗證
(function () {
  "use strict";

  // 選取手機版 offcanvas 中的表單
  const form = document.querySelector("#headerMobCheckout .needs-validation");

  // 添加提交事件監聽
  form.addEventListener(
    "submit",
    function (event) {
      // 阻止預設提交行為
      event.preventDefault();
      event.stopPropagation();

      // 檢查表單是否有效
      if (form.checkValidity()) {
        // 表單有效，執行跳轉
        window.location.href = "checkout.html";
      }
      // 加上 was-validated class 來顯示驗證狀態
      form.classList.add("was-validated");
    },
    false
  );
})();
