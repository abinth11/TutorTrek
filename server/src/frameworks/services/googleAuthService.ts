import { OAuth2Client } from 'google-auth-library'
import configKeys from '../../config';
const client = new OAuth2Client(configKeys.GOOGLE_AUTH_CLIENT);

export const googleAuthService = () => {

    const verify = async (token: string) => {
        const user={
            firstName:"",
            lastName:"",
            email:"",
            isGoogleUser:true
        }
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: configKeys.GOOGLE_AUTH_CLIENT,
        });
        const payload = ticket.getPayload();
        if(payload?.given_name&&payload.family_name&&payload.email){
            user.firstName = payload.given_name
            user.lastName = payload.family_name
            user.email = payload.email
        }
        return user
    }

    return {
        verify
    }   
}

export type GoogleAuthService = typeof googleAuthService