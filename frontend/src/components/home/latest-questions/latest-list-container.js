// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import { fetchLatestQuestions } from '../../../actions/questions';
import Loading from '../../loading'

import SimpleExpansionPanel from '../../common/simple-expansion-panel';

class LatestQuestionsContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            //initial state for load more func
            skip: 0
        };
    }
    componentDidMount() {
        this.props.fetchLatestQuestions(this.state.skip);
        this.setState({skip:this.state.skip + 20});
    }


    loadMore(skip) {
        this.props.fetchLatestQuestions(skip);
        const nextSkip = this.state.skip + 20;
        this.setState({ skip: nextSkip });
    }
    onLoadMoreClick(event){
        event.preventDefault();
        this.loadMore(this.state.skip);
    }

    render() {

        return (
          <div>
            {this.props.latestQuestions.loading ? (
              <Loading />
            ) : (
              <SimpleExpansionPanel
                itemColl={this.props.latestQuestions}
              />
            )}
          </div>
        );
    }
}

LatestQuestionsContainer.propTypes = {
    latestQuestions: PropTypes.object.isRequired,
    fetchLatestQuestions: PropTypes.func.isRequired
}

function questionsState(state) {
    return {
        latestQuestions: state.latestQuestions
    }
}

export default connect(questionsState, { fetchLatestQuestions })(LatestQuestionsContainer)
