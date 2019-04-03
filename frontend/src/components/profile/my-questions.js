import React from 'react';
import Typography from '@material-ui/core/Typography';
import SimpleNestedListView from '../common/simple-nested-listview-container'

function MyQuestions(props) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        My Questions
      </Typography>
      {/* <SimpleNestedListView myQuestions={props} /> */}
    </React.Fragment>
  );
}

export default MyQuestions;
