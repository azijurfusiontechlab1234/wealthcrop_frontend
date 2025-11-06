import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './components/DashBoard.jsx'
import {store} from './redux/store'
import { Provider } from 'react-redux'
import TradingViewChart from './components/charts/TradingViewChart.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    {/* <Dashboard/> */}
    {/* <TradingViewChart/> */}
    </BrowserRouter>
  </StrictMode>,
)
