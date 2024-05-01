import { Code, ScrollArea, Menu, Button, UnstyledButton, Group, Avatar, Text, rem, Stack } from "@mantine/core";
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconCloudUpload,
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
  IconChevronRight,
  IconDoorExit,
} from "@tabler/icons-react";
import { LinksGroup } from "./NavbarLinksGroup";
import classes from "./Navbar.module.css";
import Image from "next/image";
import { removeCookie } from "@/utils/helpers/cookies.helper";
import { useRouter } from "next/navigation";

const navList = [
  { label: "Dashboard", icon: IconGauge, link: "/" },
  {
    label: "Storage",
    link: "/storage",
    icon: IconCloudUpload,
  },
  {
    label: "Redirects",
    icon: IconCalendarStats,
    link: "/redirects",
    // links: [
    //   { label: "Upcoming releases", link: "/" },
    //   { label: "Previous releases", link: "/" },
    //   { label: "Releases schedule", link: "/" },
    // ],
  },
  { label: "Logs", link: "/logs", icon: IconPresentationAnalytics },
];

export function Navbar() {
  const router = useRouter();
  const handleOnLogout = () => {
    removeCookie("_at");

    router.replace("/sign-in");
  }

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify="space-between">
          <Image
            width={35}
            height={35}
            src="/images/logo.png"
            alt="a mystical cat logo"
          />
          <Code fw={700}>v3.1.2</Code>
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {navList.map((item) => (
            <LinksGroup {...item} key={item.label} />
          ))}
        </div>
      </ScrollArea>

      <div className={classes.footer}>
        <Menu shadow="md" width={200}>
          <Menu.Target>
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
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              color="red"
              leftSection={
                <IconDoorExit style={{ width: rem(14), height: rem(14) }} />
              }
              onClick={handleOnLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </nav>
  );
}
