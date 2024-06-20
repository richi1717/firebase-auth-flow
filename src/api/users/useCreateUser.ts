import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

initialize()

const auth = getAuth()

interface CreateLogin extends UserLogin {
  displayName: string
}

function useCreateUser() {
  const queryClient = useQueryClient()

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
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useCreateUser
