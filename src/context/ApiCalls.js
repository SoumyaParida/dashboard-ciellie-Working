import axios from "axios";

export const logout = (dispatch) => {
    try{
        localStorage.removeItem('user');
    }catch(err){
        console.log(err)
    }
}