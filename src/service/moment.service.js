const connection = require('../app/database');
class momentService {
    //发表动态
    async create(content, userId) {
        const statement = `INSERT INTO moment (content,user_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [content, userId]);
        return result
    }
    //给个默认值
    /*
    SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user
         FROM moment m LEFT JOIN user u ON m.user_id=u.id LIMIT ? OFFSET ?;
     */
    //查询动态列表
    async queryList(offset = 0, size = 10) {
        // const statement = `SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
        //        JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
        //        (SELECT COUNT(*) FROM comment WHERE comment.moment_id=m.id) commentCount
        //         FROM moment m LEFT JOIN user u ON m.user_id=u.id LIMIT 10 OFFSET 0;`;
        // 再查询一个标签总数字段
        const statement = `
        SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id',u.id,'name',u.name,'createTime',u.createAt,'updateTime',u.updateAt) user,
        (SELECT COUNT(*)FROM comment co WHERE co.moment_id=m.id) commentCount,
        (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id=m.id) labelCount
         FROM moment m LEFT JOIN user u ON m.user_id=u.id LIMIT 10 OFFSET 0;`
        //`SELECT * FROM moment OFFSET,LIMIT;`;
        //[]查询参数不支持数字类型，转为字符串
        const [values] = await connection.execute(statement, [String(size), String(offset)]);
        // console.log(values);
        return values;
    }
    //查询动态详情
    async queryDetails(momentId) {
        // const statement = `SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
        // JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user
        //  FROM moment m LEFT JOIN user u ON m.user_id=u.id WHERE m.id=?;`;
        /*const statement2 = `SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
         JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
         (
         JSON_ARRAYAgg(JSON_OBJECT(
         'id',c.id,'content',c.content,'comment',c.comment_id,'createTime', u.createAt, 'updateTime', u.updateAt,
         'user',JSON_OBJECT('id',cu.id,'name',cu.name)
         ))
         ) comments
         FROM moment m LEFT 
         JOIN user u ON m.user_id=u.id 
         LEFT JOIN comment c ON c.moment_id=m.id
         LEFT JOIN  user cu  ON cu.id=c.user_id
         WHERE m.id=?
         GROUP BY m.id;`; */

        /*  const statement3 = `SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
          (
          SELECT JSON_ARRAYAgg(JSON_OBJECT(
          'id',c.id,'content',c.content,'comment',c.comment_id,'createTime', u.createAt, 'updateTime', u.updateAt,
          'user',JSON_OBJECT('id',cu.id,'name',cu.name)
          ))
           FROM comment c 
          LEFT JOIN user cu ON c.user_id=cu.id
          WHERE c.moment_id=m.id
          ) comments,
          (
          JSON_ARRAYAGG(JSON_OBJECT(
          'id', l.id,'name',l.name,'createTime',l.createAt,'updateTime', l.updateAt
          ))
          ) labels
          FROM moment m LEFT 
          JOIN user u ON m.user_id=u.id 
          
          LEFT JOIN moment_label ml ON ml.moment_id=m.id
          LEFT JOIN label l ON l.id=ml.label_id
          WHERE m.id=?
          GROUP BY m.id;` */

        const statement4 = `
        SELECT m.id id,m.content content, m.createAt createTime, m.updateAt updateTime,
    JSON_OBJECT('id', u.id, 'name', u.name, 'avatar',u.avatar_url,'createTime', u.createAt, 'updateTime', u.updateAt) user,
    (
    JSON_ARRAYAgg(JSON_OBJECT(
    'id',c.id,'content',c.content,'comment',c.comment_id,'createTime', u.createAt, 'updateTime', u.updateAt,
    'user',JSON_OBJECT('id',cu.id,'name',cu.name)
    ))
    ) comments,
    (
    JSON_ARRAYAGG(JSON_OBJECT(
    'id', l.id,'name',l.name,'createTime',l.createAt,'updateTime', l.updateAt
    ))
    ) labels
    FROM moment m LEFT 
    JOIN user u ON m.user_id=u.id 
    LEFT JOIN comment c ON c.moment_id=m.id  
    LEFT JOIN user cu  ON cu.id=c.user_id
    LEFT JOIN moment_label ml ON ml.moment_id=m.id
    LEFT JOIN label l ON l.id=ml.label_id
    WHERE m.id=?
    GROUP BY m.id;`
        const [result] = await connection.execute(statement4, [momentId]);
        // console.log(result)
        return result;

    }
    //修改
    async updateContent(content, momentId) {
        const statement = `UPDATE moment SET content=? WHERE id=?;`;
        const [result] = await connection.execute(statement, [content, momentId]);
        return result;

    }
    //删除
    async remove(momentId) {
        const statement = `DELETE FROM moment WHERE id=?;`;
        const [result] = await connection.execute(statement, [momentId]);
        return result
    }
    //判断动态是否存在label
    async hasLabel(momentId, labelId) {
        const statement = `SELECT * FROM moment_label WHERE moment_id=? AND label_id=?;`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        // console.log(result) //返回的是插入表的结果
        return !!result.length; // !!转为布尔值
    }
    //给动态添加label标签
    async addLabel(momentId, labelId) {
        const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
        const [result] = await connection.execute(statement, [momentId, labelId]);
        // console.log(result)
        // 结果
        /*
        ResultSetHeader {
        fieldCount: 0,
        affectedRows: 1,
        insertId: 0,
        info: '',
        serverStatus: 2,
        warningStatus: 0,
        changedRows: 0
        }
        */
        //插入成功，有结果转布尔为true，没有结果转为false
        return !!result;
    }
}
module.exports = new momentService();