"use client";
import { RootLayoutProps } from "@/app/(authenticated)/layout";
import { Box, ScrollArea } from "@mantine/core";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Navbar } from "../components/Navbar";
import { NavigationProgress } from "@mantine/nprogress";

export default function UnAuthLayout(props: Readonly<RootLayoutProps>) {
  return (
    <Box component="main" p={10}>
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
        {props.children}
      </GoogleOAuthProvider>
    </Box>
  );
}
