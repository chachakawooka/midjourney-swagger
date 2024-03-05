import { createSwaggerSpec } from "next-swagger-doc";

import "server-only";

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
          url: process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000",
        },
      ],
      components: {
        schemas: {},
      },
    },
  });
  return spec;
};
