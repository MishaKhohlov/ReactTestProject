// example middleware
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result
};

const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action)
  }

  let timeoutId = setTimeout(
    () => next(action),
    action.meta.delay
  );

  return function cancel() {
    clearTimeout(timeoutId)
  }
};

const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(done, data) {
    let newAction = Object.assign({}, action, {done}, data);
    delete newAction.promise;
    return newAction
  }

  return action.promise().then(
    result => next(makeAction(true, {result})),
    error => next(makeAction(false, {error}))
  )
};

export {
  logger,
  timeoutScheduler,
  readyStatePromise
}