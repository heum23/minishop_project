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
const cart_number = () => {
  let subData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNum = document.querySelector(".numLength");
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
  main.innerHTML = `
    <img class="detail_img" src="${sameData.img}"/>
    <h1>${sameData.name}</h1>
    <p>가격: ${sameData.age}</p>
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
    // 중복이 아닐 경우에만 추가
    subData.push(sameData);

    // 로컬 스토리지에 업데이트된 데이터 저장
    localStorage.setItem("cart", JSON.stringify(subData));
    cart_number();
  } else {
  }
};
