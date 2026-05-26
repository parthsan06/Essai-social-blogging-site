/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

type Blog = {
  id: string
  title: string
  content: string
  authorId: string
  published: boolean
}

export default function Post() {
  const [blog, setBlog] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const id = window.location.pathname.split('/').pop()

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const res = await fetch(`https://backend.essai.workers.dev/api/v1/blog/${id}`, {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error || 'Something went wrong.')
          return
        }
        setBlog(data.blog)
      } catch (e) {
        setError('Could not connect to the server.')
      } finally {
        setLoading(false)
      }
    }
    loadBlog()
  }, [])

  if (!localStorage.getItem('token')) {
    window.location.href = '/signin'
    return null
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {blog && <div>
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</p>
        </div>}
      </div>
    </div>
  )
}