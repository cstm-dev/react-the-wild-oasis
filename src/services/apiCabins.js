import supabase, { supabaseUrl } from "services/supabase";

async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
    throw new Error("Failed to load all cabins.");
  }

  return data;
}

async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${cabin.image.name}`.replace("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  } else {
    query = query.update({ ...cabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select();

  if (error) {
    console.error(error.message);
    throw new Error("Failed to create the new cabin.");
  }

  const { error: storageError } = await supabase.storage
    .from("cabins")
    .upload(imageName, cabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.error(storageError.message);
    throw new Error("Failed to upload the cabin image. New cabin not created.");
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

export { createEditCabin, deleteCabin, getCabins };
