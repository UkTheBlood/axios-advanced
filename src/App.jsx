import axios from "axios";
import { useEffect, useState } from "react";
import api from './axios/api'

function App() {

  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  });

  const [targetId, setTargetId] = useState('');
  const [targetTitle, setTargetTitle] = useState('');



  // 조회 함수
  const fetchTodos = async () => {
    // const { data } = await axios.get('http://localhost:4000/todos');
    const { data } = await api.get('/todos');
    setTodos(data);
  }

  // 추가 함수
  const onSubmitHandler = async () => {
    // axios.post('http://localhost:4000/todos', inputValue);
    api.post('/todos', inputValue)
    fetchTodos();    // 서버와 동기화 X
    setInputValue({
      title: ""
    });
  }

  // 삭제 함수
  const onDeleteButtonHandler = async (id) => { // 항상 인자를 받아야 함
    // axios.delete(`http://localhost:4000/todos/${id}`)
    api.delete(`/todos/${id}`)
    setTodos(todos.filter((item) => {
      return item.id !== id;
    }))
  }

  // 수정 함수
  const onUpdateButtonHanlder = async () => {
    // axios.patch(`http://localhost:4000/todos/${targetId}`, {
    //   title: targetTitle    // 바꿀 내용 => title을 targetTitle로 바꾸자
    // });

    api.patch(`/todos/${targetId}`, {
      title: targetTitle
    })

    setTodos(todos.map((item) => {
      if(item.id == targetId) {       
        // item의 id가 targetId와 같은 경우 (형이 맞지 않아 동등연산자 사용)
        return {...item, title: targetTitle}    // item의 title을 targetTitle로 바꿔줘
      } else {                        // 아니면 냅둬
        return item
      }
    }))
    
    setTargetId('')
    setTargetId('')
  }

  useEffect(() => {
    // db로부터 값을 가져올 것이다.
    fetchTodos()
  }, []);    // 의존성 배열 onSubmitHandler

  return (
    <div>
      <div>
        {/* 수정 영역 */}
        <input type="text" placeholder="수정할 아이디"
          value={targetId}
          onChange={(e) => {
            setTargetId(e.target.value)
          }}
        />

        <input type="text" placeholder="수정할 내용"
          value={targetTitle}
          onChange={(e) => {
            setTargetTitle(e.target.value)
          }}
        />

        <button onClick={onUpdateButtonHanlder}>수정!</button>
      </div>

      <br />

      <div>
        {/* input 영역 */}
        <form onSubmit={(e) => {
          e.preventDefault();   // 막아주어야 함

          // 버튼 클릭시, input에 들어있는 값(state)을 이용하여 db에 저장 (post 요청)
          onSubmitHandler();

        }}>
          <input
            type='text'
            value={inputValue.title}
            onChange={(e) => {
              setInputValue({
                title: e.target.value,
              })
            }}
          />
          <button>추가</button>
          {/* form 태그 안에 button이 있으면 이 button은 submit 속성을 가지고 있음 */}
          {/* submit은 button을 누를 때마다 새로고침이 일어남 */}
        </form>

      </div>

      <div>
        {/* 데이터 영역 */}
        {todos?.map(item => {
          return (
            <div key={item.id}>
              {item.id} : {item.title}
              &nbsp; &nbsp; &nbsp;
              <button onClick={() => onDeleteButtonHandler(item.id)}>삭제</button>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
