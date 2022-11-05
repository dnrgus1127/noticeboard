import { domain_port } from "./Setting.js";

const tbody = document.querySelector("tbody");
let currentPage = getParameterByName("pageIndex");

let slicePage = localStorage.getItem("slicePage");
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
fetch(`${domain_port}/posts?_sort=id&_order=DESC`)
  .then((response) => response.json())
  .then((data) => {
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
        element.date, //date 추가 예정
        element.views,
      ];
      let post = document.createElement("tr");
      for (let i = 0; i < 5; i++) {
        const ele = document.createElement("td");
        ele.innerText = `${arr[i]}`;
        if (i === 1) {
          const a = document.createElement("a");
          const tag = document.createElement("span");
          tag.style.fontSize = "12px";
          tag.innerText = `[${element.category}]`;
          a.href = `/PostIn?index=${arr[0]}`;
          a.style.display = "flex";
          a.appendChild(tag);
          a.appendChild(ele);
          post.appendChild(a);
          if (element.category === "공지사항") {
            tag.style.color = "red";
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

  document.getElementById("js-pagenation").appendChild(fragmentPage);
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
