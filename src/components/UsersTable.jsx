import React, { useState } from 'react'
import { TableContainer, Table, TableHead, TableSortLabel, TableBody, TableRow, TableCell, Button } from '@mui/material'

const headLabels = [
	{ id: 'name', label: 'Name' },
	{ id: 'age', label: 'Age' },
	{ id: 'hometown', label: 'Hometown' },
	{ id: 'edit', label: 'Edit', disableSorting: true, align: 'center' },
	{ id: 'delete', label: 'Delete', disableSorting: true, align: 'center' },
]

export default function UsersTable({ users, onEdit, onDelete }) {
	const [order, setOrder] = useState()
	const [orderBy, setOrderBy] = useState()

	const handleSortRequest = (cellId) => {
		const isAsc = orderBy === cellId && order === 'asc'
		setOrder(isAsc ? 'desc' : 'asc')
		setOrderBy(cellId)
	}

	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index])
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0])
			if (order !== 0) return order
			return a[1] - b[1]
		})
		return stabilizedThis.map((el) => el[0])
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy)
	}

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1
		}
		if (b[orderBy] > a[orderBy]) {
			return 1
		}
		return 0
	}

	const data = stableSort(users, getComparator(order, orderBy))

	return (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						{headLabels.map((headCell) => (
							<TableCell
								key={headCell.id}
								sortDirection={orderBy === headCell.id ? order : false}
								align={headCell.align ? headCell.align : 'left'}
							>
								{headCell.disableSorting ? (
									headCell.label
								) : (
									<TableSortLabel
										active={orderBy === headCell.id}
										direction={orderBy === headCell.id ? order : 'asc'}
										onClick={() => {
											handleSortRequest(headCell.id)
										}}
									>
										{headCell.label}
									</TableSortLabel>
								)}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data?.map((item) => (
						<TableRow key={item.key}>
							<TableCell>{item?.name}</TableCell>
							<TableCell>{item?.age}</TableCell>
							<TableCell>{item?.hometown}</TableCell>
							<TableCell align="center">
								<Button
									variant="contained"
									disableElevation
									color="secondary"
									size="small"
									onClick={onEdit.bind(null, item.key)}
								>
									Edit
								</Button>
							</TableCell>
							<TableCell align="center">
								<Button
									variant="contained"
									disableElevation
									color="error"
									size="small"
									onClick={onDelete.bind(null, item.key)}
								>
									Delete
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}
