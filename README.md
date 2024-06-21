# Firebase Auth Flows

This is a small little drop in firebase auth login/create/forgot/logout tools and screen to use in my different apps.
Very handy and the goal is to be able to pass in the theme and use the tools as just a simple drop in.
No need to wire it up yourself. Pass in the config object to the original hook at the app level which will look like

```javascript
const config = {
  appName: 'Name of your app',
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DB_URL,
  apiKey: import.meta.env.VITE_API_KEY,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  // you can omit any of these below this line if you want to use the defaults
  loginUrl: '/custom-login', // defaults to '/login'
  createAccountUrl: '/custom-create-account', // defaults to '/create-account'
  changePasswordUrl: '/custom-change-password', // defaults to '/change-password'
  forgotPasswordUrl: '/custom-forgot-password', // defaults to '/forgot-password'
  verifyUrl: '/custom-verify', // defaults to '/verify'
}
```

Then pass that object into the original component used in App. Since this will be a stand alone
part of the app, it has it's own react router dom setup. You can pass in separate routes that
you would prefer for different pieces like instead of `/login` you could pass in `/my-cool-login`
and it would set that as the path. But it defaults to the `/login` path.

Can also pass in the theme which looks like

```javascript
const myTheme = (mode: 'light' | 'dark') => ({
  typography: {
    fontFamily: [
      '-apple-system',
      'Inter',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    mode,
    ...(mode === 'dark'
      ? {
          background: {
            default: '#0f1418',
          },
          text: {
            primary: 'rgb(255, 255, 255)',
            secondary: grey[500],
          },
          primary: { main: '#6e43a3' },
        }
      : {
          primary: { main: '#410060' },
          background: {
            default: grey[100],
            paper: grey[100],
          },
          text: {
            primary: grey[700],
            secondary: grey[500],
          },
        }),
  },
  // note these are the breakpoints I use in the app so you HAVE to pass in those three keys
  // BUT you can change the numbers.  This does not have to match your personal theme.  You
  // could easily use your theme in your app, pass it in here but remove the breakpoints obj
  // from your original theme.  Like `const { breakpoints, ...myThemeMinusBreakpoints } = themeObj`
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      desktop: 1024,
    },
  },
})
```

I merge the themes with my defaults so overide anything you are not wanting or it will be there.
