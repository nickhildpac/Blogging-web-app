import Quote from '../components/Quote'
import { AuthSignin } from '../components/AuthSignin'

function Signin() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <AuthSignin />
        </div>
        <div className='invisible md:visible'>
          <Quote />
        </div>
      </div>
    </div>
  )
}

export default Signin
