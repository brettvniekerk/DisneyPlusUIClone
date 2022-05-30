import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Login from './components/Login'
import Home from './components/Home'
import Detailed from './components/Detailed'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={ // root path
            <Login />
          }/>
          <Route path='/home' element={ // main homepage path
            <Home />
          }/>
          <Route path='/details/:id' element={ // details page with the id of whatever movie is passed
            <Detailed />
          }/>
        </Routes>
      </Router>
    </div>
  )
}

export default App