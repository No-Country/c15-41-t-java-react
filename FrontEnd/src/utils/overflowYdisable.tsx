import { useEffect } from 'react'

const overflowYdisable: Function = () => {
  useEffect(() => {
    document.body.style.overflowY = 'hidden'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])
}

export default overflowYdisable
