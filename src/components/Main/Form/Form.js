import React, { useState, useEffect } from 'react'
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useSpeechContext } from '@speechly/react-client'

import useStyles from './styles'
import { connect } from 'react-redux'
import { addTransaction, sortTransactions } from '../../../redux'
import { incomeCategories, expenseCategories } from '../../../constans/categories'
import formatDate from '../../../utils/formaDate'
import CustomizedSnackbar from '../../Snackbar/Snackbar'


const initialState = {
    amount: '',
    category: '',
    type: 'Income',
    date: formatDate(new Date()),
}


const Form = ({ addTransactionToList, sortVal, sortTransactions }) => {
    const classes = useStyles()
    const [formData, setFormData] = useState(initialState)
    const [open, setOpen] = useState(false)

    const selectedCategories = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const { segment } = useSpeechContext();

    const validateForm = formData.category && formData.amount && formData.date;

    useEffect(() => {
        if (segment) {
            if (segment.intent.intent === 'add_expense') {
                console.log('add expense')
                setFormData({
                    ...formData,
                    type: 'Expense'
                })
            } else if (segment.intent.intent === 'add_income') {
                setFormData({
                    ...formData,
                    type: 'Income'
                })
            } else if (segment.intent.intent === 'create_transaction' && segment.isFinal && validateForm) {
                addTransactionToList(formData)
                sortTransactions(sortVal)
            } else if (segment.intent.intent === 'cancel_transaction' && segment.isFinal) {
                return setFormData(initialState)
            }
            segment.entities.forEach(e => {
                const category = `${e.value.charAt(0)}${e.value.slice(1).toLowerCase()}`
                switch (e.type) {
                    case 'amount':
                        setFormData({ ...formData, amount: e.value < 0 || isNaN(e.value) ? 0 : +e.value })
                        break
                    case 'category':
                        if (incomeCategories.map(iC => iC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Income', category: category })
                        } else if (expenseCategories.map(eC => eC.type).includes(category)) {
                            setFormData({ ...formData, type: 'Expense', category: category })
                        }
                        break
                    case 'date':
                        setFormData({ ...formData, date: e.value })
                        break
                }
            })
            if (validateForm && segment.isFinal && segment.intent.intent !== 'sort_by' && segment.intent.intent !== 'create_transaction') {
                addTransactionToList(formData)
                sortTransactions(sortVal)
            }
        }
    }, [segment])

    return (
        <Grid
            container
            spacing={0}
        >
            <CustomizedSnackbar open={open} setOpen={setOpen} />
            <Grid item xs={12}>
                <Typography align='center' variant='subtitle2' gutterBottom>
                    {segment && segment.words.map(w => w.value).join(' ')}
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select value={formData.type} onChange={e => setFormData({
                        ...formData,
                        type: e.target.value,
                        category: initialState.category
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
                    amount: +e.target.value < 0 ? 0 : +e.target.value
                })} type='number' label='Amount' fullWidth />
            </Grid>
            <Grid item xs={6}>
                <TextField value={formData.date} onChange={e => setFormData({
                    ...formData,
                    date: formatDate(e.target.value)
                })} type='date' label='Date' fullWidth />
            </Grid>
            <Button className={classes.button} onClick={() => {
                setOpen(true)
                addTransactionToList(formData)
                sortTransactions(sortVal)
            }} variant='outlined' color='primary' fullWidth disabled={validateForm ? false : true}>Create</Button>
        </Grid>
    )
}

const mapStateToProps = state => ({
    sortVal: state.list.sort.type
})

const mapDispatchToProps = dispatch => ({
    addTransactionToList: trans => dispatch(addTransaction(trans)),
    sortTransactions: sortV => dispatch(sortTransactions(sortV))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form)
