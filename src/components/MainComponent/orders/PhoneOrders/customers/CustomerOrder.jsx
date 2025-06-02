import React, { useEffect, useRef, useState } from 'react'
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, selectApiError, selectApiLoading, selectSelectedRestaurant } from '../../../../../redux/slices/restaurant';
import { CreateCustomerOrder, CreateNewCustomer, Searchloading, SearchMobileNumber, UpdateCustomerPrimaryAddress } from '../../../../../redux/slices/order';
import {
    GoogleMap,
    Marker,
    useJsApiLoader,
    StandaloneSearchBox,
} from "@react-google-maps/api";
import { useFormik } from 'formik';
import * as Yup from 'yup';
const CustomerOrder = () => {
    
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
    const mapContainerStyle = { width: "100%", height: "100%" };
    const defaultCenter = { lat: 11.017363, lng: 76.958885 };
    const [mapCenter, setMapCenter] = useState(defaultCenter);
    const [markerPosition, setMarkerPosition] = useState(defaultCenter);
    const [messages, setMessages] = useState({
        error: '',
        success: ''
    })

    const initialValues = {
        username: '',
        phone: '',
        email: '',
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
        role: "customer",
    };

    const getValidationSchema = (AddNewAddress) => Yup.object().shape({
        username: AddNewAddress ? Yup.string() : Yup.string().required('Required'),
        phone: AddNewAddress ? Yup.string() : Yup.string().required('Required'),
        email: AddNewAddress ? Yup.string() : Yup.string().email('Invalid email').required('Required'),
        address_line_1: Yup.string().required('Required'),
        street: Yup.string().required('Required'),
        sublocality: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string().required('Required'),
        delivery_option: Yup.string().required("Required"),
        label: Yup.string().required('Required'),
        address_type: Yup.string().required('Required'),
        delivery_instructions: Yup.string().required('Required'),
    });



    const formik = useFormik({
        initialValues,
        validationSchema: getValidationSchema(AddNewAddress),
        onSubmit: async (values) => {
            let response;
            if (!AddNewAddress) {
                console.log("custom:", values);
                // response = await dispatch(CreateNewCustomer(values))
            } else {
                    
                const { username, email, phone, role, ...addressOnly } = values;
                 console.log("AddNewAddress:", addressOnly);
                // response = await dispatch(CreateNewAddress({ id, addressOnly }))
            }
            if (response.payload?.data) {
                setMessages({
                    error: '',
                    success: response.payload.data.message,
                });
                formik.resetForm();
            } else {
                setMessages({
                    error: response.payload,
                    success: '',
                });
            }
            setTimeout(() => {
                setMessages({ error: '', success: '' })
            }, 2000)
        },
    });


    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyANMc42fXDaBF3bYBdHQFbWsquKht3arak",
        libraries: ["places"],
    });
    const handleOnPlaceChanged = () => {
        const places = inputref.current.getPlaces();

        if (places.length === 0) return;

        const place = places[0];
        const address = place.formatted_address;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        let state = "";
        let city = "";
        let pincode = "";
        let street = "";
        let street_address_2 = "";
        let sublocality = [];

        place.address_components.forEach((component) => {
            const types = component.types;

            if (types.includes("administrative_area_level_1")) state = component.short_name;
            if (types.includes("locality")) city = component.long_name;
            if (types.includes("postal_code")) pincode = component.long_name;
            if (types.includes("route")) street = component.long_name;
            if (types.includes("sublocality_level_1") || types.includes("sublocality") || types.includes("neighborhood")) {
                sublocality.push(component.long_name);
            }
        });

        street_address_2 = sublocality.join(', ');

        const updatedValues = {
            ...formik.values,
            address_line_1: address,
            street,
            city,
            state,
            pincode,
            latitude: lat,
            longitude: lng,
            sublocality: street_address_2, // Optional if needed
        };

        formik.setValues(updatedValues);
        setMapCenter({ lat, lng });
        setMarkerPosition({ lat, lng });
    };

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantById(id))
        }
    }, [id, dispatch]
    )

        const fetchSubCategories = async () => {
            if (search.trim() === '') {
                setSearch('');
                return;
            }
            try {
                const data = await dispatch(SearchMobileNumber(search));
                if (data?.payload?.status === 200) {
                    setLocation(data?.payload?.data)
                } else {
                    setLocation([]);
                }
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            }
        }


    console.log("Location", Location);

    useEffect(() => {
        if (Location?.addresses?.length) {
            const primary = Location.addresses.find(addr => addr.is_primary);
            if (primary) {
                setSelectedOption(primary.address_id);
            }
        }
    }, [Location?.addresses]);

    const AddressChange = async (e) => {
        setSelectedOption(e.target.value);
        await dispatch(UpdateCustomerPrimaryAddress({
            phone: search, values: {
                "address_id": e.target.value
            }
        }))
            .unwrap()
            .then(() => {
                dispatch(SearchMobileNumber(search))
            })

    }

    console.log("Location",Location);
    
    return (

        <div className="w-full p-4">
            <h4 className="font-bold text-lg mb-4">Customer order</h4>
            {loading && (
                <div className="text-center">
                    <p>Loading...</p>
                </div>
            )}

       
            {!loading && restaurantDetails && (
                <>
                    {
                        AddNewCustomerModal || AddNewAddress ? (
                            <div className={`${AddNewAddress} ? bg-white p-5 shadow-lg flex mt-6 gap-4 : flex mt-6 gap-4`} >
                                {/* Left Column */}

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
                                    {
                                        AddNewAddress && (<h4 className='font-semibold'>Add New Address</h4>)
                                    }
                                    {
                                        !AddNewAddress ? (
                                            <div className={`${AddNewAddress} ? border-none :border rounded-lg p-4 space-y-4`}>
                                                {/* Input Fields */}
                                                <div className="flex gap-4">
                                                    <div className='w-1/2 '>
                                                        <label className="block font-medium">Customer Name</label>
                                                        <input
                                                            type="text"
                                                            className="w-full  border border-gray-300 rounded-lg px-3 py-2  outline-[#656464]"
                                                            name='username'
                                                            value={formik.values.username}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        {formik.touched.username && formik.errors.username && (
                                                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                                        )}
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block font-medium">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                                            value={formik.values.phone}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name='phone'
                                                        />
                                                        {formik.touched.phone && formik.errors.phone && (
                                                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                                                        )}
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block font-medium">Email</label>
                                                        <input
                                                            type="email"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name='email'

                                                        />
                                                        {formik.touched.email && formik.errors.email && (
                                                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                                        )}
                                                    </div>
                                                </div>
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
                                                                value={formik.values.address_line_1}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                placeholder="Search for Address"
                                                                className={`w-full px-3 py-2 border ${formik.touched.address_line_1 && formik.errors.address_line_1
                                                                    ? "border-red-500"
                                                                    : "border-gray-300"
                                                                    } rounded-md outline-[#656464]`}
                                                            />
                                                        </StandaloneSearchBox>
                                                    )}
                                                    {formik.touched.address_line_1 && formik.errors.address_line_1 && (
                                                        <p className="text-red-500 text-sm">{formik.errors.address_line_1}</p>
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
                                                    <button type='button' className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200" onClick={() => { formik.resetForm(); setAddNewCustomer(false); setAddNewAddress(false); setSearch(''); setLocation([]); }}>
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
                                        )
                                            :
                                            (

                                                <div className={`${AddNewAddress} ? border-none :border rounded-lg p-4 space-y-4`}>
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
                                                                    value={formik.values.address_line_1}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    placeholder="Search for Address"
                                                                    className={`w-full px-3 py-2 border ${formik.touched.address_line_1 && formik.errors.address_line_1
                                                                        ? "border-red-500"
                                                                        : "border-gray-300"
                                                                        } rounded-md outline-[#656464]`}
                                                                />
                                                            </StandaloneSearchBox>
                                                        )}
                                                        {formik.touched.address_line_1 && formik.errors.address_line_1 && (
                                                            <p className="text-red-500 text-sm">{formik.errors.address_line_1}</p>
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
                                                        <button type='button' className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200" onClick={() => { formik.resetForm(); setAddNewCustomer(false); setAddNewAddress(false); setSearch(''); setLocation([]); }}>
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
                                            )

                                    }
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

                        )
                            :
                            (
                                <div className="border border-[#D4D4D4] rounded-lg p-4 shadow-sm w-10/12">
                                    <div>
                                        <label className="block font-regular text-black">Mobile Number</label>
                                        <div className='flex gap-4 mt-2 items-center'>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="w-[250px] px-2 py-2 text-gray-700 bg-white focus:outline-none border-[#656464] border-[1px] rounded-lg"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    value={search}
                                                />
                                            </div>
                                            <div>
                                                <button onClick={()=>{fetchSubCategories()}} className='bg-black text-white rounded-lg px-6 py-2'>Search</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <>
                                            {
                                                Searchloadings ? (
                                                    <div className="text-center">
                                                        <p>Loading...</p>
                                                    </div>
                                                ) : search && Location?.addresses?.length > 0 ? (
                                                    <div className="flex justify-start flex-col mt-4 h-full">
                                                        <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                            <span>
                                                                <h2 className="font-bold text-lg text-[#00840D]">Customer Found</h2>
                                                            </span>
                                                            <span className="text-sm text-black flex">
                                                                <p className='w-32'>Phone Number</p> <p>: {" "} {Location.phone}</p>
                                                            </span>
                                                            <span className="text-sm text-black flex"> <p className='w-32'>Customer Name</p> <p>: {" "} {Location.username}</p></span>
                                                            <span className="text-sm text-black flex"><p className='w-32'>Email</p> <p>: {" "} {Location.email}</p></span>
                                                        </div>
                                                        <div className='mt-4 flex flex-col'>
                                                            <div className='text-[#008BFF] text-md flex gap-2 justify-end'>
                                                                &#x2295;  <h4 className='font-semibold' onClick={() => { setAddNewAddress(true) }}>New Address</h4>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-wrap gap-2 mt-4'>
                                                            {
                                                                Location?.addresses?.map((item) => (
                                                                    <div key={item.address_id} className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                                        <div className="radio-item">
                                                                            <input
                                                                                type="radio"
                                                                                id={`radio-${item.address_id}`} // unique ID
                                                                                name="ritem" // same name for all radio inputs in the group
                                                                                value={item.address_id}
                                                                                checked={selectedOption === item.address_id} // properly checked
                                                                                onChange={(e) => {
                                                                                    AddressChange(e);
                                                                                }} // handle change
                                                                            />
                                                                            <label htmlFor={`radio-${item.address_id}`}>{item.label ? item.label : "No Label"}</label>
                                                                        </div>
                                                                        <h4 className='font-semibold'>{item?.address_type}</h4>
                                                                        <div>
                                                                            <p>{item?.address_line_1}, {" "} {item?.street},{" "}{item?.sublocality}, {" "}{item?.city}, {" "} {item?.state}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                )   
                                                    :
                                                   search == '' && Location?.addresses?.length == 0 ? (
                                                        <div className="flex justify-start flex-col mt-4">
                                                            <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                                <h2 className="font-bold text-lg text-[#FF0000]">No Customer Found</h2>
                                                                <span className="text-sm text-black flex">
                                                                    <p className='w-32'>Phone Number</p> <p>: {" "} {search}</p>
                                                                </span>
                                                                <button className='bg-[#008B0E] text-white rounded-lg px-6 py-2 mt-4 w-1/2' onClick={() => { setAddNewCustomer(true) }}>Add Customer</button>
                                                            </div>
                                                        </div>

                                                    )
                                                        :
                                                        null
                                            }
                                        </>
                                    </div>

                                    {
                                        Location?.addresses?.length > 0 && (
                                            <button
                                                onClick={() => { navigate(`/orders/new-orders/${Location?.user_id}`) }}
                                                type="button"
                                                className="px-8 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-600">
                                                Next
                                            </button>
                                        )
                                    }
                                </div>
                            )
                    }
                </>
            )}
            {/* {!loading && restaurantDetails && (
                <>

                    {
                        AddNewCustomerModal || AddNewAddress ? (
                            <div className={`${AddNewAddress} ? bg-white p-5 shadow-lg flex mt-6 gap-4 : flex mt-6 gap-4`} >
                                <div className="w-2/3">
                                    {
                                        AddNewAddress && (<h4 className='font-semibold'>Add New Address</h4>)
                                    }
                                    <div className={`${AddNewAddress} ? border-none :border rounded-lg p-4 space-y-4`}>
                                        <p>custome order</p>
                                        {
                                            !AddNewAddress && (
                                                <div className="flex gap-4">
                                                    <div className='w-1/2 '>
                                                        <label className="block font-medium">Customer Name</label>
                                                        <input
                                                            type="text"
                                                            className="w-full  border border-gray-300 rounded-lg px-3 py-2  outline-[#656464]"
                                                            name='username'
                                                            value={formik.values.username}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                        />
                                                        {formik.touched.username && formik.errors.username && (
                                                            <div className="text-red-500 text-sm">{formik.errors.username}</div>
                                                        )}
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block font-medium">Phone Number</label>
                                                        <input
                                                            type="text"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                                            value={formik.values.phone}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name='phone'
                                                        />
                                                        {formik.touched.phone && formik.errors.phone && (
                                                            <div className="text-red-500 text-sm">{formik.errors.phone}</div>
                                                        )}
                                                    </div>
                                                    <div className="w-1/2">
                                                        <label className="block font-medium">Email</label>
                                                        <input
                                                            type="email"
                                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                                            value={formik.values.email}
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            name='email'

                                                        />
                                                        {formik.touched.email && formik.errors.email && (
                                                            <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        }
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
                                                        id="search_for_address"
                                                        name="search_for_address"
                                                        value={data?.search_for_address || ''}
                                                        onChange={handleInputChange}
                                                        type="text"
                                                        placeholder="Enter search_for_address"
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
                                                    value={formik.values.address_line_1}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name='address_line_1'
                                                />
                                                {formik.touched.address_line_1 && formik.errors.address_line_1 && (
                                                    <div className="text-red-500 text-sm">{formik.errors.address_line_1}</div>
                                                )}
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block font-medium">Street Address 2</label>
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
                                                    value={formik.values.lable}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    name='lable'
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-[#656464]"
                                                />
                                                {formik.touched.lable && formik.errors.lable && (
                                                    <div className="text-red-500 text-sm">{formik.errors.lable}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='flex gap-4'>
                                            <div>
                                                <label className="block font-medium">Delivery option</label>
                                                <div className="radio-group flex gap-4 mt-3">
                                                    {[

                                                        {
                                                            id: 200,
                                                            label: 'Hand it to me',
                                                            value: 'IN_HAND'
                                                        },
                                                        {
                                                            id: 300,
                                                            label: 'Leave it at the door',
                                                            value: 'LEAVE_AT_DOOR'
                                                        }
                                                    ]?.map((option) => (
                                                        <label key={option.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                                            <input
                                                                type="radio"
                                                                value={option.value}
                                                                checked={formik.values.delivery_option === option.value}
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
                                                            {option.label}
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
                                        <div className="flex justify-center gap-4 mt-4">
                                            <button className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200" onClick={() => setAddNewCustomer(false)}>
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

                        )
                            :
                            (
                                <div className="border border-[#D4D4D4] rounded-lg p-4 shadow-sm w-10/12">
                                    <div>
                                        <label className="block font-regular text-black">Mobile Number</label>
                                        <div className='flex gap-4 mt-2 items-center'>
                                            <div>
                                                <input
                                                    type="text"
                                                    className="w-[250px] px-2 py-2 text-gray-700 bg-white focus:outline-none border-[#656464] border-[1px] rounded-lg"
                                                    onChange={(e) => setSearch(e.target.value)}
                                                    value={search}
                                                />
                                            </div>
                                            <div>
                                                <button className='bg-black text-white rounded-lg px-6 py-2'>Search</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <>
                                            {
                                                Searchloadings ? (
                                                    <div className="text-center">
                                                        <p>Loading...</p>
                                                    </div>
                                                ) : search && Location?.addresses?.length > 0 ? (
                                                    <div className="flex justify-start flex-col mt-4 h-full">
                                                        <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                            <span>
                                                                <h2 className="font-bold text-lg text-[#00840D]">Customer Found</h2>
                                                            </span>
                                                            <span className="text-sm text-black flex">
                                                                <p className='w-32'>Phone Number</p> <p>: {" "} {Location.phone}</p>
                                                            </span>
                                                            <span className="text-sm text-black flex"> <p className='w-32'>Customer Name</p> <p>: {" "} {Location.username}</p></span>
                                                            <span className="text-sm text-black flex"><p className='w-32'>Email</p> <p>: {" "} {Location.email}</p></span>
                                                        </div>
                                                        <div className='mt-4 flex flex-col'>
                                                            <div className='text-[#008BFF] text-md flex gap-2 justify-end'>
                                                                &#x2295;  <h4 className='font-semibold' onClick={() => { setAddNewAddress(true) }}>New Address</h4>
                                                            </div>
                                                        </div>
                                                        <div className='flex flex-wrap gap-2 mt-4'>
                                                            {
                                                                Location?.addresses?.map((item) => (
                                                                    <div key={item.address_id} className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                                        <div className="radio-item">
                                                                            <input
                                                                                type="radio"
                                                                                id={`radio-${item.address_id}`} // unique ID
                                                                                name="ritem" // same name for all radio inputs in the group
                                                                                value={item.address_id}
                                                                                checked={selectedOption === item.address_id}
                                                                                onChange={(e) => {
                                                                                    AddressChange(e);
                                                                                }}
                                                                            />
                                                                            <label htmlFor={`radio-${item.address_id}`}>{item.label ? item.label : "No Label"}</label>
                                                                        </div>
                                                                        <h4 className='font-semibold'>{item?.address_type}</h4>
                                                                        <div>
                                                                            <p>{item?.address_line_1}, {" "} {item?.street},{" "}{item?.sublocality}, {" "}{item?.city}, {" "} {item?.state}</p>
                                                                        </div>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <div className="flex justify-center gap-4 mt-4">
                                                            <button className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200" onClick={() => { setAddNewCustomer(false), setSearch('') }}>
                                                                Cancel
                                                            </button>
                                                            <button className="px-8 py-2 text-white bg-black rounded-lg hover:bg-blue-600" onClick={() => { navigate('/orders/new-orders') }}>
                                                                Next
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                                    :
                                                    search != '' && Location?.length == 0 ? (
                                                        <div className="flex justify-start flex-col mt-4">
                                                            <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border border-[#D4D4D4] w-96 shadow-lg'>
                                                                <h2 className="font-bold text-lg text-[#FF0000]">No Customer Found</h2>
                                                                <span className="text-sm text-black flex">
                                                                    <p className='w-32'>Phone Number</p> <p>: {" "} {search}</p>
                                                                </span>
                                                                <button className='bg-[#008B0E] text-white rounded-lg px-6 py-2 mt-4 w-1/2' onClick={() => { setAddNewCustomer(true) }}>Add Customer</button>
                                                            </div>
                                                        </div>

                                                    )
                                                        :
                                                        null
                                            }
                                        </>
                                    </div>


                                </div>
                            )
                    }
                </>
            )} */}
        </div>

    )
}

export default CustomerOrder