import { useState } from "react";
import { Table, ScrollArea, Text, TextInput, rem } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { RowData, sortData, Th } from "./TableData";

export function CompactTable({ data }: any) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<RowData[]>([]);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  return (
    <ScrollArea>
      <TextInput
        placeholder="Search by any field"
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={handleSearchChange}
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        miw={700}
        layout="fixed"
      >
        <Table.Tbody>
          <Table.Tr>
            <Th
              sorted={sortBy === "fileName"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("fileName")}
            >
              Name
            </Th>
            <Th
              sorted={sortBy === "fileUrl"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("fileUrl")}
            >
              URL
            </Th>
            <Th
              sorted={sortBy === "fileType"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("fileType")}
            >
              Type
            </Th>
            <Th
              sorted={sortBy === "publicFileUrl"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("publicFileUrl")}
            >
              Public URL
            </Th>
            <Th
              sorted={sortBy === "createdAt"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("createdAt")}
            >
              Created At
            </Th>
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {sortedData.length > 0 ? (
            sortedData.map((row) => (
              <Table.Tr key={row.name}>
                <Table.Td>{row.name}</Table.Td>
                <Table.Td>{row.email}</Table.Td>
                <Table.Td>{row.company}</Table.Td>
              </Table.Tr>
            ))
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
