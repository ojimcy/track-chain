import React, { useState, useEffect } from 'react';
import {
  Badge,
  Progress,
  Input,
  Button,
  Alert,
  Spinner,
  Container,
  Card,
} from 'reactstrap';
import {
  FaPaperPlane,
  FaQuestionCircle,
  FaRedo,
  FaTimesCircle,
  FaTrophy,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import './word-puzzle-game.css';
import { getWordOfTheDay, submitWordOfTheDay } from '../lib/server';
import TelegramBackButton from '../components/navs/TelegramBackButton';
import CountdownTimer from '../components/common/CountdownTimer';

function WordPuzzleGame() {
  const [guessesLeft, setGuessesLeft] = useState(5);
  const [userGuess, setUserGuess] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [todayGuess, setTodayGuess] = useState('');

  useEffect(() => {
    // Fetch word of the day and hint from the API
    const fetchWordOfTheDay = async () => {
      try {
        setLoading(true);
        const res = await getWordOfTheDay();

        setHintText(res.hint);
        setTodayGuess(res.guess);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load word of the day.', error);
        setLoading(false);
      }
    };

    fetchWordOfTheDay();
  }, []);

  const handleSubmitGuess = async () => {
    if (!userGuess) return toast.error('Please enter a guess.');

    if (guessesLeft === 0) {
      toast.error("You've used all your attempts.");
      return;
    }

    try {
      setLoading(true);
      // Submit the guess to the API and handle the response
      const response = await submitWordOfTheDay(userGuess);

      // Check the API response
      if (response.message.includes('Correct')) {
        // Correct guess logic from API
        setFeedbackMessage('Correct! You have been rewarded.');
        setGameWon(true);
      } else {
        // Incorrect guess logic
        setFeedbackMessage(response.message);
        setGuessesLeft(response.guessesLeft);
      }
    } catch (error) {
      toast.error(
        error.response.data.message ||
          'Failed to submit guess. Please try again.'
      );
      console.error('Submit guess error:', error);
    } finally {
      setLoading(false);
      setUserGuess('');
    }
  };

  const revealHint = () => {
    setShowHint(true);
  };

  return (
    <Container className="word-puzzle-container">
      <TelegramBackButton />
      <Card className="puzzle-card">
        <h3>Word Puzzle of the Day</h3>
        <p className="text-muted text-sm mt-3">
          Guess the word in 5 tries or less!
        </p>

        <div className="d-flex justify-content-around my-3 w-100">
          <Button
            color="secondary"
            outline
            onClick={revealHint}
            disabled={showHint || todayGuess}
          >
            <FaQuestionCircle className="me-2" /> Hint
          </Button>
          <Badge
            color="secondary d-flex align-items-center"
            className="p-2"
            pill
          >
            <FaRedo className="me-2" />
            Guesses: {guessesLeft}
          </Badge>
        </div>

        <Progress
          color="success"
          value={(5 - guessesLeft) * 20}
          className="mb-3"
        />

        {todayGuess ? (
          <Alert color="info">
            <FaTrophy className="me-2" />
            You&apos;ve already guessed today&apos;s word. Next word available
            in: <br /> <CountdownTimer />
          </Alert>
        ) : (
          <>
            <Input
              type="text"
              placeholder="Enter your guess"
              value={userGuess}
              onChange={(e) => setUserGuess(e.target.value)}
              disabled={gameWon || guessesLeft === 0}
              className="text-center mb-3"
            />

            <div className="d-flex justify-content-around mt-3 w-100">
              <Button
                color="primary"
                onClick={handleSubmitGuess}
                disabled={gameWon || guessesLeft === 0}
              >
                <FaPaperPlane className="me-2" /> Guess
              </Button>
            </div>
          </>
        )}

        {loading && <Spinner className="mt-3" />}

        {showHint && (
          <Alert color="info" className="mt-3">
            {hintText}
          </Alert>
        )}

        {feedbackMessage && (
          <Alert
            color={
              gameWon ? 'success' : guessesLeft === 0 ? 'danger' : 'warning'
            }
            className="mt-3"
          >
            {gameWon ? (
              <FaTrophy className="me-2" />
            ) : guessesLeft === 0 ? (
              <FaTimesCircle className="me-2" />
            ) : null}
            {feedbackMessage}
          </Alert>
        )}
      </Card>
    </Container>
  );
}

export default WordPuzzleGame;
