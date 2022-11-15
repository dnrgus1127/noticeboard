"use strict";
const mysql = require("mysql");

const express = require(`express`);
const app = express();
const port = 8080;
const db = require("./db");
const dir_html = __dirname + "/frontend/html";

const dataBase2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "forum",
});

// Session - 세션
const session = require("express-session");
const MySqlSession = require("express-mysql-session")(session);

app.use(express.static(__dirname + "/frontend/style"));
app.use(express.static(__dirname + "/frontend/src"));
app.use(express.static(__dirname + "/frontend/assets/img"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "forum",
};

const sessionStore = new MySqlSession(options);

// 세션 세팅
app.use(
  session({
    secret: "catfish",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { maxAge: 600000 },
    rolling: true,
  })
);

/*------------------------------------------------*/
/* 데이터 조회 , 삽입*/

app.use((req, res, next) => {
  if (
    req.session.isLogined != true &&
    req.url !== "/Auth/Login" &&
    req.url !== "/auth/login_auth"
  ) {
    res.redirect("/Auth/Login");
  } else {
    next();
  }
});

app.get("/posts", (req, res) => {
  db.getAllPosts((rows) => {
    res.json({ arr: rows });
  });
});

app.post("/posts", (req, res) => {
  db.insertPost(req.body);
});

// ID 기반 POST 조회
app.get("/posts/:index", (req, res) => {
  db.getPostsID(req.params.index, (rows) => {
    res.json({ arr: rows });
  });
});

app.post("/posts/author/:author", (req, res) => {
  db.getPostsAuthor(req.params.author, (rows) => {
    res.json({ arr: rows });
  });
});

/*------------------------------------------------*/
//Post 수정, 삭제

//조회수
app.patch("/posts/views/:index", (req, res) => {
  db.addView(req.params.index);
});

//추천
app.patch("/posts/rcmd/:index", (req, res) => {
  db.addRcmd(req.params.index);
});

//Post 수정
app.patch("/posts/edit/:index", (req, res) => {
  db.editPost(req.params.index, req.body);
});

app.delete("/posts/del/:index", (req, res) => {
  db.delPost(req.params.index);
  res.json({});
});
/*------------------------------------------------*/
//Comment 수정, 삭제

app.get("/posts/comment/:index", (req, res) => {
  db.getComment(req.params.index, (rows) => {
    res.json({ arr: rows });
  });
});

app.delete("/posts/comment/del/:index", (req, res) => {
  db.delComment(req.params.index);
  res.json({});
});

app.post("/posts/comment/new/:index", (req, res) => {
  db.addComment(req.params.index, req.body);
  res.json({});
});

app.patch("/posts/comment/edit/:comment_id", (req, res) => {
  db.editComment(req.params.comment_id, req.body);
  res.json();
});

/*------------------------------------------------*/

app.get("/NoticeBoard", (req, res) => {
  res.sendFile(dir_html + "/NoticeBoard.html", { serverdata: 12 });
});

app.get("/PostIn", (req, res) => {
  res.sendFile(dir_html + "/Posts/PostIn.html");
});

/*------------------------------------------------*/
// 새로운 글 작성

app.get("/NewPost", (req, res) => {
  res.sendFile(dir_html + "/Posts/NewPost.html");
});

/*------------------------------------------------*/

/*------------------------------------------------*/
//로그인 페이지 구현

app.get("/Auth/Login", (req, res) => {
  res.sendFile(dir_html + "/Auth/Login.html");
});

app.post("/auth/login_auth", (req, res) => {
  const post = req.body;
  dataBase2.query(
    `select id, password, user_id, user_name from user where id='${post.id}'`,
    [post.id, post.password],
    (err, result) => {
      if (err) throw err;
      if (result[0] !== undefined) {
        console.log(post.id);
        console.log(post.password);
        console.log(result[0]);
        if (post.id == result[0].id && post.password == result[0].password) {
          console.log(result[0]);
          console.log(req.session);
          req.session.uid = result[0].id;
          req.session.author_id = result[0].author_id;
          req.session.isLogined = true;
          req.session.name = result[0].user_name;
          console.log("비밀번호 맞음!");

          req.session.save(() => {
            res.redirect(`/NoticeBoard`);
          });
        } else {
          console.log("비밀번호 틀림!");
        }
      } else {
        console.log("아이디가 없습니다.");
        res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
        res.write("<script>alert('아이디가 없습니다.')</script>");
        res.write('<script>window.location="/Auth/Login"</script>');
      }
    }
  );
});

app.post("/auth/logout", (req, res) => {
  delete req.session.uid;
  delete req.session.isLogined;
  delete req.session.author_id;
  delete req.session.user_name;

  req.session.save(function () {
    res.redirect("/Auth/Login");
  });
});
/*------------------------------------------------*/
//User data
app.get("/fetch/user", (req, res) => {
  res.json(req.session.name);
});

/*------------------------------------------------게시글 검색 */

app.get("/fetch/title/:title", (req, res) => {
  db.searchTitle(req.params.title, (rows) => {
    res.json({ arr: rows });
  });
});

app.get("/search/author/:author", (req, res) => {
  db.searchAuthor(req.params.author, (rows) => {
    res.json({ arr: rows });
  });
});

/*------------------------------------------------*/

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
});

module.exports = app;
