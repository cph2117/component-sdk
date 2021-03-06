import React from 'react';
import PropTypes from 'prop-types';

import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CssBaseline,
	Grid,
	Typography,
	Container,
} from '@material-ui/core';
import StarIcon from '@material-ui/icons/StarBorder';
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
	heroContent: {
		padding: theme.spacing(8, 0, 6),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.grey[700]
				: theme.palette.grey[200],
	},
	cardPricing: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'baseline',
		marginBottom: theme.spacing(2),
	},
}));

export default function Pricing(props) {
	const classes = useStyles();
	const { pricingDescription, tiers, handleSelection } = props;
	return (
		<React.Fragment>
			<CssBaseline />
			<Container
				maxWidth='sm'
				component='main'
				className={classes.heroContent}
			>
				<Typography
					component='h1'
					variant='h2'
					align='center'
					color='textPrimary'
					gutterBottom
				>
					Pricing
				</Typography>
				<Typography
					variant='h5'
					align='center'
					color='textSecondary'
					component='p'
				>
					{pricingDescription}
				</Typography>
			</Container>

			<Container maxWidth='md' component='main'>
				<Grid container spacing={5} alignItems='flex-end'>
					{tiers.map(tier => (
						// Enterprise card is full width at sm breakpoint
						<Grid
							item
							key={tier.title}
							xs={12}
							sm={tier.title === 'Enterprise' ? 12 : 6}
							md={4}
						>
							<Card>
								<CardHeader
									title={tier.title}
									subheader={tier.subheader}
									titleTypographyProps={{ align: 'center' }}
									subheaderTypographyProps={{
										align: 'center',
									}}
									action={
										tier.title === 'Pro' ? (
											<StarIcon />
										) : null
									}
									className={classes.cardHeader}
								/>
								<CardContent>
									<div className={classes.cardPricing}>
										<Typography
											component='h2'
											variant='h3'
											color='textPrimary'
										>
											${tier.price}
										</Typography>
										<Typography
											variant='h6'
											color='textSecondary'
										>
											/mo
										</Typography>
									</div>
									<ul>
										{tier.description.map(line => (
											<Typography
												component='li'
												variant='subtitle1'
												align='center'
												key={line}
											>
												{line}
											</Typography>
										))}
									</ul>
								</CardContent>
								<CardActions>
									<Button
										fullWidth
										variant={
											tier.buttonVariant
												? tier.buttonVariant
												: 'outlined'
										}
										color='primary'
										onClick={() =>
											handleSelection(tier.title)
										}
									>
										{tier.buttonText}
									</Button>
								</CardActions>
							</Card>
						</Grid>
					))}
				</Grid>
			</Container>
		</React.Fragment>
	);
}

Pricing.propTypes = {
	pricingDescription: PropTypes.string,
	tiers: PropTypes.arrayOf(
		PropTypes.shape({
			title: PropTypes.string.isRequired,
			subheader: PropTypes.string,
			price: PropTypes.string.isRequired,
			description: PropTypes.arrayOf(PropTypes.string).isRequired,
			buttonText: PropTypes.string.isRequired,
			buttonVariant: PropTypes.string,
		})
	).isRequired,
	handleSelection: PropTypes.func.isRequired,
};

// Ex:
// const tiers = [
// 	{
// 		title: 'Free',
// 		price: '0',
// 		description: [
// 			'10 users included',
// 			'2 GB of storage',
// 			'Help center access',
// 			'Email support',
// 		],
// 		buttonText: 'Sign up for free',
// 		buttonVariant: 'outlined',
// 	},
// 	{
// 		title: 'Pro',
// 		subheader: 'Most popular',
// 		price: '15',
// 		description: [
// 			'20 users included',
// 			'10 GB of storage',
// 			'Help center access',
// 			'Priority email support',
// 		],
// 		buttonText: 'Get started',
// 		buttonVariant: 'contained',
// 	},
// 	{
// 		title: 'Enterprise',
// 		price: '30',
// 		description: [
// 			'50 users included',
// 			'30 GB of storage',
// 			'Help center access',
// 			'Phone & email support',
// 		],
// 		buttonText: 'Contact us',
// 		buttonVariant: 'outlined',
// 	},
// ];
