const moveUrl = (type) => {
  if (type === "none") {
    alert("준비중입니다!");
  } else if (type === "main") {
    url = "http://127.0.0.1:5501/html/main.html";
  } else if (type === "cart") {
    url = "http://127.0.0.1:5501/html/detail3.html";
  }
  window.location.href = url;
};
//장바구니 숫자 띄우기
let subData = JSON.parse(localStorage.getItem("cart")) || [];
const cartNum = document.querySelector(".numLength");
cartNum.innerHTML = `${subData.length}`;
console.log(subData);
