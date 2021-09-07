import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

export const  HeaderData =  [ 
    {
        // link represents where it should redirect to
        title: "Add customer details",
        icon:<AccountCircleSharpIcon/>,
        link:"/add"

    },
    {
        title: "Supplier Management ",
        icon:<InsertChartIcon/>,
        link: "/",

    },
    {
        title: "Customer Management",
        icon:<EmojiPeopleIcon/>,
        link: "/all",

    },
    {
        title: "Stock Management",
        icon:<TrendingUpIcon/>,
        link:"/"

    },
    {
        title: "Return Stock Management",
        icon:<LocalShippingIcon/>,
        link:"/"

    },
    {
        title: "Finance Management",
        icon:<SupervisedUserCircleIcon/>,
        link:"/"

    },
    {
        title: "Employee Management",
        icon:<AirplanemodeActiveIcon/>,
        link:"/"

    },
    {
        title: "Delivery Management",
        icon:<ContactMailIcon/>,
        link:"/"

    },
    {
        title: "Branch Details Management",
        icon:<ShoppingCartIcon/>,
        link:"/"

    },




];
