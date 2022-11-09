import { Post } from "./Post.js";
import { domain_port } from "./Setting.js";
import { ChangeDate } from "./lib/getDate.js";

const index = getParameterByName("index");
const tag = document.querySelectorAll(".tag");
let load_data;
let id;
fetch(`${domain_port}/posts/${index}`)
  .then((response) => response.json())
  .then((data) => {
    const { title, author, category, post, views, write_date, rcmd } =
      data.arr[0];
    load_data = new Post(
      title,
      author,
      category,
      post,
      views,
      write_date,
      rcmd
    );

    const time = new Date(write_date);
    const yyyy_dd_mm = ChangeDate(time);

    id = data.id;
    document.getElementById("title").innerText = load_data.title;
    document.getElementById("author").innerText = load_data.author;
    document.getElementById("date").innerText = yyyy_dd_mm;
    document.getElementById("views").innerText = load_data.views + 1;
    document.getElementById("contents").innerText = load_data.post;
    document.getElementById("Recommendation").innerText = load_data.rcmd;
    for (let index = 0; index < tag.length; index++) {
      const element = tag[index];
      element.innerText = `[${load_data.category}]`;
    }
    return Number(data.views) + 1;
  })
  .then((data) => {
    //조회수 증가 시킴
    fetch(`${domain_port}/posts/views/${index}`, {
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
    fetch(`${domain_port}/posts/del/${index}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);

        location.href = "../noticeBoard";
      });
  }
});

document.getElementById("btn-back").addEventListener("click", () => {
  const pageIndex = localStorage.getItem("pageIndex");
  location.href = `../NoticeBoard?pageIndex=${pageIndex}`;
});

document.getElementById("btn-update").addEventListener("click", () => {
  location.href = `../NewPost?type=1&index=${index}`;
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
  if (confirm("이 글을 추천 하시겠습니까?")) {
    fetch(`${domain_port}/posts/rcmd/${index}`, {
      method: "PATCH",
    }).then(location.reload());
  }
});
