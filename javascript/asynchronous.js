/**
 * 자바스크립트는 한 번에 하나의 태스크만 실행할 수 있는 싱글 스레드 방식으로 동작한다.
 * 동기 처리 방식은 태스크를 순서대로 하나씩 처리하므로 실행 순서가 보장된다는 장점이 있지만, 앞선 태스크가 종료할 때까지 이후
 * 태스크들이 블로킹 되는 단점이 있다. 비동기 처리 방식은 현재 실행 중인 태스크가 종료되지 않은 상태라 해도 다음 태스크를 곧바로 실행하므로
 * 블로킹이 발생하지 않는다는 장점이 있지만, 태스크의 실행 순서가 보장되지 않는 단점이 있다.
 * 타이머 함수임 setTimeout과 setInterval, HTTP요청, 이벤트 핸들러는 비동기 처리 방식으로 동작한다.
 * 비동기 처리는 이벤트 루프와 태스크 큐와 깊은 관련이 있다.
 */

/**
 * 태스크 큐란 setTimeout과 setInterval와 같은 비동기 함수의 콜백 함수 또는 이벤트 핸들러가 일시적으로 보관되는 영역이다. 태스크 큐와는 별도로
 * 프로미스의 후속 처리 메서드의 콜백 함수가 일시적으로 보관되는 마이크로 태스크 큐도 존재한다.
 */
/**
 * 이벤트 루프
 * 이벤트 루프는 콜스택에 현재 실행 중인 실행 컨텍스트가 있는지, 그리고 태스크 큐에 대기 중인 함수(콜백 함수, 이벤트 핸들러 등)가 있는지
 * 반복해서 확인한다. 만약 콜스택이 비어있고 태스크 큐에 대기중인 함수가 있다면 이벤트 루프는 순차적으로 태스크 큐에 대기중인 함수를 콜스택으로 이동시킨다.
 * 이때 콜스택으로 이동한 함수는 실행된다. 즉 태스크 큐에 일시 보관된 함수들은 비동기 처리 방식으로 동작한다.
 */

function foo() {
  console.log('foo');
}

function bar() {
  console.log('bar');
}
function foo1() {
  console.log('foo1');
}
function bar2() {
  console.log('bar2');
}

setTimeout(foo, 0);

bar();
foo1();
bar2();

/**
 * 1. 전역 코드가 평가되어 전역 실행 컨텍스트가 생성되고 콜스택에 푸시된다.
 * 2. 전역 코드가 실행되기 시작하여 setTimeout 함수가 호출된다. 이때 setTimeout 함수의 함수 실행 컨텍스트가 생성되고 콜스택에 푸시되어 현재 실행 중인 실행 컨텍스크가 된다. 브라우저의 Web API(호스트 객체)인 타이머 함수도 함수이므로 함수 실행 컨텍스트를 생성한다.
 * 3. setTimeout함수가 실행되면 콜백 함수를 호출 스케줄링하고 종료되어 콜스택에서 팝된다. 이때 호출 스케줄링, 즉 타이머 설정과 타이머가 만료되면 콜백 함수를 태스크 큐에 푸시하는 것은 브라우저의 역할이다.
 * 4. 브라우저가 수행하는 4-1과 자바스크립트 엔진이 수행하는 4-2는 병행 처리된다.
 * 4-1. 브라우저는 타이머를 설정하고 타이머의 만료를 기다린다. 이후 타이머가 만료되면 콜백 함수 foo가 태스크 큐에 푸시된다. 위 예제의 경우 지연 시간(delay)가 0이지만 지연 시간이 4ms이하인 경우 최소 지연 시간 4ms가 지정된다. 따라서 4ms 후에 콜백 함수 foo가
 * 태스크 큐에 푸시되어 대기하게 된다. 이 처리 또한 자바스크립트 엔진이 아니라 브라우저가 수행한다. 이처럼 setTimeout함수로 호출 스케줄링한 콜백 함수는 정확히 지연 시간 후에 호출된다는 보장은 없다.
 * 지연 시간 이후에 콜백함수가 태스크 큐에 대기하게 되지만 콜스택이 비어야 호출되므로 약간의 시간차가 발생할 수 있기 때문이다.
 * 4-2 bar함수가 호출되어 bar함수의 함수 실행 컨텍스트가 생성되고 콜 스택에 푸시되어 현재 실행 중인 실행 컨텍스트가 된다. 이후 bar함수가 종료되어 콜스택에서 팝된다.
 * 이때 브라우저가 타이머를 설정한 후 4ms가 경과했다면 foo함수는 아직 태스크 큐에서 대기 중이다.
 * 5. 전역 코드 실행이 종료되고 전역 실행 컨텍스트가 콜 스택에서 팝된다. 이로서 콜스택에는 아무런 실행 컨텍스트도 존재하지 않게 된다.
 * 6. 이벤트 루프에 의해 콜스택이 비어있음이 감지되고 태스크 큐에서 대기 중인 콜백 함수 foo가 이벤트 루프에 의해 콜스택에 푸시된다. 다시 말해, 콜백 함수
 * foo의 함수 실행 컨텍스트가 생성되고 콜스택에 푸시되어 현재 실행 중인 실행 컨텍스트가 된다. 이후 foo함수가 종료되어 콜스택에서 팝된다.
 *
 */
