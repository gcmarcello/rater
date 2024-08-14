import { createSwaggerSpec } from "next-swagger-doc";

export const getApiDocs = async () => {
  const spec = createSwaggerSpec({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Next Swagger API Example",
        version: "1.0",
      },
      paths: {
        "/api/v2/meta/jobs/statistics": {
          get: {
            tags: ["Metadata Operations"],
            summary:
              "Get statistics for searchable fields such as workPlace, industry, timezone etc.",
            description:
              "Returns a list of statistics for the given query parameter in the `/api/v2/jobs/search` endpoint.The returned JSON is described below and mainly consist of a list of statistics with counts and percentages for a given field.<br /><h3>Notes</h3><ul><li>This endpoint is only be available for MEGA subscription plans.</li><br /><li>The results are capped at 100 values and are calculated from job postings within the last month (i.e., current date minus 1 month).</li></ul><br /><h2>Search Query Parameters</h2><h3>General Parameters</h3><ul><li>`field`: A field name used in the search endpoint `/api/v2/jobs/search` as a parameter.</li></ul><br /><br /><h2>Usage Examples</h2><p>Statistics on the workPlace field:<br />`/api/v2/meta/jobs/statistics?field=workPlace`</p><p>Statistics on the industry field:<br />`/api/v2/meta/jobs/statistics?field=industry`</p>",
            parameters: [
              {
                field: null,
                in: "query",
                name: "field",
                required: true,
                schema: {
                  type: "string",
                  example: "workPlace",
                },
                description:
                  "A field name used in the search endpoint `/api/v2/jobs/search` as a parameter.",
              },
            ],
            responses: {
              "200": {
                description:
                  "OK - indicating success and a correct query execution with results.<h4>Response Schema</h4>The API response provides a list of distinct field values for one field with a count of documents they are used in. Each distinct value object in the `result` array contains the following fields:<ul><li> `totalCount` (integer): The total number of jobs within the time range.<li> `docsWithValue` (integer): The number of documents with any value for that field within the time range.<li> `coverage` (double): The percentage of jobs in the time range that have any value.<li> `valueCount` (integer): The total number of values in the time range.<li> `aggregation` (object): The aggregation query we constructed and used to retrieve the distinct values.<li> `values` (array): A list of up to 100 distinct values with their data. Each distinct value object in the `result` array contains the following fields:<ul><li> `key` (string): The value found in the job documents.<li> `doc_count` (integer): The number of documents the value was found in.<li> `percentage_relative` (integer): The percentage of documents with the value relative to all documents with any value (docs_with_field).<li> `percentage_absolute` (integer): The percentage of documents with the value relative to all documents (total_doc_count).</ul></ul>",
              },
              "401": {
                description:
                  "Unauthorized request to API! (e.g., not trying to access API via RapidAPI)",
              },
              "403": {
                description:
                  "Forbidden request to API! (e.g., supscription plan to low)",
              },
              "404": {
                description:
                  "Not Found - due to an non-existant or invalid query parameter format (e.g., 'dateCreated')",
              },
              "405": {
                description:
                  "Method Not Allowed - due to unsupported HTTP Method (e.g., PUT, CONNECT, HEAD, etc.)",
              },
              "500": {
                description:
                  "Internal Server Error - used for general problems (i.e., a catch-all with more info in return value)",
              },
              "503": {
                description:
                  "Service Unavailable due to problems with our backend (e.g., the connection to our Database is interrupted)",
              },
            },
          },
        },
      },
      security: [],
    },
  });
  return spec;
};
