
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from "react-router-dom";
import RestaurantCard from './DisplayResCard'
export const DisplayRestaurantById = () => {

    let [resdata, setResdata] = useState(Object)

    //To get the id of the restaurant (as the path has id) we use useLocation()
    let location = useLocation()
    // split the path
    location = location.pathname.split('/')
    let refNo = location[location.length - 1]  // id will always be at last index
    //this will get records when the component is called
    useEffect(() => {
        const fetchAllRestaurants = async () => {
            try {
                const res = await axios.get("http://localhost:3001/admin/restaurant/" + refNo);
                //const arr = [res.data]
                // setResdata(arr.slice())
                setResdata(res.data)
                
            }
            catch (err) {
                console.log("Error in displaying the restaurants. " + err)
            }
        }
        fetchAllRestaurants()
    }, [refNo]
    )
    
    return (
        <div>
            <div className="SpecificRestaurants">
                <h1>Restaurant With Given Reference #</h1>&nbsp;

        {/* CHECK IF SERVER SENT SOME DATA WITH GIVEN REF NO. */}
                {resdata._id!==undefined ? <div> <RestaurantCard rest={resdata} /> </div> : <h5>No Restaurant with this Reference number</h5> }
                            
                    

            </div>
        </div>
    );
}


                /* {
                resdata.map((rest) => (
                    <div key={rest._id}>
                        { <RestaurantCard rest={rest} /> }
                    </div>
                ))
                } */