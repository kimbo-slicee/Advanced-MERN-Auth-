import {VERIFICATION_EMAIL_TEMPLATE} from "./emailTemplates.js";
import {mailTrapClient,sender} from "./mailtrap.js";
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
    const recipient=[{email}]
    const response=await mailTrapClient .send({
        from: sender,
        to: recipient,
        template_uuid: process.env.TEMPLATE_UUID,
        template_variables: {
            "company_info_name": "Hello World ",
            "name": name,
            "company_info_address": "Test_Company_info_address",
            "company_info_city": "Test_Company_info_city",
            "company_info_zip_code": "Test_Company_info_zip_code",
            "company_info_country": "Test_Company_info_country"
        }
    }).then(console.log, console.error);
}