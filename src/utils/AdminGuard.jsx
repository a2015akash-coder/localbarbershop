import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase"; // 👈 THIS MUST EXIST

export default function AdminGuard({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      const tokenResult = await currentUser.getIdTokenResult(true);
      setUser(currentUser);
      setIsAdmin(tokenResult.claims.admin === true);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return <p className="text-center py-24">Checking access…</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <p className="text-center py-24 text-red-600">Access denied</p>;
  }

  return children;
}