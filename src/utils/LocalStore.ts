export const getI18n = (): string | null => {
  return localStorage.getItem('lang')
}

export const setI18n = (lan: string): void => {
  localStorage.setItem('lang', lan)
}

export const getUserToken = (): string | null => {
  return sessionStorage.getItem('auth')
}

export const setUserToken = (token: string): void => {
  return sessionStorage.setItem('auth', token)
}

export const removeUserToken = (): void => {
  sessionStorage.removeItem('auth')
}

export const getSize = (): string => {
  return localStorage.getItem('size') as string
}

export const setSize = (size: string): void => {
  localStorage.setItem('size', size)
}
