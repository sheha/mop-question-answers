// Imports
import React from 'react'
import { Route, Switch } from 'react-router-dom'

// App Imports
import Layout from './components/layout'
import HomeViewContainer from './components/home/home-container'
import QuestionsAnswersViewContainer from './components/questions/questions-answers-container'
import ProfileDetailsViewContainer from './components/profile/view-container';
import UserLogin from './components/user/login'
import UserRegister from './components/user/register'
import About from './components/about'
import PageNotFound from './components/page-not-found'

const App = () => (
  <Layout>
    <Switch>
      <Route exact path="/" component={HomeViewContainer} />
      <Route exact path="/questions" component={QuestionsAnswersViewContainer} />
      <Route exact path="/user/" component={ProfileDetailsViewContainer}/> 
      <Route path="/user/login" component={UserLogin}/>
      <Route path="/user/register" component={UserRegister}/>
      <Route path="/about" component={About} />
      <Route component={PageNotFound} />
    </Switch>
  </Layout>
);

export default App
