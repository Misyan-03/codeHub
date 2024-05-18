const connection = require('../app/database');
class labelService {
    //创建标签
    async save(name) {
        const statement = `INSERT INTO label (name) VALUES (?)`;
        const [result] =await connection.execute(statement, [name])
        return result
    }
    //获取标签
    async getLabels( offset=0,limit=10) {
        const statement = `SELECT * FROM label LIMIT ?,?`;
        const [result] = await connection.execute(statement, [offset, limit]);
        return result
    }
    //查询是否在表里面
    async queryLabelByName(name){
        const statement = `SELECT * FROM label WHERE name = ?`;
        const [result] = await connection.execute(statement, [name]);
        return result[0]; 
    
    }
}
module.exports = new labelService();