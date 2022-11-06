const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database: "forum",
});

// function getAllMemos(callback) {
//   connection.query(
//     `SELECT * FROM MEMOS ORDER BY ID DESC`,
//     (err, rows, fields) => {
//       if (err) throw err;
//       callback(rows);
//     }
//   );
// }

function getAllPosts(callback) {
  const query = `select e.*,ifnull(i.cnt, 0)as cnt from posts e left outer join (select id,count(*) as cnt from comments group by id)i on e.id=i.id order by e.id desc;`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}

function getPostsAuthor(author, callback) {
  const query = `select e.*,ifnull(i.cnt, 0) as cnt from posts e left outer join (select id,count(*) as cnt from comments group by id)i on e.id=i.id where author='${author}' order by e.id desc;`;
  connection.query(query, (err, rows, fields) => {
    if (err) throw err;
    callback(rows);
  });
}

function insertPost(body) {
  const sql = `INSERT INTO POSTS (TITLE,AUTHOR,CATEGORY,POST,WRITE_DATE) VALUES ('${body.title}','${body.author}','${body.category}','${body.post}','${body.write_date}')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
  });
}

function getPostsID(id, callback) {
  connection.query(
    `SELECT * FROM POSTS WHERE ID = ${id} ORDER BY ID DESC`,
    (err, rows, fields) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

function addView(id) {
  connection.query(
    `UPDATE POSTS SET VIEWS=VIEWS+1 WHERE ID=${id} `,
    (err, rows, fields) => {
      if (err) throw err;
    }
  );
}

function delPost(id) {
  connection.query(`DELETE FROM POSTS WHERE ID=${id} `, (err, rows, fields) => {
    if (err) throw err;
  });
}

function editPost(id, body) {
  console.log(body);
  connection.query(
    `UPDATE POSTS SET title = '${body.title}', author = '${body.author}', category = '${body.category}', post = '${body.post}', write_date = '${body.write_date}' WHERE ID=${id} `
  );
}

function getComment(id, callback) {
  connection.query(
    `SELECT * FROM COMMENTS WHERE ID=${id}`,
    (err, rows, fields) => {
      if (err) throw err;
      callback(rows);
    }
  );
}

function delComment(id) {
  connection.query(`DELETE FROM COMMENTS WHERE COMMENT_ID=${id}`, (err) => {
    if (err) throw err;
  });
}

function addComment(id, body) {
  connection.query(
    `INSERT INTO COMMENTS (ID,AUTHOR,CONTENT,WRITE_TIME) values ('${id}','${body.author}','${body.content}','${body.time}')`,
    (err, result) => {
      if (err) throw err;
    }
  );
}

function editComment(comment_id, body) {
  connection.query(
    `UPDATE COMMENTS SET CONTENT = '${body.content}' ,WRITE_TIME = '${body.time}' WHERE COMMENT_ID=${comment_id}`,
    (err, result) => {
      if (err) throw err;
    }
  );
}

module.exports = {
  getAllPosts,
  insertPost,
  getPostsID,
  addView,
  delPost,
  editPost,
  getComment,
  delComment,
  addComment,
  editComment,
  getPostsAuthor,
};
