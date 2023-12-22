import { GoogleOAuthProvider } from "@react-oauth/google";

export const withGoogleProvider = (Component: React.ComponentType) => {
  return (props: any) => {
    return (
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        <Component {...props} />
      </GoogleOAuthProvider>
    );
  };
};
