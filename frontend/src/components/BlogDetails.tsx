import { Blog } from '../hooks'
import AppBar from './AppBar'
import { Avatar } from './BlogCard'

 export default function BlogDetails({blog}: {blog: Blog | undefined }) {
   return (
     <div>
       <AppBar />
      <div className='flex justify-center'>
         <div className='grid grid-cols-12 px-10 w-full max-w-screen-2xl pt-10 '>
           <div className='col-span-8'>
            <div className='text-5xl p-2 font-extrabold'>
              {blog?.title || "title"}
            </div>
            <div className='p-2'>
              <span className='text-slate-500 p-2'>
                Posted on 26th Mar 2024
              </span>
              <div>
              {blog?.content || "content"}
              </div>
            </div>
           </div>
         <div className='col-span-4'>
            <div className='text-slate-600 text-lg'>
              Author
            </div>
            <div className='flex'>
              <div className='flex flex-col justify-center'>
              <Avatar size="small" name={blog?.author.name || "anonymous"} />
              </div>
              <div className='pl-2'>
                <div className='text-xl font-bold'>
                  {blog?.author.name || "anonymous"}
                </div>
                <div className='text-slate-500'>
                  Author descriptive details goes here
                </div>

              </div>
            </div>
         </div>
        </div>
      </div>
     </div>
   )
 }
