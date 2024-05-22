import { Request, Response } from "express";
import { prismaClient } from "../../start/start";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../secret";

export const confirmEmail = async (req: Request, res: Response) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ message: "Invalid token" });
    }

    try {
        const decoded: any = jwt.verify(token as string, JWT_SECRET);
        const email = decoded.email;

        const user = await prismaClient.user.update({
            where: { email },
            data: { emailConfirmed: true },
        });

        res.json({ message: "Email confirmed successfully" });
    } catch (error) {
        return res.status(400).json({ message: "Invalid or expired token" });
    }
};
