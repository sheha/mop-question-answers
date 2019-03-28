// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import { fetchHotQuestions } from '../../../actions/questions';
import Loading from '../../loading'
import QuestionsList from './list'

import {SimpleListItem, SimpleExpansionPanel} from '../../common'

class HotQuestionsContainer extends Component {
    constructor (props) {
        super(props);
        this.state = {
            //initial state for load more 
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
        let {questions} = this.props;
        return (
            
           
            <section>
                {this.props.questions.loading ? <Loading /> : <SimpleExpansionPanel itemColl={questions} />}
            </section>
        )
    }
}

HotQuestionsContainer.propTypes = {
    questions: PropTypes.object.isRequired,
    fetchHotQuestions: PropTypes.func.isRequired
}

function questionsState(state) {
    return {
        questions: state.questions
    }
}

export default connect(questionsState, { fetchHotQuestions })(HotQuestionsContainer)
