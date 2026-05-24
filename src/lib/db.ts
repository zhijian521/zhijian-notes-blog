import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getDb() {
  // 没配数据库时直接返回 null，让上层决定是否使用 fallback 内容。
  if (!process.env.DATABASE_URL) {
    return null;
  }

  if (!pool) {
    // 整个进程复用一个连接池，避免每次请求都重复创建连接。
    pool = mysql.createPool(process.env.DATABASE_URL);
  }

  return pool;
}
