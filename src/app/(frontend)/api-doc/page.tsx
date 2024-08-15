import ReactSwagger from "../../../_shared/pages/api-doc/react-swagger";
import openapi from "@/_shared/pages/api-doc/openapi.json";

export default async function IndexPage() {
  const spec = openapi;

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "12px",
      }}
    >
      <ReactSwagger spec={spec} />
    </div>
  );
}
