import React from 'react'

function Quote() {
  return (
    <div className='bg-slate-200 h-screen flex flex-col justify-center'>
      <div className='flex justify-center'>
        <div className='max-w-md '>
          <div className='text-3xl font-bold'>
              "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          </div>
          <div className='mt-4 font-bold text-xl'>
            Julies Winfield
          </div>
          <div className=' text-slate-500 font-light text-md'>
          CEO ACME Corp
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quote
