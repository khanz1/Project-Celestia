"use client";
import { PageTitle } from "@/components/PageTitle";
import { Th } from "@/components/Table/TableData";
import { handleError } from "@/utils/helpers/handle-error.helper";
import { redirectApi } from "@/utils/http.client";
import {
  Box,
  Button,
  Center,
  Container,
  Group,
  Modal,
  Stack,
  Table,
  TextInput,
  Text,
  Anchor,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [opened, { open, close }] = useDisclosure(false);
  const [form, setForm] = useState({
    fromUrl: "personal",
    toUrl: "https://khanz1.dev",
  });
  const [redirects, setRedirects] = useState<
    { id: number; fromUrl: string; toUrl: string }[]
  >([]);

  const fetchData = async () => {
    const { data } = await redirectApi.get("/redirects");
    console.log(data, "<<< d");
    setRedirects(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await redirectApi.post("/redirects", form);

      close();
      fetchData();
      setForm({
        fromUrl: "",
        toUrl: "",
      });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <Container size="xl">
      <Modal opened={opened} onClose={close} size="xl" title="Create Redirect">
        <form onSubmit={handleOnSubmit}>
          <Stack gap="md">
            <Group mt="md" grow>
              <TextInput
                value={form.fromUrl}
                onChange={handleOnChange}
                name="fromUrl"
                label="Redirect From"
                description="Your from redirect url"
                placeholder="personal"
              />
              <TextInput
                value={form.toUrl}
                onChange={handleOnChange}
                name="toUrl"
                label="Redirect To"
                description="Your destination full url"
                placeholder="https://khanz1.dev"
              />
            </Group>

            <Group justify="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Group justify="space-between" w={"100%"}>
        <PageTitle>Redirects</PageTitle>
        <Button onClick={open}>
          <IconPlus />
          Add
        </Button>
      </Group>

      <Box pt="xl">
        {redirects.length > 0 ? (
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            miw={700}
            layout="fixed"
            highlightOnHover
          >
            <Table.Tbody>
              <Table.Tr>
                <Th>From URL</Th>
                <Th>To URL</Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {redirects.map((row, index) => (
                <Table.Tr key={"x" + index}>
                  <Table.Td>
                    <Link href={`/redirects/${row.id}`}>{row.fromUrl}</Link>
                  </Table.Td>
                  <Table.Td>{row.toUrl}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        ) : (
          <Center>
            <Text>Nothing found</Text>
          </Center>
        )}
      </Box>
    </Container>
  );
}
