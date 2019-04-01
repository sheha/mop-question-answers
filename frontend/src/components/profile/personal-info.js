import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


function PersonalInfo(props) {
  const {userFull} = this.props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Personal Info
      </Typography>
      <Grid container spacing={24}>
        <Grid item xs={12} sm={6}>
          <TextField            
            id="firstname"
            name="firstname"
            value={userFull.firstname}
            label="First name"
            fullWidth


          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="lastname"
            name="lastname"
            label="Last name"
            value={userFull.lastname}
            fullWidth

          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="username"
            name="username"
            label="Username"
            value={userFull.username}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Address"
            value={userFull.address}
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            id="city"
            name="city"
            label="City"
            value={userFull.city}
            fullWidth
            disabled

          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={userFull.zip}
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={userFull.country}
            fullWidth
            disabled
          />
        </Grid>

      </Grid>
    </React.Fragment>
  );
}

export default PersonalInfo;