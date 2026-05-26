/** @jsxImportSource react */
import './style.css'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Signup from './components/Signup'
import Signin from './components/Signin'
import Feed from './components/Feed'
import Post from './components/Post'
import CreatePost from './components/CreatePost'
import UpdatePost from './components/UpdatePost'
import Landing from './components/Landing'

document.addEventListener('DOMContentLoaded', ()=>{
const path = window.location.pathname
const rootEl = document.getElementById('root')
if(!rootEl) return

const root = createRoot(rootEl)

  if (path === '/signup') root.render(<BrowserRouter><Signup /></BrowserRouter>)
  else if (path === '/signin') root.render(<BrowserRouter><Signin /></BrowserRouter>)
  else if (path === '/feed') root.render(<BrowserRouter><Feed /></BrowserRouter>)
  else if (path.startsWith('/post/')) root.render(<BrowserRouter><Post /></BrowserRouter>)
  else if (path === '/create') root.render(<BrowserRouter><CreatePost /></BrowserRouter>)
  else if (path.startsWith('/update/')) root.render(<BrowserRouter><UpdatePost /></BrowserRouter>)
    else if (path === '/') root.render(<BrowserRouter><Landing /></BrowserRouter>)
})