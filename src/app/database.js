const mysql = require('mysql2')
//1.创建连接池
const connectionPool = mysql.createPool({
    host: 'localhost',
    port: 3306,
    database: 'codeHub',
    user: 'root',
    password: '123456',
    connectionLimit: 10,

})
//2.获取连接是否成功，进行提示
//例如
// 数据库连接失败 Access denied for user 'roxot'@'localhost' (using password: YES)
connectionPool.getConnection((err, connection) => {
    //判断是否有错误信息
    //err若有值
    if (err) {
        console.log('数据库连接失败', err.message)
        return
    } else {
        //尝试建立连接
        connection.connect(err => {
            if (err) {
                console.log('数据库连接失败', err.message)
                return
            } else {
                console.log('数据库连接成功')
            }

        })
    }
    connection.release()
    //释放连接池中的连接对象，连接池中的连接对象会自动进入空闲状态，也就是说，当连接池中的连接对象达到连接池的最大值时，如果不释放连接对象，连接池中的连接对象就会一直存在，一直占用内存。
    //当连接池中的连接对象达到连
})
//3.获取连接池中的连接对象
const connection = connectionPool.promise()

module.exports = connection