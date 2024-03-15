'use client'
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Theme,
  createStyles,
  
} from '@mui/material';
import { makeStyles } from '@mui/styles'; 
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material//Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface DataItem {
  id: number;
  name: string;
}

const useStyles:Function = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    addButton: {
      marginRight: theme.spacing(2),
    },
    tableContainer: {
      marginTop: theme.spacing(2),
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const [data, setData] = useState<DataItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState('');
  const [editItemId, setEditItemId] = useState<number | null>(null);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setName('');
    setEditItemId(null);
  };

  const handleSave = () => {
    if (name.trim() === '') return;

    if (editItemId !== null) {
      setData(data.map(item => (item.id === editItemId ? { ...item, name } : item)));
    } else {
      const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
      setData([...data, { id: newId, name }]);
    }

    handleCloseDialog();
  };

  const handleEdit = (id: number) => {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
      setName(itemToEdit.name);
      setEditItemId(id);
      setOpenDialog(true);
    }
  };

  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            CRUD App
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="add" onClick={handleOpenDialog} className={classes.addButton}>
            <AddIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{editItemId !== null ? 'Edit Item' : 'Add New Item'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e:any) => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <IconButton edge="start" color="inherit" aria-label="edit" onClick={() => handleEdit(item.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton edge="start" color="inherit" aria-label="delete" onClick={() => handleDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default App;