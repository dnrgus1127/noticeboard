import { getParameterByName } from "/lib/param.js";
import { GetDate } from "/lib/getDate.js";
import { domain_port } from "/Setting.js";
import { Post } from "./Post.js";
import { getUser } from "./fetch/fetch.js";
import { Valid_author, ValidData, Valid_title } from "./lib/valid.js";

const date_now = GetDate();

// 수정 처리 스크립트
const type = getParameterByName("type");
const index = getParameterByName("index");

let postData;

getUser()
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("author").value = data;
  });

// 수정 처리 일 경우만
if (type == 1) {
  const ele_title = document.getElementById("title");
  const ele_author = document.getElementById("author");
  const newPosts = document.querySelectorAll(".newPost");
  newPosts.forEach((ele) => ele.setAttribute("disabled", ""));

  const ele_post = document.getElementById("content-area");
  const ele_category = document.getElementById("category");
  fetch(`${domain_port}/posts/${index}`)
    .then((response) => response.json())
    .then((json) => {
      const { title, author, category, post } = json.arr[0];
      postData = new Post(title, author, category, post);
      ele_title.value = postData.title;
      ele_category.value = postData.category;
      ele_author.value = postData.author;
      ele_post.value = postData.post;
    });

  document.getElementById("btn-submit").addEventListener("click", () => {
    postData.category = ele_category.value;
    postData.post = ele_post.value;
    postData.write_date = GetDate();
    if (ValidData(postData)) {
      return;
    }
    fetch(`${domain_port}/posts/edit/${index}`, {
      method: "PATCH",
      body: JSON.stringify(postData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    alert("수정 완료");
    setTimeout(() => {
      location.href = `./PostIn?index=${index}`;
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
  console.log(newPost + " newpost.js");
  if (type != 1) {
    if (ValidData(newPost)) {
      return;
    }
    fetch(`${domain_port}/posts`, {
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
      location.href = "noticeBoard";
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
  ele_category.className = "shadow-green";
});
