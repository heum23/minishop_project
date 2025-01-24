const moveUrl = (type) => {
  if (type === "none") {
    Swal.fire("준비중입니다!", "", "warning");
  } else if (type === "main") {
    url = "http://127.0.0.1:5501/html/main.html";
  } else if (type === "cart") {
    url = "http://127.0.0.1:5501/html/detail3.html";
  }
  window.location.href = url;
};
//장바구니 숫자 띄우기
const cart_number = () => {
  let subData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNum = document.querySelector(".numLength");
  cartNum.innerHTML = `${subData.length}`;
};
cart_number();
//장바구니 항목 표시 div 함수
let main = document.querySelector(".main-wrap");
const cartList = () => {
  let subData = JSON.parse(localStorage.getItem("cart")) || [];
  main.innerHTML = "";
  if (subData.length < 1) {
    main.innerHTML = `<div>장바구니에 등록된 상품이 없습니다.</div>`;
  } else {
    subData.map((item) => {
      const numAuto = Number(item.age).toLocaleString("ko-KR");
      main.innerHTML += `<div class="cart-wrap"><img class="img" src="${item.img}"/><div>제품명:${item.name} </div><div>가격:${numAuto}원 </div><div>상세내용:${item.career}</div><img class="trashbtn" onclick="del(${item.id})" src="/detailimg/trash.png"/></button></div>`;
    });
  }
};
cartList();
let subData = JSON.parse(localStorage.getItem("cart")) || [];
const del = (id) => {
  Swal.fire("삭제되었습니다", "", "success");
  const sameCart = subData.filter((item) => Number(item.id) !== id);
  subData = sameCart;
  console.log("JSON.stringify(subData) >>> ", JSON.stringify(subData));

  window.localStorage.setItem("cart", JSON.stringify(subData));
  cartList();
  cartNum.innerHTML = `${subData.length}`;
};
//비우기 함수
const trash = () => {
  subData = [];
  window.localStorage.setItem("cart", JSON.stringify(subData));
  cartList();
  cartNum.innerHTML = `${subData.length}`;
  Swal.fire("장바구니를 비웠습니다!", "", "info");
};
const header = document.querySelector(".header");
const logoDiv = document.querySelector(".logoDiv");
const mainTitle = document.querySelector(".shop");
const icon = document.querySelector(".icon");
const create = document.querySelector(".create");

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY; // 현재 스크롤 위치 (픽셀)
  // 예시: 페이지가 300px 이상 스크롤되면 특정 클래스 추가
  if (scrollPosition > 50) {
    header.classList.add("headerActive");

    icon.innerHTML = `<img
          onclick="moveUrl('none')"
          class="logo1"
          src="/detailimg/loginChange.png"
        />
        <div class="cart">
          <img
            onclick="moveUrl('cart')"
            class="logo2"
            src="/detailimg/cartChange.png"
          />
          <div class="numLength"></div>
        </div>
        `;
    cart_number();
    const cartNum = document.querySelector(".numLength");
    cartNum.classList.remove("numLength");
    cartNum.classList.add("white1");

    mainTitle.classList.add("white");
  } else {
    header.classList.remove("headerActive");
    mainTitle.classList.remove("white");

    icon.innerHTML = `<img
          onclick="moveUrl('none')"
          class="logo1"
          src="/detailimg/login1.png"
        />
        <div class="cart">
          <img
            onclick="moveUrl('cart')"
            class="logo2"
            src="/detailimg/cart.png"
          />
          <div class="numLength"></div>
        </div>
        `;
    cart_number();
    const cartNum = document.querySelector(".numLength");
    cartNum.classList.add("numLength");
    cartNum.classList.remove("white1");
  }
});
