import SwaggerParser from "@apidevtools/swagger-parser";
import { openapiDocument } from "../src/docs/openapi.js";

await SwaggerParser.validate(openapiDocument);
console.log("OpenAPI validation passed.");
