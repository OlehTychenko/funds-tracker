import React from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'

import useStyles from './styles'
import Form from './Form/Form'
import List from './List/List'

const Main = () => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardHeader title='Expense tracker' subheader='Powered by ...' />
            <CardContent>
                <Typography align='center' varian='h5'>Total Balance $100</Typography>
                <Typography variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    {/* InfoCard... */}
                    Try saying: Add income for 100$ in Category Salary for Monday ...
                </Typography>
                <Divider />
                <Form />
            </CardContent>
            <CardContent className={classes.cardContent}>
                <Grid item xs={12}>
                    <List />
                </Grid>
            </CardContent>
        </Card>
    )
}

export default Main