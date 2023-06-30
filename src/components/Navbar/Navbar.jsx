import { Button, Container } from '@mui/material'
import React from 'react'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

const Navbar = ({ toggleTheme }) => {

    return (
        <nav className={styles.nav}>
            <Container maxWidth='xl'>
                <div className={styles.cont}>
                    <Link to='/'> To do app</Link>
                    <Button onClick={() => toggleTheme()}>Toggle theme </Button>
                </div>

            </Container>
        </nav>
    )
}

export default Navbar