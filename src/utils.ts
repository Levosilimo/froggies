export function debounce<F extends Function>(func: F, delay: number):F {
  let timeoutID: number;
  return function(this:unknown, ...args: unknown[]) {
    clearTimeout(timeoutID);
    const context = this;
    timeoutID = window.setTimeout(function() {
      func.apply(context, args);
    }, delay);
  } as any;
}
