import { createContext } from "react";


const stateContext = createContext( {
    currentUser: null,
    token: null
})

export const contextProvider = ({children}) => {
    const[currentUser, setCurrentUser] = useState({});
    const[token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token)

        if(token)
        {
            localStorage.setItem('ACCESS_TOKEN', token)
        }
        else
        {
            localStorage.removeItem('ACCESS_TOKEN');
        }

    } 

}