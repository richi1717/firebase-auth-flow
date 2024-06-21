import { getAuth, updateProfile } from 'firebase/auth'
import { getDatabase, ref, update } from 'firebase/database'
import { useInvalidateCommonQueries } from '../utils'
import { useMutation } from '@tanstack/react-query'

const auth = getAuth()
const db = getDatabase()

interface UpdateUserProps {
  displayName: string
}

async function updateUser({ displayName }: UpdateUserProps) {
  try {
    const user = auth.currentUser

    if (user) {
      await updateProfile(user, {
        displayName,
      })
    }

    await update(ref(db, `users/${user?.uid}`), {
      displayName,
      email: user?.email,
    })

    return user
  } catch (error: unknown) {
    console.error(error)

    throw new Error('Error updating user')
  }
}

function useUpdateUser() {
  const { resetQueries } = useInvalidateCommonQueries()

  return useMutation({
    mutationFn: async ({ displayName }: UpdateUserProps) => {
      const user = await updateUser({ displayName })

      return Promise.resolve(user)
    },
    onSuccess: async () => {
      await resetQueries()
    },
  })
}

export default useUpdateUser
