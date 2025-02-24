import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Squares2X2Icon,
  DocumentTextIcon,
  BuildingStorefrontIcon,
  LifebuoyIcon,
  FireIcon,
  ChartBarSquareIcon,
  ChartBarIcon,
  SpeakerWaveIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Logo from "../../../assets/images/logo.png"
const SideBar = ({isExpanded,setIsExpanded}) => {

  const [openMenus, setOpenMenus] = useState({
    orders: false,
    merchant: false,
    delivery: false,
    menu: false
  });
  const location = useLocation();

  const toggleMenu = (menuName) => {
    setOpenMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const MenuItem = ({ icon: Icon, text, to, submenu, menuKey }) => {
    const hasSubmenu = submenu && submenu.length > 0;
    // console.log("giuygfffgjhgh",submenu)
    return (


      <div className={`relative text-sm ${text=="Dashboard"? '' : "mb-4"}`}>
        <div 
          className={`flex items-center justify-between cursor-pointer hover:bg-[#2B2954] rounded-lg p-2 ${
            location.pathname === to ? 'bg-[#2B2954]' : ''
          }`}
          onClick={() => hasSubmenu ? toggleMenu(menuKey) : null}
        >
          <div className="flex items-center min-w-0">
            <Icon className="h-5 w-5 min-w-[20px]" />
            {isExpanded && (
              <span className="ml-3 truncate">
                {to ? <Link to={to}>{text}</Link> : text}
              </span>
            )}
          </div> 
          {hasSubmenu && openMenus[menuKey] && !isExpanded && (
        <div className="absolute left-full top-0 bg-[#ffffff] w-40 rounded-lg shadow-lg z-50 ml-4">
          <ul className="py-2">
            {submenu.map((item, index) => (
              <li 
                key={index}
                className="text-black hover:text-white cursor-pointer"
              >
                {item.to ? (
                  <Link to={item.to} className="block w-full px-4 py-2 hover:bg-orange-500 rounded-lg">
                    {item.text}
                  </Link>
                ) : (
                  <span className="block w-full px-4 py-2 hover:bg-orange-500 rounded-lg">
                    {item.text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
          {hasSubmenu && isExpanded && (
            <ChevronDownIcon 
              className={`h-4 w-4 transform transition-transform duration-200  
                // ${openMenus[menuKey] ? 'rotate-180' : ''}
                `} 
            />
          )}
        </div>
        {hasSubmenu && isExpanded && openMenus[menuKey] && (
          <ul className={`${
            isExpanded 
              ? openMenus[menuKey] ? "ml-8 mt-2 space-y-2" : "ml-8 mt-2 space-y-2"
              : "absolute left-full top-0 bg-[#373656] w-48 py-2 invisible group-hover:visible"
          }`}>
            {submenu.map((item, index) => (
              <li 
                key={index}
                className="text-gray-300 hover:text-white cursor-pointer hover:bg-[#FF6B00] rounded-lg px-2 py-1"
              >
                {item.to ? (
                  <Link to={item.to}>{item.text}</Link>
                ) : item.text}
              </li>
            ))}
          </ul>
        )} 
          
      
      </div>
    );
  };

  const menuItems = [
    { 
      icon: Squares2X2Icon, 
      text: "Dashboard", 
      to: "/",
      menuKey: "dashboard"
    },
    {
      icon: DocumentTextIcon,
      text: "Orders",
      menuKey: "orders",
      submenu: [
        { text: "Manage order", to: "/orders/manage-orders" },
        { text: "Phone orders", to: "/orders/phone-orders" },

        { text: "Order history", to:"/orders/order-history" }

      ]
    },
    {
      icon: BuildingStorefrontIcon,
      text: "Merchant",
      menuKey: "merchant",
      submenu: [
        // { text: "Delivery partner" },
        // { text: "Menu" },
        {text:"Manage Merchant", to: "/merchant/managemerchant"},
        {text: "Onboarding", to: "/merchant/onboarding" },
        

      ]
    },
    {
      icon: MapIcon,
      text: "Delivery partner",
      menuKey: "delivery",
      submenu: [

        // { text: "Salaried" ,to: '/deliverypartner/salaried'},
        // { text: "Delivery based" ,to:'/deliverypartner/deliverybased' },
        {text:"Manage Partners", to:'/deliverypartner/manage-partners'},
        { text: "Onboarding" ,to:'/deliverypartner/onboarding'}

      ]
    },
    { 
      icon: FireIcon, 
      text: "Menu",
      menuKey: "menu",
      submenu: [
        { text: "Home Screen", to: "/menu/manage-screen" },

        // { text: "Explore Screen" },
        { text: "Quick Search", to:'/menu/quick-search'},
        {text:"Restaurant Item",to:"/menu/restaurant-item"},
      ]
    },
    { 
      icon: ChartBarSquareIcon, 
      text: "Analytics & Report",
      menuKey: "analytics"
    },
    { 
      icon: SpeakerWaveIcon, 
      text: "Marketing",

      menuKey: "marketing",
      to: "/marketing"
    },
    { 
      icon: ChartBarIcon, 
      text: "Finance",
      menuKey: "finance"
    },
    { 
      icon: UserGroupIcon, 
      text: "Staffs",
      menuKey: "staffs"
    },
    { 
      icon: ChatBubbleLeftRightIcon, 
      text: "Chat & Support",
      menuKey: "chat"
    }
];

  return (
    <div 
      className={` p-4  bg-[#373656] min-h-screen text-white transition-all duration-300`}
    >
      <div 
        className="mb-6 ml-1 flex items-center cursor-pointer" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <img 
          src={Logo} 
          alt="Pinto Logo" 
          className="h-8 w-8" 
        />
        {isExpanded && (
          <h1 className="ml-5 font-bold text-lg uppercase font-serif tracking-[0.5em]">
            PINTO
          </h1>
        )}
      </div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <MenuItem key={index} {...item} />
        ))}
      </nav>

      <div className="absolute bottom-2">
        <MenuItem 
          icon={LifebuoyIcon} 
          text="Help Center" 
        />
      </div>
    </div>
  );
};

export default SideBar;