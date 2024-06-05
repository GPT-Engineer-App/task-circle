import React, { useState, useEffect } from "react";
import { Container, VStack, Text, Button, Select, CircularProgress, CircularProgressLabel, Box } from "@chakra-ui/react";
import { FaPlay, FaStop } from "react-icons/fa";

const tasks = {
  Emails: 30,
  Review: 60,
  Calculation: 60,
  Research: 60,
  "Deep Focus": 90,
  Sketching: 30,
  Break: 10,
};

const Index = () => {
  const [selectedTask, setSelectedTask] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      setIsCompleted(true);
      setTimeout(() => setIsCompleted(false), 10000); // Show completion screen for 10 seconds
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const startTimer = () => {
    if (selectedTask) {
      setTimeLeft(tasks[selectedTask] * 60);
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeLeft(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  if (isCompleted) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bgGradient="linear(to-r, blue.500, green.500)">
        <Text fontSize="4xl" color="white">
          Time's Up
        </Text>
      </Container>
    );
  }

  if (isRunning) {
    return (
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="black">
        <CircularProgress value={(timeLeft / (tasks[selectedTask] * 60)) * 100} size="120px" color={timeLeft <= 60 ? "red.400" : timeLeft <= 300 ? "yellow.400" : "blue.400"}>
          <CircularProgressLabel color="white">{formatTime(timeLeft)}</CircularProgressLabel>
        </CircularProgress>
        <Text fontSize="6xl" color="white" fontFamily="monospace" mt={4}>
          {formatTime(timeLeft)}
        </Text>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Select placeholder="Select Task" onChange={(e) => setSelectedTask(e.target.value)}>
          {Object.keys(tasks).map((task) => (
            <option key={task} value={task}>
              {task}
            </option>
          ))}
        </Select>
        <CircularProgress value={(timeLeft / (tasks[selectedTask] * 60)) * 100} size="120px" color={timeLeft <= 60 ? "red.400" : timeLeft <= 300 ? "yellow.400" : "blue.400"}>
          <CircularProgressLabel>{formatTime(timeLeft)}</CircularProgressLabel>
        </CircularProgress>
        <Button leftIcon={<FaPlay />} colorScheme="green" onClick={startTimer} isDisabled={!selectedTask || isRunning}>
          Start
        </Button>
        <Button leftIcon={<FaStop />} colorScheme="red" onClick={stopTimer} isDisabled={!isRunning}>
          Stop
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;
