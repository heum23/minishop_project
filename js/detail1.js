const main = document.querySelector(".main-wrap");
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
let subData = JSON.parse(localStorage.getItem("cart")) || [];
const cart_number = () => {
  let subData = JSON.parse(localStorage.getItem("cart")) || [];
  const cartNum = document.querySelector(".numLength");
  cartNum.innerHTML = `${subData.length}`;
};
cart_number();
main.innerHTML = `
            <table class="main" border="1">
              <thead>
                <tr>
                <th>제품사진</th>
                  <th>제품이름</th>
                  <th>가격</th>
                  <th>상세설명</th>
                  <th>수정</th>
                  <th>삭제</th>
                </tr>
              </thead>
              <tbody class="sub"></tbody>
            </table>
          `;
let sub = document.querySelector(".sub");
let dataSet = JSON.parse(window.localStorage.getItem("data")) || []; //데이터 가져오기 및 초기화 시 null 방지

// div 클래스 선언
const idInput = document.querySelector(".idInput");
const nameInput = document.querySelector(".nameInput");
const ageInput = document.querySelector(".ageInput");
const careerInput = document.querySelector(".careerInput");

// 인풋 데이터 받아오기
const id = document.querySelector(".id");
const nameValue = document.querySelector(".name");
const age = document.querySelector(".age");
const career = document.querySelector(".career");
const btnType = document.querySelectorAll(".radioBtn");

// 테이블 제거 함수
const del = (id) => {
  const same = dataSet.find((item) => item.id == id);
  const datadel = dataSet.filter((item) => item.id !== same.id);
  const datadel1 = dataSet.filter((item) => item.id === same.id);
  dataSet = datadel;
  const trDel = document.querySelector(`.tr${id}`);
  trDel.remove();
  window.localStorage.setItem("data", JSON.stringify(dataSet));
};
// input 수정 시 조건 검사 함수
let checkInput1 = true;
let checkInput2 = true;
let checkInput3 = true;
const reInput1 = (type, id) => {
  if (type === "career") {
    const changeCareer = document.querySelector(`.changeCareer${id}`).value;
    const div2 = document.querySelector(`.div${id}`);
    if (changeCareer === "") {
      div2.innerHTML = "";
      checkInput1 = false;
    } else {
      div2.innerHTML = ``;
      checkInput1 = true;
    }
  }
  if (type === "name") {
    const changeName = document.querySelector(`.changeName${id}`).value;
    // name 밑 input 태그
    const div2 = document.querySelector(`.div${id + "a1"}`);
    if (changeName === "") {
      div2.innerHTML = ``;
      checkInput2 = false;
    } else if (changeName.length < 2) {
      //15자 이상의 입력 조건
      div2.innerHTML = `이름이 너무 짧습니다!`;
      checkInput2 = false;
    } else {
      div2.innerHTML = ``;
      checkInput2 = true;
    }
  }
  if (type === "age") {
    const changeAge = document.querySelector(`.changeAge${id}`).value;
    // age 밑 input 태그
    const div2 = document.querySelector(`.div${id + "a2"}`);
    if (changeAge === "") {
      div2.innerHTML = ``;
      checkInput3 = false;
    } else {
      div2.innerHTML = "";
      checkInput3 = true;
    }
  }
};

