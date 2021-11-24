const FlightsLiveStart = loadable(() => import("js/components/flights/live/FlightsLiveStart"));
const FlightsLiveResults = loadable(() => import("js/components/flights/live/FlightsLiveResults"));
const AppError404 = loadable(() => import("js/components/app/AppError404"));

const Routes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={FlightsLiveStart} />
        <Route exact path='/flights'>
          <Redirect to='/' />
        </Route>
        <Route strict path='/flights/results' component={FlightsLiveResults} />
        <Route path='*'>
          <AppError404 />
        </Route>
      </Switch>
    </Suspense>
  );
};

export default Routes;
