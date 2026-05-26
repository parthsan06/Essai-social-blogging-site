/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { useParams } from 'react-router-dom'

export default function UpdatePost() {
  const [formData, setFormData] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const id = window.location.pathname.split('/').pop()

  if (!localStorage.getItem('token')) {
    window.location.href = '/signin'
    return null
  }

  useEffect(() => {
    const loadBlog = async () => {
      const res = await fetch(`https://backend.essai.workers.dev/api/v1/blog/${id}`, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      })
      const data = await res.json()
      setFormData({ title: data.blog.title, content: data.blog.content })
    }
    loadBlog()
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('https://backend.essai.workers.dev/api/v1/blog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ id, ...formData })
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Something went wrong.')
        return
      }
      window.location.href = `/post/${id}`
    } catch (e) {
      setError('Could not connect to the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Edit story</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full text-2xl font-semibold border-b border-gray-300 bg-transparent focus:outline-none py-2"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Think. Write."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full h-96 border border-gray-200 rounded-lg p-4 bg-white focus:outline-none resize-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-neutral-900 text-white rounded-full font-semibold hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Update'}
          </button>
        </form>
      </div>
    </div>
  )
}