import BlogCard from '../components/BlogCard'
import AppBar from '../components/AppBar'
import { useBlogs } from '../hooks'
import BlogSkeleton from '../components/BlogSkeleton';

interface BlogType {
    "content": string;
    "title": string;
    "id": number;
    "author": {
      "name": string;
    }
}

function Blogs() {
  const {loading, blogs} = useBlogs();
  if (loading) {
    return <div>
      <AppBar />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
    </div>
  }
  return (
    <div>
      <AppBar />
      <div className='flex justify-center'>
        <div className=''>

          {
            blogs.map((blog : BlogType) => 
              <BlogCard 
                key={blog.id}
                id={blog.id}
                authorName={blog.author.name || "Ninjs"} 
                content={blog.content}
                title={blog.title}
                publishedDate='25th Aug 2024'
              />
          )}
        </div>
      </div>

    </div>
  )
}



export default Blogs
