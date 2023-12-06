import { createContext, useState, useEffect, useContext, type FC, type ReactNode } from 'react'
import type { NavigateFunction } from 'react-router-dom'

interface UserState {
  isLoggedIn: boolean
  authToken: string | null
  userName: string | null
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
  userName: null
}

const UserContext = createContext<IUserContext | null>(null)
const LOCAL_STORAGE_KEY = 'currentUser'
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST
const MODE = import.meta.env.MODE

/*
const authenticateUser = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!response.ok) {
    throw new Error('Error de autenticación')
  }

  return await response.json()
}
*/

const fakeAuthenticateUser = async (
  email: string,
  password: string
): Promise<{
  error?: boolean
  message?: string
  data?: {
    token: string
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
          message: 'Autenticación exitosa',
          data: {
            token: '123456789',
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
    try {
      setSignInWaiting(true)
      const apiResponse = await fakeAuthenticateUser(email, password)

      if (apiResponse.error === true) {
        alert(apiResponse.message)
        return
      }

      if (apiResponse.data !== undefined) {
        const loggedInUser = {
          authToken: apiResponse.data.token,
          isLoggedIn: true,
          userName: apiResponse.data.name
        }
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loggedInUser))
        setCurrentUser(loggedInUser)
        navigate('/home')
      }
    } catch (error) {
      alert(error)
    } finally {
      setSignInWaiting(false)
    }
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

    if (MODE === 'production' && BACKEND_HOST !== undefined) {
      const pathname = new URL(url).pathname
      url = `${BACKEND_HOST}${pathname}`
    }

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
      throw new Error('Error de autenticación')
    }

    return await response.json()
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
