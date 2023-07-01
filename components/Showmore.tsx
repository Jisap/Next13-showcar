"use client";

import { ShowMoreProps } from "@/types";
import { updateSearchParams } from "@/utils";
import { useRouter } from "next/navigation";
import CustomButton from "./CustomButton";



const Showmore = ({ pageNumber, isNext }: ShowMoreProps) => {

    const router = useRouter();

    const handleNavigation = () => {
        
        const newLimit = (pageNumber + 1) * 10;                            // Calculate the new limit based on the page number and navigation type

        const newPathname = updateSearchParams("limit", `${newLimit}`);    // Update the "limit" search parameter in the URL with the new value        
        
        router.push(newPathname);
    };


  return (

      <div className="w-full flex-center gap-5 mt-10">
          {isNext && ( 
              <CustomButton
                  btnType="button"
                  title="Show More"
                  containerStyles="bg-primary-blue rounded-full text-white"
                  handleClick={handleNavigation}
              />
          )}
      </div>
  )
}

export default Showmore