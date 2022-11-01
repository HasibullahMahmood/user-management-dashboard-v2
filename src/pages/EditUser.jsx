import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardContent, Container, Typography, Divider } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import UserForm from '../components/UserForm'
import Spinner from '../components/Spinner'
import useSuccessAlert from '../hooks/useSuccessAlert'
import { fetchUserById, updateUser } from '../store/actions'

const EditUser = () => {
	const navigate = useNavigate()
	const { userId } = useParams()
	const dispatch = useDispatch()
	const user = useSelector((state) => state.users.list.find((user) => user.key === userId))
	const { error, loading } = useSelector((state) => state.users)
	const { setOpen: setAlertOpen, SuccessAlert } = useSuccessAlert()

	useEffect(() => {
		if (!user) {
			dispatch(fetchUserById(userId))
		}
	}, [dispatch, userId, user])

	const cancelHandler = () => {
		navigate('/', { replace: true })
	}

	const submitHandler = async (data) => {
		const response = await dispatch(updateUser({ ...data, id: userId }))
		if (response?.meta?.requestStatus === 'fulfilled') {
			setAlertOpen(true)
		}
	}

	const successAlertConfirmHandler = () => {
		setAlertOpen(false)
		navigate('/')
	}
	return (
		<Container maxWidth="md" sx={{ mt: '5%' }}>
			<Card elevation={3}>
				<CardHeader
					title={
						<Typography variant="h5" component="h2">
							Edit user
						</Typography>
					}
					sx={{ p: 3 }}
				/>
				<Divider />
				<CardContent sx={{ p: 3 }}>
					{user ? (
						<UserForm
							cancelHandler={cancelHandler}
							submitHandler={submitHandler}
							userData={user}
							error={error}
							loading={loading}
						/>
					) : (
						<Spinner />
					)}
				</CardContent>
			</Card>

			<SuccessAlert onConfirm={successAlertConfirmHandler} text="The user is updated successfully" />
		</Container>
	)
}

export default EditUser
