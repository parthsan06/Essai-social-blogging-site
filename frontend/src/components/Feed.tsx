/** @jsxImportSource react */
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Post from './Post'
import { Link } from 'react-router-dom'

type Blog = {
  id: string
  title: string
  content: string
  authorId: string
  published: boolean
}

export default function Feed() {
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const query = new URLSearchParams(window.location.search).get('q') || ''

    useEffect(()=>{
        // 1. Defining the async function inside the effect
        const loadBlogs = async () => {
            setLoading(true)
            setError('')

            try{
                const res = await fetch('https://backend.essai.workers.dev/api/v1/blog/bulk', {
                    method: 'GET',
                      headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                })
                //parsing the res from server into json, which is also a async call for some reason
                const data = await res.json()
                if(!res.ok){
                    setError(data.error || 'Something went wrong.')
                    return
                }
                setBlogs(data.blogs)
            } catch(e){
                setError('Could not connect to the server at the moment.')
            } finally {
                setLoading(false)
            }
        }

        loadBlogs()
    }, [])

    //authentication
    if(!localStorage.getItem('token')){
        window.location.href = '/signin'
        return null
    }

// blogs.map(blog => <Post blog={blog} />) means "for every blog in the array, render a Post component." It's how you turn an array of data into an array of JSX elements.
    return(
        <div className="min-h-screen bg-neutral-50">
            <Navbar/>

            <div className='max-w-6xl mx-auto px-4 py-8 flex gap-8'>
                <div className='flex-1'>
                    {loading && <p>Loading...</p>}
                    {error && <p className='text-red-500'>{error}</p>}

                    {blogs
                    .filter(blog=>
                        blog.title.toLowerCase().includes(query.toLocaleLowerCase()) ||
                        blog.content.toLowerCase().includes(query.toLocaleLowerCase())
                    )
                    .map(blog => (
                        <a key={blog.id} href={`/post/${blog.id}`}>
                            <div className="border-b py-6">
                            <h2 className="text-xl font-bold">{blog.title}</h2>
                            <p className="text-gray-500 mt-2">{blog.content.slice(0, 150)}...</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}