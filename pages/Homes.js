import { useState, useEffect } from "react";
import styles from '../styles/homes.module.css'
import Modal from "./Modal";
import { useMoralis } from "react-moralis";

const Form = () => {

    const [state, setState] = useState("loading (4 sec)...");
    const [mounted, setMounted] = useState(true);
    const { Moralis } = useMoralis();

    const [formValues, setFormValues] = useState([{ fieldName: "Name", fieldValue: "", idValue:"metadataName"},
    { fieldName: "UID No.", fieldValue: "", idValue:"metadataUID"},
    { fieldName: "Age", fieldValue: "", idValue:"metadataAge" },
    { fieldName: "Blood_Group", fieldValue: "", idValue:"metadataBloodGroup" },
    { fieldName: "Gender", fieldValue: "", idValue:"metadataGender"}])
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
    const url=[];
    let uploadMetadata=async(testVariable)=>{

        const name=document.getElementById('metadataName').value;
        const uid=document.getElementById('metadataUID').value;
        const age=document.getElementById('metadataAge').value;
        const bloodGroup=document.getElementById('metadataBloodGroup').value;
        const gender=document.getElementById('metadataGender').value;

        const metadata={
            "name": name,
            "uid":uid,
            "age":age,
            "bloodGroup":bloodGroup,
            "gender":gender
        }
        console.log(metadata);
        const file=new Moralis.File("file.json", {base64:Buffer.from(JSON.stringify(metadata)).toString('base64')});
        await file.saveIPFS();
        console.log("Done!")
        console.log(file.ipfs());
        url.push(file.ipfs());
    }

    let handleSubmit = async() => {
        setMounted(!mounted);
        alert("Submitted");
        await uploadMetadata("test object")
    }
    useEffect(() => {
        let isMounted = true;               // note mutable flag
        uploadMetadata().then(data => {
          if (isMounted){setState(data);}    // add conditional check
        })
        return () => { isMounted = false }; // cleanup toggles value, if unmounted
      }, []);     
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
                        {
                            index ?
                                <button type="button" className={styles.remove} onClick={() => removeFormFields(index)}>Remove</button>
                                : null
                        }
                    </div>
                ))}
                <div className={styles.button_section}>
                    <button className={styles.add} type="button" onClick={() => addFormFields()}>Add a field</button>
                    <button className={styles.submit} type="submit">Submit</button>
                </div>
            </form>
        </div>
    )

}

export default Form