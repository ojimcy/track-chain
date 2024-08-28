import React, { useState, useEffect, useContext } from 'react';
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
import './earn.css';
import {
  FaCalendarCheck,
  FaCheck,
  FaGreaterThan,
  FaTelegram,
  FaTiktok,
  FaTwitter,
  FaUsers,
  FaYoutube,
} from 'react-icons/fa';
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

const taskIcons = {
  telegram: <FaTelegram className="task-icon" />,
  twitter: <FaTwitter className="task-icon" />,
  youtube: <FaYoutube className="task-icon" />,
  tiktok: <FaTiktok className="task-icon" />,
  referral: <FaUsers className="task-icon" />,
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
  };

  const toggleRewardModal = () => {
    setRewardModal(!rewardModal);
  };

  const handleTaskClick = async (task) => {
    const { id, type, link } = task;

    if (taskStatuses[id] === 'start') {
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
      setTaskStatuses((prevStatuses) => ({
        ...prevStatuses,
        [id]: 'claim',
      }));
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
                            {taskIcons[task.type]}
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
                            {taskIcons[task.type]}
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
              <img className="task-modal-logo" src={taskImg1} alt="Logo" />
              <p className="description">{selectedTask.description}</p>
              <p className="reward">+{formatBalance(selectedTask.reward)}</p>

              {selectedTask.completed ? (
                <span className="task-modal-completed">Task Completed</span>
              ) : (
                <Button
                  className="modal-btn"
                  color={
                    taskStatuses[selectedTask.id] === 'completed'
                      ? 'success'
                      : taskStatuses[selectedTask.id] === 'claim'
                      ? 'success'
                      : 'primary'
                  }
                  onClick={() => handleTaskClick(selectedTask)}
                  disabled={
                    countdown > 0 ||
                    taskStatuses[selectedTask.id] === 'completed'
                  }
                >
                  {taskStatuses[selectedTask.id] === 'claim'
                    ? 'Claim'
                    : 'Start'}
                </Button>
              )}

              {countdown > 0 && (
                <span className="task-modal-error">
                  Kindly complete the task and try again in {countdown} seconds
                </span>
              )}
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
