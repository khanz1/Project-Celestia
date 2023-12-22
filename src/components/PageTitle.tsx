import { Text } from "@mantine/core";

export interface PageTitleProps {
  children: React.ReactNode;
}

export const PageTitle = ({ children }: PageTitleProps) => {
  return (
    <div>
      <Text fw="bold" size="32px">{children}</Text>
      
    </div>
  );
};
