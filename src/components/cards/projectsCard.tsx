import { Button, CardActions, CardContent, Typography } from "@mui/material"
import { QueryDocumentSnapshot } from "firebase/firestore"
import React from "react"

export const ProjectsCard = (props: { document: QueryDocumentSnapshot }) =>  {
    return (
      <React.Fragment>
        <CardContent>
          <Typography variant="h5" component="div">
          {props.document.data().name}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1.5 }} color="text.secondary">
          {props.document.data().description}
          </Typography>
          <Typography variant="body2">
            Initial data: {props.document.data().initialData}
          </Typography>
          <Typography variant="body2">
            Stakeholder: {props.document.data().client}
          </Typography>
        
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </React.Fragment>
    )
  }
  