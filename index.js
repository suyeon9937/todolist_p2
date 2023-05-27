/*document.querySelector는 단일 요소를 반환, 선택 요소가 여러개 일 경우 첫 번째 요소만 반환
('') 요소를 선택*/
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

//로컬 스토리지 저장
let todos = [];
/* 데이터 저장 
setItem 메서드를 사용하여 todos에 객체todos값을 json문자열로 변환(todos는 배열이기 때문)한 값을 지정 
로컬스토리지는 문자열 형태로만 데이터를 저장할 수 있음*/
const save = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
}
// /* 데이터 불러오기
// getItem 메서드를 사용하여 'todos'라는 지정된 키 값 가져오기*/
// const data = localStorage.getItem('todos');
// console.log(data); //지정된 값 출력

//삭제 버튼
/* 
event.target 속성은 이벤트가 발생한 요소를 나타낸다.
target속성에서 부모요소 parentElement를 찾아 target 변수에 할당.
이벤트가 발생한 요소의 부모요소 parentElement 가져오기.
*/
const delItem = (event) => {
  const target = event.target.parentElement;  //target의 부모요소는 ul..?

  todos = todos.filter((todo) => todo.id != target.id);
  save();
  /* 
  filter메서드는 배열에서 새로운 배열을 생성하는 메서드, 콜백함수 실행, true인 요소들로 새로운 배열 반환
  todos 배열에서 todo요소의 id와 target.id를 비교해서 false인 요소를 필터링한 배열을 todos에 할당
   */

  target.remove();
};


// 빈문자가 아니면, 목록 추가
// 삭제 버튼 추가
/* 
 addItem은 todo매개변수를 받아서 실행,
 todo의 텍스트가 빈문자가 아니면 즉 true이면 실행 
 document.createElement('태그') 태그에 해당하는 새로운 요소를 생성하여 각 변수에 할당
*/
const addItem = (todo) => {
  if (todo.text !== '') {
    const li = document.createElement('li');
    const button = document.createElement('button');
    const span = document.createElement('span');

    span.innerText = todo.text;
    button.innerText = '삭제';
    button.addEventListener("click", delItem)

    //자식요소들을 위에 생성한 부모요소들에 추가하기 위해 appendChild메서드 사용
    li.appendChild(span); //span요소를 부모요소인 li에 추가
    li.appendChild(button);

    ul.appendChild(li);
    li.id = todo.id;
  }
};


//submit제출 이벤트가 발생했을때 이벤트 기본 동작 중단
const handler = (event) => {
  event.preventDefault(); //이벤트 기본 동작 취소

  const todo = {
    id: Date.now(),
    text: input.value,
  }; // todo객체 생성  

  todos.push(todo); //todos배열에 todo객체 추가 (할 일 목록에 새로운 항목 추가)
  addItem(todo); //addItem함수 호출하여 새로운 todo를 화면에 추가
  save(); //로컬 스토리지 저장
  
  input.value = ''; //입력 필드의 값을 초기화 시켜주는 코드. 새로운 항목이 추가되면 입력 필드 비워주기
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos')); //JSON.parse는 js객체로 변환

  if(userTodos) {
    userTodos.forEach((todo) => { //배열의 각 요소 반복 작업 수행
      addItem(todo); //todo항목을 화면에 출력
    });
    
    todos = userTodos; // todos배열에 userTodos배열을 할당
  }
};

form.addEventListener('submit', handler);
//form요소에 submit이벤트가 발생했을 때 handler함수 호출
//submit의 기본동작은 새로고침