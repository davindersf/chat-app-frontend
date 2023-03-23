import { client } from "../utils/client.utils";

export async function getUserTenantId() {
  const { data } = await client.get<string>("/userTenantId", {
    headers: { responseType: "text" },
  });
  return data;
}
