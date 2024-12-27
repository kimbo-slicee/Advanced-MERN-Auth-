import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
} from "./emailTemplates.js";
import {mailTrapClient, sender} from "./mailtrap.js";
// Verification Email
export const sendVerificationEmail=async (email, verificationToken)=>{
const recipient=[{email}]
        const response=await mailTrapClient.send({
            from:sender,
            to:recipient,
            subject:"verify your Email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        }).then(()=>console.log("Email sent successfully!")).catch((err)=>console.log(err))

}
// Welcome Page
export const welcomeEmail=async (email,name)=>{
    const recipient = [{email}];
    try{
        const response=await mailTrapClient .send({
            from: sender,
            to: recipient,
            template_uuid: process.env.TEMPLATE_UUID,
            template_variables: {
                "company_info_name": "Hello World ",
                "name": name,
            }
        })
        console.log("Email sent successfully:");
    }catch (err){
        console.log(err)
    }

}
// Reset Password Email
export const sendPasswordRestEmail=async (email,resetUrl)=>{
    const recipient = [{email}];
    const response =await mailTrapClient.send({
        from:sender,
        to:recipient,
        subject:"Rest Your Email",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
        category:"Password Reset"
    }).then(()=>console.log("Email sent successfully!")).catch((err)=>console.log(err))

}
// Success Mail
export const sendPasswordRestSuccessEmail=async  (email)=>{
    const recipient = [{email}];
    const response =await mailTrapClient.send({
        from:sender,
        to:recipient,
        subject:"Your Email Has ben Reset Successfully",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category:"Password Reset Successfully"
    }).then(()=>console.log("Email sent successfully!")).catch((err)=>console.log(err))
}