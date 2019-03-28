// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
//import { fetchTweets } from '../../actions/tweet'
import Loading from '../../loading'
import TweetList from '../../my-questions/list'

class HotQuestionsContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            skip: 0
        };
    }
    componentDidMount() {
        this.props.fetchHotQuestions(this.state.skip)
        this.setState({skip:this.state.skip + 20})
    }

    // sumFetched(hotQuestions) {
    //     return hotQuestions.reduce(
    //         (a, b) => {
    //             return a.votes + b.votes;
    //         }
    //     )
    // }

    loadMore(skip) {
        this.props.fetchHotQuestions(skip);
        const nextSkip = this.state.skip + 20;
        this.setState({ skip: nextSkip });
    }

    render() {
        return (
            <section>
                <h2><span role="img" aria-label="tweets">💭</span> Hot Questions List</h2>

                <br />

                {this.props.questions.loading ? <Loading /> : <TweetList tweets={this.props.questions.list} />}
            </section>
        )
    }
}

HottestQuestionsListContainer.propTypes = {
    tweets: PropTypes.object.isRequired,
    fetchTweets: PropTypes.func.isRequired
}

function tweetsState(state) {
    return {
        tweets: state.tweets
    }
}

export default connect(tweetsState, { fetchTweets })(HotQuestionsContainer)
