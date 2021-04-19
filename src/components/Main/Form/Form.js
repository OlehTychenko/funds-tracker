import React, { useState } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

import useStyles from './styles'
import { connect } from 'react-redux'
import { addTransaction } from '../../../redux'
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../constans/categories'


const initialState = {
    amount: 10,
    category: '',
    type: 'Expense',
    date: new Date(),
    id: uuidv4()
}

const Form = ({addTransactionToList}) => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    return (
        <Grid
            container
            spacing={2}
        >
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    ...
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({
                        ...formData,
                        type: e.target.value
                    })}>
                        <MenuItem value='Income'>Income</MenuItem>
                        <MenuItem value='Expense'>Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select value={formData.category} onChange={e => setFormData({
                        ...formData,
                        category: e.target.value
                    })}>
                        {selectedCategories.map(c => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>)}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField value={formData.amount} onChange={e => setFormData({
                    ...formData,
                    amount: +e.target.value
                })} type='number' label='Amount' fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField value={formData.date} onChange={e => setFormData({
                    ...formData,
                    date: e.target.value
                })} type='date' label='Date' fullWidth/>
            </Grid>
            <Button className={classes.button} onClick={() => addTransactionToList(formData)} variant='outlined' color='primary' fullWidth>Create</Button>
        </Grid>
    )
}

const mapDispatchToProps = dispatch => ({
    addTransactionToList: trans => dispatch(addTransaction(trans))
})

export default connect(
    null,
    mapDispatchToProps
)(Form)
