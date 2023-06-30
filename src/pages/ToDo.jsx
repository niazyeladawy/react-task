import React, { useState, useEffect } from 'react';
import { Button, Checkbox, TextField, Modal, Container, Grid, Tabs, Tab } from '@mui/material';
import { Box } from '@mui/system';
import styles from './ToDo.module.css'
import TodoSingle from '../components/TodoSingle/TodoSingle';
import { toast } from 'react-hot-toast';
import FeaturedWeather from '../components/Featured weather/FeaturedWeather';

const Todo = () => {
    const [editMode, setEditMode] = useState(false);
    const [editTodoId, setEditTodoId] = useState(null);

    const [todos, setTodos] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalDescription, setModalDescription] = useState('');
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [selectedTab, setSelectedTab] = useState(0);


    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }

        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos, isFirstRender]);

    const addTodo = () => {
        if (modalTitle.trim() !== '' && modalDescription.trim() !== '') {
            if (editMode) {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) => {
                        if (todo.id === editTodoId) {
                            return {
                                ...todo,
                                title: modalTitle,
                                description: modalDescription,
                            };
                        }
                        return todo;
                    })
                );
                setEditMode(false);
                setEditTodoId(null);
                toast.success('Updated Successfully');
            } else {
                const newTodo = {
                    id: Date.now(),
                    title: modalTitle,
                    description: modalDescription,
                    checked: false,
                    createdAt: new Date().toLocaleString(),
                    finishedAt: null,
                    archivedAt: null,
                };

                setTodos((prevTodos) => [...prevTodos, newTodo]);
                toast.success('Added Successfully');
            }
            setModalTitle('');
            setModalDescription('');
            setOpenModal(false);
        } else {
            toast.error('Please fill in all the fields.');
        }
    };
    const toggleTodo = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        checked: !todo.checked,
                        finishedAt: todo.checked ? null : new Date().toLocaleString(),
                    };
                }
                return todo;
            })
        );
    };

    const removeTodo = (id) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        toast.success('Deleted Successfully')
    };

    const handleEdit = (todo) => {
        setEditMode(true);
        setEditTodoId(todo.id);
        setModalTitle(todo.title);
        setModalDescription(todo.description);
        setOpenModal(true);
    };


    const handleCloseModal = () => {
        setEditMode(false);
        setOpenModal(false);
        setModalTitle('');
        setModalDescription('')
    }


    const filteredTodos = selectedTab === 0
        ? todos.filter(todo => !todo.archivedAt) // Normal Todos
        : todos.filter(todo => todo.archivedAt);

    const archiveTodo = (t) => {

        if (t.archivedAt) {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => {
                    if (todo.id === t.id) {
                        return {
                            ...todo,
                            archivedAt: null,
                        };
                    }
                    return todo;
                })
            );
            toast.success('UnArchived SuccessFully')
        }
        else {
            setTodos((prevTodos) =>
                prevTodos.map((todo) => {
                    if (todo.id === t.id) {
                        return {
                            ...todo,
                            archivedAt: new Date().toLocaleString(),
                        };
                    }
                    return todo;
                })
            );
            toast.success('Archived SuccessFully')
        }

    };



    return (
        <section >
            <Container maxWidth='xl'>

                <FeaturedWeather />

                <div >
                    <div className={styles.head}>
                        <h1>To-do App</h1>
                        <Button variant="contained" onClick={() => setOpenModal(true)}>
                            Add Todo
                        </Button>
                    </div>
                    <Tabs
                        value={selectedTab}
                        onChange={(event, newValue) => setSelectedTab(newValue)}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        sx={{ marginBottom: "20px" }}
                    >
                        <Tab label="Normal Todos" />
                        <Tab label="Archived Todos" />
                    </Tabs>
                    {selectedTab === 0 && (
                        <Grid alignItems="stretch" container spacing={3} >
                            {filteredTodos.map((todo) => (
                                <Grid key={todo.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <TodoSingle
                                        todo={todo}
                                        toggleTodo={toggleTodo}
                                        removeTodo={removeTodo}
                                        archiveTodo={archiveTodo}
                                        handleEdit={handleEdit}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {selectedTab === 1 && (
                        <Grid container alignItems="stretch" spacing={3}>
                            {filteredTodos.map((todo) => (
                                <Grid key={todo.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                    <TodoSingle
                                        todo={todo}
                                        toggleTodo={toggleTodo}
                                        removeTodo={removeTodo}
                                        archiveTodo={archiveTodo}
                                        handleEdit={handleEdit}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    {/* <Grid container spacing={3}>
                        
                        {todos.map((todo) => (
                            <Grid key={todo.id} item xs={12} sm={12} md={6} lg={4} xl={3}>
                                <TodoSingle todo={todo} handleEdit={handleEdit} toggleTodo={toggleTodo} removeTodo={removeTodo} />
                            </Grid>
                        ))}

                    </Grid> */}

                </div>

                {
                    editMode ? <Modal open={openModal} className='to_do_add' onClose={handleCloseModal}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 600,
                                bgcolor: '#fff',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <h2>Edit Todo</h2>
                            <TextField
                                label="Title"
                                value={modalTitle}
                                onChange={(e) => setModalTitle(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={modalDescription}
                                onChange={(e) => setModalDescription(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" onClick={addTodo}>
                                Update
                            </Button>
                        </Box>
                    </Modal> : <Modal open={openModal} className='to_do_add' onClose={handleCloseModal}>
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 600,
                                bgcolor: '#fff',
                                boxShadow: 24,
                                p: 4,
                            }}
                        >
                            <h2>Add Todo</h2>
                            <TextField
                                label="Title"
                                value={modalTitle}
                                onChange={(e) => setModalTitle(e.target.value)}
                                fullWidth
                            />
                            <TextField
                                label="Description"
                                value={modalDescription}
                                onChange={(e) => setModalDescription(e.target.value)}
                                fullWidth
                            />
                            <Button variant="contained" onClick={addTodo}>
                                Add
                            </Button>
                        </Box>
                    </Modal>
                }

            </Container>
        </section>
    );
};

export default Todo;
