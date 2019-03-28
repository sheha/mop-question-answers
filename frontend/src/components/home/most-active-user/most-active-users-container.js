// // Imports
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// // App Imports
// import { fetchTweets } from '../../../actions/questions'
// import Loading from '../../loading'
// import TweetList from '../../my-questions/list'

// class MostActiveUsersContainer extends Component {
//     componentDidMount() {
//         //this.props.fetchTweets()
//     }

//     render() {
//         return (
//             <section>
//                 <h2><span role="img" aria-label="tweets">💭</span> Tweets</h2>

//                 <br />

//                 {this.props.tweets.loading ? <Loading /> : <TweetList tweets={this.props.tweets.list} />}
//             </section>
//         )
//     }
// }

// TweetListContainer.propTypes = {
//     tweets: PropTypes.object.isRequired,
//     fetchTweets: PropTypes.func.isRequired
// }

// function tweetsState(state) {
//     return {
//         tweets: state.tweets
//     }
// }

// export default connect(tweetsState, { fetchTweets })(TweetListContainer)
