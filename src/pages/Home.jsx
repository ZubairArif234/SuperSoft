import React, { useEffect } from "react";
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
import { CSVLink } from 'react-csv';
const Home = () => {
  const headers = [
    { label: 'Student id', key: 'id' },
    { label: 'Student name', key: 'name' },
    { label: 'Class', key: 'class' },
    { label: 'Section', key: 'section' }
  ];
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { students, loading } = useSelector((state) => state?.data);
  console.log(students);
  useEffect(() => {
    dispatch(getAll());
  }, []);

  const form = useForm({
    initialValues: { name: "", class: "", section: "" },

    validate: {
      name: (value) => (value.length < 1 ? "Invalid student name" : null),
      class: (value) => (value.length < 1 ? "Invalid student class" : null),
      section: (value) => (value.length < 1 ? "Invalid student section" : null),
    },
  });

  const column = [
    { accessor: "id", title: "S.No" },
    { accessor: "name", title: "Name" },
    { accessor: "class" , title:"Class" },
    { accessor: "section" , title:"Section" },
    { accessor: "action", title:"Actions" ,  render: (row, i) => {
      return (
       <div>
        <button className="me-2 green-btn p-2 ">edit</button>
        <button className="red-btn p-2" onClick={()=> handleDelete(row.id)}>delete</button>
       </div>
      );
    },
  },
  ];
  
  const handleAddStudent = async (values) => {
  const res = await  dispatch(addStudent({...values , id:students?.length?.toString()}))

  if (res === "success"){
  dispatch(getAll())
  form?.reset()
  close()
} 
}

const handleDelete = async (id) => {
  const res = await  dispatch(deleteStudent(id))

  if (res === "success"){
  dispatch(getAll())}
}
  return (
    <div className="mt-4">
      <div className="d-flex justify-content-end align-items-center">
        <button className="green-btn p-2 px-3 me-3" onClick={open}>
          add student
        </button>
        <CSVLink data={students} headers={headers} className="green-btn p-2 px-3" >
          Export Excel
        </CSVLink>
        {/* <button className='green-btn p-2 px-3' onClick={()=> dispatch(addStudent({id:4,name:"ansari alam"}))}>add student</button> */}
      </div>
      {/* <button onClick={()=> dispatch(getAll())}>get student</button>
      <button onClick={()=> dispatch(updateStudent({id:2,name:"ansari alam"},2))}>update student</button> */}
      <div className="my-2">
        {loading ? 
        <Loader color="#fff" />
        :
        <GeneralTable column={column} record={students} loading={loading} />
        }
      </div>
      <Modal opened={opened} onClose={close} title="Add Student" centered>
        <form onSubmit={form.onSubmit(handleAddStudent)}>
          <TextInput label={"Student Name"} placeholder="Enter student name" {...form.getInputProps("name")} />
          <Select
            label="Select Class"
            placeholder="Select class"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("class")}
          />
          <Select
            label="Select section"
            placeholder="Select section"
            data={["React", "Angular", "Vue", "Svelte"]}
            {...form.getInputProps("section")}
          />
          <div className="d-flex justify-content-end">
            <button className="green-btn p-2 px-3 mt-2" type="submit">
              Add Student
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
