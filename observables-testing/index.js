const { Observable, fromEvent, interval, of } = require('rxjs');
const { map, filter, take, concatAll, catchError, mergeAll, switchMap, concatMap, mergeMap, exhaustMap } = require('rxjs/operators');
 
function obsFunc(subscriber) {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  subscriber.complete();
}

function nextHandler(val) {
  console.log(val);
}

function errorHandler(e) {
  console.log(e);
}

function completeHandler() {
  console.log("done?");
}

const myObs = new Observable(obsFunc);

myObs.subscribe({next: nextHandler, error: errorHandler, complete: completeHandler});

const myOf = of(of(0, 1, 2, 3), of(4, 5, 6, 7)).pipe(
  concatAll()
);

myOf.subscribe((val) => console.log(val));

function incrementAfterOneSecond(value, total) {
  var curVal = value;
  var count = 0;

  return new Observable((observer) => {
    //console.log("emit", curVal);

    var _id = setInterval(() => {
      console.log("i:", value);
      observer.next(curVal);
      curVal++;
      if (++count == total) {
        clearInterval(_id);
        observer.complete();
      }
      //observer.error("rut roh1");
    }, 1000);
  });
}

function incrementAfterTwoSeconds(value) {
  return new Observable((observer) => {
    var _id = setTimeout(() => {
      observer.next(value+1);
      observer.complete();
      //observer.error("rut roh2");
    }, 2000);
  });
}

function incrementAfterThreeSeconds(value) {
  return new Observable((observer) => {
    var _id = setTimeout(() => {
      observer.next(value+1);
      observer.complete();
      //observer.error("rut roh3");
    }, 3000);
  });
}

incrementAfterOneSecond(1, 1).pipe(
    concatMap(x => incrementAfterOneSecond(10+x, 4)),
    //concatMap(x => incrementAfterOneSecond(10+x, 3))
    //switchMap(x => incrementAfterOneSecond(10+x, 3))
    //mergeMap(x => incrementAfterOneSecond(10+x, 3))
    exhaustMap(x => incrementAfterOneSecond(10+x, 3))
  ).subscribe(x => console.log("output:", x));

/*
incrementAfterOneSecond(500).pipe(
    concatMap(x => incrementAfterTwoSeconds(x)),
    concatMap(y => incrementAfterThreeSeconds(y))
  ).subscribe({
    next: x => console.log("TEST2:", x),
    error: x => console.log("TEST2e:", x),
    complete: () => console.log("TEST2c"),
  });

incrementAfterOneSecond(500).pipe(
    map(x => incrementAfterTwoSeconds(x)),
    concatAll()
  ).pipe(
    map(y => incrementAfterThreeSeconds(y)),
    concatAll()
  ).subscribe({
    next: x => console.log("TEST2:", x),
    error: x => console.log("TEST2e:", x),
    complete: () => console.log("TEST2c"),
  });
*/