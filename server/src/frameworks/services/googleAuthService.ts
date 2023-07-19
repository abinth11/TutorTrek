import { OAuth2Client } from "google-auth-library";
import configKeys from "../../config";
const client = new OAuth2Client(configKeys.GOOGLE_CLIENT_ID);

export const googleAuthService = () => {
  const verify = async (token: string) => {
    const user = {
      firstName: "",
      lastName: "",
      email: "",
      profilePic: {
        url:"",
        name:""
      },
      isGoogleUser: true,
    };
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: configKeys.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload)
    if (payload?.given_name && payload.email && payload.picture) {
      const nameParts = payload.given_name.trim().split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");
      user.firstName = firstName;
      user.lastName = lastName;
      user.email = payload.email;
      user.profilePic.url = payload.picture
      user.profilePic.name=payload.given_name
    }
    return user;
  };

  return {
    verify,
  };
};

export type GoogleAuthService = typeof googleAuthService;
