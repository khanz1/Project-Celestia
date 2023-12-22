import { UnstyledButton, Group, Avatar, Text, rem, Stack } from "@mantine/core";
import { IconChevronRight } from "@tabler/icons-react";
import classes from "./UserButton.module.css";

export function UserButton() {
  return (
    <UnstyledButton className={classes.user}>
      <Group justify="space-between">
        <Group>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
            radius="xl"
          />

          <Stack gap={0}>
            <Text size="sm" fw={500}>
              Harriette Hacktiv8
            </Text>

            <Text c="dimmed" size="xs">
              hspoonlicker@hacktiv8
            </Text>
          </Stack>
        </Group>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  );
}
