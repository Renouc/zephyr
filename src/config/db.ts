import { drizzle } from "drizzle-orm/d1";

// 导出一个工厂函数，用于在请求处理中创建数据库实例
// env 来自 c.env（Cloudflare Workers 运行时）
export function getDb(env: any) {
  const dbBinding = env?.DB;
  
  if (!dbBinding) {
    throw new Error('DB binding not found. Make sure D1 database is configured in wrangler.jsonc');
  }
  
  return drizzle(dbBinding);
}
