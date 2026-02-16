import { useAuth0 } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom";

const Home = () => {
  const {isAuthenticated, loginWithRedirect} = useAuth0();
  const navigate = useNavigate();

  const handleLaunchDashboard = () => {
    if (!isAuthenticated) {
      loginWithRedirect();
    } else {
      navigate("/dashboard");
    }
  };

    return (
        <div>
          <div className="hero bg-linear-to-t from-blue-100 to-white min-h-screen">
            <div className="hero-content text-center">
              <div className="max-w-2xl">
                <div className="badge badge-lg badge-soft badge-primary font-semibold mb-5">Real-time Weather Analytics</div>
                <h1 className="text-5xl font-semibold mb-2">Discover the World's Most</h1>
                <h1 className="text-5xl font-bold bg-linear-to-r from-[#422ad5] to-cyan-600 bg-clip-text text-transparent">Comfortable Cities</h1>
                <p className="py-6 text-md text-gray-600">
                  Make smarter decisions with our advanced weather analytics platform. 
                  We combine temperature, humidity, and wind data to rank cities by livability and comfort.
                </p>
                <button className="btn btn-primary" onClick={handleLaunchDashboard}>
                  {isAuthenticated ? "Launch Dashboard" : "Log in"}
                </button>
              </div>
            </div>
          </div>
      </div>
    )
}

export default Home