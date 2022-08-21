import { useState, useEffect } from "react";
import styles from '../styles/homes.module.css'
import Modal from "../components/Modal";
import { useMoralis } from "react-moralis";
export default function retrieveData(){
    const [state, setState] = useState("loading (4 sec)...");
    const [mounted, setMounted] = useState(true);
    const { Moralis } = useMoralis();

    const [formValues, setFormValues] = useState([{ fieldName: "Name", fieldValue: "Meet Rajput", idValue:"metadataName"},
    { fieldName: "UID No.", fieldValue: "6598-4235-7842", idValue:"metadataUID"},
    { fieldName: "Age", fieldValue: "19", idValue:"metadataAge" },
    { fieldName: "Blood_Group", fieldValue: "B+", idValue:"metadataBloodGroup" },
    { fieldName: "Gender", fieldValue: "Male", idValue:"metadataGender"},
    { fieldName: "Allergies", fieldValue: "Peanut Butter", idValue:"metadataAllergies"}
])
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClickClose = () => {
        setOpen(false)
    }

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i]["fieldName"] = e.target.name;
        newFormValues[i]["fieldValue"] = e.target.value;
        setFormValues(newFormValues);
    }

    const addFields = (fieldName, fieldValue) => {
        setFormValues([...formValues, { "fieldName": fieldName, "fieldValue": fieldValue }])
    }

    let addFormFields = () => {
        // setFormValues([...formValues, { name: "" }])
        handleClickOpen()
    }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    const object={
        "key":"value"
    }
    let handleSubmit = async() => {
        setMounted(!mounted);
        alert("Submitted");
    }    
    return (
        <div className={styles.container}>
            <Modal open={open} handleClose={handleClickClose} addFields={addFields} />
            <form onSubmit={handleSubmit}>
                {formValues.map((element, index) => (
                    <div className={styles.form_inline} key={index}>
                        <div style={{
                            width: "80%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <label>{element.fieldName}</label>
                            <input type="text"  id={element.idValue} name={element.fieldName} value={element.fieldValue || ""} onChange={e => handleChange(index, e)} />
                        </div>
                    </div>
                ))}
            </form>
        </div>
    )

}