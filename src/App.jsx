import { useState, useEffect } from "react";
import "./App.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { gapi } from "gapi-script";

function App() {
  const clientId = import.meta.env.VITE_ClientId;
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const initClient = () => {
      gapi.client
        .init({
          clientId: clientId,
          scope: "email profile",
        })
        .then(() => {
          console.log("Google API client initialized successfully");
        })
        .catch((error) => {
          console.error("Error initializing Google API client: ", error);
        });
    };
    gapi.load("client:auth2", initClient);
  }, [clientId]);

  const onSuccess = (res) => {
    setProfile(res.profileObj);
    console.log("Success:", res);
  };

  const onFailure = (res) => {
    console.log("Failure:", res);
  };

  const logout = () => {
    setProfile(null);
  };

  return (
    <section>
      <h3>React Google Login</h3>
      <br /> <br />
      {profile ? (
        <div>
          <img src={profile.imageUrl} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <br />
          <br />
          <GoogleLogout
            clientId={clientId}
            buttonText="Log out"
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          isSignedIn={true}
        />
      )}
    </section>
  );
}

export default App;
