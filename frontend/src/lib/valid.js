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

function ValidData(post) {
  let checkError =
    !Valid_title(post.title) ||
    !Valid_author(post.author) ||
    post.category === "Error";

  if (checkError) {
    alert("입력값을 다시 확인해 주세요!");
    return true;
  } else {
    return false;
  }
}
export { Valid_author, ValidData, Valid_title };
