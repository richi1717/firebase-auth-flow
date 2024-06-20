import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation, useQueryClient } from '@tanstack/react-query'

initialize()

const auth = getAuth()

export const loginUser = async ({ email, password }: UserLogin) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    )
    const user = userCredential.user
    console.log(user)
    return user
  } catch (error: unknown) {
    // const errorCode = error.code
    // const errorMessage = error.message
    console.error(error)
    throw new Error('Unauthorized: incorrect email or password')
  }
}

function useLoginUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ email, password }: UserLogin) =>
      loginUser({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
      await queryClient.invalidateQueries({ queryKey: ['settings'] })
    },
  })
}

export default useLoginUser
