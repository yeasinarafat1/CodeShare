import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return <div className='min-w-full min-h-full flex items-center justify-center mt-2'>
       <SignIn/>
    </div>
}