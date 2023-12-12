import type { KeyboardEventHandler } from 'react'

export const blockNonNumericInput: KeyboardEventHandler<HTMLInputElement> = e =>
  ['e', 'E', '+', '-'].includes(e.key) && e.preventDefault()
