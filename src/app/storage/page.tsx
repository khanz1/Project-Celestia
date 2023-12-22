"use client";
import { PageTitle } from "@/components/PageTitle";
import { storageApi } from "@/utils/http.client";
import {
  Box,
  Button,
  Container,
  Group,
  Modal,
  rem,
  TextInput,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Table, Text } from "@mantine/core";
import { Th } from "../../components/Table/TableData";
import { IconPlus, IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { useRef } from "react";
import { notifications } from "@mantine/notifications";
import { UploadSingleApi } from "@/features/storages/storage.interface";
import { handleError } from "@/utils/helpers/handle-error.helper";

export interface File {
  id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  publicFileUrl: string;
  createdAt: string;
}

export default function StoragePage() {
  const openRef = useRef<() => void>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [files, setFiles] = useState<File[]>([]);

  const [path, setPath] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await storageApi.get("/files");
      setFiles(data.data);
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const trimWords = (str: string, num: number) => {
    if (str.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };

  const formatDate = (date: string | Date) => {
    if (typeof date === "string") {
      date = new Date(date);
    }

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleOnDrop = async (files: FileWithPath[]) => {
    console.log(files, "<<< f");
    setUploading(true);
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("path", path);

    try {
      const { data } = await storageApi.post<UploadSingleApi>(
        "/upload/single",
        formData
      );

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
      });

      fetchData();
      setPath("");
    } catch (err) {
      handleError(err);
    } finally {
      setUploading(false);
      close();
    }
  };

  return (
    <Container size="xl">
      <Modal opened={opened} onClose={close} size="xl" title="Upload file">
        <TextInput
          py="lg"
          label="Path"
          description="use path without prefix slash"
          placeholder="type..."
          value={path}
          onChange={(event) => setPath(event.currentTarget.value)}
        />
        <Dropzone
          loading={uploading}
          openRef={openRef}
          onDrop={handleOnDrop}
          onReject={(files) => console.log("rejected files", files)}
          maxSize={5 * 1024 ** 2}
          accept={IMAGE_MIME_TYPE}
        >
          <Group
            justify="center"
            gap="xl"
            mih={220}
            style={{ pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <IconUpload
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-blue-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-red-6)",
                }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{
                  width: rem(52),
                  height: rem(52),
                  color: "var(--mantine-color-dimmed)",
                }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Drag images here or click to select files
              </Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Group>
        </Dropzone>

        <Group justify="center" mt="md">
          <Button onClick={() => openRef.current?.()}>Select files</Button>
        </Group>
      </Modal>
      <Group justify="space-between">
        <PageTitle>Storage Bucket</PageTitle>
        <Button onClick={open}>
          <IconPlus />
          Add
        </Button>
      </Group>
      <Box pt="xl">
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw={700}
          layout="fixed"
          highlightOnHover
        >
          <Table.Tbody>
            <Table.Tr>
              <Th>Name</Th>
              <Th>Type</Th>
              <Th>URL</Th>
              <Th>Public URL</Th>
              <Th>Created At</Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {files.length > 0 ? (
              files.map((row) => (
                <Table.Tr key={row.id}>
                  <Table.Td>{trimWords(row.fileName, 20)}</Table.Td>
                  <Table.Td>{row.fileType}</Table.Td>
                  <Table.Td>{trimWords(row.fileUrl, 25)}</Table.Td>
                  <Table.Td>{trimWords(row.publicFileUrl, 25)}</Table.Td>
                  <Table.Td>{formatDate(row.createdAt)}</Table.Td>
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={Object.keys(5).length}>
                  <Text fw={500} ta="center">
                    Nothing found
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Container>
  );
}
