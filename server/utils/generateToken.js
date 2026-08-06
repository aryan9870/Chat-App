import jwt from "jsonwebtoken";

const generateToken = (id) => {
    return jwt.sign(
        { id },
        "aryan_nandini",
        { expiresIn: "7d" }
    );
};


export default generateToken;