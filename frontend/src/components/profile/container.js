// // Imports
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// // App Imports
// import { fetchUser } from '../../../actions/user';
// import Loading from '../../loading'

// import SimpleExpansionPanel from '../../common/simple-expansion-panel';

// class ProfileContainer extends Component {
//     constructor (props) {
//         super(props);
//         this.state = {

//         };
//     }
//     componentDidMount() {
//         this.props.fetchUser();
//     }



//     render() {

//         return (
//           <div>
//             {this.props.mostActiveUsers.loading ? (
//               <Loading />
//             ) : (
//               <SimpleExpansionPanel
//                 itemColl={this.props.mostActiveUsers}
//               />
//             )}
//           </div>
//         );
//     }
// }

// MostActiveUsersContainer.propTypes = {
//     mostActiveUsers: PropTypes.object.isRequired,
//     fetchMostActiveUsers: PropTypes.func.isRequired
// }

// function questionsState(state) {
//     return {
//         mostActiveUsers: state.mostActiveUsers
//     }
// }

// export default connect(questionsState, { fetchMostActiveUsers })(MostActiveUsersContainer)