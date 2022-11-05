import { GetDate } from "/lib/getDate.js";
import { getParameterByName } from "/lib/param.js";
import { domain_port } from "./Setting.js";
import { ChangeDate } from "./lib/getDate.js";

const commentAuthor = document.getElementById("comment-author");
const commentContent = document.getElementById("comment-content");
const btnWrite = document.getElementById("btn-write");
const index = getParameterByName("index");
let commentArr;
let commentIsEmpty;

fetch(`${domain_port}/posts/comment/${index}`)
  .then((response) => response.json())
  .then((data) => {
    commentArr = data.arr;
    console.log(commentArr);

    if (commentArr === undefined || commentArr.length === 0) {
      commentIsEmpty = true;
    } else {
      document.getElementById("comments").innerText = `${commentArr.length}`;
    }
  })
  .then(() => {
    renderComments();
  });
class Comment {
  /**
   *
   * @param {string} author //작성자
   * @param {string} content //내용
   * @param {string} time //작성시간
   * @param {Date} write_time //작성시간
   */
  constructor(index, author, content, write_time) {
    this.index = index;
    this.author = author;
    this.content = content;
    this.time = write_time;
  }
}

btnWrite.addEventListener("click", () => {
  const time = GetDate("min");
  const author = commentAuthor.value;
  const content = commentContent.value;
  let newComment = new Comment(index, author, content, time);
  if (!confirm("댓글을 작성하시겠습니까?")) {
    return;
  }
  console.log(newComment);
  fetch(`${domain_port}/posts/comment/new/${index}`, {
    method: "POST",
    body: JSON.stringify(newComment),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(() => {
    location.reload();
  });
});

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
    console.log(element);
    const content = document.createElement("div");
    content.className = "comment";
    // now = new Date(`${element.WRITE_TIME}`)
    const write_time = ChangeDate(new Date(`${element.WRITE_TIME}`), "min");
    content.innerHTML = `<div class="flex">
    <h5 class="comment-writer">${element.AUTHOR}</h5>
    <p class="comment-time">(${write_time})</p>
  </div>
  <div class="relative">
  <p class="comment-contents">
  ${element.CONTENT}
  </p>
  <textarea class="edit-text" >123</textarea>
  </div>
  
  
  <div class="comment-btn">
    <button class="comment-edit-end" style="display:none">완료</button>
    <button class="comment-edit">수정</button>
    <button class="comment-del">삭제</button>
  </div>`;
    fragmentPage.appendChild(content);
  }
  wrapContents.appendChild(fragmentPage);
  addEventDel();
  addEventEdit();
}

// 댓글 수정, 삭제

function addEventDel() {
  const btnDels = document.querySelectorAll(".comment-del");
  for (let i = 0; i < btnDels.length; i++) {
    const element = btnDels[i];

    console.log(commentArr[i].COMMENT_ID);
    element.addEventListener("click", () => {
      if (!confirm("댓글을 삭제하시겠습니까?")) {
        return;
      }
      fetch(`${domain_port}/posts/comment/del/${commentArr[i].COMMENT_ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        location.reload();
      });
    });
  }
}

function addEventEdit() {
  const btnEdit = document.querySelectorAll(".comment-edit");
  const btnEditEnd = document.querySelectorAll(".comment-edit-end");

  for (let i = 0; i < btnEdit.length; i++) {
    const element = btnEdit[i];
    const comment = document.querySelectorAll(".comment");
    const end = btnEditEnd[i];
    let editText;
    element.addEventListener("click", () => {
      editText = comment[i].querySelector(".edit-text");
      editText.innerText = `${commentArr[i].CONTENT}`;
      editText.style.display = "inherit";
      end.style.display = "inherit";
    });

    end.addEventListener("click", () => {
      const editComment = new Comment(
        index,
        "",
        editText.value,
        ChangeDate(new Date(), "min")
      );
      fetch(`${domain_port}/posts/comment/edit/${commentArr[i].COMMENT_ID}`, {
        method: "PATCH",
        body: JSON.stringify(editComment),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        location.reload();
      });
    });
  }
}
