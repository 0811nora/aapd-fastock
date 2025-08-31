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