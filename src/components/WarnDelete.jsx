import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert'
import { Button, Box } from '@mui/material'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
	sweetAlert: {
		'& *': {
			fontFamily: theme.typography.fontFamily,
		},
	},
}))

export default function WarnDelete({ show, onCancel, onConfirm }) {
	const classes = useStyles()
	if (!show) return null
	return (
		<SweetAlert warning title="Warning!" customClass={classes.sweetAlert} showConfirm={false} onConfirm={() => {}}>
			Are you sure you want to delete this user?
			<Box display="flex" justifyContent="center" gap={1} my={2}>
				<Button variant="outlined" onClick={onCancel}>
					Cancel
				</Button>
				<Button variant="contained" color="secondary" onClick={onConfirm}>
					Yes, delete it!
				</Button>
			</Box>
		</SweetAlert>
	)
}
