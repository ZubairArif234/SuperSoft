import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addStudent,
  deleteStudent,
  getAll,
  updateStudent,
} from "../redux/actions/studentActions";
import GeneralTable from "../components/table/GeneralTable";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, TextInput, Select, Menu, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { CSVLink } from "react-csv";
import { getClasses } from "../redux/actions/classesActions";
import { getSections } from "../redux/actions/sectionActions";
const Home = () => {
  const headers = [
    { label: "Student id", key: "id" },
    { label: "Student name", key: "name" },
    { label: "Class", key: "class.name" },
    { label: "Section", key: "section.name" },
  ];
  const [edit, setEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state?.data);
  const { classes } = useSelector((state) => state?.classes);
  const { sections } = useSelector((state) => state?.sections);

  useEffect(() => {
    dispatch(getAll());
    dispatch(getClasses());
    dispatch(getSections());
  }, []);

  const form = useForm({
    initialValues: { id: "", name: "", class: "", section: "" },

    validate: {
      name: (value) => (value.length < 1 ? "Invalid student name" : null),
      class: (value) => (value.length < 1 ? "Invalid student class" : null),
      section: (value) => (value.length < 1 ? "Invalid student section" : null),
    },
  });

  const column = [
    {
      accessor: "id",
      title: "S.No",
      width: "10%",
      render: (row, i) => {
        return (
          <p className="mb-0" key={i}>
            {i + 1}
          </p>
        );
      },
    },
    { accessor: "name", title: "Name", width: "50%" },
    {
      accessor: "class",
      title: "Class",
      width: "10%",
      render: (row, i) => {
        return (
          <p className="mb-0" key={i}>
            {row?.class?.name}
          </p>
        );
      },
    },
    {
      accessor: "section",
      title: "Section",
      width: "10%",
      render: (row, i) => {
        return (
          <p className="mb-0" key={i}>
            {row?.section?.name}
          </p>
        );
      },
    },
    {
      accessor: "action",
      title: "Actions",
      width: "10%",
      render: (row, i) => {
        return (
          <div key={i} className="d-flex">
            <button
              className="me-2 green-btn p-2 "
              onClick={() => handleEdit(row)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="feather feather-edit"
                viewBox="0 0 24 24"
              >
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
            <button
              className="red-btn p-2"
              onClick={() => handleDelete(row.id)}
            >
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                width="20"
                height="20"
                fill="#fff"
                stroke="none"
              >
                <path d="M432 80h-82.38l-34-56.75C306.1 8.827 291.4 0 274.6 0H173.4c-16.8 0-32.4 8.827-41 23.25L98.38 80H16C7.125 80 0 87.13 0 96v16c0 8.9 7.125 16 16 16h16v320c0 35.35 28.65 64 64 64h256c35.35 0 64-28.65 64-64V128h16c8.9 0 16-7.1 16-16V96c0-8.87-7.1-16-16-16zM171.9 50.88c1-1.75 3-2.88 5.1-2.88h94c2.125 0 4.125 1.125 5.125 2.875L293.6 80H154.4l17.5-29.12zM352 464H96c-8.837 0-16-7.163-16-16V128h288v320c0 8.8-7.2 16-16 16zm-128-48c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16zm-80 0c8.8 0 16-7.2 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16zm160 0c8.844 0 16-7.156 16-16V192c0-8.844-7.156-16-16-16s-16 7.2-16 16v208c0 8.8 7.2 16 16 16z"></path>
              </svg>
            </button>
          </div>
        );
      },
    },
  ];

  const handleAddStudent = async (values) => {
    let res;
    if (edit) {
      res = await dispatch(
        updateStudent(
          {
            ...values,
            id: students?.length?.toString(),
            class: classes[form?.values?.class],
            section: sections[form?.values?.section],
          },
          form?.values?.id
        )
      );
    } else {
      res = await dispatch(
        addStudent({
          ...values,
          id: students?.length?.toString(),
          class: classes[form?.values?.class],
          section: sections[form?.values?.section],
        })
      );
    }

    if (res === "success") {
      dispatch(getAll());
      form?.reset();
      close();
    }
  };

  const handleDelete = async (id) => {
    const res = await dispatch(deleteStudent(id));

    if (res === "success") {
      dispatch(getAll());
    }
  };

  const handleEdit = (row) => {
    form.setFieldValue("id", row?.id);
    form.setFieldValue("name", row?.name);
    form.setFieldValue("class", row?.class?.id);
    form.setFieldValue("section", row?.section?.id);
    setEdit(true);
    open();
  };

  return (
    <div className="mt-4">
      <div className="d-flex justify-content-end ">
        <button
          className="green-btn p-2 px-3 me-3"
          onClick={() => {
            open();
            form?.reset();
            setEdit(false);
          }}
        >
          add student
        </button>
        <CSVLink
          data={students}
          headers={headers}
          className="text-decoration-none green-btn p-2 px-3"
        >
          Export Excel
        </CSVLink>
      </div>

      <div className="my-2">
        {loading ? (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center position-relative">
            <Loader color="#fff" />
          </div>
        ) : students.length < 1 ? (
          <div className="h-100 w-100 d-flex justify-content-center align-items-center position-relative">
            <p className="not-found">No Records Found</p>
          </div>
        ) : (
          <GeneralTable column={column} record={students} loading={loading} />
        )}
      </div>
      <Modal
        opened={opened}
        onClose={close}
        title={edit ? "Edit Student" : "Add Student"}
        centered
      >
        <form onSubmit={form.onSubmit(handleAddStudent)}>
          <TextInput
            values={"jkk"}
            label={"Student Name"}
            placeholder="Enter student name"
            {...form.getInputProps("name")}
          />
          <Select
            label="Select Class"
            placeholder="Select class"
            data={classes?.map((val, i) => ({
              label: val?.name,
              value: val?.id,
            }))}
            {...form.getInputProps("class")}
            // height={"auto"}
            withScrollArea={true}
            maxDropdownHeight={100}
          />
          <Select
            label="Select section"
            placeholder="Select section"
            data={sections?.map((val, i) => ({
              label: val?.name,
              value: val?.id,
            }))}
            {...form.getInputProps("section")}
          />
          <div className="d-flex justify-content-end">
            <button className="green-btn p-2 px-3 mt-2" type="submit">
              {edit ? "Save Changes" : "Add Student"}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
