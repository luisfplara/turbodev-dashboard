'use client'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { getDocs, collection, QuerySnapshot, addDoc } from 'firebase/firestore'
import { db } from 'lib/firebase-config';

import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import { useSearchParams } from "next/navigation";
import * as React from 'react';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { database } from "firebase-admin";
import { Dayjs } from "dayjs";




export default function AddProjectDialog(props: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {

  console.log(props.open)
  const [clientes, setClientes] = React.useState<QuerySnapshot>();

  var selectedClienteId: string = '';
  var dateTimeValue: (Dayjs | null) = null;


  React.useEffect(() => {
    const collectionRef = collection(db, 'cliente')
    getDocs(collectionRef).then((docs) => {
      setClientes(docs);
      docs.docs.forEach((e) => {

        console.log(e.data())

      });

    });


  }, []);

  const handleClose = () => {
    props.setOpen(false);
  };
  const handleChange = (event: SelectChangeEvent) => {
    selectedClienteId = event.target.value as string

  };



  const subMitForm = (event: React.FormEvent<HTMLFormElement>) => {
    const projectCollection = collection(db, 'projects');

    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    console.log(formJson)

    const name = formJson.name;
    const description = formJson.description

    addDoc(projectCollection, { 'name': name, 'description': description, 'client': selectedClienteId, 'initialData': dateTimeValue?.format() });


    handleClose();

  }

  return (

    <Dialog
      open={props.open}
      onClose={handleClose}
      PaperProps={{
        component: 'form',
        onSubmit: subMitForm,
      }}
    >
      <DialogTitle>Adicionar Projeto</DialogTitle>
      <DialogContent>

        <TextField
          autoFocus

          required
          margin="dense"
          id="name"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="standard"
        />
        <TextField
          multiline
          autoFocus
          rows={4}
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
        />
        <Box mt={2}></Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="teste" value={dateTimeValue} onChange={(data: (Dayjs | null)) => { 
            dateTimeValue = data
            console.log(data?.format()) 
            }} />
        </LocalizationProvider>
        <Box />
        <Box mt={2}>

          <InputLabel id="client-select-label">Cliente</InputLabel>
          <Select
            labelId="client-select-label"
            id="client-select"
            value={selectedClienteId}
            label="Customer"
            onChange={handleChange}
          >
            {clientes?.docs.map((e) => {
              return <MenuItem value={e.id}>{e.data()?.nome}</MenuItem>
            })}

          </Select>

        </Box>



      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit">Adicionar</Button>
      </DialogActions>
    </Dialog>
  )

}