import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import React, { useState } from 'react'
import styles from './TodoSingle.module.css'
import { AiFillDelete } from 'react-icons/ai';
import { FaInfo } from 'react-icons/fa';
import { BiArchiveIn, BiArchiveOut } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';

const TodoSingle = ({ todo, toggleTodo, removeTodo, handleEdit, archiveTodo }) => {
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

    const handleRemove = () => {
        removeTodo(todo.id)
    }

    const handleClose = () => {
        setOpenConfirmModal(false)
    }

    const handleCloseDetails = () => {
        setOpenDetailsDialog(false)
    }

    const handleArchieve = () => {
        archiveTodo(todo)
    }

    return (
        <>
            <div style={{height:'100%'}} className={styles.cont}>
                <div className={styles.btns}>
                    <Checkbox
                        sx={{
                            color: "#fff", '&.Mui-checked': {
                                color: "#fff",
                            },
                            padding: 0
                        }}
                        checked={todo.checked}
                        onChange={() => toggleTodo(todo.id)}
                    />
                    <Button onClick={() => handleEdit(todo)}><CiEdit size={24} /></Button>
                    <Button onClick={() => handleArchieve()}>{todo.archivedAt ? <BiArchiveOut size={24} /> : <BiArchiveIn size={24} />}</Button>
                    <Button onClick={() => setOpenDetailsDialog(true)}><FaInfo size={24} /></Button>
                    <Button onClick={() => setOpenConfirmModal(true)}><AiFillDelete size={24} /></Button>
                </div>
                <div className={styles.body}>
                    <h4 className={todo.checked ? styles.checked : ""}>{todo.title}</h4>
                    <p>{todo.description}</p>
                </div>

                <div className={styles.foot}>
                    <span>Created At: {todo?.createdAt}</span>
                    {
                        todo?.finishedAt && <span>Finished At: {todo.finishedAt}</span>
                    }
                    {
                        todo?.archivedAt && <span>Archived At: {todo.archivedAt}</span>
                    }


                </div>

            </div>

            <Dialog
                open={openConfirmModal}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are You Sure you want to Delete?
                </DialogTitle>

                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={handleRemove} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openDetailsDialog}
                onClose={handleCloseDetails}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {
                    todo.title && <DialogTitle id="alert-dialog-title3">
                        {todo.title}
                    </DialogTitle>
                }
                {
                    todo.description && <DialogContent>
                        <DialogContentText id="alert-dialog-description2">
                            {todo.description}
                        </DialogContentText>
                    </DialogContent>
                }



                <DialogActions>
                    <Button onClick={handleCloseDetails}>close</Button>
                </DialogActions>
            </Dialog>

        </>

    )
}

export default TodoSingle