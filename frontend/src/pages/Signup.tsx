import React from 'react'
import Quote from '../components/Quote'
import { AuthSignup } from '../components/AuthSignup'

function Signup() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <AuthSignup />
        </div>
        <div className='invisible md:visible'>
          <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signup
