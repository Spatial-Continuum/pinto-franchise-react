
/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, selectApiError, selectApiLoading, selectSelectedRestaurant } from '../../../../../redux/slices/restaurant';
import { CreateNewAddress, Searchloading, SearchMobileNumber, UpdateCustomerPrimaryAddress } from '../../../../../redux/slices/order';
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    StandaloneSearchBox,
} from "@react-google-maps/api";
import { useFormik } from 'formik';
import * as Yup from 'yup';


export function AddNewCustomer() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const restaurantDetails = useSelector(selectSelectedRestaurant)
    const loading = useSelector(selectApiLoading)
    const Searchloadings = useSelector(Searchloading)
    const [search, setSearch] = useState('')
    const [Location, setLocation] = useState([])
    const [selectedOption, setSelectedOption] = useState('');
    const [AddNewCustomerModal, setAddNewCustomer] = useState(false);
    const [AddNewAddress, setAddNewAddress] = useState(false);
    const inputref = useRef(null);
    const [data, setData] = useState();


    const mapContainerStyle = { width: "100%", height: "100%" };
    const defaultCenter = { lat: 11.017363, lng: 76.958885 };
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [messages, setMessages] = useState({
        error: '',
        success: ''
    })


    const initialValues = {
        address_line_1: '',
        street: '',
        sublocality: '',
        city: '',
        state: '',
        pincode: '',
        latitude: '',
        longitude: '',
        address_type: 'Home',
        label: '',
        delivery_option: 'Hand it to me',
        delivery_instructions: '',
    };

    const getValidationSchema = Yup.object().shape({
        address_line_1: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        sublocality: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        pincode: Yup.string().required('Required'),
        delivery_option: Yup.string().required("Required"),
        label: Yup.string().required('Required'),
        address_type: Yup.string().required('Required'),
        delivery_instructions: Yup.string().required('Required'),
    });

    const formik = useFormik({
        initialValues,
        validationSchema: getValidationSchema,
        // validationSchema,
        onSubmit: async (values) => {
            console.log("Submitted Data:", values);
            //     const res = await dispatch(CreateNewAddress({ id, values }))

            //     if (res.payload?.data) {
            //         setMessages({
            //             error: '',
            //             success: res.payload.data.message,
            //         });
            //         setData('')
            //         formik.resetForm();
            //     } else {
            //         setMessages({
            //             error: res.payload,
            //             success: '',
            //         });
            //     }
            // setTimeout(()=>{
            //     setMessages({error:'',success:''})
            // },2000)

        },
    });

    console.log(formik.values);


    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyANMc42fXDaBF3bYBdHQFbWsquKht3arak",
        libraries: ["places"],
    });
    const handleOnPlaceChanged = () => {
        let places = inputref.current.getPlaces();

        console.log("places", places);


        if (places.length > 0) {
            const place = places[0];
            console.log("hjgjyfkyufy", place);
            const address = place.formatted_address;
            console.log("klasdjfljwe", address);
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            console.log("kasjdfiojwoewe");
            let state = "";
            let locality = "";
            let sublocality1 = "";
            let sublocality2 = "";
            let sublocality3 = "";
            let pincode = "";
            let city = "";
            let street = "";
            place.address_components.forEach((com) => {
                console.log("klasjeoiwle", com);
            });
            place.address_components.forEach((component) => {
                if (component.types.includes("administrative_area_level_1")) {
                    state = component.short_name; // State
                }
                if (component.types.includes("locality")) {
                    locality = component.long_name; // City
                }

                if (component.types.includes("sublocality_level_1")) {
                    sublocality1 = component.long_name;
                }
                if (component.types.includes("sublocality_level_2")) {
                    sublocality2 = component.long_name;
                }
                if (component.types.includes("sublocality_level_3")) {
                    sublocality3 = component.long_name;
                }
                if (component.types.includes("postal_code")) {
                    pincode = component.long_name; // Pincode
                }
                if (component.types.includes("route")) {
                    street = component.long_name; // Pincode
                }
                if (component.types.includes("administrative_area_level_3")) {
                    city = component.long_name;
                }
            });
            let street1 = `${street},${sublocality1}`;
            let sublocality = `${sublocality1},${sublocality2},${sublocality3}`;
            const updatedData = {
                ...data,
                address_line_1: place.name,
                latitude: lat,
                longitude: lng,
                state: state,
                city: city,
                pincode: pincode,
                // street_address_2: street1,
                street: address,
                sublocality,
            };
            console.log("kjasdhiwioew", updatedData);
            setData(updatedData);
            setMapCenter({ lat, lng });
            setMarkerPosition({ lat, lng });
            formik.setValues({
                ...formik.values,
                address_line_1: address,
                latitude: lat,
                longitude: lng,
                state,
                city,
                pincode,
                street: street1,
                sublocality,
            });
        }
    };


    return (
        <div className={`bg-white p-5 shadow-lg flex mt-6 gap-4`} >
            <div className="w-2/3">
                <div className='flex text-center w-full justify-center'>
                    {messages.error &&
                        Object.entries(messages.error).map(([field, messages]) =>
                            Array.isArray(messages)
                                ? messages.map((msg, idx) => (
                                    <p key={`${field}-${idx}`} className="text-red-500 text-sm">
                                        {msg}
                                    </p>
                                ))
                                : (
                                    <p key={`${field}-0`} className="text-red-500 text-sm">
                                        {messages}
                                    </p>
                                )
                        )}
                    {messages.success && (
                        <p className="text-green-500 text-sm">
                            {messages.success}
                        </p>
                    )}
                </div>
                <h4 className='font-semibold'>Add New Address</h4>


                <div className={`border-none `}>
                    {/* Input Fields */}
                    <div className="flex flex-col w-5/6 mb-4">
                        <label
                            htmlFor="search for address"
                            className="text-sm font-medium text-gray-700"
                        >
                            Search for Address
                        </label>
                        {isLoaded && (
                            <StandaloneSearchBox
                                onLoad={(ref) => (inputref.current = ref)}
                                onPlacesChanged={handleOnPlaceChanged}
                            >
                                <input
                                    id="address_line_1"
                                    name="address_line_1"
                                    value={data?.address_line_1 || ''}
                                    onChange={handleInputChange}
                                    type="text"
                                    placeholder="Enter search for_address"
                                    className={`w-full px-3 py-2 border ${validFields?.search_for_address
                                        ? "border-gray-300"
                                        : "border-red-500"
                                        } rounded-md outline-[#656464]`}
                                />
                            </StandaloneSearchBox>
                        )}
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium">Street Address 1</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                value={formik.values.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='street'
                            />
                            {formik.touched.street && formik.errors.street && (
                                <div className="text-red-500 text-sm">{formik.errors.street}</div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Street Address 2</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                value={formik.values.sublocality}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='sublocality'
                            />
                            {formik.touched.sublocality && formik.errors.sublocality && (
                                <div className="text-red-500 text-sm">{formik.errors.sublocality}</div>
                            )}
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label className="block font-medium">City</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='city'
                            />
                            {formik.touched.city && formik.errors.city && (
                                <div className="text-red-500 text-sm">{formik.errors.city}</div>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Pincode</label>
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                value={formik.values.pincode}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='pincode'
                            />
                            {formik.touched.pincode && formik.errors.pincode && (
                                <div className="text-red-500 text-sm">{formik.errors.pincode}</div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <label className="block font-medium">Address Type</label>
                            <select
                                value={formik.values.address_type}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='address_type'
                                className="border border-gray-300 px-3 py-2 rounded-lg">
                                <option value="Home">Home</option>
                                <option value="Work">Work</option>
                                <option value="Other">other</option>
                            </select>
                            {formik.touched.address_type && formik.errors.address_type && (
                                <div className="text-red-500 text-sm">{formik.errors.address_type}</div>
                            )}
                        </div>
                        <div>
                            <label className="block font-medium">Label</label>
                            <input
                                value={formik.values.label}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                name='label'
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                            />
                            {formik.touched.label && formik.errors.label && (
                                <div className="text-red-500 text-sm">{formik.errors.label}</div>
                            )}
                        </div>
                    </div>
                    <div className='flex gap-4'>
                        <div>
                            <label className="block font-medium">Delivery option</label>
                            <div className="radio-group flex gap-4 mt-3">
                                {['Hand it to me', 'Leave it at the door'].map((option) => (
                                    <label key={option} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                        <input
                                            type="radio"
                                            value={option}
                                            checked={formik.values.delivery_option === option}
                                            onChange={(e) => {
                                                formik.setFieldValue('delivery_option', e.target.value);
                                                formik.setFieldTouched('delivery_option', true, true);
                                            }}
                                            style={{
                                                accentColor: 'black',
                                                width: '18px',
                                                height: '18px',
                                                marginRight: '8px',
                                                cursor: 'pointer',
                                            }}
                                            name="delivery_option"
                                        />
                                        {option}
                                    </label>
                                ))}
                            </div>
                            {formik.touched.delivery_option && formik.errors.delivery_option && (
                                <div className="text-red-500 text-sm">{formik.errors.delivery_option}</div>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="block font-medium">Delivery Instruction</label>
                        <input
                            value={formik.values.delivery_instructions}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            name='delivery_instructions'
                            type="text"
                            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                        />
                        {formik.touched.delivery_instructions && formik.errors.delivery_instructions && (
                            <div className="text-red-500 text-sm">{formik.errors.delivery_instructions}</div>
                        )}
                    </div>
                    {/* Buttons */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200" onClick={() => { setAddNewCustomer(false), setSearch('') }}>
                            Cancel
                        </button>
                        <button
                            onClick={formik.handleSubmit}
                            type="button"
                            className="px-8 py-2 text-white bg-black rounded-lg hover:bg-blue-600">
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-1/3">
                {
                    AddNewAddress && (
                        <div onClick={() => setAddNewAddress(false)} className="flex justify-end">
                            <h4>&#10006;</h4>
                        </div>
                    )
                }
                <h4 className="font-medium text-md mb-4">{AddNewAddress ? "Pin Customer location" : "Customer Location"}</h4>
                <div className="h-80">
                    {isLoaded && (
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={mapCenter}
                            zoom={14}
                        >
                            <Marker position={markerPosition} />
                        </GoogleMap>
                    )}
                </div>
            </div>
        </div>
    );
}
