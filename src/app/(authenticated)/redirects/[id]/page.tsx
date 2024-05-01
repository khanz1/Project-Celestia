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
  JsonInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Redirect {
  id: number;
  fromUrl: string;
  toUrl: string;
  activeFrom: Date;
  activeTo: Date;
}

export interface RedirectLog {
  id: number;
  redirectId: number;
  ipAddress: string;
  query: string;
  userAgent: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RedirectDetail extends Redirect {
  logs: RedirectLog[];
}

export default function Page() {

  const [opened, { open, close }] = useDisclosure(false);
  const { id: redirectId } = useParams();
  const [redirect, setRedirect] = useState<RedirectDetail>({
    id: 0,
    fromUrl: "",
    toUrl: "",
    activeFrom: new Date(),
    activeTo: new Date(),
    logs: [],
  });
  const [redirectLog, setRedirectLog] = useState<RedirectLog>({
    id: 0,
    redirectId: 0,
    ipAddress: "",
    query: "",
    userAgent: "",
    data: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const fetchData = async () => {
    const { data } = await redirectApi.get("/redirects/" + redirectId);
    setRedirect(data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container size="xl">
      <Modal opened={opened} onClose={close} size="xl" title="Redirect Log">
        <Stack gap="md">
          <Text>IP Address: {redirectLog.ipAddress}</Text>
          <Text>Query: {redirectLog.query}</Text>
          <Text>User Agent: {redirectLog.userAgent}</Text>
          <JsonInput
            label="Headers and Cookies"
            formatOnBlur
            autosize
            minRows={4}
            value={JSON.stringify(JSON.parse(redirectLog.data), null, 2)}
          />
        </Stack>
      </Modal>
      <Group justify="space-between" w={"100%"}>
        <PageTitle>Redirect {redirect.fromUrl}</PageTitle>
      </Group>

      <Box pt="xl">
        {redirect.logs.length ? (
          <Table
            horizontalSpacing="md"
            verticalSpacing="xs"
            miw={700}
            layout="fixed"
            highlightOnHover
          >
            <Table.Tbody>
              <Table.Tr>
                <Th>Ip Address</Th>
                <Th>query</Th>
                <Th>User Agent</Th>
              </Table.Tr>
            </Table.Tbody>
            <Table.Tbody>
              {redirect.logs.map((row, index) => (
                <Table.Tr
                  key={"x" + index}
                  onClick={() => {
                    setRedirectLog(row);
                    open();
                  }}
                >
                  <Table.Td>{row.ipAddress}</Table.Td>
                  <Table.Td>{row.query}</Table.Td>
                  <Table.Td>{row.userAgent}</Table.Td>
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
