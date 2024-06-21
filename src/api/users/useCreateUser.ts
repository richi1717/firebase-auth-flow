import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import initialize from '../initialize'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateCommonQueries } from '../utils'

initialize()

const auth = getAuth()

interface CreateLogin extends UserLogin {
  displayName: string
}

function useCreateUser() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: async ({ email, password, displayName }: CreateLogin) => {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      await updateProfile(userCredential.user, {
        displayName,
      })

      await sendEmailVerification(userCredential.user, {
        url: import.meta.env.VITE_APP_URL,
      })

      return Promise.resolve(userCredential.user)
    },
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useCreateUser
