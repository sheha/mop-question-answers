import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";


function PersonalInfo(props) {
  const {userProfile} = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>

          <ListItem  divider dense>
            <ListItemText >First Name: {userProfile.firstname}</ListItemText>
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>

          <ListItem divider dense>
            <ListItemText >Last Name: {userProfile.lastname}</ListItemText>
          </ListItem>
        </Grid>

        <Grid item xs={12}>
          <ListItem divider dense>
            <ListItemText >Username: {userProfile.username}</ListItemText>
          </ListItem>
        </Grid>

        <Grid item xs={12}>
         <ListItem divider dense>
            <ListItemText >Address: {userProfile.address}</ListItemText>
          </ListItem>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ListItem divider dense>
            <ListItemText >City: {userProfile.city}</ListItemText>
          </ListItem>
        </Grid>

        <Grid item xs={12} sm={6}>
          <ListItem divider dense>
            <ListItemText >Zip: {userProfile.zip}</ListItemText>
          </ListItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItem divider dense>
            <ListItemText >Country: {userProfile.country}</ListItemText>
          </ListItem>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PersonalInfo;
