const moveUrl = (type) => {
  if (type === "none") {
    Swal.fire("준비중입니다!", "", "warning");
    return;
  } else if (type === "main") {
    url = "http://127.0.0.1:5501/html/main.html";
  } else if (type === "cart") {
    url = "http://127.0.0.1:5501/html/detail3.html";
  }
  window.location.href = url;
};
//장바구니 숫자 띄우기
let subData = JSON.parse(localStorage.getItem("cart")) || [];
const cart_number = () => {
  subData = JSON.parse(localStorage.getItem("cart")) || [];
  console.log(subData);
  let cartNum = document.querySelector(".numLength");
  console.log(cartNum);
  // cartNum = document.querySelector(".numLength");
  cartNum.innerHTML = `${subData.length}`;
};
cart_number();

// 1. Query string에서 ID 가져오기
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
// 2. 로컬스토리지에서 데이터 가져오기
const dataSet = JSON.parse(localStorage.getItem("data"));
const sameData = dataSet.find((item) => item.id === id);

// 3. 데이터를 상세 페이지에 표시
if (sameData) {
  const main = document.getElementById("main-wrap");
  const numAuto = Number(sameData.age).toLocaleString("ko-KR");
  main.innerHTML = `
    <img class="detail_img" src="${sameData.img}"/>
    <h1>${sameData.name}</h1>
    <p>가격: ${numAuto}원</p>
    <p>상세설명: ${sameData.career}</p>
    <button onclick="getItem()">장바구니 담기</button>
  `;
} else {
  // 데이터가 없을 경우 메시지 표시
  document.getElementById(
    "details"
  ).innerHTML = `<p>표시할 내용이 없습니다!</p>`;
}
//장바구니 담기 함수
const getItem = () => {
  // 로컬 스토리지에서 기존 데이터 가져오기
  let subData = JSON.parse(localStorage.getItem("cart")) || []; // 기본값을 배열로 설정

  // subData가 배열인지 확인 (예외 방지)
  if (!Array.isArray(subData)) {
    subData = []; // 배열로 초기화
  }

  // 중복 데이터 확인
  const same_cart = subData.find((item) => item.id === sameData.id);

  if (!same_cart) {
    Swal.fire("장바구니에 담겼습니다.", "감사합니다", "success");
    // 중복이 아닐 경우에만 추가

    subData.push(sameData);
    // 로컬 스토리지에 업데이트된 데이터 저장
    localStorage.setItem("cart", JSON.stringify(subData));
    console.log("dsadad");
    cart_number();
  } else {
    Swal.fire("이미 담으신 물품입니다.", "", "info");
  }
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

    cartNum.classList.add("white1");
    cartNum.classList.remove("blue");
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
