import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HeaderComponent from './components/HeaderComponent'
import ListUserComponent from './components/ListUserComponent'
import AddUserComponent from './components/AddUserComponent'
import FooterComponent from './components/FooterComponent'

function App() {


  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* http://localhost:3000 */}
        <Route path='/' element = { <ListUserComponent /> }></Route> 

        {/* http://localhost:3000/users */}
        <Route path='/users' element = { <ListUserComponent /> }></Route> 

        {/* http://localhost:3000/add-user */}
        <Route path='/add-user' element = { <AddUserComponent /> }></Route>

        {/* http://localhost:3000/update-user/2 */}
        <Route path='/update-user/:id' element = { <AddUserComponent /> }></Route>
      </Routes>
      <FooterComponent />
    </BrowserRouter>
    </>
  )
}

export default App
