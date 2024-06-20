import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Stack,
  Toolbar,
  capitalize,
} from '@mui/material'
import React from 'react'
import Drawer from './components/Drawer'
import { useState } from 'react'
import { deepPurple } from '@mui/material/colors'
import useCurrentUser from '../../api/users/useCurrentUser'
import HomeIcon from '@mui/icons-material/Home'

const getName = (name: string) => {
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu')

  const matched = [...name.matchAll(rgx)] || []

  const initials = `${matched.shift()?.[1] || ''}${matched.pop()?.[1] || ''}`

  return initials
}

export default function Header() {
  const { data: user } = useCurrentUser()
  const displayName = capitalize(user?.displayName ?? '')
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      mt={{ mobile: 8, tablet: 9 }}
    >
      <AppBar position="fixed">
        <Container>
          <Toolbar disableGutters>
            <Stack direction="row" alignItems="center" sx={{ flexGrow: 1 }}>
              <IconButton
                href="/"
                sx={{
                  color: 'common.white',
                }}
              >
                <HomeIcon />
              </IconButton>
            </Stack>
            <Stack direction="row" flexGrow={0} alignItems="center">
              <Box sx={{ p: 2 }}>
                <IconButton
                  sx={{
                    textTransform: 'none',
                    p: 0,
                    color: 'common.white',
                  }}
                  onClick={handleClick}
                >
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: { mobile: 30, tablet: 40 },
                      height: { mobile: 30, tablet: 40 },
                    }}
                  >
                    {getName(displayName)}
                  </Avatar>
                </IconButton>
              </Box>
              <Drawer
                anchorEl={anchorEl}
                setAnchorEl={() => setAnchorEl(null)}
                displayName={displayName}
              />
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </Stack>
  )
}
