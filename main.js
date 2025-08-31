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
