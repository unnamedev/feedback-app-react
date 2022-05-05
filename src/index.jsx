import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {store} from './app/store'
import './styles/index.scss'
import Main from './Main'

// ==========================
// Render the application
// ==========================
render(
    <Provider store={store}>
        <Main/>
    </Provider>,
    document.getElementById('root')
)