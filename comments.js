import { GetDate } from "./globalFunc/getDate.js";
import { getParameterByName } from "./src/param.js";

const commentAuthor = document.getElementById("comment-author");
const commentContent = document.getElementById("comment-content");
const btnWrite = document.getElementById("btn-write");
const index = getParameterByName("index");
let commentArr;
let commentIsEmpty;

fetch(`http://localhost:3000/posts/${index}`)
  .then((response) => response.json())
  .then((data) => {

    commentArr = data.comments;


    if (commentArr === undefined || commentArr.length === 0) {
      commentIsEmpty = true;
    }
    document.getElementById("comments").innerText = `${commentArr.length}`

  });  
class Comment {
  /**
   *
   * @param {string} author //작성자
   * @param {string} content //내용
   * @param {string} time //작성시간
   */
  constructor(author, content, time) {
    this.author = author;
    this.content = content;
    this.time = time;
  }
}


btnWrite.addEventListener("click", () => {
  const time = GetDate("min");
  const author = commentAuthor.value;
  const content = commentContent.value;
  let newComment = new Comment(author, content, time);
  if (!confirm("댓글을 작성하시겠습니까?")) {
    return;
  }
  console.log(commentArr);
  if (commentArr === undefined || commentArr.length === 0) {
    console.log("empty")
    commentArr = [newComment];
  } else {
    commentArr = [newComment,...commentArr];
  }

  fetch(`http://localhost:3000/posts/${index}`, {
    method: "PATCH",
    body: JSON.stringify({ comments: commentArr }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    location.reload();
  });
});

setTimeout(renderComments, 300);

function renderComments() {

  const wrapContents = document.getElementById("wrap-comments");
  const fragmentPage = document.createDocumentFragment();
  if (commentIsEmpty) {
    const emptyComment = document.createElement("div");
    emptyComment.className = "comment-empty";
    emptyComment.innerHTML = "<p>작성된 댓글이 없습니다.</p>";
    wrapContents.appendChild(emptyComment);
    return;
  }
  for (let index = 0; index < commentArr.length; index++) {
    const element = commentArr[index];
    const content = document.createElement("div");
    content.className = "comment";
    content.innerHTML = `<div class="flex">
    <h5 class="comment-writer">${element.author}</h5>
    <p class="comment-time">(${element.time})</p>
  </div>
  <p class="comment-contents">
    ${element.content}
  </p>
  <div class="comment-btn">
    <button class="comment-edit">수정</button>
    <button class="comment-del">삭제</button>
  </div>`;
    fragmentPage.appendChild(content);
  }
  wrapContents.appendChild(fragmentPage);
  addEventDel();
}

// 댓글 수정, 삭제

function addEventDel() {
  const btnDels = document.querySelectorAll(".comment-del");
  for (let i = 0; i < btnDels.length; i++) {
    let tmp_Arr = [...commentArr];

    const element = btnDels[i];
    tmp_Arr.splice(i, i + 1);
    element.addEventListener("click", () => {
      if (!confirm("댓글을 삭제하시겠습니까?")) {
        return;
      }
      fetch(`http://localhost:3000/posts/${index}`, {
        method: "PATCH",
        body: JSON.stringify({ comments: tmp_Arr }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        location.reload();
      });
    });
  }
}

