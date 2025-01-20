import { useNavigate } from 'react-router-dom'; 
import { useContext } from 'react'; 
import { UpdateContext } from '../../MainComponent/Menu/ManageScreen/Cuisine';
import { 
    Star
  } from 'lucide-react'; 
const ReactangleCard = ({ image, title,style,doorNo='',city='',pincode='',address1="",address2="",primaryphone="", secondaryphone = '' ,number_of_ratings=0 ,categories=[],onEdit='',setSub='',key='',props}) => {  
  console.log("In the rectangleCard",props) 
  const  setUpdateOne  = useContext(UpdateContext);
      console.log("UpdateContext1111:", setUpdateOne);
    const navigate = useNavigate();
   
    
      return ( 
      
        <div
        key={key}
        className="flex items-center justify-between bg-white shadow p-4 mb-4 rounded"
      >
        <img
          src={image}
          alt={title}
          className="w-16 h-16 rounded-full"
        />
        <div className="flex-1 ml-4">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-gray-600">{doorNo}{address1}{address2}{city}{pincode}</p> 
          <div className="text-center">
          <p ><span className= "flex item-center bg-green-600 text-white w-10 h-6 block rounded-sm"><Star size={16} color="white" fill="white" />{number_of_ratings}</span><span></span></p>
          
        </div>
          <p className="text-sm">
            {primaryphone}  {secondaryphone}
          </p> 
          <p className="text-sm">
            Timings:
          </p>
        </div>
       
      </div>
      );
    };  
    export default ReactangleCard;