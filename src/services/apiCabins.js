import supabase from "services/supabase";

async function getCabins() {
  try {
    const { data, error } = await supabase.from("cabins").select("*");

    return data;
  } catch (err) {
    console.log(err.message);
    throw new Error("Unable to load all cabins.");
  }
}

export { getCabins };
