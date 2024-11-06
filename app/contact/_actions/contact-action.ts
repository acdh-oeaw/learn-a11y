"use server";

export async function contactAction() {
  return {
    errors: {
      name: "Is this really your actual name?",
      email: "Looks fishy to me",
      message: "Please be polite!",
    },
    message: "Something went wrong",
  };
}
