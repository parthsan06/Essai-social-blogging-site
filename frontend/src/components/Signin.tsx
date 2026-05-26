/** @jsxImportSource react */
import { useState } from 'react'

export default function Signin() {
    const [formdata, setformdata] = useState({
        username: '',
        password: ''
    })

    const [loading, setloading] = useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setloading(true)
  try {
    const res = await fetch('https://backend.essai.workers.dev/api/v1/user/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata)
    })
    const data = await res.json()
    if (!res.ok) {
      alert(data.error || 'Invalid credentials')
      return
    }
    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.userId)
    window.location.href = '/feed'
  } catch (e) {
    alert('Could not connect to server.')
  } finally {
    setloading(false)
  }
}

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
            {/* Form Container */}
            <div className="w-full max-w-md p-8">
                
                {/* Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold tracking-tight">Log in to Medium</h1>
                    <p className="text-zinc-400 mt-3">Jump back and start writing.</p>
                </div>

                {/* Form Wrapper (Now perfectly wraps around all inputs and buttons) */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Username Block */}
                    <div>
                        <label className="block text-sm mb-2">Username</label>
                        <input 
                            type="text"
                            value={formdata.username}
                            onChange={(e) => setformdata({ ...formdata, username: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500"
                            required
                        />
                    </div>

                    {/* Password Block */}
                    <div>
                        <label className="block text-sm mb-2">Password</label>
                        <input
                            type="password"
                            value={formdata.password}
                            onChange={(e) => setformdata({ ...formdata, password: e.target.value })}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-500"
                            required
                        />
                    </div>

                    {/* Button Block */}
                    <button
                        type="submit" // Fixed: changed to 'submit' so it fires onSubmit handler
                        disabled={loading}
                        className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-zinc-200 transition disabled:opacity-50"
                    >
                        {loading ? 'Logging in...' : 'Log in'}
                    </button>
                </form>

            </div>
        </div>
    )
}