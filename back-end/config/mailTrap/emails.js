import {
    PASSWORD_RESET_REQUEST_TEMPLATE,
    PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE
} from "./emailTemplates.js";
import {mailTrapClient, sender} from "./mailtrap.js";
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
    const recipient = [{email: email}];
        const response=await mailTrapClient .send({
            from: sender,
            to: recipient,
            template_uuid: process.env.TEMPLATE_UUID,
            template_variables: {
                "company_info_name": "Hello World ",
                "name": name,
            }
        }).then(_=>console.log(response))
}
// Rest Email Sender Function
export const sendPasswordRestEmail=async (email,resetUrl)=>{
    const recipient = [{email: email}];
    const response =await mailTrapClient.send({
        from:sender,
        to:recipient,
        subject:"Rest Your Email",
        html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",resetUrl),
        category:"Password Reset"
    })

}
//
export const sendPasswordRestSuccessEmail=async  (email)=>{
    const recipient = [{email: email}];
    const response =await mailTrapClient.send({
        from:sender,
        to:recipient,
        subject:"Your Email Has ben Reset Successfully",
        html:PASSWORD_RESET_SUCCESS_TEMPLATE,
        category:"Password Reset Successfully"
    })
}