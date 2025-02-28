import { defineStorage } from "@aws-amplify/backend";

export const storage = defineStorage({
  name: "serviceRequestBucket",
  access: (allow) => ({
    "auth-images/*": [allow.authenticated.to(["read", "write"])],
    "images/*": [
      allow.guest.to(["read"]),
      allow.authenticated.to(["read", "write"]),
    ],
  }),
});
