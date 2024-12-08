import { Button } from "@/components/ui/button";
import SquareAd from "@/components/adSense/SquareAds";
import Image from "next/image";

const page = () => {
  return (
   <div>
    <SquareAd 
      adClient="ca-pub-1651955846469249" 
      adSlot="9772612530"
    />
    <Button>
      Hello
    </Button>
    Hello
   </div>
  );
}

export default page