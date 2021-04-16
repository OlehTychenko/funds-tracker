import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'

import useStyles from './styles'
import { connect } from 'react-redux'

const Details = ({ title, list }) => {
    const classes = useStyles();

    const income = list.reduce((sum, current) => {
        if (current.type === 'Income') {
            return sum + current.amount
        } else return sum
    }, 0)

    const expense = list.reduce((sum, current) => {
        if (current.type === 'Expense') {
            return sum + current.amount
        } else return sum
    }, 0)

    return (
        <div>
            <Card className={title === 'Income' ? classes.income : classes.expense}>
                <CardHeader title={title} />
                <CardContent>
                    <Typography variant='h5'>{title === 'Income' ?
                        income
                        : expense
                    }</Typography>
                    {/* <Doughnut data='' /> */}
                </CardContent>
            </Card>
        </div>
    )
}

const mapStateToProps = state => ({
    list: state.list.list
})


export default connect(
    mapStateToProps
)(Details)
