import { Link } from 'react-router-dom';

interface BlogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
  id: number;
}

function BlogCard({
  id,
  authorName,
  title,
  content,
  publishedDate
}: BlogCardProps) {
  return (<Link to={`/blog/${id}`}>

    <div className='w-screen max-w-screen-md p-4 border-b cursor-pointer border-slate-300'>
      <div className='flex'>
        <div className='flex flex-col justify-center'>
          <Avatar name={authorName} size="small"/> 
        </div>
        <div className='pl-2 font-extralight'>
          {authorName} 
        </div>
        <div className='text-slate-500 pl-2 font-extralight'>
          &#x2022;
        </div>
        <div className='pl-2 font-thin text-slate-500'>
          {publishedDate}
        </div>
      </div>
      <div className='text-xl font-semibold'>
        {title}
      </div>
      <div className='text-md font-thin'>
        {content.slice(0,100) + "..."}
      </div>
      <div className='pt-2 pb-4 text-slate-400 font-thin text-sm'>
        {Math.ceil(content.length/100) + " minute(s) read"}
      </div>
    </div>
  </Link>
  )
}

export function Avatar({name, size} : {name: string; size: "big"|"small"}) {
  return <div className={`relative inline-flex items-center justify-center ${size === "small"?"w-6 h-6":"w-8 h-8"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`} >
    <span className={`${size==="big"?"text-xl":"text-sm"} font-medium text-gray-600 dark:text-gray-300`}>{name[0]+name[1]}</span>
</div>
}

export default BlogCard
