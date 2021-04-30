import React from 'react'
import { Card, CardHeader, CardContent, Typography } from '@material-ui/core'
import { Doughnut } from 'react-chartjs-2'

import useStyles from './styles'
import { connect } from 'react-redux'
import useTransactions from '../../useTransactions'

const Details = ({ title, list }) => {
    const classes = useStyles();

    const { total, chartData} = useTransactions(list, title)

    return (
        <div>
            <Card className={title === 'Income' ? classes.income : classes.expense}>
                <CardHeader title={title} />
                <CardContent>
                    <Typography variant='h5'>${total}</Typography>
                    <Doughnut data={chartData} />
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
