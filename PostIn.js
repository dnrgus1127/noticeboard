index = getParameterByName("index");
const tag = document.querySelectorAll(".tag");
let id;
fetch(`http://localhost:3000/posts/${index}`)
  .then((response) => response.json())
  .then((data) => {
    id = data.id;
    document.getElementById("title").innerText = data.title;
    document.getElementById("author").innerText = data.author;
    document.getElementById("date").innerText = data.date;
    document.getElementById("contents").innerText = data.post;
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
