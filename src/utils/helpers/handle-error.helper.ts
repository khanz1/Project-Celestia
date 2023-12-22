import { AxiosError } from "axios";
import { notifications } from "@mantine/notifications";

export const handleError = (error: unknown) => {
  const ISEMessage = "We are experiencing some issues, please try again later";
  if (error instanceof AxiosError) {
    notifications.show({
      title: "Error",
      message: error.response!.data?.message || ISEMessage,
      color: "red",
    });
  } else {
    notifications.show({
      title: "Error",
      message: (error as Error)?.message || ISEMessage,
      color: "red",
    });
  }
};
