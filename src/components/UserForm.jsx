import React from 'react'
import { TextField, Button, CircularProgress, Alert, Box } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const schema = yup.object().shape({
	name: yup.string().required('This field is required!').trim().min(3, 'Too short!'),
	age: yup
		.number()
		.typeError('This field is required!')
		.required('This field is required!')
		.min(1, 'Invalid!')
		.max(120, 'Invalid!'),
	hometown: yup.string().required('This field is required!').min(3, 'Invalid!').max(120, 'Invalid!'),
})

export default function UserForm({ userData, submitHandler, cancelHandler, loading, error }) {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema) })
	return (
		<form noValidate autoComplete="off" onSubmit={handleSubmit(submitHandler)}>
			<Box display="flex" flexDirection="column" gap={2}>
				<Controller
					name="name"
					control={control}
					defaultValue={userData?.name || ''}
					render={({ field }) => (
						<TextField
							{...field}
							label="Name"
							variant="outlined"
							error={!!errors.name}
							helperText={errors.name ? errors.name?.message : ''}
							fullWidth
							required
						/>
					)}
				/>
				<Controller
					name="age"
					control={control}
					defaultValue={userData?.age || ''}
					render={({ field }) => (
						<TextField
							{...field}
							label="Age"
							variant="outlined"
							error={!!errors.age}
							helperText={errors.age ? errors.age?.message : ''}
							fullWidth
							required
							type="number"
						/>
					)}
				/>
				<Controller
					name="hometown"
					control={control}
					defaultValue={userData?.hometown || ''}
					render={({ field }) => (
						<TextField
							{...field}
							label="Hometown"
							variant="outlined"
							error={!!errors.hometown}
							helperText={errors.hometown ? errors.hometown?.message : ''}
							fullWidth
							required
						/>
					)}
				/>
				{error && <Alert severity="error">Error: {error}</Alert>}
				<Box display="flex" justifyContent="flex-end" gap={1}>
					<Button variant="outlined" color="secondary" size="large" onClick={cancelHandler}>
						Cancel
					</Button>
					<Button variant="contained" color="primary" size="large" type="submit">
						{loading ? (
							<>
								Submitting <CircularProgress color="inherit" size={20} sx={{ ml: 1 }} />
							</>
						) : (
							'Submit'
						)}
					</Button>
				</Box>
			</Box>
		</form>
	)
}
