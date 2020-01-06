import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Button,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';

import Drawer from './Drawer';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	button: {
		margin: '5px',
	},
}));

export default function MenuAppBar(props) {
	const classes = useStyles();
	const [showMenu, setShowMenu] = useState(false);

	const handleMenuClick = () => {
		setShowMenu(true);
	};

	const handleMenuClose = () => {
		setShowMenu(false);
	};

	return (
		<div className={classes.root}>
			<AppBar position='static' color='default'>
				<Toolbar>
					{props.isAuthorized && (
						<div>
							<IconButton
								edge='start'
								className={classes.menuButton}
								color='inherit'
								aria-label='menu'
								onClick={handleMenuClick}
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								drawerItems={props.drawerItems}
								handleClose={handleMenuClose}
								open={showMenu}
							/>
						</div>
					)}
					<Typography variant='h6' className={classes.title}>
						{props.appName}
					</Typography>
					{!props.isAuthorized && (
						<div className={classes.buttonContainer}>
							{props.buttons.map(b => (
								<Button
									className={classes.button}
									key={b.displayName}
									variant='outlined'
									onClick={() =>
										(window.location.href = b.url)
									}
									color={b.isSignUp ? 'secondary' : 'inherit'}
								>
									{b.displayName}
								</Button>
							))}
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}

MenuAppBar.propTypes = {
	isAuthorized: PropTypes.bool.isRequired,
	appName: PropTypes.string.isRequired,
	buttons: PropTypes.arrayOf(
		PropTypes.shape({
			displayName: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
		})
	).isRequired,
	drawerItems: PropTypes.arrayOf(
		PropTypes.shape({
			displayName: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			icon: PropTypes.any,
		})
	).isRequired,
};
