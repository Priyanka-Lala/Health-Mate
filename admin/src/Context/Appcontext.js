import { createContext } from "react";

export const Appcontext= createContext()

const AppContextProvider=(props)=>{
const currency='₹'
const calulateage=(DOB)=>{
const today=new Date()
const birthday=new Date(DOB)
let age = today.getFullYear()-birthday.getFullYear()
return age
}

const value={
calulateage,
currency
}



return(
<Appcontext.Provider value={value}>
    {props.children}
</Appcontext.Provider>

)
}

export default AppContextProvider