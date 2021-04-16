import React from 'react'
import { List as MUIList, ListItem, ListItemAvatar, ListItemText, Avatar, ListItemSecondaryAction, IconButton, Slide } from '@material-ui/core'
import { Delete, MoneyOff } from '@material-ui/icons'

import useStyles from './styles'
import { removeItem } from '../../../redux'
import { connect } from 'react-redux'

const List = ({list, removeItem}) => {
    const classes = useStyles()

    return (
        <MUIList dense={false} className={classes.list}>
            {list.map(transaction => (
                <Slide direction='down' in mountOnEnter unmountOnExit key={transaction.id}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar className={transaction.type === 'Income' ? classes.avatarIncome : classes.avatarExpense}>
                                <MoneyOff />
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
    )
}

const mapStateToProps = state => ({
    list: state.list.list
})

const mapDispatchToProps = dispatch => ({
    removeItem: id => dispatch(removeItem(id))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)
