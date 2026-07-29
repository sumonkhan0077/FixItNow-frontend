"use server";

import { redirect } from "next/navigation";

export const registerAction = async (
  prevState: any,
  formData: FormData
) => {
  const payload = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
  };

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  const result = await res.json();

  if (result.success) {
    redirect("/login");
  }

  return result;
};