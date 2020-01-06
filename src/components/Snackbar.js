import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { IconButton, Snackbar, SnackbarContent } from '@material-ui/core';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import {
	CheckCircle,
	Error as ErrorIcon,
	Info,
	Close as CloseIcon,
	Warning,
} from '@material-ui/icons';

const variantIcon = {
	success: CheckCircle,
	warning: Warning,
	error: ErrorIcon,
	info: Info,
};

const useStyles1 = makeStyles(theme => ({
	success: {
		backgroundColor: green[600],
	},
	error: {
		backgroundColor: theme.palette.error.dark,
	},
	info: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: amber[700],
	},
	icon: {
		fontSize: 20,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
}));

function SnackbarContentWrapper(props) {
	const classes = useStyles1();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby='client-snackbar'
			message={
				<span id='client-snackbar' className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton
					key='close'
					aria-label='close'
					color='inherit'
					onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

SnackbarContentWrapper.propTypes = {
	className: PropTypes.string,
	message: PropTypes.string,
	onClose: PropTypes.func,
	variant: PropTypes.oneOf(['error', 'info', 'success', 'warning'])
		.isRequired,
};

export default function CustomizedSnackbars(props) {
	const [open, setOpen] = React.useState(true);

	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const { variant, message } = props;

	return (
		<div>
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={open}
				autoHideDuration={6000}
				onClose={handleClose}
			>
				<SnackbarContentWrapper
					onClose={handleClose}
					variant={variant}
					message={message}
				/>
			</Snackbar>
		</div>
	);
}