//수정 함수
const rewrite = (id) => {
  const fixbtn = document.querySelector(`.re${id}`); //수정버튼 밖의 td
  const btn2 = fixbtn.innerHTML; // 조건 작성 위한 텍스트 들고오기
  const same = dataSet.find((item) => item.id == id); //dataSet에서 클릭한 행의 배열과 같은 dataSet배열 들고오기
  const classNum = `career${id}`; //커리어 td칸 클래스 선택을 위한 빌드업
  const classNum_name = `name${id}`; //커리어 td칸 클래스 선택을 위한 빌드업
  const classNum_age = `age${id}`; //커리어 td칸 클래스 선택을 위한 빌드업
  const changeTd = document.querySelector(`.${classNum}`); //td칸 클래스 선택
  const changeTd_name = document.querySelector(`.${classNum_name}`); //td칸 클래스 선택
  const changeTd_age = document.querySelector(`.${classNum_age}`); //td칸 클래스 선택

  if (btn2 == `<button onclick="rewrite(${same.id})">수정</button>`) {
    // 버튼의 텍스트가 수정일 때
    // career
    changeTd.innerHTML = `<input
          class = "changeCareer${same.id}"
        value = "${same.career}"
        onkeyup="reInput1('career',${same.id})"
      /><div class="div${same.id}"></div>`;
    //name 수정 input
    changeTd_name.innerHTML = `<input
          class = "changeName${same.id}"
        value = "${same.name}"
        onkeyup="reInput1('name',${same.id})"
      /><div class="div${same.id + "a1"}"></div>`;
    //age 수정 input
    changeTd_age.innerHTML = `<input
          class = "changeAge${same.id}"
        value = "${same.age}"
        onkeyup="reInput1('age',${same.id})"
      /><div class="div${same.id + "a2"}"></div>`;
    //수정 버튼 클릭 시 수정완료 버튼으로 변경
    fixbtn.innerHTML = `<button onclick="rewrite(${same.id})">수정완료</button>`;
  } else {
    //input태그 value 가져오기
    const changeCareer = document.querySelector(`.changeCareer${id}`).value;
    const changeName = document.querySelector(`.changeName${id}`).value;
    const changeAge = document.querySelector(`.changeAge${id}`).value;
    //input태그 밑 div 태그
    const div2 = document.querySelector(`.div${id}`);
    const div2_name = document.querySelector(`.div${id + "a1"}`);
    const div2_age = document.querySelector(`.div${id + "a2"}`);
    if (
      div2.innerHTML === "" &&
      div2_name.innerHTML === "" &&
      div2_age.innerHTML === "" &&
      checkInput1 &&
      checkInput2 &&
      checkInput3
    ) {
      // 조건 만족 시 데이터 보낸 후 테이블 수정된 칸만 수정
      same.career = changeCareer;
      same.name = changeName;
      same.age = changeAge;
      const numAuto = Number(same.age).toLocaleString("ko-KR"); //,자동 붙여줌
      changeTd.innerHTML = `${same.career}`;
      changeTd_name.innerHTML = `${same.name}`;
      changeTd_age.innerHTML = `${numAuto}`;
      window.localStorage.setItem("data", JSON.stringify(dataSet));
      fixbtn.innerHTML = `<button onclick="rewrite(${same.id})">수정</button>`;
    }
  }
};

// 테이블 함수
const maketable = () => {
  sub.innerHTML = ""; // 테이블 초기화
  dataSet.forEach((item) => {
    const numAuto = Number(item.age).toLocaleString("ko-KR");
    sub.innerHTML += `
                <tr class="tr${item.id}">
                <td ><img class="img" src ="${item.img}"/></td>
                  <td class="name${item.id}">${item.name}</td>
                  <td class="age${item.id}">${numAuto}원</td>
                  <td class="career${item.id}">${item.career}</td>
                  <td class="re${item.id}"><button onclick="rewrite(${item.id})" >수정</button></td>
                  <td><button onclick="del(${item.id})" class="delet">제거</button></td>
                </tr>
              `;
  });
};

maketable();

//이미지 랜덤저장
let img = [];

let imgNum = Math.floor(Math.random() * 4);
let stars = Math.random() * 5;
let stars2 = stars.toFixed(1);
let words = Math.floor(Math.random() * 9999);
const changeImg = () => {
  imgNum = Math.floor(Math.random() * 4);
  stars = Math.random() * 5;
  stars2 = stars.toFixed(1);
  words = Math.floor(Math.random() * 9999);
};
console.log(stars2);
const btnType1 = document.querySelectorAll(".radioBtn");

