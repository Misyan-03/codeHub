const connection = require('../app/database');
class commentService {
    //发表
    async create(momentId, content, userId) {
        const statement = `INSERT INTO comment (content,moment_id,user_id) VALUES (?,?,?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId]);
        console.log(result)
        return result;
    }
    //回复
    async reply(momentId, content, userId, commentId) {
        const statement = `INSERT INTO comment (content, moment_id, user_id, comment_id) VALUES (?, ?, ?, ?)`;
        const [result] = await connection.execute(statement, [content, momentId, userId, commentId]);
        console.log(result)
        return result;

    }
    
    //删除
    async removeComment(commentId) {
        const statement = `DELETE FROM comment WHERE id=?;`
        const [result] = await connection.execute(statement, [commentId])
        return !!result.length;
    }
}

module.exports = new commentService();