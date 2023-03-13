import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from './components/AllSpots';
import SingleSpot from './components/SingleSpot';
import CreateASpotForm from './components/CreateASpotForm';
import EditSpotForm from "./components/EditSpotForm";
import User from "./components/User";
import Seaque from './components/Seaque';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
  }, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <AllSpots />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/user">
						<User />
					</Route>
          <Route path='/search/:searchWord'>
            <Seaque />
          </Route>
          <Route path='/spots/create'>
            <CreateASpotForm />
          </Route>
          <Route exact path='/spots/:spotId/edit'>
            <EditSpotForm />
          </Route>
          <Route path='/spots/:spotId'>
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
