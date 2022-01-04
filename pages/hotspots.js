import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const hotspots = (props) => {
    const [modal, setModal] = useState(false);
    const [address, setAddress] = useState();


    function handleAddress(event) {
        setAddress(event.target.value);
    }

    function handleModal() {
        modal ? setModal(false) : setModal(true);
    }

    function storeAddress() {
        var data = {
            'address': address 
          }

          var config = {
            method: 'post',
            url: `${props.apiDomain}/hotspot/add`,
            headers: { 
              'Accept': 'application/json', 
              'Authorization': `Bearer ${localStorage.getItem('token')}`, 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(response.data);
            handleModal();
          })
    }

    useEffect(() => {
        console.log(props);
    },[]);
    return (
        <>
            <h1 className="text-3xl font-bold underline font-Roboto">
                My Hotspots
            </h1>
            <p className="font-Montserrat">I don't know what will go here yet, so this is temporary!</p>
            
            <div id="add-hotspot" className="mt-5 font-Montserrat cursor-pointer" onClick={handleModal}>
                <FontAwesomeIcon icon={faPlusCircle} /> Add New Hotspot
            </div>

            { modal ? 
                <div className="min-w-screen h-screen animated fadeIn faster  fixed  left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none bg-no-repeat bg-center bg-cover"  id="modal-id">
                    <div className="absolute bg-black opacity-80 inset-0 z-0"></div>
                    <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <div className="">
                        <div className="text-center p-5 flex-auto justify-center">
                        <FontAwesomeIcon icon={faPlusCircle}  size="5x" className="text-gray-600" />
                                        <h2 className="text-xl font-bold py-4 ">Add a Hotspot</h2>
                                        <p className="text-sm text-gray-500 px-8">Adding a new hotspot to monitor performance.</p>    
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-address">
                                Hotspot Address
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                    id="grid-address" 
                                    type="text" 
                                    onChange={handleAddress}
                            />
                            </div>
                        </div>
                        <div className="p-3  mt-2 text-center space-x-4 md:block">
                            <button onClick={handleModal} className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Cancel
                            </button>
                            <button onClick={storeAddress}
                                    className="mb-2 md:mb-0 bg-green-500 border border-green-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-green-600">Add</button>
                        </div>
                    </div>
                    </div>
                </div>    
            : '' } 
        </>
    )
}

export default hotspots
