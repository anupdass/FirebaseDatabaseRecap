import React, { useEffect, useState } from 'react'

import { initializeApp } from 'firebase/app';
import firebaseConfig from '../../FirebaseConfig/FirebaseConfig'
import ProgressBar from "@ramonak/react-progress-bar";


import {
    getFirestore,
    collection,
    addDoc,
    onSnapshot,
    deleteDoc,
    doc,
    setDoc,
} from 'firebase/firestore'

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const storage = getStorage(app);


const CompleteFirebase = () => {

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: ''
    })
    const [getData, setGetData] = useState([])

    const handleInput = (event) => {
        const newValue = { [event.target.name]: event.target.value }
        setFormData({ ...formData, ...newValue })
    }


    const hamndleFormSubmit = async () => {

        try {
            const docRef = await addDoc(collection(db, 'products'), { formData })
            console.log(docRef)
        } catch (error) {
            console.log(error)
        }

        setFormData({
            name: '',
            phone: '',
            email: '',
            address: ''
        })
    }

    const deleteData = (id) => {
        console.log('loading')
        deleteDoc(doc(db, 'products', id))
        console.log('finish')
    }

    const updateData = (id) => {
        setDoc(doc(db, 'products', id), { formData })
    }


    useEffect(() => {
        const getDataFormFirebase = onSnapshot(collection(db, "products"), (querySnapshot) => {
            const products = [];
            querySnapshot.forEach((doc) => {
                products.push({ ...doc.data(), id: doc.id })
            });
            setGetData(products)
        });

    }, ['sa'])



    const [image, setImage] = useState()
    const [progress, setProgress] = useState(0)

    const handleFile = (e) => {
        console.log(e.target.files[0])
        setImage(e.target.files[0])
    }


    const handleUploadFile = () => {

        const storageRef = ref(storage, `images/ ${image?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(Math.round(progress))
            },
            (error) => {
                console.log(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                });
            }
        );
    }

    return (
        <div>
            <input placeholder='Enter Name' onChange={handleInput} name='name' value={formData.name} /><br />

            <input placeholder='Enter phone' onChange={handleInput} name='phone' value={formData.phone} /><br />

            <input placeholder='Enter emails' onChange={handleInput} name='email' value={formData.email} /><br />

            <input placeholder='Enter address' onChange={handleInput} name='address' value={formData.address} /><br />

            <button onClick={hamndleFormSubmit}>Submit</button> <br /><br /><br />

            {/* upload file into firebase */}
            <input onChange={handleFile} type='file' multiple />
            <button onClick={handleUploadFile}>Upload</button>

            <img alt="cargoImage" height='150px' width='150px' />
            <div style={{ width: '350px' }}>
                <ProgressBar completed={progress} />;
            </div>

            {/* show data from Firebase */}
            <br /><br />
            {
                getData.length === 0 ?
                    'Loading '
                    :
                    getData.map(data =>
                        <li key={data.id}>{data.formData?.name}
                            <button onClick={() => deleteData(data.id)}>Delete</button>
                            <button onClick={() => updateData(data.id)}>Update</button></li>
                    )
            }
        </div>
    )
}

export default CompleteFirebase