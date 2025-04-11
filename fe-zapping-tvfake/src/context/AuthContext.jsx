import { createContext, useState, useEffect, useMemo, useContext } from "react";
import { supabase } from "../lib/supabase";
const AuthContext = createContext();
import { toast } from "react-toastify";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setIsLoading(false);

      if (event === "SIGNED_IN") {
        console.log("User signed in:", session?.user);
        toast.success("Bienvenido de nuevo");
      } else if (event === "SIGNED_OUT") {
        console.log("User signed out");
        window.location.href = "/";
      }
    });

    const initSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setIsLoading(false);
    };

    initSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email, password, name) => {
    try {
      setIsLoading(true);

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (error) throw error;

      toast.success(
        "Registro exitoso. Por favor revisa tu correo para la confirmación."
      );
      setTimeout(() => {
        window.location.href = "/signin";
      }, 3000);
    } catch (error) {
      console.log(error);
      switch (error.code) {
        case "email_exists":
          toast.error("El correo electrónico ya está en uso.");
          break;
        case "email_address_invalid":
          toast.error("El correo electrónico no es válido.");
          break;
        case "over_email_send_rate_limit":
          toast.error("El correo electrónico ya está en uso.");
          break;
        default:
          toast.error("Error durante el registro.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email, password) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Inicio de sesión exitoso");
      window.location.href = "/";
    } catch (error) {
      switch (error.code) {
        case "invalid_credentials":
          toast.error("Correo o contraseña incorrectos");
          break;
        default:
          toast.error("Error durante el inicio de sesión.");
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "/";
    } catch (error) {
      toast.error(error.message || "Error al cerrar sesión.");
      console.error("Error signing out:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = useMemo(
    () => ({
      user,
      isLoading,
      signUp,
      signIn,
      signOut,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
