const connection = require('../app/database');
class userService {
  async create(user) {
    const { name, password } = user;
    // 拼接statement
    const statement = `INSERT INTO user (name, password) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [name, password]);
    return result
  }
  async findUserByName(name) {
    const statement = `SELECT * FROM user WHERE name = ?;`;
    // 返回形式是..,要解构拿到[{}]
    /**
     * [
 [
{
  id: 21,
  name: 'why',
  password: 'e10adc3949ba59abbe56e057f20f883e',
  createAt: 2024-03-11T06:55:35.000Z,
  updateAt: 2024-03-11T06:55:35.000Z
}
 ],
 [
`id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
`name` VARCHAR(30) NOT NULL UNIQUE_KEY,
`password` VARCHAR(50) NOT NULL,
`createAt` TIMESTAMP(19) NOT NULL,
`updateAt` TIMESTAMP(19) NOT NULL ON UPDATE CURRENT_TIMESTAMP
]
]
[
{
id: 21,
name: 'why',
password: 'e10adc3949ba59abbe56e057f20f883e',
createAt: 2024-03-11T06:55:35.000Z,
updateAt: 2024-03-11T06:55:35.000Z
}
]

]
     */
    const [values] = await connection.execute(statement, [name]);
    // console.log(values);
    return values;
  }
  async getAvatarByUserId(userId) {
    const statement = `SELECT * FROM avatar WHERE user_id = ?;`;
    const [values] = await connection.execute(statement, [userId]);
    // return values[values.length - 1];
    return values.pop()
  }
}
module.exports = new userService();