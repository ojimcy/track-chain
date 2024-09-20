import React, { useState, useEffect, useContext } from 'react';
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from 'reactstrap';
import './earn.css';
import { FaCalendarCheck, FaCheck, FaGreaterThan } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {
  useCurrentUser,
  useReferralLink,
  useTelegramUser,
} from '../hooks/telegram';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Separator } from '../components/common/Seperator';
import DailyRewardModal from '../components/modals/DailyRewardModal';
import { completeTask, getTasks, getUserByTelegramID } from '../lib/server';
import { toast } from 'react-toastify';
import { WebappContext } from '../context/telegram';
import TelegramBackButton from '../components/navs/TelegramBackButton';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { formatBalance } from '../utils/formatBalance';

import telegram from '../assets/images/tasks/telegram.png';
import twitter from '../assets/images/tasks/twitter.png';
import blum from '../assets/images/tasks/blum.png';
import mdogs from '../assets/images/tasks/mdogs.jpg';
import youtube from '../assets/images/tasks/youtube.png';
import xempire from '../assets/images/tasks/xempire.jpeg';
import agent301 from '../assets/images/tasks/agent-301.png';
import referral from '../assets/images/lvl1.jpeg';
import memefi from '../assets/images/tasks/memefi.png';
import major from '../assets/images/tasks/major.png';
import tomarket from '../assets/images/tasks/tomarket.png';

const taskImages = {
  telegram,
  twitter,
  youtube,
  blum,
  mdogs,
  xempire,
  agent301,
  referral,
  memefi,
  major,
  tomarket,
};

