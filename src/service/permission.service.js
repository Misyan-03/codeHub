const connection = require('../app/database');
class permissionService {
  // async  check(momentId, userId){
  //       const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`;
  //       const [result] = await connection.execute(statement, [momentId, userId]);
  //       return result.length === 0 ? false : true;  
  //       //根据length是否有结果，判断是否有权限查看此动态，有权限返回true，没有权限返回false

  //   }

  //检查资源是否存在
  async checkIsExist(resourceID,resourceName) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ?;`;
    const [result] = await connection.execute(statement, [resourceID]);
    return result.length === 0 ? false : true;
  }


  //检测权限
  async check(resourceID, resourceName, userId) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [result] = await connection.execute(statement, [resourceID, userId]);
    // return result.length === 0 ? false : true;
    return !!result.length
    //根据length是否有结果，判断是否有权限查看此动态，有权限返回true，没有权限返回false
  }
}
module.exports = new permissionService();