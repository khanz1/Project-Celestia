import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  rem,
  keys,
} from "@mantine/core";
import { IconSelector } from "@tabler/icons-react";
import classes from "./Table.module.css";

export interface RowData {
  fileName: string;
  fileUrl: string;
  fileType: string;
  publicFileUrl: string;
  createdAt: string;
}

export interface ThProps {
  children: React.ReactNode;
}

export function Th({ children }: ThProps) {
  const Icon = IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton className={classes.control}>
        <Group grow justify="space-between" >
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </Table.Th>
  );
}

export function filterData(data: any[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toLowerCase().includes(query))
  );
}

export const sortData = (
  data: any[],
  payload: { sortBy: keyof any | null; reversed: boolean; search: string }
) => {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
};
