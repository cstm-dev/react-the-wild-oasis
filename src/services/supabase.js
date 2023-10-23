import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qvleamlsubwajdltyheb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2bGVhbWxzdWJ3YWpkbHR5aGViIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY5NDg1OTIsImV4cCI6MjAxMjUyNDU5Mn0.Omm0rc_Wvve5aTFXaFHFYcey3knVyhYJ1Vy23yj7C50";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

export { supabaseUrl };
