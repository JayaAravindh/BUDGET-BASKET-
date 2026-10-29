import { connection } from "next/server";
import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import AdminDashboard from "./AdminDashboard";

export const instant = false;

export default async function AdminPage() {
  await connection();

  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold text-gray-900">
            Profile unavailable
          </h1>
          <p className="mt-3 text-gray-600">
            Your account profile could not be verified. Please contact the
            store owner.
          </p>
        </div>
      </main>
    );
  }

  if (profile.role !== "owner") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
        <div className="max-w-lg rounded-2xl bg-white p-8 text-center shadow">
          <h1 className="text-2xl font-bold text-gray-900">
            Access denied
          </h1>
          <p className="mt-3 text-gray-600">
            Your account does not have owner permission to access this
            dashboard.
          </p>
        </div>
      </main>
    );
  }

  return <AdminDashboard />;
}
