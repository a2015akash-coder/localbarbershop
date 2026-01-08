import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = getAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-sm w-full p-8 border rounded-lg text-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Login
        </h1>

        <p className="mt-3 text-sm text-gray-600">
          Sign in to manage blog posts
        </p>

        <button
          onClick={handleGoogleLogin}
          className="mt-6 w-full rounded-md bg-orange-600 px-4 py-3 text-white font-medium hover:bg-orange-700"
        >
          Continue with Google
        </button>
      </div>
    </section>
  );
}
