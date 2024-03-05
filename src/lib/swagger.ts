import { createSwaggerSpec } from "next-swagger-doc";

import "server-only";

const PUBLIC_URL = process.env.PUBLIC_URL || "http://localhost:3000";
export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    apiFolder: "src/app/api",
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      servers: [
        {
          url: process.env.PUBLIC_URL || "http://localhost:3000",
        },
      ],
      components: {
        schemas: {},
      },
    },
  });
  return spec;
};
