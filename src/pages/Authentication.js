// From https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
	Avatar,
	Button,
	CssBaseline,
	TextField,
	FormControlLabel,
	Checkbox,
	Link,
	Grid,
	Typography,
	Container,
	withStyles,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import Snackbar from '../components/Snackbar';

const styles = theme => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
});

class Authentication extends Component {
	state = {
		email: '',
		password: '',
		showError: false,
		error: '',
	};

	handleOnSubmit = async e => {
		this.setState({ showError: false });
		e.preventDefault();
		const { email, password } = this.state;
		const { error } = this.props.isSignUp
			? await this.props.authenticate({ email, password, isSignUp: true })
			: await this.props.authenticate({
					email,
					password,
					isSignUp: false,
			  });
		if (error) {
			this.setState({ showError: true, error });
		}

		window.location.href = this.props.redirectToOnSuccess;
	};

	handleEmailChange = e => {
		this.setState({ email: e.target.value });
	};

	handlePasswordChange = e => {
		this.setState({ password: e.target.value });
	};

	maybeRenderError = () => {
		return this.state.showError ? (
			<Snackbar variant={'error'} message={this.state.error} />
		) : null;
	};

	render() {
		const { classes, isSignUp } = this.props;
		const cta = isSignUp ? 'Sign up' : 'Sign in';

		return (
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						{cta}
					</Typography>
					<form
						className={classes.form}
						noValidate
						onSubmit={this.handleOnSubmit}
					>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							onChange={this.handleEmailChange}
						/>
						<TextField
							variant='outlined'
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={this.handlePasswordChange}
						/>
						<FormControlLabel
							control={
								<Checkbox value='remember' color='primary' />
							}
							label='Remember me'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}
						>
							{cta}
						</Button>
						{isSignUp ? null : (
							<Grid container>
								<Grid item xs>
									<Link href='#' variant='body2'>
										Forgot password?
									</Link>
								</Grid>
								<Grid item>
									<Link href='/sign-up' variant='body2'>
										{"Don't have an account? Sign Up"}
									</Link>
								</Grid>
							</Grid>
						)}
					</form>
				</div>
				{this.maybeRenderError()}
			</Container>
		);
	}
}

Authentication.propTypes = {
	isSignUp: PropTypes.bool,
	redirectToOnSuccess: PropTypes.string.isRequired,
	authenticate: PropTypes.func.isRequired,
};

export default withStyles(styles)(Authentication);
