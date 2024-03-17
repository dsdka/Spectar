import React, {useEffect, Fragment} from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './components/Header/Header';
import RoutesApp from './routes/RoutesApp';
import { useDispatch, useSelector } from "react-redux";
import { whoAmI } from "./store/userAction";
import NavBar from './components/NavBar/NavBar';
import classes from './App.module.css';

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state=> state.user.user);

  useEffect(() => {
    if (!user) {
      dispatch(whoAmI(navigate));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
   <Fragment>
    <div className={classes.sticky_top}>
      <Header user={user}/>
      <NavBar user={user} />
    </div>
    <RoutesApp />
   </Fragment>
  )
}

export default App
