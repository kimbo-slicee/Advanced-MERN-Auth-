const login=async (req,res)=>{
res.status(200).send("<h1>Hello World Login Page</h1>")
}
const signup=async (req,res)=>{
res.status(200).send("<h1>Hello World Login Page</h1>")

}
const logout=async (req,res)=>{
res.status(200).send("<h1>Hello World logout Page</h1>")

}
export {
    login,
    signup,
    logout
}