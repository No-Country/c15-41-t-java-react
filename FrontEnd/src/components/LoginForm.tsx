import { MdOutlineEmail } from "react-icons/md"
import { MdLockOutline } from "react-icons/md"

export const LoginForm: React.FC = () => {
  return (
    <div className="">
      <h2 className="w-10/12 mb-10 mx-auto text-blueLight">Iniciar sesión</h2>
      <form
        className="w-10/12 mx-auto flex flex-col gap-2 justify-center "
        action=""
      >
        <label className="text-blueDark font-bold" htmlFor="email">
          Mail
        </label>
        <div className="w-full mb-8 h-6 flex items-center gap-2 border-0 border-solid border-b-2 border-slate-500 hover:border-blueDark">
          <MdOutlineEmail />
          <input
            className="w-full border-0 focus:outline-none"
            name="email"
            type="email"
            placeholder="maria@booktech.com"
          />
        </div>
        <label className="text-blueDark font-semibold" htmlFor="password">
          Contraseña
        </label>
        <div className="w-full mb-8 h-6 flex items-center gap-2 border-0 border-solid border-b-2 border-slate-500 hover:border-blueDark">
          <MdLockOutline />
          <input
            className="w-full border-0 focus:outline-none"
            name="password"
            type="password"
            placeholder="booktech1234"
          />
        </div>
        <button
          className=" bg-blueDark rounded-3xl text-white w-full py-2 shadow-lg"
          type="submit"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};
