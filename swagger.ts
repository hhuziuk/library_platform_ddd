import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";

const options = {
    swaggerDefinition: {
        info: {
            title: "Book-collection backend application(with a Domain-driven design approach)",
            version: "1.0.0",
        },
        basePath: "/api",
    },
    apis: ["./infrastructure/controllers/BookController.ts",
        "./infrastructure/controllers/PublisherController.ts",
        "./infrastructure/controllers/TypeController.ts",
        "./infrastructure/controllers/UserController.ts"
    ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
}
