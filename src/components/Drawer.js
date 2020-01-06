import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from '@material-ui/core';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

export default function TemporaryDrawer(props) {
	const classes = useStyles();

	const toggleDrawer = (side, open) => event => {
		if (
			event.type === 'keydown' &&
			(event.key === 'Tab' || event.key === 'Shift')
		) {
			return;
		}

		if (!open) {
			props.handleClose();
		}
	};

	const sideList = side => (
		<div
			className={classes.list}
			role='presentation'
			onClick={toggleDrawer(side, false)}
			onKeyDown={toggleDrawer(side, false)}
		>
			<List>
				{props.drawerItems.map((item, index) => (
					<ListItem button key={item.displayName}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.displayName} />
					</ListItem>
				))}
			</List>
		</div>
	);

	return (
		<div>
			<Drawer open={props.open} onClose={toggleDrawer('left', false)}>
				{sideList('left')}
			</Drawer>
		</div>
	);
}

TemporaryDrawer.propTypes = {
	drawerItems: PropTypes.arrayOf(
		PropTypes.shape({
			displayName: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired,
			icon: PropTypes.any,
		})
	).isRequired,
	handleClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
};
