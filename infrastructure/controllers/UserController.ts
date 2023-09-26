import {Response, Request, NextFunction} from "express";
import UserService from "../services/UserService";
import logger from "../../tools/logger";

class UserController{
    constructor(readonly userService: any = UserService) {}
    /**
     * @swagger
     * tags:
     *   name: Users
     *   description: Operations related to user management
     */

    /**
     * @swagger
     * /api/users/registration:
     *   post:
     *     summary: Register a new user
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               username:
     *                 type: string
     *               password:
     *                 type: string
     *               role:
     *                 type: string
     *     responses:
     *       200:
     *         description: User registered successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async registration(req: Request, res: Response, next: NextFunction){
        try{
            const {email, username, password, role} = req.body
            const userData = await UserService.registration(email, username, password, role)
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : req.session.user = {...userData};
            return res.json(userData)
        } catch(e){
            next(e);
            logger.error(e)
        }
    }
    /**
     * @swagger
     * /api/users/login:
     *   post:
     *     summary: User login
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User logged in successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async login(req: Request, res: Response, next: NextFunction){
        try{
            const {email, password} = req.body
            const userData = await UserService.login(email, password)
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : req.session.user = {...userData};
            logger.info(UserService.cookiesEnabled)
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/users/logout:
     *   post:
     *     summary: User logout
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *     responses:
     *       200:
     *         description: User logged out successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    async logout(req: Request, res: Response, next: NextFunction){
        try{
            const {email} = req.body;
            const userData = UserService.logout(email)
            UserService.cookiesEnabled ? res.clearCookie('userData')
                : await req.session.destroy((err) => {
                if (err) {
                    res.clearCookie('sessioncookie')
                    logger.error(err);
                }
            })
            return res.json(userData)
        } catch(e){
            next(e)
        }
    }
    /**
     * @swagger
     * /api/users/activate/{link}:
     *   get:
     *     summary: Activate a user account
     *     tags: [Users]
     *     parameters:
     *       - in: path
     *         name: link
     *         type: string
     *         required: true
     *         description: The activation link for the user account
     *     responses:
     *       302:
     *         description: User account activated successfully, redirects to a URL
     *       500:
     *         description: Internal server error
     */
    async activate(req: Request, res: Response, next: NextFunction){
        try{
            const activationLink = req.params.link;
            await UserService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL || '')
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/users/refresh:
     *   post:
     *     summary: Refresh user token
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: Token refreshed successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */
    async refresh(req: Request, res: Response, next: NextFunction){
        try{
            const {refreshToken} = req.cookies
            const userData = await UserService.refresh(refreshToken)
            UserService.cookiesEnabled ? res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                : null
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/users:
     *   get:
     *     summary: Get all users
     *     tags: [Users]
     *     responses:
     *       200:
     *         description: List of all users
     *       500:
     *         description: Internal server error
     */
    async getUsers(req: Request, res: Response, next: NextFunction){
        try{
            const users = await UserService.getUsers();
            return res.json(users);
        } catch(e){
            next(e);
        }
    }
    /**
     * @swagger
     * /api/users/delete:
     *   delete:
     *     summary: Delete a user account
     *     tags: [Users]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id:
     *                 type: string
     *     responses:
     *       200:
     *         description: User account deleted successfully
     *       400:
     *         description: Bad request
     *       500:
     *         description: Internal server error
     */

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const {id} = req.body;
            const userData = await UserService.delete(id)
            await req.session.destroy((err) => {
                logger.error(err);
                res.clearCookie('userData');
            });
            return res.json(userData)
        } catch(e){
            next(e);
        }
    }
}

export default new UserController()