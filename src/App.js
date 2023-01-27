import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";
import React, { useReducer, useRef } from "react";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT":
      return action.data;

    case "CREATE":
      newState = [action.data, ...state];
      break;

    case "REMOVE":
      newState = state.filter((it) => it.id !== action.targetId);
      break;

    case "EDIT":
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;

    default:
      return state;
  }
  return newState;
};

export const DiaryStateContext = React.createContext();
export const DiaryDispachContext = React.createContext();

const dummyData = [
  {
    id: 1,
    emotion: 1,
    content: "첫 번째 일기",
    date: 1674826986570,
  },
  {
    id: 2,
    emotion: 2,
    content: "두 번째 일기",
    date: 1674826986571,
  },
  {
    id: 3,
    emotion: 3,
    content: "세 번째 일기",
    date: 1674826986572,
  },
  {
    id: 4,
    emotion: 4,
    content: "네 번째 일기",
    date: 1674826986573,
  },
  {
    id: 5,
    emotion: 5,
    content: "다섯 번째 일기",
    date: 1674826986574,
  },
];

function App() {
  const [data, dispatch] = useReducer(reducer, dummyData);
  const dataId = useRef(0);

  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };

  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  const onEdit = (targetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: targetId,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispachContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/new" element={<New />}></Route>
              <Route path="/edit" element={<Edit />}></Route>
              <Route path="/diary/:id" element={<Diary />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </DiaryDispachContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
