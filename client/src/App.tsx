import { Route, Link, Switch } from 'wouter';
import Login from './pages/Login';
import Users from './pages/Payments';
import About from './pages/Notification';
import Dashboard from './pages/Tenants';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      {/* <Route path="/users" component={Users} />
      <Route path="/about" component={About} /> */}
      <Route>404: Page Not Found</Route>
    </Switch>
  );
}

// export default App;
