import { Project } from "ts-morph";
import * as path from "path";
import * as fs from "fs";
import { z } from "zod";

function findMethodsInFile(filePath: string, openApiObject: any) {
  if (!filePath.endsWith("route.ts")) {
    return;
  }

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);
  const classes = sourceFile.getClasses();
  const baseDir = path.resolve(process.cwd(), "src/app/");

  classes.forEach((classDeclaration) => {
    const methods = classDeclaration.getMethods();
    console.log("Creating OpenAPI schema for", classDeclaration.getName());

    methods.forEach((method) => {
      const methodName = method.getName();
      const parameters = method.getParameters();

      let requestBodySchema: any = null;

      parameters.forEach((parameter) => {
        const type = parameter.getType();
        const typeText = type.getText();

        if (
          typeText.startsWith("ParsedRequest") ||
          typeText.startsWith("ParsedRequestWithUser")
        ) {
          const typeArgumentMatch = typeText.match(
            /ParsedRequest(?:WithUser)?<(.+)>/
          );
          if (typeArgumentMatch) {
            const parsedTypeText = typeArgumentMatch[1].trim();

            requestBodySchema = parseInlineTypeToSchema(parsedTypeText);
          }
        }
      });

      const route = `/${filePath
        .replace(baseDir, "")
        .replace("/route.ts", "")
        .replace(/\[/g, ":")
        .replace(/\]/g, "")}`;

      const normalizedRoute = route.replace(/\/{2,}/g, "/");
      const groupName = normalizedRoute.split("/")[2];
      if (!openApiObject.paths[normalizedRoute]) {
        openApiObject.paths[normalizedRoute] = {};
      }
      const httpMethod = methodName.toLowerCase();
      const params = (route.match(/:(\w+)/g) || []).map((param) =>
        param.substring(1)
      );

      if (!openApiObject.paths[route]) {
        openApiObject.paths[route] = {};
      }

      const methodObject: any = {
        description: "TODO: Describe what this endpoint does.",
        responses: {
          200: {
            description: "Successful operation",
          },
        },
      };

      if (params.length > 0) {
        methodObject.parameters = params.map((param) => ({
          name: param,
          in: "path",
          required: true,
          description: "TODO: Describe this parameter",
          schema: {
            type: "string",
          },
        }));
      }

      if (requestBodySchema && httpMethod !== "get") {
        methodObject.requestBody = {
          content: {
            "application/json": {
              schema: requestBodySchema,
            },
          },
        };
      }

      openApiObject.paths[normalizedRoute][httpMethod] = {
        ...methodObject,
        tags: [groupName],
      };
    });
  });
}

function parseInlineTypeToSchema(typeText: string): any {
  const schema: any = { type: "object", properties: {}, required: [] };

  const properties = typeText
    .replace(/[{}]/g, "")
    .split(";")
    .filter(Boolean)
    .map((prop) =>
      prop
        .trim()
        .split(":")
        .map((p) => p.trim())
    );

  properties.forEach(([name, type]) => {
    if (name === "any" || name === "") {
      return;
    }

    if (name.endsWith("?")) {
      name = name.slice(0, -1);
    } else {
      schema.required.push(name);
    }

    schema.properties[name] = { type: mapInlineTypeToOpenApiType(type) };
  });

  if (schema.required.length === 0) {
    delete schema.required;
  }

  return schema;
}

function mapInlineTypeToOpenApiType(type: string): string {
  if (type === "string") return "string";
  if (type === "number") return "number";
  if (type === "boolean") return "boolean";
  return "string";
}

function zodToOpenApiSchema(zodSchema: z.ZodObject<any>) {
  const openApiSchema: any = { type: "object", properties: {}, required: [] };

  const shape = zodSchema._def.shape();
  for (const key in shape) {
    const fieldSchema = shape[key];
    openApiSchema.properties[key] = mapZodTypeToOpenApiType(fieldSchema);
    if (!fieldSchema.isOptional()) {
      openApiSchema.required.push(key);
    }
  }

  return openApiSchema;
}

function mapZodTypeToOpenApiType(zodType: z.ZodType<any, any>): any {
  if (zodType instanceof z.ZodString) return { type: "string" };
  if (zodType instanceof z.ZodNumber) return { type: "number" };
  if (zodType instanceof z.ZodBoolean) return { type: "boolean" };
  if (zodType instanceof z.ZodArray)
    return { type: "array", items: mapZodTypeToOpenApiType(zodType._def.type) };
  if (zodType instanceof z.ZodObject) return zodToOpenApiSchema(zodType);
  return { type: "string" };
}

function findMethodsInFolder(folderPath: string) {
  const project = new Project();
  const sourceFiles = project.addSourceFilesAtPaths(`${folderPath}/**/*.ts`);

  const openApiObject = {
    openapi: "3.0.0",
    info: {
      title: "Rater API - Marcello",
      version: "1.0.0",
    },
    paths: {},
  };

  sourceFiles.forEach((sourceFile) => {
    findMethodsInFile(sourceFile.getFilePath(), openApiObject);
  });

  const outputFilePath = path.resolve(
    "src/app/(frontend)/api-doc/openapi.json"
  );
  fs.writeFileSync(outputFilePath, JSON.stringify(openApiObject, null, 2));

  console.log(`OpenAPI JSON has been saved to ${outputFilePath}`);
}

const folderPath = path.resolve(process.cwd(), "src/app/api");
findMethodsInFolder(folderPath);
