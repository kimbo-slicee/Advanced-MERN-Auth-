import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";
import {mailTrapClient,sender} from "./mailtrap.js";
import {response} from "express";
export const sendVerficationEmail=async (email,verficationToken)=>{
const recipient=[{email}]
    try {
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verficationToken),
            category:"Email Verification"
        })
    }catch (error){
        console.log(error)
        console.error(response)
    }
}