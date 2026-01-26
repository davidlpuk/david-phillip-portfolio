import { Router, Request, Response as ExpressResponse } from "express";
import { createClient } from "@supabase/supabase-js";

const router = Router();

const supabaseUrl =
  process.env.SUPABASE_URL || "https://szajwcrdcqzezkojidth.supabase.co";
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YWp3Y3JkY3F6ZXprb2ppZHRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3NDg4NjUsImV4cCI6MjA4MzMyNDg2NX0.eveGxKW-PviUqm-6vOqjo4SitKaF6Xx-LiQXGA3xd1Q";

const supabase = createClient(supabaseUrl, supabaseKey);

interface LoginRequest {
  email: string;
  password: string;
}

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

router.post("/login", async (req: Request, res: ExpressResponse) => {
  try {
    const { email, password }: LoginRequest = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      token: data.session?.access_token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/signup", async (req: Request, res: ExpressResponse) => {
  try {
    const { email, password, name }: SignupRequest = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ error: "Email, password, and name are required" });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
      },
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      token: data.session?.access_token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/session", async (req: Request, res: ExpressResponse) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: error.message });
    }

    res.json({
      success: true,
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
    });
  } catch (error) {
    console.error("Session error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout", async (req: Request, res: ExpressResponse) => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(" ")[1];
      await supabase.auth.signOut();
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
