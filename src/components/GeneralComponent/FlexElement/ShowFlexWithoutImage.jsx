import React, {useState,useEffect} from 'react';

import { 
    Menu as MenuIcon,
    PlusCircle,
    PenSquare
  } from 'lucide-react'; 
  

  const ShowFlexWithoutImage = (props) =>{ 
    {  
      console.log("asdfasf5333",props.props)
        return(  
            <> 
            {
        props.isAdd? 
        <button className="flex items-center gap-2 px-8 py-3 border  border border-orange-300 rounded-lg bg-white" onClick={()=>{{props.setSub?props?.props.setSub(props?.
          filter_title) : ''}}} >
        <PlusCircle className="w-4 h-4  text-orange-500" />
        Add New 
      </button>
        
      : 
      
            <div className="relative group" key={props.key?props.key : ''}>
            <button  className="px-8 py-3 bg-white border border-gray-200   rounded-lg hover:bg-gray-50  text-center"  onClick={() => {
    props.setSub ? props.setSub() : ''
  }} >
              {props.title}
            </button>
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">  
                {props.edit?   <PenSquare className="w-4 h-4 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={()=>{props.setSub? props.setSub(props.title) : ''}} /> : 
                ''
    
                }
             
            </div>
          </div>
        

    }
            </>
            

)
  } }
  export default ShowFlexWithoutImage;