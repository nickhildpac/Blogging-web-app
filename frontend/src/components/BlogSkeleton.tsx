
export default function BlogSkeleton() {
  return (
    <div className='flex justify-center '>
          
      <div role="status" className="w-screen max-w-screen-md border-b border-slate-200 animate-pulse py-4">
        <div className='pb-2 flex flex-col justify-center'>
          <div className='flex '>

        <div className={` relative items-center  w-6 h-6 overflow-hidden bg-gray-200 rounded-full `} >
      </div>
          <div className="ml-3 mt-1 h-2.5 bg-gray-200 rounded-full  w-48 "></div>
          </div>

        </div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
          <div className="h-2  bg-gray-200 rounded-full  max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
      </div>


    </div>
  )
}
