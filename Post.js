export class Post {
  /**
   *
   * @param {*} title
   * @param {*} author
   * @param {*} category
   * @param {*} post
   * @param {*} views
   * @param {*} date
   * @param {*} rcmd
   */
  constructor(title, author, category, post, views, date, rcmd) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.post = post;
    this.views = views;
    this.date = date;
    this.rcmd = rcmd;
  }
}
