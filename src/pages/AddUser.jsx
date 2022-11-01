import { useNavigate } from 'react-router-dom'
import { Container, Typography, Divider, Card, CardHeader, CardContent } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'

import UserForm from '../components/UserForm'
import useSuccessAlert from '../hooks/useSuccessAlert'
import { addUser } from '../store/actions'

const AddUser = () => {
	const { setOpen: setAlertOpen, SuccessAlert } = useSuccessAlert()
	const { loading, error } = useSelector((state) => state.users)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const cancelHandler = () => {
		navigate('/', { replace: true })
	}
	const submitHandler = async (data) => {
		const response = await dispatch(addUser(data))
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
							Add user
						</Typography>
					}
					sx={{ p: 3 }}
				/>
				<Divider />
				<CardContent sx={{ p: 3 }}>
					<UserForm
						cancelHandler={cancelHandler}
						submitHandler={submitHandler}
						loading={loading}
						error={error}
					/>
				</CardContent>
			</Card>
			<SuccessAlert onConfirm={successAlertConfirmHandler} text="The user is added successfully" />
		</Container>
	)
}

export default AddUser
