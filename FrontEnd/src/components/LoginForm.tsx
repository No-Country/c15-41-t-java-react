import { MdOutlineEmail, MdLockOutline } from 'react-icons/md'

export const LoginForm: React.FC = () => {
  return (
    <div className="">
      <h2 className="mx-auto mb-10 w-10/12 text-blueLight">Iniciar sesión</h2>
      <form className="mx-auto flex w-10/12 flex-col justify-center gap-2 " action="">
        <label className="font-bold text-blueDark" htmlFor="email">
          Mail
        </label>
        <div className="mb-8 flex h-6 w-full items-center gap-2 border-0 border-b-2 border-solid border-slate-500 hover:border-blueDark">
          <MdOutlineEmail />
          <input
            className="w-full border-0 focus:outline-none"
            name="email"
            type="email"
            placeholder="maria@booktech.com"
          />
        </div>
        <label className="font-semibold text-blueDark" htmlFor="password">
          Contraseña
        </label>
        <div className="mb-8 flex h-6 w-full items-center gap-2 border-0 border-b-2 border-solid border-slate-500 hover:border-blueDark">
          <MdLockOutline />
          <input
            className="w-full border-0 focus:outline-none"
            name="password"
            type="password"
            placeholder="booktech1234"
          />
        </div>
        <button className=" w-full rounded-3xl bg-blueDark py-2 text-white shadow-lg" type="submit">
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}
