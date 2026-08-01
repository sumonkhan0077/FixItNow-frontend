import { cookies } from "next/headers";

export const getCookie = async (cookieName: string) => {
  const cookieStore = await cookies();
  const result = cookieStore.get(cookieName)?.value || null;
  return result;
};
