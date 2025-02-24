import React, { isValidElement, useEffect, useState } from "react";
import Sidebar from "../components/AdminSidebar";
import "./AddDoctor.css";
import AdminNav from "../components/AdminNav";
import axios from "axios";

function AddDoctor() {
    const [doctorData, setDoctorData] = useState({
        name: undefined,
        email: undefined,
        contactNumber: undefined,
        education: [],
        speciality: undefined,
        experience: undefined,
        amountPerPatient: undefined,
        address: undefined,
        about: undefined
    })

    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [errors, setErrors] = useState({});

    const handleButtonClick = () => {
        document.getElementById("upload-file").click();
    }

    const handleChange = (event) => {
        setDoctorData(prev => ({...prev, [event.target.name]: event.target.value}))
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    }

    console.log(doctorData);

    const validateInputs = () => {
        const newErrors = {};

        if (!doctorData.name.trim()) newErrors.name = "Doctor name is required.";
        if (!doctorData.email.trim() || !/\S+@\S+\.\S+/.test(doctorData.email))
            newErrors.email = "A valid email is required.";
        if (!doctorData.contactNumber.trim() || !/^\d{10}$/.test(doctorData.contactNumber))
            newErrors.contactNumber = "A valid 10-digit contact number is required.";
        if (!doctorData.education.trim()) newErrors.education = "Education is required.";
        if (!doctorData.speciality) newErrors.speciality = "Specialty is required.";
        if (!doctorData.experience || isNaN(doctorData.experience) || doctorData.experience <= 0)
            newErrors.experience = "Valid experience is required.";
        if (
            !doctorData.amountPerPatient ||
            isNaN(doctorData.amountPerPatient) ||
            doctorData.amountPerPatient <= 0
        )
            newErrors.amountPerPatient = "Valid amount per patient is required.";
        if (!doctorData.address.trim()) newErrors.address = "Address is required.";
        if (!doctorData.about.trim()) newErrors.about = "About section is required.";
        if (!imageFile) newErrors.image = "Doctor image is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        for (const key in doctorData) {
            formData.append(key, doctorData[key]);
        }

        formData.append("image", imageFile);
    

        if (validateInputs()) {
            const response = await axios.post("http://localhost:3000/api/doctor/createdoctor", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Form submitted successfully");
            window.location.reload(false);
            console.log("Form submitted successfully with data:", response);
        } else {
            console.log("Form validation failed. Errors:", errors);
        }
    }



  return (
    <div className="add-doctor">
        <AdminNav />
        <div className="app-container">
            <Sidebar active="AddDoctor"/>
            <div className="content">
                <header className="header">
                <h2>Add Doctor</h2>
                </header>
                <main>
                <div className="form-container">
                    <div className="form-header">
                    <div className="upload-section">
                        <div className="image-placeholder">
                            {selectedImage && <img src={selectedImage}/>}
                            {!selectedImage ? <p>Upload an image of the doctor</p> : ""}
                        </div>
                        <input type="file" id="upload-file" name="image" hidden onChange={handleFileChange}/>
                        <button type="button" className="upload-button" onClick={handleButtonClick}>Upload</button>
                    </div>
                    </div>
                    <form className="doctor-form">
                    <div className="form-row">
                        <input type="text" placeholder="Doctor Name" name="name" onChange={handleChange} />
                        <input type="email" placeholder="Email" name="email" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <input type="text" placeholder="Contact Number" name="contactNumber" onChange={handleChange} />
                        <input type="text" placeholder="Education" name="education" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <select onChange={handleChange} name="speciality">
                        <option value="">Select the correct specialty</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="neurology">Neurology</option>
                        <option value="general physician">General Physician</option>
                        <option value="dermatologist">Dermastologist</option>
                        <option value="Endocrinologist">Endocrinologist</option>
                        <option value="Oncologist">Oncologist</option>
                        <option value="General practitioner">General practitioner</option>
                        <option value="Gastroenterologist">Gastroenterologist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Obstetrics and gynaecology">Obstetrics and gynaecology</option>
                        <option value="Emergency medicine">Emergency medicine</option>
                        </select>
                        <input type="number" placeholder="Experience (In years)" name="experience" onChange={handleChange}/>
                    </div>
                    <div className="form-row">
                        <input type="number" placeholder="Amount per patient" name="amountPerPatient" onChange={handleChange} />
                    </div>
                    <div className="form-row">
                        <textarea placeholder="Address" name="address" className="textarea" onChange={handleChange}></textarea>
                    </div>
                    <div className="form-row">
                        <textarea placeholder="About the doctor" className="textarea" name="about" onChange={handleChange}></textarea>
                    </div>
                    <button type="submit" className="submit-button" onClick={handleSubmit}>
                        Add Doctor
                    </button>
                    </form>
                </div>
                </main>
            </div>
            </div>
    </div>
  );
}

export default AddDoctor;
