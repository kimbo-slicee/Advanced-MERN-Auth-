export const formatDate=(dateString)=>{
const date=new Date(dateString)
    if(isNaN(date.getTime())) return "invalid Date"
    return date.toLocaleDateString("en-US",{
        day:"numeric",
        month:"long",
        year:"numeric",
        hour:"numeric",
        minute:"numeric",
        hour12:true
    })
}
