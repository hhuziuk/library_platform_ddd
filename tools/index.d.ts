declare module "express-session" {
    interface Session {
        user: { [key: string]: any };
    }
}