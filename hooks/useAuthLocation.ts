import { useLocation } from "react-router-dom";

const useAuthLocation = () => {
    const location = useLocation();

     console.log("AUTH LOCATION:", location);
     console.log("AUTH FROM:", location.state?.from);

  const from = location.state?.from;

    return { from, location };
};

export default useAuthLocation;