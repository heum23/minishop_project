const main = document.querySelector(".main-wrap");
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
    } else if (changeName.length > 10) {
      //15자 이상의 입력 조건
      div2.innerHTML = `이름이 너무 깁니다!`;
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
      // 조건 만족 시 데이터 보낸 후 테이블 리셋
      same.career = changeCareer;
      same.name = changeName;
      same.age = changeAge;
      changeTd.innerHTML = `${same.career}`;
      changeTd_name.innerHTML = `${same.name}`;
      changeTd_age.innerHTML = `${same.age}`;
      window.localStorage.setItem("data", JSON.stringify(dataSet));
      fixbtn.innerHTML = `<button onclick="rewrite(${same.id})">수정</button>`;
    }
  }
};

// 테이블 함수
const maketable = () => {
  sub.innerHTML = ""; // 테이블 초기화
  dataSet.forEach((item) => {
    sub.innerHTML += `
                <tr class="tr${item.id}">
                <td ><img class="img" src ="${item.img}"/></td>
                  <td class="name${item.id}">${item.name}</td>
                  <td class="age${item.id}">${item.age}</td>
                  <td class="career${item.id}">${item.career}</td>
                  <td class="re${item.id}"><button onclick="rewrite(${item.id})" >수정</button></td>
                  <td><button onclick="del(${item.id})" class="delet">제거</button></td>
                </tr>
              `;
    console.log();
  });
};

maketable();

//이미지 랜덤저장
const img = [
  "../detailimg/img1.png",
  "../detailimg/img2.jpeg",
  "../detailimg/img3.jpeg",
  "../detailimg/img4.png",
  "../detailimg/img5.jpeg",
  "../detailimg/img6.png",
  "../detailimg/img7.jpg",
  "../detailimg/img8.jpg",
  "../detailimg/img9.png",
  "../detailimg/img10.png",
  "../detailimg/img11.png",
  "../detailimg/img12.png",
  "../detailimg/img13.png",
  "../detailimg/img14.jpg",
  "../detailimg/img15.jpg",
  "../detailimg/img16.jpg",
];
let imgNum = Math.floor(Math.random() * 16);
const changeImg = () => {
  imgNum = Math.floor(Math.random() * 16);
};
console.log(img[imgNum]);
//데이터 저장 함수
const saveData = () => {
  let allData = {
    img: img[imgNum],
    id: id.value,
    name: nameValue.value,
    age: age.value,
    career: career.value,
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
  btn.setAttribute("disabled", "true");
  btn.style.opacity = 0.5;
};
