/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { data } from "react-router-dom";
import { deleteMostLovedDishes, getMostLovedDishes } from "../../../../redux/slices/dishes";
import { deleteMostLovedRestaurant, getAllMostLovedRestaurant } from "../../../../redux/slices/restaurant";

export function ConfirmationDelete({
    open,
    onHide,
    title,
    value,
    description,
    process,
}) {
    const dispatch = useDispatch();
    console.log("open",value);
    
    const handleSubmit = async () => {
        if (process == "lovedDishes") {
           await dispatch(deleteMostLovedDishes(value));
           dispatch(getMostLovedDishes()).unwrap();
            onHide();
        }
        else if (process == "lovedRestaurant") {
            await dispatch(deleteMostLovedRestaurant(value));
            dispatch(getAllMostLovedRestaurant()).unwrap();
            onHide();  
        }
    };

    return (
        <>
            <Dialog 
            open={open} 
            handler={() => onHide()}
            size={"sm"}
            >
                <DialogHeader>  {title}</DialogHeader>
                <DialogBody className="text-black font-Roboto font-medium text-lg">
                    {description}
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => onHide()}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button variant="gradient" color="green" onClick={handleSubmit}>
                        <span>Confirm</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
