import { Otp } from "../models/otp.model.js";
export const generateOTP = () => {
    let otp 
    do {
        otp = Math.floor(100000 + Math.random() * 900000).toString();
    } while (!Otp.exists({ otp })); 
    return otp;
}