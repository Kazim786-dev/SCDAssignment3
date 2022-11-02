import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AdminNavbar from '../navbar.jsx'
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
// import FormGroup from "react-bootstrap/esm/FormGroup.js";


export const EditRestaurant = () => {
    const [rest, setRest] = useState({
        name: "",
        restImg: "",
        city: "Islamabad",
        street: "",
        zipcode: null,

    })
    const cities = ['Islamabad', 'Lahore', 'Gujranwala', 'Sialkot']
    const handleChange = (e) => {
        setRest((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const navigate = useNavigate()
    const [validated, setValidated] = useState(false);
    const setCity = (c) => {
        rest.city = c
    }
    // this componenet is called with some route having id of restaurant. 
    //To get the id of the restaurant (as the path has id) we use useLocation()
    let location = useLocation()
    location = location.pathname.split('/')   // split the path
    let id = location[location.length - 1]

    const handleSubmit = async (event) => {
        event.preventDefault();  // it prevents form to refresh after submit

        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            //prevents further propagation of the current event in the capturing and bubbling phases
            //Propagation means bubbling up to parent elements
            event.stopPropagation();
        }
        else {
            try {
                const x= await axios.put(`http://localhost:3001/admin/restaurant/${id}`, rest)
                navigate('/admin/restaurant')
                if(x)
                    alert("Restaurant Info Updated Successfully!")
            } catch (error) {
                console.log(`Error in creating the new restaurant  ==>  ${error}`)
            }
        }
        setValidated(true);
    };

    // useEffect(() => {
    //     const fetchRestaurant = async () => {
    //         try {
    //             const res = await axios.get("http://localhost:3001/admin/restaurant/"+id);
    //             setRest(res.data);
    //         }
    //         catch (err) {
    //             console.log("Error in fetching the restaurants. " + err)
    //         }
    //     }
    //     fetchRestaurant()
    // }, []
    // )

// console.log(rest)

    return (

        <div>
            <AdminNavbar />
            <span className="square border bg-info rounded border-danger" id="form" >
                <h2>Update Restaurant</h2><br />
                <Form noValidate validated={validated} onSubmit={handleSubmit}>

                    <Row >
                        <Form.Group as={Col} controlId="validationCustom02">
                            <Form.Label>Image Url</Form.Label>
                            <Form.Control required type="text" placeholder="Paste Url here" onChange={handleChange} name="restImg" />
                            <Form.Control.Feedback type="invalid">Please provide a valid Url</Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row >
                        <Form.Group as={Col} md="8" controlId="validationCustom03">
                            <Dropdown style={{ marginTop: '6%' }}>
                                <Dropdown.Toggle variant="primary" required>City</Dropdown.Toggle>

                                <Dropdown.Menu required>
                                    {cities.map((city) => (
                                        <Dropdown.Item key={city} required name='city' onClick={() => setCity(city)}>
                                            {city}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>

                            </Dropdown>
                        </Form.Group>
                        
                        <Form.Group as={Col} md="4" controlId="validationCustom05">
                            <Form.Label>Zip</Form.Label>
                            <Form.Control type="number" placeholder="Zip" onChange={handleChange} name="zipcode" required />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid zip.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row >
                        <Form.Group as={Col} controlId="validationCustom03">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" placeholder="Address" onChange={handleChange} name="street" required />
                            <Form.Control.Feedback type="invalid">
                                Please add some specific address.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Button type="submit">Update</Button>


                </Form>

            </span>
        </div>


    )
}
