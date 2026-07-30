import supabase from "../lib/supbase";

const auth = {
  async isUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    return !!user;
  },
};

export default auth;