import React, { ChangeEvent, useState } from 'react'
import AppBar from '../components/AppBar'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

export default function Publish() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  return (
    <div>

      <AppBar />
      <div className='w-full pt-8 flex justify-center'>
        <div  className="mb-6 max-w-screen-lg w-full">
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title input</label>
          <input onChange={(e) => setTitle(e.target.value)} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Title' />
          <TextEditor onChange={(e) => setContent(e.target.value)}/>
         <div className="flex items-center justify-between px-3 py-2 border-t ">
             <button onClick={async () => {
              try {
                const res = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                  title,
                  content
                },{
                    headers: {
                      Authorization: localStorage.getItem("token")
                    }
                  });
                navigate(`/blog/${res.data.id}`)
              } catch(err) {
                console.log(err);
              }
            }} type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                 Post Blog
             </button>
         </div>
        </div>
      </div>
    </div>
  )
}

function TextEditor({onChange} :{onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void}) {
  return <form className='pt-5 p-2'>
   <div className="w-full p-2 mb-4 border border-gray-200 rounded-lg bg-gray-50 ">
       <div className="px-4 py-2 bg-white rounded-t-lg ">
           <label htmlFor="comment" className="sr-only">Your comment</label>
           <textarea onChange={onChange} id="comment" rows={10} className="outline-none w-full px-0 text-sm text-gray-900 bg-white  " placeholder="Write a comment..." required ></textarea>
       </div>
   </div>
</form>


}
