import React, { useEffect } from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide, Card, CardHeader, CardContent, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { Delete, MoneyOff, LocalAtm } from '@material-ui/icons'
import { sortValues } from '../../../constans/sortValues'
import { useSpeechContext } from '@speechly/react-client'

import useStyles from './styles'
import { removeItem, sortTransactions } from '../../../redux'
import { connect } from 'react-redux'

const List = ({ list, removeItem, sortTransactions, sortVal }) => {
    const classes = useStyles()

    const {segment} = useSpeechContext()

    useEffect(() => {
        if (segment) {
             if (segment.intent.intent === 'sort_by' && segment.isFinal) {
                 const sortV = segment.entities[0].value.toLowerCase()
                 sortTransactions(sortV)
             }
        }
    }, [segment])

    return (
        <Card>
            <CardHeader title='Transactions list' />
            <FormControl fullWidth>
                <InputLabel>Sort by</InputLabel>
                <Select value={sortVal}  onChange={e => sortTransactions(e.target.value)}>
                    {
                        sortValues.map(el =>
                            <MenuItem key={el} value={el}>{el}</MenuItem>)
                    }
                </Select>
            </FormControl>
            <CardContent>
                <MUIList dense={false} className={classes.list}>
                    {list.map(transaction => (
                        <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                        {
                                            transaction.type === 'Income' ?
                                                <LocalAtm /> :
                                                <MoneyOff />
                                        }
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={transaction.category} secondary={`${transaction.amount} - ${transaction.date}`} />
                                <ListItemSecondaryAction>
                                    <IconButton edge='end' aria-label='delete' onClick={() => removeItem(transaction.id)}>
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Slide>
                    ))}
                </MUIList>
            </CardContent>
        </Card>
    )
}

const mapStateToProps = state => ({
    list: state.list.list,
    sortVal: state.list.sort.type
})

const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id)),
    sortTransactions: sortV => dispatch(sortTransactions(sortV))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
