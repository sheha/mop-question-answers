// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import { fetchHotQuestions } from '../../../actions/questions';
import Loading from '../../loading'

import SimpleExpansionPanel from '../../common/simple-expansion-panel';

class HotQuestionsContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            //initial state for load more func
            skip: 0
        };
    }
    componentDidMount() {
        this.props.fetchHotQuestions(this.state.skip);
        this.setState({skip:this.state.skip + 20});
    }


    loadMore(skip) {
        this.props.fetchHotQuestions(skip);
        const nextSkip = this.state.skip + 20;
        this.setState({ skip: nextSkip });
    }
    onLoadMoreClick(event){
        event.preventDefault();
        this.loadMore(this.state.skip);
    }

    render() {
      const label = this.props.label;
      const hotQuestions = this.props.hotQuestions || []


        return (
          <div>
            {this.props.hotQuestions.loading ? (
              <Loading />
            ) : (
                <SimpleExpansionPanel label={label}
                hotQuestions={hotQuestions}
              />
            )}
          </div>
        );
    }
}

HotQuestionsContainer.propTypes = {
    hotQuestions: PropTypes.object.isRequired,
    fetchHotQuestions: PropTypes.func.isRequired
}

function questionsState(state) {
    return {
        hotQuestions: state.hotQuestions
    }
}

export default connect(questionsState, { fetchHotQuestions })(HotQuestionsContainer)
