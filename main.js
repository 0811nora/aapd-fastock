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

// search bar
// 統一搜尋功能 - 支援電腦版和手機版
document.addEventListener("DOMContentLoaded", function () {
  // ========== 搜尋欄切換功能 ==========

  // 電腦版元素
  const textSearchWrapper = document.getElementById("textSearchWrapper");
  const imageSearchWrapper = document.getElementById("imageSearchWrapper");
  const toggleToImageSearchBtn = document.getElementById(
    "toggleToImageSearchBtn"
  );
  const closeImageSearchBtn = document.getElementById("closeImageSearchBtn");
  const imageUpload = document.getElementById("imageUpload");

  // 手機版元素
  const mobileTextSearchWrapper = document.getElementById(
    "mobileTextSearchWrapper"
  );
  const mobileImageSearchWrapper = document.getElementById(
    "mobileImageSearchWrapper"
  );
  const mobileToggleToImageSearchBtn = document.getElementById(
    "mobileToggleToImageSearchBtn"
  );
  const mobileCloseImageSearchBtn = document.getElementById(
    "mobileCloseImageSearchBtn"
  );
  const mobileImageUpload = document.getElementById("mobileImageUpload");

  // 切換到圖搜圖的通用函數
  function switchToImageSearch(textWrapper, imageWrapper, searchBarId) {
    if (textWrapper && imageWrapper) {
      textWrapper.classList.add("d-none");
      imageWrapper.classList.remove("d-none");

      const searchBar = document.getElementById(searchBarId);
      if (searchBar) {
        searchBar.value = "";
      }
    }
  }

  // 切換回文字搜尋的通用函數
  function switchToTextSearch(textWrapper, imageWrapper, uploadInput) {
    if (textWrapper && imageWrapper) {
      imageWrapper.classList.add("d-none");
      textWrapper.classList.remove("d-none");

      // 清空圖片上傳欄位
      if (uploadInput) {
        uploadInput.value = "";
      }

      // 重置上傳標籤的文字
      const uploadLabel = imageWrapper.querySelector("label span");
      if (uploadLabel) {
        uploadLabel.textContent = "上傳圖片搜尋";
      }
    }
  }

  // 處理檔案上傳的通用函數
  function handleFileUpload(uploadInput, wrapper) {
    if (uploadInput) {
      uploadInput.addEventListener("change", function (e) {
        const file = e.target.files[0];
        const uploadLabel = wrapper.querySelector("label span");

        if (file && uploadLabel) {
          uploadLabel.textContent = `已選擇: ${file.name}`;
        } else if (uploadLabel) {
          uploadLabel.textContent = "上傳圖片搜尋";
        }
      });
    }
  }

  // 電腦版事件綁定
  if (toggleToImageSearchBtn) {
    toggleToImageSearchBtn.addEventListener("click", function () {
      switchToImageSearch(
        textSearchWrapper,
        imageSearchWrapper,
        "headerSearchBar"
      );
    });
  }

  if (closeImageSearchBtn) {
    closeImageSearchBtn.addEventListener("click", function () {
      switchToTextSearch(textSearchWrapper, imageSearchWrapper, imageUpload);
    });
  }

  // 手機版事件綁定
  if (mobileToggleToImageSearchBtn) {
    mobileToggleToImageSearchBtn.addEventListener("click", function () {
      switchToImageSearch(
        mobileTextSearchWrapper,
        mobileImageSearchWrapper,
        "mobileHeaderSearchBar"
      );
    });
  }

  if (mobileCloseImageSearchBtn) {
    mobileCloseImageSearchBtn.addEventListener("click", function () {
      switchToTextSearch(
        mobileTextSearchWrapper,
        mobileImageSearchWrapper,
        mobileImageUpload
      );
    });
  }

  // 檔案上傳處理
  handleFileUpload(imageUpload, imageSearchWrapper);
  handleFileUpload(mobileImageUpload, mobileImageSearchWrapper);

  // ESC鍵切換（對兩個版本都有效）
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // 電腦版
      if (
        imageSearchWrapper &&
        !imageSearchWrapper.classList.contains("d-none")
      ) {
        switchToTextSearch(textSearchWrapper, imageSearchWrapper, imageUpload);
      }
      // 手機版
      if (
        mobileImageSearchWrapper &&
        !mobileImageSearchWrapper.classList.contains("d-none")
      ) {
        switchToTextSearch(
          mobileTextSearchWrapper,
          mobileImageSearchWrapper,
          mobileImageUpload
        );
      }
    }
  });

  // 初始化 - 確保預設顯示文字搜尋
  if (textSearchWrapper && imageSearchWrapper) {
    textSearchWrapper.classList.remove("d-none");
    imageSearchWrapper.classList.add("d-none");
  }

  if (mobileTextSearchWrapper && mobileImageSearchWrapper) {
    mobileTextSearchWrapper.classList.remove("d-none");
    mobileImageSearchWrapper.classList.add("d-none");
  }

  // keyword

  // 定義搜尋關鍵字對應的頁面
  const searchPages = {
    貓: "cat-search-result.html",
    cat: "cat-search-result.html",
  };

  // 預設的搜尋失敗頁面
  const noResultPage = "no-search.html";

  // 搜尋函數
  function performSearch(searchInput) {
    if (!searchInput) return;

    // 取得使用者輸入的關鍵字
    const keyword = searchInput.value.trim().toLowerCase();

    // 如果沒有輸入任何東西
    if (keyword === "") {
      alert("請輸入搜尋關鍵字");
      return;
    }

    // 檢查關鍵字是否在我們的清單中
    if (searchPages[keyword]) {
      // 找到對應頁面，跳轉過去
      window.location.href = searchPages[keyword];
    } else {
      // 沒有找到，跳轉到搜尋失敗頁面
      window.location.href = noResultPage;
    }
  }

  // 綁定搜尋事件的通用函數
  function bindSearchEvents(formSelector, inputId) {
    const searchForm = document.querySelector(formSelector);
    const searchInput = document.getElementById(inputId);

    // 表單提交事件
    if (searchForm) {
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        performSearch(searchInput);
      });
    }

    // Enter鍵事件
    if (searchInput) {
      searchInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          performSearch(searchInput);
        }
      });
    }
  }

  // 綁定電腦版搜尋事件
  bindSearchEvents("form.d-none.d-lg-block", "headerSearchBar");

  // 綁定手機版搜尋事件
  bindSearchEvents("form.d-lg-none", "mobileHeaderSearchBar");
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

