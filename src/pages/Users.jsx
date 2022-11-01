import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardContent, Typography, Button, Divider, Container, Alert } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import { loadUsers, deleteUser } from '../store/actions'
import UsersTable from '../components/UsersTable'
import Spinner from '../components/Spinner'
import WarnDelete from '../components/WarnDelete'
import useSuccessAlert from '../hooks/useSuccessAlert'

const Users = () => {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const { loading, error, list: users } = useSelector((state) => state.users)
	const [warnDelete, setWarnDelete] = useState({ open: false, userId: null })
	const { setOpen: setSuccessAlertOpen, SuccessAlert } = useSuccessAlert()

	useEffect(() => {
		if (users.length === 0) {
			dispatch(loadUsers())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch])

	const editBtnHandler = (userId) => {
		navigate(`/edit-user/${userId}`)
	}

	const deleteBtnHandler = (userId) => {
		setWarnDelete({ open: true, userId })
	}

	const cancelDeleteHandler = () => {
		setWarnDelete({ open: false, userId: null })
	}

	const confirmDeleteHandler = async () => {
		const userId = warnDelete.userId
		setWarnDelete({ open: false, userId: null })

		const response = await dispatch(deleteUser(userId))
		if (response.payload.response.is_successful) {
			setSuccessAlertOpen(true)
		}
	}

	const closeSuccessAlert = () => {
		setSuccessAlertOpen(false)
	}

	return (
		<Container sx={{ mt: '5%' }}>
			{loading && <Spinner />}
			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					Error: {error}
				</Alert>
			)}
			{!loading && !error && (
				<Card elevation={3}>
					<CardHeader
						sx={{ p: 3 }}
						title={
							<Typography variant="h5" component="h2">
								User list
							</Typography>
						}
						action={
							<Button
								variant="contained"
								color="primary"
								onClick={() => navigate('/add-user')}
								sx={{ my: 1, mr: 2 }}
							>
								Add New
							</Button>
						}
					/>

					<Divider />
					<CardContent sx={{ pt: 2, pb: 3, px: 3 }}>
						{users?.length === 0 ? (
							<Typography display="flex" alignItems="center" justifyContent="center" height={100}>
								No user found!
							</Typography>
						) : (
							<UsersTable users={users} onEdit={editBtnHandler} onDelete={deleteBtnHandler} />
						)}
					</CardContent>
				</Card>
			)}
			<WarnDelete show={warnDelete.open} onCancel={cancelDeleteHandler} onConfirm={confirmDeleteHandler} />
			<SuccessAlert onConfirm={closeSuccessAlert} text="The user is deleted successfully" />
		</Container>
	)
}

export default Users
