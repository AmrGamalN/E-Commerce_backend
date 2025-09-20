export const handleError = async(func) => {
    return async (req, res, next) => {
        try {
            await func(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}
export const errormiddleware = (err, req, res, next) => {
    return res.status(err.statusCode ||500).json({    
     statusCode: err.statusCode || 500,
     message : err.message || "Internal Server Error",
     stack:process.env.NODE_ENV === 'production' ? null: err.stack 
})
}