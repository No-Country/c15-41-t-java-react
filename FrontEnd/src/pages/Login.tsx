import { Brand } from '../components/Brand'
import { LoginForm } from '../components/LoginForm'

export const Login: React.FC = () => {
  return (
    <div className="m-0 flex h-screen w-full flex-col p-0 sm:flex-row">
      <div className="mb-16 w-full sm:mb-0 sm:w-1/2">
        <div className="mx-auto mb-6 w-11/12 sm:absolute sm:left-5 sm:top-5 sm:mb-0">
          <Brand />
        </div>

        <div className="flex w-full items-center sm:h-full">
          <LoginForm />
        </div>
      </div>
      <div className="flex items-center justify-center bg-[#000842] sm:w-1/2">
        <div className="mx-12 mt-12 w-full">
          <img className="w-full" src="/brand/Bibliophile-cuate.png" alt="" />
        </div>
      </div>
    </div>
  )
}
