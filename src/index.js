import React from 'react'
import ReactDOM from 'react-dom'
import { SpeechProvider} from '@speechly/react-client'

import App from './App'
import './index.css'

ReactDOM.render(
    <SpeechProvider appId='e5b2eac9-9c45-4bef-8673-85737349371c' language='en-US'>
        <App />
    </SpeechProvider>, document.getElementById('root'))