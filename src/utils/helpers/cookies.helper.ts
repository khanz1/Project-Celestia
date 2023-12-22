import Cookies from "js-cookie";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

let cookie: ReadonlyRequestCookies;

if (typeof window === "undefined") {
  import("next/headers").then((module) => {
    cookie = module.cookies();
  });
}

export const hasCookie = (key: string): boolean => {
  if (typeof window !== "undefined") {
    return !!Cookies.get(key);
  } else {
    return cookie.has(key);
  }
};

export const getCookie = <T extends string>(key: string): T => {
  if (typeof window !== "undefined") {
    return Cookies.get(key)?.toString() as T;
  } else {
    return cookie.get(key)?.value as T;
  }
};

export const setCookie = (key: string, value: string) => {
  const eightHours = 1000 * 60 * 60 * 8;
  const options = {
    expires: new Date(Date.now() + eightHours),
    path: "/",
  };

  if (typeof window !== "undefined") {
    Cookies.set(key, value, options);
  } else {
    cookie.set(key, value, options);
  }
};

export const removeCookie = (key: string) => {
  if (typeof window !== "undefined") {
    Cookies.remove(key);
  } else {
    cookie.delete(key);
  }
};