function Earn() {
  const { webapp, setUser } = useContext(WebappContext);
  const currentUser = useCurrentUser();
  const telegramUser = useTelegramUser();
  const [modal, setModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [countdown, setCountdown] = useState(0);
  const [rewardModal, setRewardModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [taskStatuses, setTaskStatuses] = useState({});
  const [showSpinner, setShowSpinner] = useState(false);
  const [canClaim, setCanClaim] = useState(false); // New state to track claim availability

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resp = await getTasks(currentUser.id);
        setTasks(resp);
        const initialStatuses = {};
        resp.forEach((task) => {
          initialStatuses[task.id] = task.completed ? 'completed' : 'start';
        });
        setTaskStatuses(initialStatuses);
      } catch (error) {
        toast.error('Failed to fetch tasks.', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [currentUser]);

  const toggleModal = (task = null) => {
    setSelectedTask(task);
    setModal(!modal);
    setCountdown(0);
    setCanClaim(false); // Reset claim state when modal is toggled
  };

  const toggleRewardModal = () => {
    setRewardModal(!rewardModal);
  };

  const handleTaskClick = async (task) => {
    const { id, type, link } = task;

    if (taskStatuses[id] === 'start') {
      // Show the spinner and prevent claiming immediately
      setShowSpinner(true);
      setCanClaim(false);

      // Delay for 3 seconds before enabling "Claim"
      setTimeout(() => {
        if (type === 'referral') {
          const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
            useReferralLink(currentUser)
          )}`;
          webapp.openTelegramLink(telegramUrl);
        } else if (type === 'telegram') {
          webapp.openTelegramLink(link);
        } else {
          webapp.openLink(link);
        }

        // Allow claiming and hide the spinner
        setTaskStatuses((prevStatuses) => ({
          ...prevStatuses,
          [id]: 'claim',
        }));
        setShowSpinner(false);
        setCanClaim(true); // Enable the "Claim" button
      }, 3000); // 3 seconds delay for showing the claim button
    } else if (taskStatuses[id] === 'claim') {
      completeTask(currentUser.id, id, 'no proof')
        .then(async () => {
          setTasks((prevTasks) =>
            prevTasks.map((t) => (t.id === id ? { ...t, completed: true } : t))
          );
          setTaskStatuses((prevStatuses) => ({
            ...prevStatuses,
            [id]: 'completed',
          }));
          let user = await getUserByTelegramID(telegramUser.id);
          setUser(user);
          toast.success('Task completed!', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
          });
          toggleModal();
        })
        .catch((error) => {
          console.error('Error completing task:', error.response.data);
          toast.error(error.response?.data.error);
        });
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

  // Check if the lastCheckinDate is today
  const lastCheckinDate = new Date(currentUser.lastCheckinDate);
  const today = new Date();
  const isCheckinToday =
    lastCheckinDate.toDateString() === today.toDateString();

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="task-page">
      <Container>
        <TelegramBackButton />
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

        {loading ? (
          <LoadingSpinner />
        ) : (
          <Tabs>
            <TabList>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
            </TabList>
            <TabPanel>
              <Row>
                <h3>Daily tasks</h3>
                <Col xs={12}>
                  <Link
                    to="#"
                    className="task-card d-flex justify-content-between align-items-center mt-2"
                    onClick={() => toggleRewardModal()}
                  >
                    <div className="task-info d-flex align-items-center">
                      <div className="task-icon">
                        <FaCalendarCheck />
                      </div>
                      <div className="info d-flex flex-column">
                        <span className="task-title">Daily Checking</span>
                        <span className="task-reward">+10,000,000</span>
                      </div>
                    </div>
                    <div className="task-status">
                      {isCheckinToday ? (
                        <div className="completed">
                          <FaCheck />
                        </div>
                      ) : (
                        <FaGreaterThan />
                      )}
                    </div>
                  </Link>
                </Col>
                <Separator />
              </Row>
              <Row>
                <h3 className="mt-5">Tasks List</h3>
                {activeTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <Col xs={12}>
                      <Link
                        to="#"
                        className="task-card d-flex justify-content-between align-items-center my-1"
                        onClick={() => toggleModal(task)}
                      >
                        <div className="task-info d-flex align-items-center">
                          <div className="task-icon">
                            <img
                              src={taskImages[task.type]}
                              alt={task.type}
                              className="task-image"
                            />
                          </div>
                          <div className="info d-flex flex-column">
                            <span className="task-title">
                              {task.description}
                            </span>
                            <span className="task-reward">
                              +{formatBalance(task.reward)}
                            </span>
                          </div>
                        </div>
                        <div className="task-status">
                          {task.completed ? (
                            <div className="completed">
                              <FaCheck />
                            </div>
                          ) : (
                            'Start'
                          )}
                        </div>
                      </Link>
                    </Col>
                    <Separator />
                  </React.Fragment>
                ))}
              </Row>
            </TabPanel>
            <TabPanel>
              <Row>
                {completedTasks.map((task) => (
                  <React.Fragment key={task.id}>
                    <Col xs={12}>
                      <Link
                        to="#"
                        className="task-card d-flex justify-content-between align-items-center mt-2"
                        onClick={() => toggleModal(task)}
                      >
                        <div className="task-info d-flex align-items-center">
                          <div className="task-icon">
                            <img
                              src={taskImages[task.type]}
                              alt={task.type}
                              className="task-image"
                            />
                          </div>
                          <div className="info d-flex flex-column">
                            <span className="task-title">
                              {task.description}
                            </span>
                            <span className="task-reward">
                              +{formatBalance(task.reward)}
                            </span>
                          </div>
                        </div>
                        <div className="task-status">
                          {task.completed ? (
                            <div className="completed">
                              <FaCheck />
                            </div>
                          ) : (
                            'Start'
                          )}
                        </div>
                      </Link>
                    </Col>
                    <Separator />
                  </React.Fragment>
                ))}
              </Row>
            </TabPanel>
          </Tabs>
        )}

        {selectedTask && (
          <Modal isOpen={modal} toggle={toggleModal} className="task-modal">
            <ModalHeader toggle={toggleModal}></ModalHeader>
            <ModalBody>
              <div className="modal-title">
                <p>{selectedTask.name}</p>
              </div>
              <img
                className="task-modal-logo"
                src={taskImages[selectedTask.type]}
                alt={selectedTask.type}
              />
              <p className="text-center">
                Complete this task to claim {formatBalance(selectedTask.reward)}{' '}
                SHREK tokens
              </p>
              <div className="claim-button text-center">
                {showSpinner && <LoadingSpinner />}
                {canClaim && (
                  <Button
                    className="btn btn-primary"
                    onClick={() => handleTaskClick(selectedTask)}
                  >
                    Claim
                  </Button>
                )}
              </div>
            </ModalBody>
          </Modal>
        )}

        {rewardModal && (
          <DailyRewardModal isOpen={rewardModal} toggle={toggleRewardModal} />
        )}
      </Container>
    </div>
  );
}

export default Earn;
