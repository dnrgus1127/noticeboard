import { getParameterByName } from "./src/param.js";

class Post {
  constructor(title, author, category, post, views, date) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.post = post;
    this.views = views;
    this.date = date;
  }
}

let now = new Date();
//현재 시간
const date_now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

// 수정 처리 스크립트
const type = getParameterByName("type");
const index = getParameterByName("index");

let postData;

// 수정 처리 일 경우만
if (type == 1) {
  const ele_title = document.getElementById("title");
  title.setAttribute("disabled", "");
  const ele_author = document.getElementById("author");
  author.setAttribute("disabled", "");
  const ele_post = document.getElementById("content-area");
  const ele_category = document.getElementById("category");
  fetch(`http://localhost:3000/posts/${index}`)
    .then((response) => response.json())
    .then((json) => {
      const { title, author, category, post } = json;
      postData = new Post(title, author, category, post);
      ele_title.value = postData.title;
      ele_category.value = postData.category;
      ele_author.value = postData.author;
      ele_post.value = postData.post;
    });

  document.getElementById("btn-submit").addEventListener("click", () => {
    postData.category = ele_category.value;
    postData.post = ele_post.value;
    fetch(`http://localhost:3000/posts/${index}`, {
      method: "PATCH",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("수정 완료");
    setTimeout(() => {
      location.href = "noticeBoard.html";
    }, 500);
  });
}

// 유효성 검사 처리
const submit_info = document.getElementById("form-write");
submit_info.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const newPost = new Post(
    evt.target.title.value,
    evt.target.author.value,
    evt.target.category.value,
    evt.target.post.value,
    0,
    date_now
  );
  console.log(newPost.category);
  let checkError =
    !Valid_title(evt.target.title.value) ||
    !Valid_author(evt.target.author.value) ||
    newPost.category === "Error";

  if (checkError) {
    alert("입력값을 다시 확인해 주세요!");
    return;
  }
  if (type != 1) {
    fetch("http://localhost:3000/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "content-type": "application/json; cahrset=UTF-8",
      },
    })
      .then((response) => {
        response.json();
      })
      .then((json) => console.log(json));
    alert("글쓰기 완료");
    setTimeout(() => {
      location.href = "noticeBoard.html";
    }, 500);
  }
});

const title_input = document.getElementById("title");
title_input.addEventListener("blur", function () {
  let bool = Valid_title(title_input.value);
  ValidCss(title_input, bool);
});

const author_input = document.getElementById("author");

author_input.addEventListener("blur", () => {
  let bool = Valid_author(author_input.value);
  ValidCss(author_input, bool);
});

const inputs = document.querySelectorAll("input");

for (let index = 0; index < inputs.length; index++) {
  const element = inputs[index];
  element.addEventListener("keydown", (evt) => {
    if (evt.keyCode === 13) {
      evt.preventDefault();
    }
  });
}

/**
 * 제목 유효성 검사 함수
 * @param {*} value
 * @returns
 */
function Valid_title(value) {
  const title = value;
  const scriptTag = /[~^&|<>?]/; //스크립트 정규표현식
  let valid_text = "";
  let flag = false;

  if (title.length === 0) {
    valid_text = "제목은 비워둘 수 없습니다.";
  } else if (scriptTag.test(title) == true) {
    valid_text = "스크립트 태그는 사용할 수 없습니다.";
  } else if (title.length > 20) {
    valid_text = "제목은 20자 이내로 작성해주세요.";
  } else {
    flag = true;
  }

  document.getElementById("title_valid").innerText = valid_text;
  return flag;
}

/**
 * 작성자 이름 유효성 검사 함수
 * @param {string} author
 * @returns
 */
function Valid_author(value) {
  const author = value;
  const scriptTag = /[~^&()|<>?]/; //스크립트 정규표현식
  const checkText = /\s/g;
  let valid_text = "";
  let flag = false;

  if (author.length === 0) {
    valid_text = "작성자를 입력하세요.";
  } else if (scriptTag.test(author) == true) {
    valid_text = "스크립트 태그는 사용할 수 없습니다.";
  } else if (author.match(checkText)) {
    valid_text = "공백이 존재합니다.";
  } else {
    flag = true;
  }

  document.getElementById("author-valid").innerText = valid_text;
  return flag;
}

//style

// 선택 시 shadow효과 처리
const form_inputs = document.querySelectorAll("input");
for (let index = 0; index < form_inputs.length; index++) {
  form_inputs[index].addEventListener("blur", function () {
    if (form_inputs[index].value.length < 3) {
      form_inputs[index].className = "shadow-red";
    } else {
      form_inputs[index].className = "shadow-green";
    }
  });
}

function ValidCss(element, bool) {
  if (!bool) {
    element.className = "shadow-red";
  } else {
    element.className = "shadow-green";
  }
}

const ele_category = document.getElementById("category");

document.getElementById("category").addEventListener("change", () => {
  // if(ele_category.value === "error")
  // {

  // }
  ele_category.className = "shadow-green";
});
