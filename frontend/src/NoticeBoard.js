import { domain_port } from "./Setting.js";
import { ChangeDate } from "./lib/getDate.js";
import { getUser } from "./fetch/fetch.js";

const tbody = document.querySelector("tbody");
let currentPage = getParameterByName("pageIndex");

let slicePage = localStorage.getItem("slicePage");

let author = getParameterByName("author");

if (slicePage == null) {
  slicePage = 5;
} else {
}

if (currentPage === "") {
  currentPage = 1;
}
let len = 0;

// slice selector

const sliceSelector = document.querySelector("#slicePage");

sliceSelector.addEventListener("change", () => {
  localStorage.setItem("slicePage", sliceSelector.value);
  location.reload();
});
sliceSelector.value = slicePage;

const categorySort = document.querySelector("#categorySort");

categorySort.addEventListener("change", () => {
  localStorage.setItem("categoryValue", categorySort.value);
  location.href = "NoticeBoard";
});

categorySort.value = localStorage.getItem("categoryValue");

slicePage = Number(slicePage);
//게시글 객체 배열 요청

if (author !== "") {
  document.getElementById("con-resultInfo").style.display = "inherit";
  const resultInfo = document.getElementById("text-resultInfo");
  resultInfo.style.display = "inherit";
  resultInfo.innerText = `작성자 : '${author}'으로 검색한 결과입니다..`;
  document.getElementById("authorCancel").addEventListener("click", () => {
    location.href = "/NoticeBoard";
  });
  fetch_author(author);
} else {
  fetch(`${domain_port}/posts?_sort=id&_order=DESC`)
    .then((response) => response.json())
    .then((data) => {
      load_posts(data);
    });
}

const searchBox = document.getElementById("wrap-searchBar");
searchBox.addEventListener("submit", (evt) => {
  const search = document.getElementById("search").value;
  const searchOption = document.getElementById("searchOption").value;
  evt.preventDefault();
  if (searchOption == "제목") {
    fetch(`${domain_port}/fetch/title/${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.arr);
        load_posts(data);
      });
  } else if (searchOption == "작성자") {
    console.log(searchOption);

    fetch(`${domain_port}/search/author/${search}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.arr);
        load_posts(data);
      });
  }
});

/**
 * pageRender
 * @param {integer} currentPage
 */
function renderPagination(currentPage, total) {
  localStorage.setItem("pageIndex", currentPage);
  var _totalCount = total;
  var prev = 1;

  var totalPage = Math.ceil(_totalCount / slicePage);
  var pageGroup = Math.ceil(currentPage / 10);

  var last = pageGroup * 10;
  if (last > totalPage) last = totalPage;
  var first = last - (10 - 1) <= 0 ? 1 : last - (10 - 1);
  var prev = first - 1;

  const fragmentPage = document.createDocumentFragment();
  if (prev > 0) {
    var allpreli = document.createElement("li");
    allpreli.insertAdjacentHTML(
      "beforeend",
      `<a href='?pageIndex=1' id='allprev'>&lt;&lt;</a>`
    );

    var preli = document.createElement("li");
    preli.insertAdjacentHTML(
      "beforeend",
      `<a href='?pageIndex=${Math.trunc(last / 10) * 10}' id='prev'>&lt;</a>`
    );

    fragmentPage.appendChild(allpreli);
    fragmentPage.appendChild(preli);
  }

  for (var i = first; i <= last; i++) {
    const li = document.createElement("li");
    li.insertAdjacentHTML(
      "beforeend",
      `<a href='?pageIndex=${i}' id='page-${i}' data-num='${i}'>${i}</a>`
    );
    if (i == currentPage) {
      li.style.background = "#5DA7DB";
      li.querySelector("a").style.color = "white";
    }
    fragmentPage.appendChild(li);
  }

  if (last < totalPage) {
    var allendli = document.createElement("li");
    allendli.insertAdjacentHTML(
      "beforeend",
      `<a href='?pageIndex=${Math.ceil(totalPage)}'  id='allnext'>&gt;&gt;</a>`
    );

    var endli = document.createElement("li");
    endli.insertAdjacentHTML(
      "beforeend",
      `<a  href='?pageIndex=${last + 1}'  id='next'>&gt;</a>`
    );

    fragmentPage.appendChild(endli);
    fragmentPage.appendChild(allendli);
  }
  const pagenation = document.getElementById("js-pagenation");
  pagenation.innerHTML = "";
  pagenation.appendChild(fragmentPage);
}

export function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

document.getElementById("btn-newpost").addEventListener("click", () => {
  location.href = `NewPost?type=new`;
});

function fetch_author(author) {
  fetch(`${domain_port}/posts/author/${author}`, {
    method: "POST",
    body: JSON.stringify({ author }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      load_posts(data);
    });
}

function load_posts(data) {
  tbody.innerHTML = "";
  data = data.arr;
  if (categorySort.value !== "전체") {
    data = data.filter((element) => element.category == categorySort.value);
  }
  len = data.length;
  data = data.slice(
    (currentPage - 1) * slicePage,
    (currentPage - 1) * slicePage + slicePage
  );

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const arr = [
      element.id,
      element.title,
      element.author,
      ChangeDate(new Date(element.write_date)), //date 추가 예정
      element.views,
    ];
    let post = document.createElement("tr");
    for (let i = 0; i < 5; i++) {
      const ele = document.createElement("td");
      ele.innerText = `${arr[i]}`;
      if (i === 1) {
        const a = document.createElement("a");
        const tag = document.createElement("span");
        const cnt_comment = document.createElement("span");
        cnt_comment.innerText = `[${element.cnt}]`;
        cnt_comment.style.fontSize = "9px";
        tag.style.fontSize = "12px";
        tag.innerText = `[${element.category}]`;
        a.href = `/PostIn?index=${arr[0]}`;
        a.style.display = "flex";
        a.appendChild(tag);
        a.appendChild(ele);
        a.appendChild(cnt_comment);
        post.appendChild(a);
        if (element.category === "공지사항") {
          tag.style.color = "red";
        }
      } else if (i === 2) {
        const a = document.createElement("a");
        a.href = `/NoticeBoard?author=${arr[i]}`;
        a.innerText = `${arr[i]}`;
        a.style.cursor = "pointer";
        a.style.lineHeight = "48px";
        // a.style.display = "flex";
        a.style.width = "100%";
        ele.innerText = ``;
        ele.appendChild(a);
        post.appendChild(ele);
        if (element.author === "관리자") {
          a.style.color = "red";
        }
      } else {
        post.appendChild(ele);
      }
    }

    tbody.insertAdjacentElement("beforeend", post);
  }
  const Ele_count = document.getElementById("total-count");
  Ele_count.innerText = `Total  : ${len}`;
  renderPagination(currentPage, len);
}

/*------------------------------- */
getUser()
  .then((res) => res.json())
  .then((data) => {
    document.getElementById("userId").innerHTML = `${data}님`;
  });

/*------------------------------- */
