# Zephyr - Cloudflare Workers 后端服务

一个基于 Cloudflare Workers 的边缘后端服务模板。轻量级、快速、零服务器配置、全球边缘部署、免费额度支持。

## ✨ 项目特点

- **边缘计算** - 代码运行在 Cloudflare 全球边缘节点，低延迟、高可用
- **免费部署** - Cloudflare Workers 提供每天 100,000 次免费请求
- **无需服务器** - 无需管理服务器，专注业务逻辑
- **数据库集成** - 内置 SQLite 数据库（Cloudflare D1），支持关系型数据存储
- **本地开发** - 本地 SQLite 模拟，开发体验好

## 🚀 技术栈

| 技术 | 说明 |
|------|------|
| [Hono](https://hono.dev/) | 轻量级 Web 框架，专为 Workers 优化 |
| [Cloudflare Workers](https://workers.cloudflare.com/) | 全球边缘计算平台 |
| [Cloudflare D1](https://developers.cloudflare.com/d1/) | SQLite 数据库即服务 |
| [Drizzle ORM](https://orm.drizzle.team/) | 类型安全的 ORM，支持 D1 |
| [TypeScript](https://www.typescriptlang.org/) | 类型安全的 JavaScript |

## 📖 快速开始

### 本地开发

```bash
# 安装依赖
pnpm install

# 创建 .env 文件，填入 Cloudflare 凭证
node -e "require('fs').writeFileSync('.env', 'CLOUDFLARE_ACCOUNT_ID=your_account_id\\nCLOUDFLARE_DATABASE_ID=your_database_id\\nCLOUDFLARE_D1_TOKEN=your_api_token')"

# 在本地数据库上执行迁移脚本（创建表）
npx wrangler d1 execute DB --local --file=src/db/migrations/0000_spicy_fixer.sql

# 启动本地开发服务
pnpm run dev
```

### 部署到 Cloudflare

```bash
# 部署代码到 Cloudflare Workers
pnpm run deploy
```

> **注意**: 数据库需要在 `wrangler.jsonc` 的 `d1_databases` 中配置，数据库本身由 Cloudflare 创建和管理。迁移脚本只负责创建表结构。

## 📁 项目结构

```
src/
├── index.ts           # 主应用与路由
├── config/
│   ├── env.ts         # 环境变量
│   └── db.ts          # 数据库连接
└── db/
    ├── schema.ts      # 表定义
    └── migrations/    # 迁移文件
```

## 🔑 核心特性

- **跨环境兼容** - 同一套代码支持本地和远程环境
- **类型安全** - 完整的 TypeScript 支持，Drizzle ORM 提供 SQL 类型检查
- **自动迁移** - 使用 Drizzle Kit 管理数据库版本

## 💡 使用场景

- 轻量级 API 服务
- 实时数据处理
- 边缘计算应用
- 微服务网关
- 内容分发