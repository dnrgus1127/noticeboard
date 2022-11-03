import { Post } from "./Post.js";

const index = getParameterByName("index");
const tag = document.querySelectorAll(".tag");
let load_data;
let id;
fetch(`http://localhost:3000/posts/${index}`)
  .then((response) => response.json())
  .then((data) => {
    const { title, author, category, post, views, date, rcmd } = data;
    load_data = new Post(title, author, category, post, views, date, rcmd);

    id = data.id;
    document.getElementById("title").innerText = load_data.title;
    document.getElementById("author").innerText = load_data.author;
    document.getElementById("date").innerText = load_data.date;
    document.getElementById("views").innerText = load_data.views;
    document.getElementById("contents").innerText = load_data.post;
    document.getElementById("Recommendation").innerText = load_data.rcmd;
    for (let index = 0; index < tag.length; index++) {
      const element = tag[index];
      element.innerText = `[${data.category}]`;
    }
    return Number(data.views) + 1;
  })
  .then((data) => {
    fetch(`http://localhost:3000/posts/${index}`, {
      method: "PATCH",
      body: JSON.stringify({ views: data }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  });

const btnDelete = document.getElementById("btn-delete");

btnDelete.addEventListener("click", () => {
  var result = confirm("게시글을 삭제하시겠습니까?");
  if (result === true) {
    fetch(`http://localhost:3000/posts/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        location.href = "../noticeBoard.html";
      });
  }
});

// const textarea = document.getElementById("ir1");

// console.log(textarea.value);

document.getElementById("btn-back").addEventListener("click", () => {
  const pageIndex = localStorage.getItem("pageIndex");
  location.href = `../NoticeBoard.html?pageIndex=${pageIndex}`;
});

document.getElementById("btn-update").addEventListener("click", () => {
  location.href = `../NewPost.html?type=1&index=${index}`;
});

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.getElementById("btn-rcmd").addEventListener("click", () => {
  let rcmd_t = (load_data.rcmd === undefined ? 1 : load_data.rcmd +1);
  if (confirm("이 글을 추천 하시겠습니까?")) {
    fetch(`http://localhost:3000/posts/${index}`, {
      method: "PATCH",
      body: JSON.stringify({ rcmd: rcmd_t}),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(location.reload());
  }
});
