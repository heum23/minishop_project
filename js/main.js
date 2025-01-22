let dataSet = JSON.parse(window.localStorage.getItem("data")) || []; //

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
//아이템 목록 만들기
const main = document.querySelector(".main-wrap");

const makeDiv = () => {
  if (dataSet.length < 1) {
    main.innerHTML = `<div>등록된 아이템이 없습니다!</div>`;
  } else {
    dataSet.map((item) => {
      main.innerHTML += `<div class="itembox div${item.id}"><img onclick="redirectToDetail(${item.id})"class="item Img${item.id}" src="${item.img}"/> 
    <div>${item.name}</div><div>${item.age}</div><div>${item.career}</div></div>`;
    });
  }
};
makeDiv();
//장바구니 숫자 띄우기
let subData = JSON.parse(localStorage.getItem("cart")) || [];
const cartNum = document.querySelector(".numLength");
cartNum.innerHTML = `${subData.length}`;
//상세페이지 이동 함수
function redirectToDetail(id) {
  // 상세 페이지로 이동하면서 query string에 id 추가
  window.location.href = `detail2.html?id=${id}`;
}
