// landing page made at the end using claude ai to save time.

/** @jsxImportSource react */
import { useState, useEffect } from 'react'

const phrases = ['Read and think.', 'Think and write.', 'Write and share.']

export default function Landing() {
  const [displayed, setDisplayed] = useState('')
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIndex]
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplayed(current.slice(0, charIndex + 1))
        if (charIndex + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1500)
        } else {
          setCharIndex(c => c + 1)
        }
      } else {
        setDisplayed(current.slice(0, charIndex - 1))
        if (charIndex - 1 === 0) {
          setDeleting(false)
          setPhraseIndex(i => (i + 1) % phrases.length)
          setCharIndex(0)
        } else {
          setCharIndex(c => c - 1)
        }
      }
    }, deleting ? 40 : 80)
    return () => clearTimeout(timeout)
  }, [charIndex, deleting, phraseIndex])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-4">
        Essai.
      </h1>
      <p className="text-2xl text-gray-400 h-10 mb-12">
        {displayed}<span className="animate-pulse">|</span>
      </p>
      <div className="flex gap-4">
        <a href="/signin" className="px-6 py-3 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition">
          Sign in
        </a>
        <a href="/signup" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-gray-500 transition">
          Create account
        </a>
      </div>
    </div>
  )
}