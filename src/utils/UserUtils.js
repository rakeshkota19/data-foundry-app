const getUserInitials = (user) => {
  console.log(user);
  if (!user || !user.attributes) return "U";
  const email = user.attributes.email || "";
  return email.charAt(0).toUpperCase();
};
