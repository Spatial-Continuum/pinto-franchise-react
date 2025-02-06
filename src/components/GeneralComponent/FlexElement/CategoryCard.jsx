import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react'; 
import { UpdateContext } from '../../MainComponent/Menu/ManageScreen/Cuisine';
import { 
    Menu as MenuIcon,
    PlusCircle,
    PenSquare
  } from 'lucide-react'; 
const CategoryCard = ({ image, title,style,imagestyle,bottomtitle,textonimage,AdditonalText="", editImage="",editName="", isAdd = false ,add=false ,categories=[],onEdit='',setSub=''}) => {  
  console.log("asdfeews",categories) 
  const  setUpdateOne  = useContext(UpdateContext);
      console.log("UpdateContext1111:", setUpdateOne);
    const navigate = useNavigate();
      if (isAdd) {
        return (
          <div className={`flex flex-col items-center justify-center p-4 border border ${style? style:"w-40 h-40 hover:border-orange-500"} border-gray-300 rounded-lg cursor-pointer bg-white`}  onClick={()=>onEdit? onEdit() : ''}>
            
            { add?
           
              <PlusCircle className="w-6 h-6 text-orange-500 mb-2 block ml-2" />   
              :
              <img src={editImage} className={`${imagestyle?imagestyle : ""}`}   />  
            }  
            { AdditonalText?  
           AdditonalText
            :
            <span className="text-sm block text-center">{editName?editName:"Add New"}</span> 
            }     
           
          </div>
        );
      }
    
      return ( 
           <div onClick={()=>{setSub?setSub() : ''}}>
                <div className={`relative grid justify-items-center items-center border border-gray-200 bg-white ${style?  style:"w-40 h-40 p-4"} rounded-lg cursor-pointer hover:bg-gray-50 group`}>
                  { onEdit&&
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <PenSquare className="w-4 h-4 text-gray-400 hover:text-gray-600" onClick={()=>{onEdit? onEdit() : ''}} />
          </div> }
          {/* <div className={`${textonimage? "relative":''}`}> */}
          <img src={image} alt={title} className={` ${imagestyle? imagestyle : ''}`} /> 
          {textonimage? textonimage: ''}
          {/* </div> */}
          
          {AdditonalText?AdditonalText : title&&
               
           <div className = "text-center mt-4 text-sm">{title}</div>
          }
          
        </div> 
        {bottomtitle&&
           <span className="text-sm block text-center">{bottomtitle}</span>
          }
           </div>
          
      );
    };  
    export default CategoryCard;