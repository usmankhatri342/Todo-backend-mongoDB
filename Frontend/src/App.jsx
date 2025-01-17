import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import toast from "react-hot-toast";
const App = () => {
  // const base_url = "https://todos-backend-5kwp.vercel.app";
  const base_url = "http://localhost:3000";
  const [todos, setTodos] = useState([]);
  // const [isEdit, setIsEdit] = useState(false);
  // const [inptodo, setInptodo] = useState(null);

  const getTodo = async () => {
    try {
      const res = await axios(`${base_url}/getTodos`);
      // let todoData = res?.data?.data.map((todo) => ({
      //   ...todo,
      //   todoContent: todo.todoContent || "No Content",
      //   id: todo.id || "No id",

      // }));
      let todoData = res?.data?.data;
      // todoData.map((todo) => (
      //  console.log("todo", todo.todoContent , todo.id)

      // ));
      const myState = todoData.map((todos) => {
        // return { ...todos, isEditing: false };
      });
      console.log("todoData", todoData);
      setTodos(todoData); //data ko set karne k liye use hota hai
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  // const inpvalue = (e) => {
  //   try {

  //     let todo = e.target[0].value;
  //     console.log(todo);
  //     setInptodo(todo);
  //     todo = e.target[0].value = "";
  //   } catch (error) {}
  // };
  // useEffect(() => {
  //   inpvalue();
  // }, []);

  //post request

  const addTodo = async (event) => {
    try {
      event.preventDefault();

      let inpValue = event.target[0].value;

      if (inpValue.trim() === "") {
        toast.dismiss();
        // toast.error("Please Enter Todo !");
        return;
      }
      const res = await axios.post(`${base_url}/addTodo`, {
        todo: inpValue,
      });
      // console.log(res);
      getTodo(); //page refresh karne par value mil rhi thi is lye hume function ko call krna para
      event.target.reset(); //ye form ko clear krne k liye use hota hai
    } catch (error) {
      console.log(error);
    }
  };
  // Edit todo
  let editTodo = async (todoId,e) => {
    try {
      const { data } = await axios.patch(`${base_url}/editTodo/${todoId}`);

     e.preventDefault();
     e.target
     console.log(e.target);
     
      // setEditTodos(true);
      getTodo();
    } catch (error) {}
  };

  // delete requset
  const deleteTodo = async (todoId) => {
    // console.log("todoId", todoId);
    try {
      const { data } = await axios.delete(`${base_url}/deletTodo/${todoId}`);
      console.log("datas", data.message);
      toast.dismiss();
      toast.success(data.message);
      getTodo();
    } catch (error) {
      // console.log(error.response.data);
      toast.dismiss(); //toast message ko dismiss karne k liye use hota hai
      toast.error(error.response.data); //error message ko show karne k liye use hota hai
    }
  };
  return (
    <>
      <div className="">
        <div className="container mx-auto flex justify-center items-center">
          <div className="">
            
          </div>
        </div>
      </div>
      <div className="App flex flex-col items-center justify-center min-h-screen bg-blue-200 py-10">
        <h1 className="font-extrabold text-5xl py-4 text-transparent bg-clip-text bg-gradient-to-r text-amber-800">
          MY TODO APP
        </h1>
        <form
          onSubmit={addTodo}
          className="w-full max-w-md bg-amber-700 p-20 rounded-lg shadow-lg"
        >
          <input
            type="text"
            className="w-full border border-amber-900 p-3 rounded mb-4 focus:outline-none focus:ring-2  bg-amber-900 text-white"
            placeholder="MY TODO"
          />
          <button
            type="submit"
            className="w-20 items-center   text-white p-3 rounded bg-amber-900 border-amber-900 "
          >
            enter
          </button>
          <div className="mt-6">
            {!todos?.length && (
              <div className="flex justify-center items-center font-bold text-white">
              empty todo
              </div>
            )}
            {todos?.map((value, index) => (
              <div
                key={value?.id}
                className="flex justify-between items-center p-3 border border-gray-600 rounded mt-2 bg-gray-700 shadow-sm"
              >
                {!value.isEditing ? (
                  <div className="flex justify-between items-center w-full">
                    <div className="text-white ">
                      {
                        // console.log(value?.isEditing)
                      }

                      <span className="bg-amber-700 p-2 rounded-md ">
                        {value.todoContent}
                      </span>

                      {/* {value.todoContent} */}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          const newTodo = todos.map((todos, i) => {
                            if (i === index) {
                              todos.isEditing = true;
                            } else {
                              todos.isEditing = false;
                            }
                            return todos;
                          });

                          console.log("edit ho gaya");

                          // todos[index].isEditing = true;
                          setTodos([...newTodo]); //sprit opareter new arr me valve set kar de ga
                        }}
                        className="bg-amber-700 text-white p-2 rounded hover:bg-amber-400 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTodo(value?.id)}
                        className="bg-amber-700 text-white p-2 rounded hover:bg-amber-400 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>

                    {/* isEditing true ui me show karna hai */}
                  </div>
                ) : (
                  <form
                  onClick={()=>editTodo(value?.id,e)}
                   className="text-white flex justify-between items-center w-full">
                    <input
                      className="bg-gray-600 focus:outline-gray-900 outline-none   p-2 rounded-md "
                      type="text"
                      defaultValue={value.todoContent}
                      name=""
                      id=""
                    />
                    <div className="flex space-x-2">
                      <button 
                      onClick={()=>{
                        const newTodo = todos.map((todos, i) => {
                          if (i === index) {
                            todos.isEditing = false;
                          }
                          // } else {
                          //   todos.isEditing = true;
                          // }
                          return todos;
                        });
                        setTodos([...newTodo]);
                      }}
                      className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition duration-200">
                        Cancel
                      </button>
                      <button
                      // onClick={() => editTodo(value?.id)}
                      type="submit"
                      className="bg-green-500 text-white p-2 rounded hover:bg-green-600 transition duration-200">
                        Save
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
