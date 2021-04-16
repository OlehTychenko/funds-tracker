import React from 'react'
import Details from './components/Details/Details'
import { Grid } from '@material-ui/core'

import useStyles from './styles'
import Main from './components/Main/Main'
import { Provider } from 'react-redux'
import store from './redux/store'

const App = () => {
    const classes = useStyles()

    return (
        <Provider store={store}>
            <div>
                <Grid
                    container
                    spacing={0}
                    alignItems='center'
                    justify='center'
                    style={{ height: '100vh' }}
                    className={classes.grid}
                >
                    <Grid item xs={12} sm={4}>
                        <Details title='Income' />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Main />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Details title='Expense' />
                    </Grid>
                </Grid>
            </div>
        </Provider>
    )
}

export default App
