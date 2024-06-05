import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Item } from './pages/Item'
import { ItemsPage } from './pages/ItemsList'
import { App } from './components/App'

export const Root = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<ItemsPage />}/>
        <Route path='item' element={<Item />}/>
      </Route>
    </Routes>
  </Router>
)