// 데이터 저장 함수
const saveData = () => {
  // 선택된 라디오 버튼의 값을 가져오기
  let selectedType = "";
  btnType1.forEach((btn) => {
    if (btn.checked) {
      selectedType = btn.value; // 체크된 버튼의 값을 저장

      if (selectedType === "a") {
        img = [
          "../detailimg/img1.jpg",
          "../detailimg/img2.jpg",
          "../detailimg/img3.jpg",
          "../detailimg/img4.jpg",
        ];
      } else if (selectedType === "b") {
        img = [
          "../detailimg/img5.jpg",
          "../detailimg/img6.jpg",
          "../detailimg/img7.jpg",
          "../detailimg/img8.jpg",
        ];
      } else if (selectedType === "c") {
        img = [
          "../detailimg/img9.jpg",
          "../detailimg/img10.jpg",
          "../detailimg/img11.jpg",
          "../detailimg/img12.jpg",
        ];
      } else if (selectedType === "d") {
        img = [
          "../detailimg/img13.jpg",
          "../detailimg/img14.jpg",
          "../detailimg/img15.jpg",
          "../detailimg/img16.jpg",
        ];
      }
    }
  });

  let allData = {
    type: selectedType, // 선택된 라디오 버튼의 값
    img: img[imgNum],
    id: id.value,
    name: nameValue.value,
    age: age.value,
    career: career.value,
    stars: stars2,
    word: words,
  };
  dataSet.push(allData);
  window.localStorage.setItem("data", JSON.stringify(dataSet));
};

// 데이터 저장
let open1 = true;
let open2 = true;
let open3 = true;
let open4 = true;

const check = () => {
  // ID 검증
  const sometimes = dataSet.filter((item) => item.id == id.value);
  if (sometimes.length > 0) {
    idInput.innerHTML = `중복된 아이디입니다!`;
    open1 = true;
  } else if (id.value === "") {
    idInput.innerHTML = ``;
    open1 = true;
  } else {
    idInput.innerHTML = ``;
    open1 = false;
  }

  // 이름 검증
  if (nameValue.value === "") {
    nameInput.innerHTML = ``;
    open2 = true;
  } else if (nameValue.value.length < 2) {
    nameInput.innerHTML = "한 글자는 입력이 안됩니다!";
    open2 = true;
  } else {
    nameInput.innerHTML = ``;
    open2 = false;
  }

  // 나이 검증
  if (age.value === "") {
    ageInput.innerHTML = ``;
    open3 = true;
  } else if (age.value < 10) {
    ageInput.innerHTML = "10원 이하의 물건은 등록 불가입니다!";
    open3 = true;
  } else {
    ageInput.innerHTML = ``;
    open3 = false;
  }

  // 경력 검증
  if (career.value === "") {
    careerInput.innerHTML = ``;
    open4 = true;
  } else if (career.value.length < 2) {
    careerInput.innerHTML = "3글자 이상 입력해주세요!";
    open4 = true;
  } else {
    careerInput.innerHTML = ``;
    open4 = false;
  }

  // 버튼 활성화/비활성화 관리
  const btn = document.querySelector(".btn");
  if (!open1 && !open2 && !open3 && !open4) {
    btn.removeAttribute("disabled");
    btn.removeAttribute("style");
  } else {
    btn.setAttribute("disabled", "true");
    btn.style.opacity = 0.5;
  }
};

// 모든 입력 필드에 이벤트 연결
id.addEventListener("keyup", () => check());
nameValue.addEventListener("keyup", () => check());
age.addEventListener("keyup", () => check());
career.addEventListener("keyup", () => check());

const clickData = () => {
  const btn = document.querySelector(".btn");
  saveData();
  maketable();
  document.querySelector(".id").value = "";
  document.querySelector(".name").value = "";
  document.querySelector(".age").value = "";
  document.querySelector(".career").value = "";
  btnType1.forEach((btn) => {
    btn.checked = false;
  });

  btn.setAttribute("disabled", "true");
  btn.style.opacity = 0.5;
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

// 수량 데이터 더하기
const plusCnt = () => {
  dataSet = dataSet.map((item) => ({
    ...item,
    cnt: 1,
  }));
  window.localStorage.setItem("data", JSON.stringify(dataSet));
};
plusCnt();
