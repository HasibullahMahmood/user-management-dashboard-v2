import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export default function Spinner() {
	return (
		<Box display="flex" justifyContent="center">
			<CircularProgress />
		</Box>
	)
}
