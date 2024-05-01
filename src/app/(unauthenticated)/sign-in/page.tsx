"use client";
import { setCookie } from "@/utils/helpers/cookies.helper";
import { authApi } from "@/utils/http.client";
import { Button } from "@mantine/core";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";

export interface SignInGoogleResponse {
  accessToken: string;
  status: number;
  message: string;
}

export default function SignInPage() {
  const router = useRouter();

  const handleOnSuccess = async (tokenResponse: any) => {
    const { data } = await authApi.post<SignInGoogleResponse>(
      "/sign-in/google",
      tokenResponse
    );
    setCookie("_at", data.accessToken);
    router.replace('/');
  };

  const login = useGoogleLogin({
    onSuccess: handleOnSuccess,
  });
  return (
    <main>
      <Button onClick={() => login()}>Sign in with Google 🚀</Button>
    </main>
  );
}
