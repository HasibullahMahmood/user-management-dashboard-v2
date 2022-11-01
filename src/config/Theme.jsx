import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

// THEME
const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0,
				},
			},
		},
	},
})

export default function Theme({ children }) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	)
}
