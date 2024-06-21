import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import initialize from '../initialize'
import { useMutation } from '@tanstack/react-query'
import { useInvalidateCommonQueries } from '../utils'

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

    return user
  } catch (error: unknown) {
    console.error(error)
    throw new Error('Unauthorized: incorrect email or password')
  }
}

function useLoginUser() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: ({ email, password }: UserLogin) =>
      loginUser({ email, password }),
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useLoginUser
