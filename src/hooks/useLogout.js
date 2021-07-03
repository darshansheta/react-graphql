import { useState } from 'react';
import useToken from './useToken.js';

export default function useLogout(){
     const {token, setToken} = useToken();
    const [isLogout, logoutUser] = useState(!token);
    //console.log(token, isLogout)
    const setLogout = () => {
        console.log('setLogout')
        setToken(null);
        logoutUser(true)
    }

    return [
        isLogout,
        setLogout
    ];

}