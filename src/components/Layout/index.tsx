import { Stack } from '@mui/material'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <Stack height={1} alignItems="center">
      <Outlet />
    </Stack>
  )
}
