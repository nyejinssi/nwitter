import {BrowserRouter as Router, Route, Routes, Link, useMatch, useParams, BrowserRouter, Navigate} from'react-router-dom';
import { createRoot } from 'react-dom';
import {authService} from '../fbase';
import React, {useEffect, useState} from 'react';
import Home from '../routes/Home';
import SignIn from '../routes/SignIn';
import SignUp from '../routes/SignUp';
import Profile from '../routes/Profile';
import Navigation from './Navigation';
import Auth from './Auth';

const AppRouter=({isLoggedIn, userObj, refreshUser})=>{     
    return (
        <div>
            <BrowserRouter>
            {!isLoggedIn&&<Auth/>}
            {isLoggedIn && <Navigation userObj={refreshUser}/>}
                <Routes>
                    {isLoggedIn ? (
                        <>  
                            <Route path="/routes/Home/*" element={<Home userObj={userObj}/>}/>
                            <Route path="/routes/Profile/*" element={<Profile refreshUser={refreshUser} userObj={userObj}/>}/>
                            <Route path="/*" element={<Navigate to="/"/>} />
                        </>
                    ):(
                        <>
                            <Route path="/routes/SignIn/*" element={<SignIn/>}/>
                            <Route path="/routes/SignUp/*" element={<SignUp/>}/>
                        </>
                            )}
                </Routes>
            </BrowserRouter>
        </div>
    )
}
export default AppRouter;