/** var */
//변수 선언문 이전에 참조 가능
foo = 1;
var foo;
console.log(foo); //1

//변수 중복 선언 허용이 가능하다
var foo = 2;
console.log(foo); //1

// 함수 레벨 스코프
var x = 1;

if (true) {
  var x = 10;
}

console.log(x);

// var로 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 "선언 단계"와 "초기화 단계"가 한번에 진행된다. 이후 변수 할당문에 도달하면 비로소 값이 할당된다.

console.log(noError); //undefined

var noError = 'no error!';

// var 키워드로 선언한 전역 변수와 전역 함수, 그리고 선언하지 않은 변수에 값을 할당한 암묵적 전역은 전역 객체 window의 프로퍼티가 된다.

/**
 * ES6 - let, const
 */

//변수 선언문 이전에 참조 불가능
//console.log(bar); Cannot access 'bar' before initialization
//console.log(baz)

let bar = 1;
const baz = 100;

// 변수 중복 선언 불가능
//let bar; Identifier 'bar' has already been declared
//const baz = 200; Identifier 'baz' has already been declared

// 블록 레벨 스코프
let y = 1;
const z = 2;

if (true) {
  let y = 11;
  const z = 12;
}

console.log(y); //1
console.log(z); //2

// const 같은 경우 변수 선언과 동시에 초기화 재할당이 불가능(원시값)
const RATE = 20;

const user = {};
const item = [];
user.name = 'Ella';
item[0] = 'banana';

console.log(user); //{name: "Ella"}
console.log(item); //["banana"]

/**
 * let, const 키워드로 선언한 변수는 "선언 단계"와 "초기화 단계"가 분리되어 진행된다. 즉 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로
 * 선언 단계가 먼저 실행되지만 초기화 단계는 변수 선언문에 도달했을 때 된다.
 */

// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.초기화 이전의 일시적 사각지대에서는 변수를 참조할 수 없다.
// console.log(errorBeforeReference);

// 변수 선언문에서 초기화 단계가 실행된다.
let errorBeforeReference;

// 할당문에서 할당 단계가 실행된다.
errorBeforeReference = 'error';

// let, const로 선언한 키워드는 스코프의 시작 지점부터 초기화 단계 시작 지점까지 변수를 참조할 수 없는데 이 구간을 일시적 사각지대(Temporal Dead Zone)ㅣ알고 한다

// let과 const도 호이스팅이 발생한다.

let fooLet = 1;

{
  // console.log(fooLet);
  let fooLet = 2;
}

/**
 * const
 */

// const로 선언한 변수는 재할당이 금지된다.
const fooConst = 1;
// fooConst = 2; Assignment to constant variable

// const 키워드로 선언된 변수에 원시 값을 할당한 경우 값을 변경할 수 없다. 하지만 const 키워드로 선언된 변수에 객체를 할당한 경우 값을 변경할 수 있다.
// 새로운 값을 재할당하는 것은 불가능하지만 프로퍼티의 동적 생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것은 가능하다. 이떄 객체가 변경되더라도 변수에 할당된 참조 값은 변경되지 않는다.
