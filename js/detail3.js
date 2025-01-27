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
      main.innerHTML += `<div class="cart-wrap"><img class="img" src="${item.img}"/><div>제품명:${item.name} </div><div>가격:${numAuto}원 </div><div>상세내용:${item.career}</div><div>수량:  <span onclick="minusCnt(${item.id})"> - </span> ${item.cnt} <span onclick="changeCnt(${item.id})"> + </span></div><img class="trashbtn" onclick="del(${item.id})" src="/detailimg/trash.png"/></button></div>`;
    });
  }
};
cartList();

let subData = JSON.parse(localStorage.getItem("cart")) || [];
// 장바구니 수량 조절 함수
const changeCnt = (id) => {
  const sameCnt = subData.find((item) => item.id == id);
  sameCnt.cnt += 1;
  window.localStorage.setItem("cart", JSON.stringify(subData));
  cartList();
};
const minusCnt = (id) => {
  const sameCnt = subData.find((item) => item.id == id);
  if (sameCnt.cnt === 1) {
    Swal.fire("최소 개수입니다", "", "info");
  } else {
    sameCnt.cnt -= 1;
    window.localStorage.setItem("cart", JSON.stringify(subData));
    cartList();
  }
};

const del = (id) => {
  Swal.fire("삭제되었습니다", "", "success");
  const sameCart = subData.filter((item) => Number(item.id) !== id);
  subData = sameCart;
  console.log("JSON.stringify(subData) >>> ", JSON.stringify(subData));

  window.localStorage.setItem("cart", JSON.stringify(subData));
  cartList();
  cart_number();
};
//비우기 함수
const trash = () => {
  subData = [];
  window.localStorage.setItem("cart", JSON.stringify(subData));
  cartList();
  cart_number();
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
    cartNum.classList.remove("blue");
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
    cartNum.classList.add("blue");
    cartNum.classList.remove("white1");
  }
});
// 스크롤 이벤트 감지
const scrollToTopBtn = document.querySelector(".up");
window.addEventListener("scroll", () => {
  // 화면의 중간 높이보다 스크롤이 내려가면 버튼 표시
  if (window.scrollY > window.innerHeight / 2) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});

// 버튼 클릭 이벤트로 스크롤을 상단으로 이동
scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // 부드러운 스크롤
  });
});
