import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Personal Portfolio API",
      version: "1.0.0",
      description:
        "A RESTful API that collects and manages data for my personal portfolio website.",
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1",
        description: "Development server",
      },
      {
        url: "https://your-render-url.onrender.com/api/v1",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Contact: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64b7f2c9e4b0a12345678901" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            message: { type: "string", example: "I'd love to work with you!" },
            ip: { type: "string", example: "192.168.1.1" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Error: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            msg: { type: "string", example: "Error message" },
          },
        },
      },
      UserResponse: {
        type: "object",
        properties: {
          user: {
            type: "object",
            properties: {
              name: { type: "string", example: "tshepo" },
            },
          },
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
