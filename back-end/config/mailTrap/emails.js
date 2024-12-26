import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";
import {mailTrapClient, sender} from "./mailtrap.js";
import customErrors from "../../errors/CustomErrors.js";

export const sendVerificationEmail=async (email, verificationToken)=>{
const recipient=[{email}]
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })

}
export const welcomeEmail=async (email,name)=>{
    const recipients = [
        {
            email: email,
        }
    ];
    try{
        const response=await mailTrapClient .send({
            from: sender,
            to: recipients,
            template_uuid: process.env.TEMPLATE_UUID,
            template_variables: {
                "company_info_name": "Hello World ",
                "name": name,
            }
        }).then(console.log, console.error);
    }catch (err){
        console.log(err)
        throw new customErrors("Welcome Email Not Sent")
    }

}