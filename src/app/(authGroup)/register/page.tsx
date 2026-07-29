import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8 shadow-lg space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">
            Create an Account
          </h1>

          <p className="text-gray-500">
            Join FixItNow today.
          </p>
        </div>

        <RegisterForm />
      </div>
    </div>
  );
}