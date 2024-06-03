import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Form } from './pages/Form'
import { Item } from './pages/Item'
import { ItemsList } from './pages/ItemsList'
import { App } from './components/App'

export const Root = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<ItemsList />}/>
        <Route path='form' element={<Form />}/>
        <Route path='item' element={<Item />}/>
      </Route>
    </Routes>
  </Router>
)
