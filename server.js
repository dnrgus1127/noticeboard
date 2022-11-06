const express = require(`express`);
const app = express();
const port = 8080;
const db = require("./db");

const dir_html = __dirname + "/frontend/html";

app.use(express.static(__dirname + "/frontend/style"));
app.use(express.static(__dirname + "/frontend/src"));
app.use(express.static(__dirname + "/frontend/assets/img"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/*------------------------------------------------*/
/* 데이터 조회 , 삽입*/

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
  res.sendFile(dir_html + "/NoticeBoard.html");
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

app.listen(port, () => {
  console.log(`서버가 실행됩니다. http://localhost:${port}`);
});

module.exports = app;
