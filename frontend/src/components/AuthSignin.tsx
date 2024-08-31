
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SignedinInput} from '@nicdpacx/blog-common';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import LabelledInput from './LabelledInput';

export const AuthSignin =  () => {
  const [postInputs,setPostInputs] = useState<SignedinInput>({
    email:"",
    password:"",
  });
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs);
      const jwt = response.data.jwt;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch(e) {
      alert("errors occur while signing in");
    }
  }

  return (
    <div className='h-screen flex flex-col justify-center'>
      <div className='flex justify-center'>
        <div>
          <div className='px-10'>
          <div className='text-3xl font-extrabold'>
              Sign in 
          </div>

          <div className='text-slate-500'>
              Don't have an account
            <Link className='pt-2 underline' to={"/signup"}>{"Sign up"}</Link>
          </div>
        </div>
        <div className='pt-5'>
          <LabelledInput label="Email" placeholder="Nickhil@example.com" onChange={(e) => {
            setPostInputs({...postInputs,
            email: e.target.value});
          }} />
          <LabelledInput type="password" label="Password" placeholder="password" onChange={(e) => {
            setPostInputs({...postInputs,
            password: e.target.value});
          }} />
            <button onClick={sendRequest} type="button" className="w-full mt-5 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Sign in</button>
        </div>
        </div>
      </div>
    </div>
  )
}

