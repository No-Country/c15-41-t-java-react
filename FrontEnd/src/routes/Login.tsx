import { Brand } from '../components/Brand'
import { LoginForm } from '../components/LoginForm'

export const Login: React.FC = () => {
  return (
    <div className="m-0 flex h-screen w-full p-0">
      <div className="w-1/2">
        <div className="absolute left-5 top-5 flex">
          <Brand />
        </div>

        <div className="flex h-full w-full items-center">
          <LoginForm />
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-[#000842]">
        <div className="mx-12 mt-12 w-full">
          <img className="w-full" src="/Bibliophile-cuate.png" alt="" />
        </div>
      </div>
    </div>
  )
}
