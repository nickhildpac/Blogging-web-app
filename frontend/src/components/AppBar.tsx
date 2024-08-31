import { Link } from 'react-router-dom'
import { Avatar } from './BlogCard'

function AppBar() {
  return (
    <div className='border-b flex justify-between px-10 py-2'>
      <div className='flex flex-col justify-center'>
        <Link to={"/blogs"}>
          <div className='cursor-pointer font-semibold'>
            Blog App
          </div>
        </Link>
      </div>
      <div>
        <Link to={"/publish"}>
          <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 mr-8 py-2.5 text-center me-2 mb-2 ">New</button>
        </Link>
        <Avatar name={"nickhil"} size={"big"} />
      </div>
  </div>
  )
}

export default AppBar
