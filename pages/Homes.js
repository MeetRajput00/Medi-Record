import { useState, useEffect } from "react";
import styles from '../styles/homes.module.css';
import Modal from "./Modal";
import { useMoralis } from "react-moralis";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { doc, setDoc } from "firebase/firestore";

import { MoralisProvider } from "react-moralis";
const Form = () => {
    // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

        const firebaseConfig = {
            apiKey: "AIzaSyDhbHCdWM7Y4PttG5iBB4DW_2TtODDiOHw",
            authDomain: "medi-doc-1e5cc.firebaseapp.com",
            projectId: "medi-doc-1e5cc",
            storageBucket: "medi-doc-1e5cc.appspot.com",
            messagingSenderId: "1046832478746",
            appId: "1:1046832478746:web:7357989e618e78003dafa3",
            measurementId: "G-SDV38PMCRL"
        };
        
        // Initialize Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
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

            await setDoc(doc(db, "IPFSLink", "Data"), file.ipfs().toString());
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
            <MoralisProvider
appId="MyFpOagRB5pWdqQ8R56jZU9YJUn5dGP2KAoWAhoi"
serverUrl="https://ubno5c6vadgi.usemoralis.com:2053/server"
>
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
            
        </MoralisProvider>
        )
        

}

export default Form