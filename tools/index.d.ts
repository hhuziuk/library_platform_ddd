import Session from "express-session";
declare module "express-session" {
    interface Session {
        user: { [key: string]: any};
    }
}
//https://stackoverflow.com/questions/65108033/property-user-does-not-exist-on-type-session-partialsessiondata