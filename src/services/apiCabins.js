import supabase from "services/supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Failed to load all cabins.");
  }

  return data;
}

async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error(`Failed to delete the cabin with the id: ${id}`);
  }
}

export { deleteCabin, getCabins };
