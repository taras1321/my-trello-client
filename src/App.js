import {
  BrowserRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import BoardPage from './pages/BoardPage/BoardPage'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/board/:id" component={BoardPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
