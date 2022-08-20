import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import styles from '../styles/modal.module.css'

const Modal = ({ open, handleClose, addFields }) => {

    const [fieldName, setFieldName] = useState("")
    const [fieldValue, setFieldValue] = useState("")

    const handleChange = (e) => {
        if (e.target.name === "fieldName") {
            setFieldName(e.target.value)
        } else {
            setFieldValue(e.target.value)
        }
    }

    const closeModal = () => {
        setFieldName("")
        setFieldValue("")
        handleClose()
    }

    const addFieldsModal = () => {
        addFields(fieldName, fieldValue)
        closeModal()
    }

    return (
        <Dialog
            open={open}
            handleClose={handleClose}
        >
            <div style={{
                margin: "20px"
            }}>
                <div className={styles.close} onClick={closeModal}>X</div>
                <div className={styles.content}>
                    <div className={styles.field}>
                        <label>Field Name</label>
                        <input type="text" name="fieldName" value={fieldName || ""} onChange={e => handleChange(e)} />
                    </div>
                    <div className={styles.field}>
                        <label>Field Value</label>
                        <input type="text" name="fieldValue" value={fieldValue || ""} onChange={e => handleChange(e)} />
                    </div>
                </div>
                <div className={styles.addField}>
                    <button onClick={addFieldsModal}>Add</button>
                </div>
            </div>
        </Dialog>
    )

}

export default Modal