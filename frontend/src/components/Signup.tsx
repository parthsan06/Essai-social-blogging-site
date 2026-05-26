/** @jsxImportSource react */
import { useState } from 'react'

export default function Signup() {
  const [formData, setFormData] = useState({username: '', password: ''})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try{
      const res = await fetch('https://backend.essai.workers.dev/api/v1/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if(!res.ok){
        setError(data.error || "something went wrong while signing you up. please try again.")
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('userId', data.userId)  // need to add this to backend response
      window.location.href = '/feed'

    } catch(e){
        setError('could not connect to the server.')
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Join Medium</h1>
          <p className="text-zinc-400 mt-3">Create an account to start writing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm mb-2">Username</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500"
              required
            />
          </div>
          
          {/* Display Error if any */}
          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </div>
  )
}