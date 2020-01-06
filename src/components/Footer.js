import React from 'react';
import PropTypes from 'prop-types';

import {
	CssBaseline,
	Grid,
	Typography,
	Link,
	Container,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	'@global': {
		ul: {
			margin: 0,
			padding: 0,
		},
		li: {
			listStyle: 'none',
		},
	},
	footer: {
		borderTop: `1px solid ${theme.palette.divider}`,
		marginTop: theme.spacing(8),
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(6),
			paddingBottom: theme.spacing(6),
		},
	},
}));

export default function Footer(props) {
	const classes = useStyles();

	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				maxWidth='md'
				component='footer'
				className={classes.footer}
			>
				<Grid container spacing={4} justify='space-evenly'>
					{props.footerContent.map(footer => (
						<Grid item xs={6} sm={3} key={footer.title}>
							<Typography
								variant='h6'
								color='textPrimary'
								gutterBottom
							>
								{footer.title}
							</Typography>
							<ul>
								{footer.description.map(item => (
									<li key={item.text}>
										<Link
											href={item.url}
											variant='subtitle1'
											color='textSecondary'
										>
											{item.text}
										</Link>
									</li>
								))}
							</ul>
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	);
}

Footer.propTypes = {
	footerContent: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			description: PropTypes.arrayOf(
				PropTypes.shape({
					text: PropTypes.string.isRequired,
					url: PropTypes.string.isRequired,
				})
			).isRequired,
		})
	).isRequired,
};
