import React from 'react'
import Details from './components/Details/Details'
import { Grid } from '@material-ui/core'

import useStyles from './styles'
import Main from './components/Main/Main'
import { Provider } from 'react-redux'
import store from './redux/store'
import { PushToTalkButtonContainer, PushToTalkButton, ErrorPanel } from '@speechly/react-ui'
import List from './components/Main/List/List'

const App = () => {
    const classes = useStyles()

    return (
        <Provider store={store}>
            <Grid
                container
                spacing={0}
                alignItems='center'
                justify='center'
                className={classes.grid}
                style={{ height: '100vh' }}
            >
                <Grid item xs={12} sm={12} lg={4}>
                    <Main />
                </Grid>
                <Grid item xs={12} sm={12} lg={3}>
                    <List />
                </Grid>
                <Grid item xs={12} sm={10} lg={4}>
                    <Grid item xs={12} sm={12} lg={10}>
                        <Details title='Income' />
                    </Grid>
                    <Grid item xs={12} sm={12} lg={10}>
                        <Details title='Expense' />
                    </Grid>
                </Grid>
            </Grid>
            <PushToTalkButtonContainer>
                <PushToTalkButton gradientStops={["#4caf50", "#f44336"]} size="5rem"/>
                <ErrorPanel />
            </PushToTalkButtonContainer>
        </Provider>
    )
}

export default App
