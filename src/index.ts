import { Hono } from 'hono'
import { usersRouter } from './routes/users'
import { favoritesRouter } from './routes/favorites'

const app = new Hono()

const apiRouter = new Hono()

apiRouter.route('/users', usersRouter)
apiRouter.route('/favorites', favoritesRouter)

app.get('/health', (c) => c.json({ status: true }))

app.route('/api', apiRouter)

export default app