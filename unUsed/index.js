let editBtn = document.getElementById("editIcon");
let onInput = false;
let inputBox = document.getElementById("changeName");

editBtn.addEventListener("click", ChagneName);
inputBox.addEventListener("keyup", ChangeNameEnter);

function ChangeNameEnter(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
    editBtn.click();
  }
}
function ChagneName() {
  if (onInput === false) {
    let input = document.getElementById("changeName");
    input.style.display = "inherit";
    onInput = true;
  } else {
    let input = document.getElementById("changeName");
    input.style.display = "none";
    onInput = false;
  }
}

let inputName = document.getElementById("changeName");

inputName.addEventListener("input", updateValue);

/**
 * input 입력 시 값 변경하는 함수
 * @param {*} e
 */
function updateValue(e) {
  const userName = document.getElementById("username");
  userName.innerText = e.target.value;
}

// 튜플 추가
const tuple = document.querySelectorAll(".tuple");

let array;
fetch("http://localhost:3000/userInfo/")
  .then((response) => response.json())
  .then((data) => (array = data))
  .then(() => {
    console.log(array);
    console.log(array[0]);
    for (let index = 0; index < array.length; index++) {
      if (index > 4) {
        break;
      }
      AddTuple(array[index]);
    }
  });

function AddTuple(data) {
  const item = tuple.item(0);
  item.insertAdjacentHTML("afterbegin", "<ul></ul>");
  const tupleAtt = item.querySelector("ul");
  tupleAtt.insertAdjacentHTML("afterbegin", `<li>${data.Etc}</li>`);
  tupleAtt.insertAdjacentHTML("afterbegin", `<li>${data.Content}</li>`);
  tupleAtt.insertAdjacentHTML("afterbegin", `<li>${data.Age}</li>`);
  tupleAtt.insertAdjacentHTML("afterbegin", `<li>${data.Mname}</li>`);
  tupleAtt.insertAdjacentHTML("afterbegin", `<li>${data.Fname}</li>`);
}

fetch("http://localhost:3000/contents")
  .then((response) => response.json())
  .then((data) => {
    for (let index = 0; index < data.length; index++) {
      let stroy = data[index];
      const item = tuple.item(1);
      item.insertAdjacentHTML("afterbegin", "<ul></ul>");
      const tupleAtt = item.querySelector("ul");
      tupleAtt.insertAdjacentHTML("afterbegin", `<li>${stroy.views}</li>`);

      tupleAtt.insertAdjacentHTML("afterbegin", `<li>${stroy.story}</li>`);
    }
  });

const form_info = document.getElementById("form-newContent");
const btnAtt = document.getElementById("btn-Att");
const btnCancle = document.getElementById("btn-cancel");

btnAtt.addEventListener("click", function () {
  form_info.style.display = "inherit";
});

btnCancle.addEventListener("click", function () {
  form_info.style.display = "none";
});

const submit_info = document.getElementById("info-form");
console.log(submit_info);
submit_info.addEventListener("submit", function (evt) {
  evt.preventDefault();
  console.log(evt);

  const Fname = evt.target.Fname.value;
  const Mname = evt.target.Mname.value;
  const Age = evt.target.Age.value;
  const Content = evt.target.Content.value;
  const Etc = evt.target.Etc.value;
  form_info.style.display = "none";

  fetch("http://localhost:3000/userInfo", {
    method: "POST",
    body: JSON.stringify({ Fname, Mname, Age, Content, Etc }),
    headers: {
      "content-type": "application/json; cahrset=UTF-8",
    },
  })
    .then((response) => {
      response.json();
    })
    .then((json) => console.log(json));
});

// const exam = document.getElementById('btn-exam')

// exam.addEventListener('click', function() {
//     location.href
// })
// fetch("https://cd8fa7b2-4a4f-4e6a-a618-02948527a057.mock.pstmn.io/test")
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//     test.innerText = json.city;
//   });

// fetch("http://localhost:3000/comments/1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// fetch("http://localhost:3000/comments?postId=1")
//   .then((response) => response.json())
//   .then((json) => console.log(json));

// fetch("http://localhost:3000/posts", {
//   method: "POST",
//   body: JSON.stringify(data2),
//   headers: {
//     "content-type": "application/json; cahrset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => {
//     console.log(json);
//     test.innerText = json.name;
//     test.insertAdjacentHTML("afterend", `${json.age}`);
//   });

// fetch("http://localhost:3000/posts", {
//   method: "POST",
//   body: JSON.stringify({
//     title: "The",
//     author: "Jer",
//   }),
//   headers: {
//     "content-type": "application/json; charset=UTF-8",
//   },
// })
//   .then((response) => response.json())
//   .then((json) => console.log(json));
