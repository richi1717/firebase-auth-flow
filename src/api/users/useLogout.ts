import { getAuth, signOut } from 'firebase/auth'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateCommonQueries } from '../utils'

function useLogout() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: async () => {
      const auth = getAuth()

      await signOut(auth)
      return Promise.resolve('successfully logged out')
    },
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useLogout
