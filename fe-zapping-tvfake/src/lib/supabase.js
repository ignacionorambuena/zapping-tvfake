import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://aqmbqfpgousiwsbveqgc.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFxbWJxZnBnb3VzaXdzYnZlcWdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5MTI4ODEsImV4cCI6MjA1ODQ4ODg4MX0.JC1Ovgg23I_Lo32YpHRxQB-xhV6qB0xa_WIukGBFBjU";
export const supabase = createClient(supabaseUrl, supabaseKey);
