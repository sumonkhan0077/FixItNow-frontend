"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { registerAction } from "@/service/auth/RegisterAction";

const RegisterForm = () => {
  const [state, action, pending] = useActionState(
    registerAction,
    null
  );

  return (
    <form action={action} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input
          name="name"
          type="text"
          placeholder="Enter your name"
          required
        />

        <Input
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />

        <Input
          name="password"
          type="password"
          placeholder="Enter your password"
          required
        />

        <select
          name="role"
          className="w-full border rounded-md p-2"
          defaultValue="CUSTOMER"
        >
          <option value="CUSTOMER">Customer</option>
          <option value="TECHNICIAN">Technician</option>
        </select>

        <Button type="submit" disabled={pending}>
          {pending ? "Submitting..." : "Register"}
        </Button>
      </Card>
    </form>
  );
};

export default RegisterForm;