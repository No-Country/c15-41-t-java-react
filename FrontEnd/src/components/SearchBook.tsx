import { GoSearch } from 'react-icons/go'

export const SearchBook: React.FC = () => {
  return (
    <section className="my-10">
      <div className="relative flex items-center justify-center">
        <img
          className="max-h-72 min-h-[8rem] w-full"
          src="/brand/shelf.png"
          alt="Repisa con lomos de libros"
        />
        <div className="absolute w-11/12 sm:w-10/12 sm:bg-[#052940CC] sm:p-4">
          <div className="flex h-14 items-center overflow-hidden rounded-full">
            <select
              className="h-full w-fit border-0 bg-[#0A7ABF] px-6 text-white"
              name="search-book"
              id="search-book"
            >
              <option selected value="">
                Todos los campos
              </option>
              <option value="">Seleccione Formato</option>
              <option value="">Autor</option>
              <option value="">Género</option>
            </select>
            <div className="flex h-full w-full items-center gap-x-4 bg-white pl-4">
              <label htmlFor="searchInput">
                <GoSearch className=" text-2xl" />
              </label>
              <input
                id="searchInput"
                className="h-full w-full border-0 text-[#263238] placeholder-[#ABABAB] focus:outline-none"
                type="text"
                placeholder="Buscar"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <p className="my-8 font-bold">Sugerencias de Búsqueda:</p>
        <ol className=" flex flex-col gap-y-5 pl-4">
          <li>
            Puede escribir las palabras de su búsqueda en mayúscula o minúscula, con o sin tilde, y
            el catálogo recuperará todos los resultados. Por ejemplo, si busca la palabra "Química",
            se localizarán también "quimica, Quimica, QUÍMICA, QUIMICA y química"
          </li>
          <li>
            Puede utilizar el carácter "?" para realizar búsquedas de partes de palabras. Por
            ejemplo, si ingresa "mus?" el catálogo recuperará: "música, músico, musicología,
            musicografía, Musik" etc.
          </li>
          <li>
            {' '}
            Si conoce el título o autor del material le recomendamos utilizar los filtros
            "Seleccione Formato" y "Buscar Por" para optimizar su búsqueda. Por ejemplo, si está
            buscando un periódico o revista, utilice el filtro "Seleccione Formato" y elija el
            formato "Diarios y Revistas" en el menú desplegable. Si conoce el título o el autor del
            material que busca, utilice el filtro "Buscar Por" y seleccione "Título" o "Autor" en el
            menú desplegable.
          </li>
          <li>
            También puede buscar por título y autor simultáneamente seleccionando en ambos filtros
            los criterios "Todos los Formatos" y "Todos los campos". Por ejemplo, si busca la obra
            "Sueño de una noche de verano" de Shakespeare, puede escribir "verano shakespeare" y el
            catálogo recuperará todos los resultados que contengan esas palabras en cualquiera de
            los campos.
          </li>
        </ol>
      </div>
    </section>
  )
}
