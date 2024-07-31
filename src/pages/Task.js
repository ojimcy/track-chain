// File path: src/components/Task.js

import React, { useState, useEffect } from 'react';
import {
  Col,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import taskImg1 from '../assets/images/taske.png';
import './task.css';
import {
  FaTasks,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useWebApp } from '../hooks/telegram';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const tasks = [
  {
    id: 1,
    title: 'Follow twitter',
    type: 'twitter',
    completed: false,
    link: 'https://twitter.com',
    reward: '100000',
  },
  {
    id: 2,
    title: 'Join channel',
    type: 'telegram',
    completed: true,
    link: 'https://t.me/gemZcoin_bot/tap?startapp=6qlJB9-UHXn8xse4NOuQ5Jv',
    reward: '100000',
  },
  {
    id: 3,
    title: 'Subscribe youtube',
    type: 'youtube',
    completed: false,
    link: 'https://twitter.com/home',
    reward: '200000',
  },
];

const taskIcons = {
  telegram: <FaTelegram className="task-icon" />,
  twitter: <FaTwitter className="task-icon" />,
  youtube: <FaYoutube className="task-icon" />,
  tiktok: <FaTiktok className="task-icon" />,
  others: <FaTasks className="task-icon" />,
};

function Task() {
  const webApp = useWebApp();
  const [modal, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [goClicked, setGoClicked] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const toggleModal = (task = null) => {
    setSelectedTask(task);
    setModal(!modal);
    setGoClicked(false);
    setCountdown(0);
  };

  const handGoBtnClick = async (task) => {
    console.log(task);
    if (task.link.indexOf('t.me') >= 0) {
      webApp.openTelegramLink(task?.link);
    } else {
      webApp.openLink(task.link);
    }
    setGoClicked(true);
  };

  const handleCheckClicked = async (task) => {
    if (!goClicked) {
      setCountdown(15);
    } else {
      try {
        const response = await axios.post('/check', { taskId: task.id });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-page">
      <Container>
        <Row>
          <div className="task-header">
            <div className="title">
              <h3>Tasks</h3>
            </div>
            <div className="sub-title">
              <h6>Complete each of these tasks and receive instant rewards</h6>
            </div>
          </div>
        </Row>
        <Tabs>
          <TabList>
            <Tab>Active</Tab>
            <Tab>Completed</Tab>
          </TabList>
          <TabPanel>
            <Row>
              {activeTasks.map((task) => (
                <Col xs={12} key={task.id}>
                  <Link
                    to="#"
                    className="task-card d-flex justify-content-between align-items-center mt-2"
                    onClick={() => toggleModal(task)}
                  >
                    <div className="task-info d-flex align-items-center">
                      <div className="task-icon">{taskIcons[task.type]}</div>
                      <div className="info d-flex flex-column">
                        <span className="task-title">{task.title}</span>
                        <span className="task-reward">+{task.reward} FBT</span>
                      </div>
                    </div>
                    <div className="task-status">
                      {task.completed ? 'Completed' : 'Start'}
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </TabPanel>
          <TabPanel>
            <Row>
              {completedTasks.map((task) => (
                <Col xs={12} key={task.id}>
                  <Link
                    to="#"
                    className="task-card d-flex justify-content-between align-items-center mt-2"
                    onClick={() => toggleModal(task)}
                  >
                    <div className="task-info d-flex align-items-center">
                      <div className="task-icon">{taskIcons[task.type]}</div>
                      <div className="info d-flex flex-column">
                        <span className="task-title">{task.title}</span>
                        <span className="task-reward">+{task.reward} FBT</span>
                      </div>
                    </div>
                    <div className="task-status">
                      {task.completed ? 'Completed' : 'Start'}
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </TabPanel>
        </Tabs>

        {selectedTask && (
          <Modal isOpen={modal} toggle={toggleModal} className="task-modal">
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <ModalBody>
              <div className="modal-title">
                <p>{selectedTask.title}</p>
              </div>
              <Button
                className="modal-btn"
                onClick={() => {
                  handGoBtnClick(selectedTask);
                }}
              >
                Go
              </Button>
              <img className="task-modal-logo" src={taskImg1} alt="Logo" />
              <p className="reward">+{selectedTask.reward}</p>

              {selectedTask.completed ? (
                <span className="task-modal-completed">Task Completed</span>
              ) : (
                <Button
                  className="modal-btn"
                  onClick={() => {
                    handleCheckClicked(selectedTask);
                  }}
                  disabled={countdown > 0}
                >
                  Check
                </Button>
              )}

              <span color="task-modal-error">
                {countdown > 0 &&
                  `Kindly complete the task and try again in ${countdown} seconds`}
              </span>
            </ModalBody>
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default Task;
