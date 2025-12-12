import { SignIn } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 '>
      <SignIn
        appearance={{
          baseTheme: dark,
          variables: {
            colorPrimary: '#3b82f6',
            colorBackground: '#1f2937',
            borderRadius: '0.75rem',
          },
          elements: {
            card: 'bg-gray-800/50 backdrop-blur-xl border border-gray-700 shadow-2xl',
            headerTitle: 'text-white',
            headerSubtitle: 'text-gray-400',
            socialButtonsBlockButton: 'border-gray-700 hover:bg-gray-700/50',
            formButtonPrimary: 'bg-blue-600 hover:bg-blue-500',
            footerActionLink: 'text-blue-400 hover:text-blue-300',
          },
        }}
      />
    </div>
  )
}