import { Button } from "flowbite-react";
import { Link } from "react-router-dom";


const HomePage = () => {
    
    return (
        <div>
            <h2 className="text-center text-3xl mt-20">Welcome to Homepage</h2>
            <div className="flex justify-center">
                <Button className="mt-5 px-4" gradientMonochrome="failure">Log Out</Button>
            </div>
            <div className="flex justify-center">
                <Link to={'/allusers'}><Button className="mt-5 px-4" gradientMonochrome="failure">Show Users</Button></Link>
            </div>
        </div>
    );
};

export default HomePage;