export class Post {
  /**
   *
   * @param {*} title
   * @param {*} author
   * @param {*} category
   * @param {*} post
   * @param {*} views
   * @param {*} write_date
   * @param {*} rcmd
   */
  constructor(title, author, category, post, views, write_date, rcmd) {
    this.title = title;
    this.author = author;
    this.category = category;
    this.post = post;
    this.views = views;
    this.write_date = write_date;
    this.rcmd = rcmd;
  }
}
