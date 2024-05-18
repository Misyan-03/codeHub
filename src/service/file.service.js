const connection = require('../app/database');
class fileService {
    async save(filename, mimetype, size, userId) {
        const statement = `INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);`;
        const [result] = await connection.execute(statement, [filename, mimetype, size, userId]);
        return result;
    }
    async updateUser(avatarUrl, userId) {
        const statement = `UPDATE user SET avatar_url =? WHERE id= ?`
        const [result] = await connection.execute(statement, [avatarUrl, userId]);
        return result;
    }
}
module.exports = new fileService();