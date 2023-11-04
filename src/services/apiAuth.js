import supabase, { supabaseUrl } from "services/supabase.js";

async function signup({ fullName, email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

async function updateCurrentUser({ fullName, avatar, password }) {
  let updateObj;

  if (password) updateObj = { password };
  if (fullName)
    updateObj = {
      data: {
        fullName,
      },
    };

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateObj
  );

  if (updateError) throw new Error(updateError.message);

  if (!avatar) return data;

  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (uploadError) throw new Error(uploadError.message);

  const { data: avatarUpdateData, error: avatarUpdateError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarUpdateError) throw new Error(avatarUpdateError.message);

  return avatarUpdateData;
}

export { getCurrentUser, login, logout, signup, updateCurrentUser };
