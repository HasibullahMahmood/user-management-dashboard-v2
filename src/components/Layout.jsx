import React from 'react'
import { Typography, Container, Divider } from '@mui/material'

export default function Layout({ children }) {
	return (
		<>
			<header>
				<Container>
					<Typography variant="h4" component="h1" height={80} alignItems="center" display="flex">
						Dashboard
					</Typography>
				</Container>
				<Divider />
			</header>
			<main>{children}</main>
		</>
	)
}
