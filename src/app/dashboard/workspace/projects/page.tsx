"use client"
import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import ProTip from '@/components/ProTip';
import Copyright from '@/components/Copyright';

import { Button, Card, CardActions, CardContent, DialogActions, Grid, Dialog, DialogTitle, DialogContent, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, AppBar, Toolbar, IconButton } from '@mui/material';
import { db } from 'lib/firebase-config';
import { addDoc, getDocs, collection, QuerySnapshot } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProjectsCard } from '@/components/cards/projectsCard';
import AddClienteDialog from '@/components/dialogs/AddProjectDialog';
import AddProjectDialog from '@/components/dialogs/AddProjectDialog';



export default function Clientes() {

  const [open, setOpen] = React.useState(false);
  const [projectsData, setProjectsData] = React.useState<QuerySnapshot>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const projectsCollection = collection(db, 'projects');
  React.useEffect(() => {

    getDocs(projectsCollection).then((data) => {
      setProjectsData(data);

    });
  }, []);

  return (
    <Box >
      <AddProjectDialog open={open} setOpen={setOpen} />

      <Grid>
        <Grid item xs={4}>
          <Box sx={{ backgroundColor: '#bababa', borderRadius: 10, padding: 1, paddingX: 2 }}>
            <Button variant="outlined" onClick={handleClickOpen} sx={{
              backgroundColor: '#ededed', ':hover': {
                bgcolor: '#8ba691', // theme.palette.primary.main

              },
            }} startIcon={<AddIcon />}>
              Add
            </Button>

            <Button sx={{
              mx: 1, backgroundColor: '#ededed', ':hover': {
                bgcolor: '#a68b8b', // theme.palette.primary.main

              }
            }} variant="outlined" onClick={handleClickOpen} startIcon={<DeleteIcon />} >
              Delete
            </Button>

          </Box>
        </Grid>
        <Grid container
          mt={2}
          gap={1}
          alignItems="center"
          justifyContent="center"
        >

          {
            projectsData?.docs.map((QueryDocumentSnapshotData) => {
              return (
                <Grid >
                  <Box sx={{ minWidth: 275 }}>
                    <Card variant="outlined">
                      <ProjectsCard document={QueryDocumentSnapshotData}/>
                    </Card>
                  </Box>
                </Grid>
              )
            })
          }


        </Grid>
      </Grid>
    </Box >
  );
}
