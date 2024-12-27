import React,{useState,useEffect} from "react"
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard";
import Phone from "../../../../../assets/images/Phone.svg"
function PopularDish(){

    return(
        <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
        
          <h2 className="text-lg font-semibold">Popular Dish/You've tried</h2>
          <button className="text-orange-500 text-sm" onClick={()=>{console.log("manage manage home");navigate("/menu/home-screen/show-popular-dish" , { state: { categories } });}} >View all</button>
        </div>
        <div className="flex gap-4 flex-wrap">
          {filters.map((filter) => (  
             <CategoryCard image={"https://s3-alpha-sig.figma.com/img/389e/e771/110fb31952405db41223979d6127af9b?Expires=1733097600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BtZRvVI0NQb~a42adX46-5rwx1z-Xb9VoZvCqVLwgOYL4eVv1ap2k5ytNr713y0ncWrmHa4rw7NQ-M-6A5KHnYbr4QTyik2kELRD-Tga-SwZ~xq-6CUxstHXmSYVPuR-aEpHflRXQ~mrRZkrXzCo8b9pbseRa9dus9ueIBouLLcxshNWAaxTthiJOlAyiWxDP65lChHPF3MP17o1wsU42ueA4U2QRtPqP4-rnm3yalGSgAQa7ovk5wSicYMcPO9mmNvelne~yRjovVjV9lpyQuj3TAy0OVMmWXO49hnljDuV8hYTWuQ2-HY14VDu7ZSUgy8GN-ZsCPmEnytDmFxOdQ__"} style="w-32 h-32 mb-3"
             imagestyle="w-32 h-32 border rounded-lg " bottomtitle={"Food Name"} />

            
          ))}
        <CategoryCard style="w-32 h-32 hover:border-blue-500 " editImage={Phone} editName="Contact Support" isAdd={true} imagestyle="w-30 h-30 mb-2" />
        </div>
      </div> 
    )

}
export default PopularDish;