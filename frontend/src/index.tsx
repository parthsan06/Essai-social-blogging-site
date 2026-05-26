import { Hono } from 'hono'
import { renderer } from './renderer'
import Signup from './components/Signup'
import Feed from './components/Feed'
import { ViteClient } from 'vite-ssr-components/hono'

const app = new Hono()

app.use(renderer)

// 1. Root Route (Home Page)
app.get('/', (c) => {
  return c.redirect('/')
})

const shell = (c: any) => c.render(
    <>
      {/* a container div for react to hydrate on the client */}
      <div id="root"></div> 
    </>
  )

app.get('/signup', shell)
app.get('/signin', shell)
app.get('/feed', shell)
app.get('/post/:id', shell)
app.get('/create', shell)
app.get('/update/:id', shell)

export default app