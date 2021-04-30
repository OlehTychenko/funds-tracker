import React from 'react'
import { Card, CardHeader, CardContent, Typography, Grid, Divider } from '@material-ui/core'

import useStyles from './styles'
import Form from './Form/Form'
import List from './List/List'
import { connect } from 'react-redux'

const Main = ({ list }) => {
    const classes = useStyles()
    const balance = list.reduce((acc, currValue) => {
        return currValue.type === 'Income' ? acc + currValue.amount : acc - currValue.amount
    }, 0)
    return (
        <Card className={classes.root}>
            <CardHeader title='Expense tracker' subheader='Powered by ...' />
            <CardContent>
                <Typography align='center' varian='h5'>Total Balance {balance}</Typography>
                <Typography variant='subtitle1' style={{ lineHeight: '1.5em', marginTop: '20px' }}>
                    Try saying: Add income for 100$ in Category Salary for Monday ...
                </Typography>
                <Divider />
                <Form />
            </CardContent>
            {/* <CardContent className={classes.cardContent}>
                <List />
            </CardContent> */}
        </Card>
    )
}

const mapStateToProps = state => ({
    list: state.list.list
})

export default connect(
    mapStateToProps
)(Main)
