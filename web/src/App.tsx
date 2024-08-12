import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Main from './components/Main'
import NotFound from './components/NotFound'
import Signin from './components/Signin'
import Signup from './components/Signup'
import { GuestRoute, PrivateRoute } from './AuthRoute'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path='/signin' element={<GuestRoute children={<Signin />} />} />
          <Route path='/signup' element={<GuestRoute children={<Signup />} />} />
          <Route path='/' element={<PrivateRoute children={<Main />} />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
