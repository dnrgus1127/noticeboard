import { User } from "./class/user.js";
import { GetDate } from "./lib/getDate.js";
import { ValidId, ValidPw } from "./lib/validationFunc.js";
import { domain_port } from "./Setting.js";

const form = document.getElementById("signUp");

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const target = evt.target;
  const create_date = GetDate();
  const newUser = new User(
    target.ID.value,
    target.PASSWORD.value,
    target.USER_NAME.value,
    create_date,
    target.EMAIL.value
  );
  if (ValidId(newUser.id)) {
    alert("ID가 유효하지 않습니다!");
    return;
  } else if (ValidPw(newUser.password) !== "") {
    alert(ValidPw(newUser.password));
    return;
  }

  fetch(`${domain_port}/auth/sign/newAccount`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "content-type": "application/json; cahrset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      alert(data.err);
      if (data.err == "아이디 생성 완료!") {
        location.href = "/auth/login";
      }
    });
});
