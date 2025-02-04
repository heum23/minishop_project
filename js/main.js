let dataSet = JSON.parse(window.localStorage.getItem("data")) || []; //

const moveUrl = (type) => {
  if (type === "none") {
    Swal.fire("준비중입니다!", "", "warning");
  } else if (type === "main") {
    url = "http://127.0.0.1:5501/html/main.html";
  } else if (type === "cart") {
    url = "http://127.0.0.1:5501/html/detail3.html";
  } else if (type === "crate") {
    url = "http://127.0.0.1:5501/html/main_write.html";
  }
  window.location.href = url;
};

//아이템 목록 만들기

//카데코리 분류 함수
const typeNum = (type) => {
  main.innerHTML = "";
  const filteredTypes = dataSet.filter((item) => item.type === type); // 'type' 사용
  filteredTypes.map((item) => {
    const numAuto = Number(item.age).toLocaleString("ko-KR");
    main.innerHTML += `
        <div class="itembox div${item.id}">
        
          <img onclick="redirectToDetail(${item.id})" class="item Img${item.id}" src="${item.img}" /> 
          <div class="mainText">${item.name}</div>
          <div>가격 : ${numAuto}원</div>
          <div onclick="like(${item.id})" class="heartDiv" data-liked="false" id="heartDiv${item.id}">
          <img class="heart" src="/detailimg/heart.png" />
          </div>
          
              <div class='comment'><div class="imgDiv"><img class="star" src="/detailimg/stars.png" /> : ${item.stars} </div><div class="imgDiv"><img class="stars" src="/detailimg/comment.png" /> : ${item.word}</div></div>
        </div>`;
  });
};

const main = document.querySelector(".main-wrap");

// 물품 디브 만들기
const makeDiv = () => {
  main.innerHTML = "";
  if (dataSet.length < 1) {
    main.innerHTML = `<div>등록된 아이템이 없습니다!</div>`;
  } else {
    dataSet.map((item) => {
      const numAuto = Number(item.age).toLocaleString("ko-KR");
      main.innerHTML += `
        <div onclick="redirectToDetail(${item.id})" class="itembox div${item.id}">
         
          <img  class="item Img${item.id}" src="${item.img}" /> 
          <div class="mainText">${item.name}</div>
          <div> ${numAuto}원</div>
          <div onclick="like(${item.id})" class="heartDiv" data-liked="false" id="heartDiv${item.id}">
          <img class="heart" src="/detailimg/heart.png" />
          </div>
          <div class='comment'><div class="imgDiv"><img class="star" src="/detailimg/stars.png" /> : ${item.stars} </div><div class="imgDiv"><img class="stars" src="/detailimg/comment.png" /> : ${item.word}</div></div>
          
        </div>`;
    });
  }
};

makeDiv();

// 좋아요 함수
const like = (id) => {
  event.stopPropagation();
  const likebtn = document.getElementById(`heartDiv${id}`);
  const isLiked = likebtn.getAttribute("data-liked") === "true"; // 현재 상태 확인

  if (isLiked) {
    likebtn.innerHTML = `<img class="heart" src="/detailimg/heart.png" />`; // 기본 하트로 변경
    likebtn.setAttribute("data-liked", "false"); // 상태 업데이트
  } else {
    likebtn.innerHTML = `<img class="heart" src="/detailimg/heart2.png" />`; // 좋아요 하트로 변경
    likebtn.setAttribute("data-liked", "true"); // 상태 업데이트
  }
};
// 장바구니 숫자 함수
const cart_number = () => {
  let subData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNum = document.querySelector(".numLength");
  cartNum.innerHTML = `${subData.length}`;
};
cart_number();

//상세페이지 이동 함수
function redirectToDetail(id) {
  // 상세 페이지로 이동하면서 query string에 id 추가
  window.location.href = `detail2.html?id=${id}`;
}
//클릭시 색변화 함수
// 버튼들을 선택
const buttons = document.querySelectorAll(
  ".typeBtn1, .typeBtn2, .typeBtn3, .typeBtn4, .typeBtn5"
);

// 각 버튼에 클릭 이벤트 추가
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // 모든 버튼에서 active 클래스를 제거
    buttons.forEach((btn) => btn.classList.remove("active"));

    // 클릭된 버튼에만 active 클래스 추가
    button.classList.add("active");
  });
});
//헤더 스크롤시 투명
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
