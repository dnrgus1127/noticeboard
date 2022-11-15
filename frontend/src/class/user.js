export class User {
  /**
   *
   * @param {*} id
   * @param {*} password
   * @param {*} user_name
   * @param {*} create_date
   * @param {*} email
   */
  constructor(id, password, user_name, create_date, email) {
    this.id = id;
    this.password = password;
    this.user_name = user_name;
    this.create_date = create_date;
    this.email = email;
  }
}
