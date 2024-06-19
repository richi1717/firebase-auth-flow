import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import ControlledTextField from '../../components/ControlledTextField'
import { useForm } from 'react-hook-form'
import StyledButton from '../../components/StyledButton'
import { yupResolver } from '@hookform/resolvers/yup'
import schema from './schema'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useState } from 'react'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import useResetPassword from '../../api/users/useResetPassword'

export default function ResetPasswordForm() {
  const navigate = useNavigate()
  const [queryParams] = useSearchParams()
  const oobCode = queryParams.get('oobCode')
  // const mode = queryParams.get('mode')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [error, setError] = useState(!oobCode || false)
  const { mutate: sendUpdatePassword, isError, status } = useResetPassword()
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { newPassword: '' },
    mode: 'onTouched',
  })

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show)

  const onSubmit = handleSubmit((values) => {
    if (oobCode) {
      sendUpdatePassword(
        { newPassword: values.newPassword, oobCode },
        {
          onSuccess: () => {
            navigate('/')
          },
        },
      )
    } else {
      setError(true)
    }
  })

  return (
    <Stack
      direction="column"
      sx={{
        py: { mobile: 1, tablet: 4 },
        px: { mobile: 3, tablet: 4 },
        maxWidth: 'desktop',
        width: 1,
      }}
      spacing={1}
      data-testid="loginForm"
      alignItems="center"
    >
      <Card sx={{ p: 1, width: 500 }} component="form" onSubmit={onSubmit}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            <Typography variant="h4">Enter your new password</Typography>
            {(isError || error) && (
              <Typography color="error">
                Something went wrong, please go{' '}
                <StyledButton
                  sx={{ minWidth: 0, fontSize: '1rem', mt: '-3px' }}
                  variant="text"
                  onClick={() => navigate('/forgot-password')}
                >
                  here
                </StyledButton>{' '}
                and try again
              </Typography>
            )}
            <ControlledTextField
              control={control}
              name="newPassword"
              label="New password"
              type={showNewPassword ? 'text' : 'password'}
              textFieldProps={{
                onBlur: () => setShowNewPassword(false),
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </CardContent>
        <CardActions sx={{ px: 2 }}>
          <Stack spacing={2} alignItems="flex-start" width={1}>
            <StyledButton
              type="submit"
              fullWidth
              disabled={!isValid}
              loading={status === 'pending'}
            >
              Change
            </StyledButton>
          </Stack>
        </CardActions>
      </Card>
    </Stack>
  )
}
