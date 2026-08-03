import supabase from "../lib/supbase";

const auth = {
  async isUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return !!user;
  },


  async logout() {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;
  },
};

export default auth;