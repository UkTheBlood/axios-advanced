import axios from "axios";
import { useEffect, useState } from "react";

function App() {

  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  });

  const fetchTodos = async () => {
    const { data } = await axios.get('http://localhost:4000/todos');
    // console.log("data", data)
    setTodos(data);
  }

  const onSubmitHandler = async () => {   // 항상 인자를 받아야 함
    axios.post('http://localhost:4000/todos', inputValue);
    setTodos([...todos, inputValue]);    // 서버와 동기화 X
  }

  const onDeleteButtonHandler = async () => {

  }

  // console.log(todos)

  useEffect(() => {
    // db로부터 값을 가져올 것이다.
    fetchTodos()
  }, []);    // 의존성 배열 onSubmitHandler

  return (
    <div>
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
