
import { Toaster } from 'react-hot-toast'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Todo from './pages/ToDo'
import { Route, Routes } from 'react-router-dom'
import Weather from './pages/Weather'
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { useEffect, useState } from 'react'


const lightTheme = createTheme({
  palette: {
    mode: 'light',
  }
})

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})

function App() {
  const [currentTheme, setCurrentTheme] = useState(lightTheme);

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  useEffect(() => {

    document.body.classList.remove('dark')
    document.body.classList.remove('light')
    document.body.classList.add(currentTheme === lightTheme ? 'light' : 'dark')

  }, [currentTheme]);

  return (
    <>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Toaster />
        <Navbar toggleTheme={toggleTheme} />
        <Routes>
          <Route exact path="/" element={<Todo />} />
          <Route exact path="/weather" element={<Weather />} />
        </Routes>
      </ThemeProvider>
    </>
  )
}

export default App
