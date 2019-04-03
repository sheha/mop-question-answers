// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import { fetchAllQuestionsAnswers } from '../../../actions/questions';
import Loading from '../../loading'

import SimpleNestedListViewer from '../../common/simple-nested-listview-container';

class QuestionsAnswersDetails extends Component {
    constructor (props) {
        super(props);
        this.state = {
            //initial state for load more func
            skip: 0,
        };
    }
    componentDidMount() {
        this.props.fetchAllQuestionsAnswers(this.state.skip);
        this.setState({skip:this.state.skip + 20});
    }


    loadMore(skip) {
        this.props.fetchAllQuestionsAnswers(skip);
        const nextSkip = this.state.skip + 20;
        this.setState({ skip: nextSkip });
    }
    onLoadMoreClick(event){
        event.preventDefault();
        this.loadMore(this.state.skip);
    }

    render() {
      const {user} = this.props;

        return (
          <div>
            {this.props.allQuestionsAnswers.loading ? (
              <Loading />
            ) : (
              <SimpleNestedListViewer user={user}
                allQuestionsAnswers={this.props.allQuestionsAnswers.allQuestionsAnswers}
              />
            )}
          </div>
        );
    }
}

QuestionsAnswersDetails.propTypes = {
  user:PropTypes.object.isRequired,
    allQuestionsAnswers: PropTypes.object.isRequired,
    fetchAllQuestionsAnswers: PropTypes.func.isRequired
}

function questionsState(state) {
    return {
        allQuestionsAnswers: state.allQuestionsAnswers,

    }
}

export default connect(questionsState, { fetchAllQuestionsAnswers })(QuestionsAnswersDetails)
