import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: JSX.Element;
};

export const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = "dev-j4vpfn2d21vvfwbl.us.auth0.com";//import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId ="CYpIfZU2HBPv9ig09IR77AVYe4zXg9bc";// import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri= "http://localhost:5173/callback";//= import.meta.env.VITE_AUTH0_CALLBACK_URL;
  const audience = "https://hola.com";//import.meta.env.VITE_AUTH0_AUDIENCE;

  const onRedirectCallback = (appState: AppState | undefined) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        audience: audience,
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
