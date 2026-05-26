/** @jsxImportSource react */
export default function Navbar() {

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>)=>{
        if (e.key === 'Enter'){
            const query = (e.target as HTMLInputElement).value
            window.location.href = `/feed?q=${encodeURIComponent(query)}`
        }
    }


  return (
    <div className="w-full bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      
      {/* Left */}
      <div className="flex items-center gap-6">
        <a href="/feed" className="text-2xl font-bold tracking-tight">Essai</a>
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-gray-100 text-sm text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" className="w-4 h-4 fill-gray-400">
            <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"/>
          </svg>
          <input type="search" placeholder="Search" onKeyDown={handleSearch} className="bg-transparent outline-none w-40 text-gray-700" />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <a href="/create" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-black transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
          </svg>
          Write
        </a>
        <button className="relative text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold text-gray-600">
          P
        </div>
        <button onClick={() => {
            localStorage.removeItem('token')
            window.location.href = '/signin'
            }} className="text-sm text-gray-500 hover:text-black">
            Sign out
        </button>
      </div>

    </div>
  )
}