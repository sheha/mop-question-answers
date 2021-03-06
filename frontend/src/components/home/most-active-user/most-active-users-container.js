// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import { fetchMostActiveUsers } from '../../../actions/user';
import Loading from '../../loading'

import SimpleExpansionPanel from '../../common/simple-expansion-panel';

class MostActiveUsersContainer extends Component {
  constructor (props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount() {
    this.props.fetchMostActiveUsers();
  }



  render() {

    const label = this.props.label;
    const mostActiveUsers = this.props.mostActiveUsers.mostActiveUsers;

        return (
          <div>
            {mostActiveUsers.loading ? (
              <Loading />
            ) : (
              <SimpleExpansionPanel label={label} mostActiveUsers={mostActiveUsers}
              />
            )}
          </div>
        );
    }
}

MostActiveUsersContainer.propTypes = {
    mostActiveUsers: PropTypes.object.isRequired,
    fetchMostActiveUsers: PropTypes.func.isRequired
}

function questionsState(state) {
    return {
        mostActiveUsers: state.mostActiveUsers
    }
}

export default connect(questionsState, { fetchMostActiveUsers })(MostActiveUsersContainer)
