function ValidId(text) {
  const scriptTag = /[~^&()|><?]/;
  const blank = /\s/g;

  if (text.length < 6 || text.length > 12) {
    return true;
  } else if (scriptTag.test(text) == true) {
    return true;
  } else if (text.match(blank)) {
    return true;
  }

  return false;
}

function ValidPw(text) {
  const scriptTag = /[~^&()|><?]/;

  const pwReg =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
  const blank = /\s/g;

  if (text.length < 6 || text.length > 12) {
    return "패스워드길이는 6~12자 사이여야 합니다!";
  } else if (scriptTag.test(text) == true) {
    return "패스워드에 !,*,@,#,$,% 이외의 특수문자를 사용할 수 없습니다!";
  } else if (text.match(blank)) {
    return "패스워드에 공백을 넣을 수 없습니다!";
  } else if (pwReg.test(text) == false) {
    return "패스워드는 영어,숫자,특수문자가 각각 1개 이상 필요합니다.";
  }
  return "";
}

// const author = value;
// const scriptTag = /[~^&()|<>?]/; //스크립트 정규표현식
// const checkText = /\s/g;
// let valid_text = "";
// let flag = false;

// if (author.length === 0) {
//   valid_text = "작성자를 입력하세요.";
// } else if (scriptTag.test(author) == true) {
//   valid_text = "스크립트 태그는 사용할 수 없습니다.";
// } else if (author.match(checkText)) {
//   valid_text = "공백이 존재합니다.";
// } else {
//   flag = true;
// }

// document.getElementById("author-valid").innerText = valid_text;

export { ValidId, ValidPw };
