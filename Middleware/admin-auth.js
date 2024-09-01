export const adminAuthentication = (req,res,next) =>{
    try {
        const adminRole = req.user.isAdmin
        if(!adminRole) return res.json({message:"Access Denied"})
            next();
    } catch (error) {
        next();
    } 
}
