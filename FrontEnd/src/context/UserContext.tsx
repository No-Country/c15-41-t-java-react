import { createContext, useState, useEffect, useContext, type FC, type ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'

interface UserState {
  isLoggedIn: boolean
  authToken: string | null
  userName: string | null
  idAdmin: number | null
}

interface IUserContext {
  signIn: (email: string, password: string, navigate: NavigateFunction) => Promise<void>
  signOut: () => void
  currentUser: UserState
  setupComplete: boolean
  signInWaiting: boolean
  fetch: (url: string, options?: RequestInit) => Promise<any>
}

const initialUserState: UserState = {
  authToken: null,
  isLoggedIn: false,
  userName: null,
  idAdmin: null
}

const UserContext = createContext<IUserContext | null>(null)
const LOCAL_STORAGE_KEY = 'currentUser'
const RELATIVE_PATH = '/bibliotech/api'
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const MODE = import.meta.env.MODE

const fixURL = (url: string) => {
  if (MODE === 'production' && BACKEND_HOST !== undefined) {
    const pathname = new URL(url).pathname
    url = `${BACKEND_HOST}${RELATIVE_PATH}${pathname}`
  }
  return url
}

const authenticateUser = async (userName: string, password: string) => {
  const response = await fetch(fixURL('http://localhost:3000/auth/login'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ userName, password })
  })

  if (!response.ok) {
    return {
      error: true,
      ...(await response.json())
    }
  }

  return {
    message: 'Login exitoso',
    data: await response.json()
  }
}

const fakeAuthenticateUser = async (
  email: string,
  password: string
): Promise<{
  error?: boolean
  message?: string
  data?: {
    jwtToken: string
    idAdmin: number
    name: string
  }
}> =>
  await new Promise(resolve => {
    setTimeout(() => {
      if (email === '' || password === '') {
        resolve({
          error: true,
          message: 'Error de autenticación'
        })
      } else {
        resolve({
          message: 'Login exitoso',
          data: {
            jwtToken: '123456789',
            idAdmin: 1,
            name: 'Maria'
          }
        })
      }
    }, 2000)
  })

export const UserProvider: FC<{
  children: ReactNode
}> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserState>(initialUserState)
  const [signInWaiting, setSignInWaiting] = useState<boolean>(false)

  const [setupComplete, setSetupComplete] = useState<boolean>(true)

  const signIn: IUserContext['signIn'] = async (email, password, navigate) => {
    setSignInWaiting(true)

    let apiResponse
    if (MODE === 'development') {
      apiResponse = await fakeAuthenticateUser(email, password)
    } else {
      apiResponse = await authenticateUser(email, password)
    }

    if (apiResponse.error === true) {
      setSignInWaiting(false)
      throw new Error(apiResponse.message)
    }

    if (apiResponse.data !== undefined) {
      const loggedInUser = {
        authToken: apiResponse.data.jwtToken,
        isLoggedIn: true,
        idAdmin: apiResponse.data.idAdmin,
        userName: apiResponse.data.name
      }
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loggedInUser))
      setCurrentUser(loggedInUser)
      navigate('/home')
    }

    setSignInWaiting(false)
  }

  const signOut = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY)
    setCurrentUser(initialUserState)
  }

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (storedUser !== null) {
      try {
        const parsedUser = JSON.parse(storedUser)
        if (parsedUser.isLoggedIn === true) {
          setCurrentUser(parsedUser)
        } else setCurrentUser(initialUserState)
      } catch (error) {
        console.error('Error parsing user data from local storage')
        setCurrentUser(initialUserState)
      }
    } else {
      setCurrentUser(initialUserState)
    }
    setSetupComplete(false)
  }, [])

  const fetchHOF: IUserContext['fetch'] = async (url, options = {}) => {
    if (currentUser.authToken === null) {
      throw new Error('Error de autenticación')
    }

    url = fixURL(url)

    const { headers, ...otherOptions } = options

    const response = await fetch(url, {
      ...otherOptions,
      headers: {
        ...headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${currentUser.authToken}`
      }
    })

    if (!response.ok) {
      try {
        const error = await response.json()
        throw new Error(error)
      } catch (error) {
        // console.log('error', error)
        throw new Error('Request error')
      }
    }

    // TODO Temporalmente, mientras no se implemente el backend(en DELETE)
    try {
      return await response.json()
    } catch (error) {
      return {
        message: 'Operación exitosa'
      }
    }
  }

  return (
    <UserContext.Provider
      value={{ signIn, currentUser, signOut, setupComplete, signInWaiting, fetch: fetchHOF }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === null) {
    throw new Error('Error using React Context')
  }
  return context
}