// 登入狀態切換+用戶名
document.addEventListener("DOMContentLoaded", function () {
  // 取得 DOM 元素
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  const loggedOut = document.getElementById("loggedOut");
  const loggedIn = document.getElementById("loggedIn");

  // 取得結帳 modal 和 offcanvas 的標題元素
  const pcGuestTitle = document.getElementById("headerCheckoutLabel");
  const pcLoggedInTitle = document.getElementById("loggedInCheckoutLabel");
  const mobGuestTitle = document.getElementById("mobGuestCheckoutLabel");
  const mobLoggedInTitle = document.getElementById("mobLoggedInCheckoutLabel");
  const customerNameSpan = document.getElementById("customerName");
  const mobCustomerNameSpan = document.getElementById("mobCustomerName");

  // 固定客戶名稱
  const customerName = "小明";

  // 模擬登入成功的函數
  function handleLoginSuccess() {
    // 登入狀態切換
    loggedOut.style.display = "none";
    loggedIn.style.display = "flex";

    // PC 版結帳標題切換
    if (pcGuestTitle && pcLoggedInTitle) {
      pcGuestTitle.style.display = "none";
      pcLoggedInTitle.style.display = "block";
    }

    // 手機版結帳標題切換
    if (mobGuestTitle && mobLoggedInTitle) {
      mobGuestTitle.style.display = "none";
      mobLoggedInTitle.style.display = "block";
    }

    // 設定客戶名稱
    if (customerNameSpan) {
      customerNameSpan.textContent = customerName;
    }
    if (mobCustomerNameSpan) {
      mobCustomerNameSpan.textContent = customerName;
    }
  }

  // 模擬登出成功的函數
  function handleLogoutSuccess() {
    // 登入狀態切換
    loggedIn.style.display = "none";
    loggedOut.style.display = "flex";

    // PC 版結帳標題切換回訪客模式
    if (pcGuestTitle && pcLoggedInTitle) {
      pcLoggedInTitle.style.display = "none";
      pcGuestTitle.style.display = "block";
    }
    // 手機版結帳標題切換回訪客模式
    if (mobGuestTitle && mobLoggedInTitle) {
      mobLoggedInTitle.style.display = "none";
      mobGuestTitle.style.display = "block";
    }
  }

  // click 登入
  loginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    handleLoginSuccess();
  });

  // click 登出
  logoutBtn.addEventListener("click", function (e) {
    e.preventDefault();
    handleLogoutSuccess();
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

// 啟用購物車
// 選擇所有的「加入購物車」按鈕
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

// 選擇所有的購物車按鈕（電腦版和手機版）
const cartButtons = document.querySelectorAll(".cart-btn");

// 購物車總商品數
let itemCount = 0;

// 監聽所有「加入購物車」按鈕的點擊事件
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    itemCount++;
    updateCartState();
  });
});

function updateCartState() {
  cartButtons.forEach((cartBtn) => {
    if (itemCount > 0) {
      cartBtn.classList.add("cart-active");
      cartBtn.classList.remove("cart-disabled");
    } else {
      cartBtn.classList.add("cart-disabled");
      cartBtn.classList.remove("cart-active");
    }
  });
}

// 頁面載入時先初始化購物車狀態
window.addEventListener("load", () => {
  updateCartState();
});
