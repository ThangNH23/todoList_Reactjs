import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListGroup from "react-bootstrap/ListGroup";
import { BiEditAlt } from "react-icons/bi";
import { FaMoon } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";

import "./Todolist.css";

const Todolist = () => {
  const [todolist, setTodolist] = useState("");
  const [todolists, setTodolists] = useState(() => {
    const storageJobs = JSON.parse(localStorage.getItem('Job'));
    return storageJobs ?? []
  });

  const [edit, setEdit] = useState(null);

  const [completedTasks, setCompletedTask] = useState([]);

  const handleCheckboxToggle = (index) => {
    if(completedTasks.includes(index)) {
      setCompletedTask((prev) => prev.filter((item) => item !== index));
    }
    else {
      setCompletedTask((prev) => [...prev, index])
    }
  }

  const handleSubmit = () => {
    setTodolists((prev) => {
      const newList = [...prev, todolist]
      const jsonList = JSON.stringify(newList);
      localStorage.setItem('Job', jsonList)
      return newList;
    });
    setTodolist('');
  };

  const handleDelete = (index) => {
    setTodolists((prev) => {
      const updatedList = [...prev];
      updatedList.splice(index, 1);
      const jsonList = JSON.stringify(updatedList);
      localStorage.setItem('Job', jsonList);
      return updatedList;
    });
  };

  const handleClearAll = () => {
    setTodolists([]);
    localStorage.removeItem('Job')
  }

  return (
    <>
      <div className="container">
        <div className="interface">
          <div className="header_interface">
            <div className="myTask">
              <div className="myTask_title">
                <p>MY TASKS</p>
                <div className="changeColor">
                  <button ><FaMoon /></button>
                </div>
              </div>

              <div className="form_input">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <input
                  value={todolist}
                  onChange={(e) => setTodolist(e.target.value)}
                  className="enterNewTask"
                  placeholder="Add a new task..."
                ></input>
                <button onClick={handleSubmit} className="btn_add">
                  ADD
                </button>
              </div>

              <div className="board_task">
                <ListGroup>
                  <div className="display_task">
                    <div className="header_task">
                      <p> {todolists.length} task left</p>
                    </div>
                    <div className="btn_clear">
                      <button onClick={handleClearAll}>Clear all tasks</button>
                    </div>
                  </div>
                  <div className="line">
                    <hr />
                  </div>

                  <div className="render_allTask">
                    {todolists.map((todolist, index) => (
                      <div className={`my_tasks ${completedTasks.includes(index) ? 'completed' : ''}`} key={index}>
                        <div className="task-row">
                          <div className="leftItem">
                          <input
                            type="checkbox"
                            checked={completedTasks.includes(index)}
                            onChange={() => handleCheckboxToggle(index)}
                          />
                            {edit === index ? (
                              <input type="text"
                              value={todolist}
                              onChange={(e) => {
                                const updatedList = [...todolists];
                                updatedList[index] = e.target.value;
                                setTodolists(updatedList);
                              }} />
                            ) : (
                               <div className="name_task">
                              <p>{todolist}</p>
                            </div>
                            )}
                            
                           
                          </div>
                          <div className="tools">
                            {edit === index ? (
                              <button onClick={() => setEdit(null)}>Save</button>
                            ) : (
                              <button onClick={() => setEdit(index)}>
                              <BiEditAlt />
                            </button>
                            )}
                            
                            <button style={{marginLeft: '10px'}}
                              onClick={() => handleDelete(index)}>
                              <AiOutlineDelete />
                            </button>
                          </div>
                        </div>
                        <div className="lineSecond">
                          <hr/>
                        </div>
                      </div>
                    ))}
                  </div>
                </ListGroup>
              </div>
            </div>
          </div>
          <div className="body_interface"></div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
