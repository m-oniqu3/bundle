import { State } from "./reducer";

export const initialState: State = {
  activeBoard: null,
  boards: [
    { name: "Development", id: 20 },
    { name: "Testing", id: 74 },
    { name: "Deployment", id: 49 },
    { name: "Books", id: 1 },
    { name: "Chores", id: 2 },
    { name: "Birds", id: 3 },
    { name: "Assignments", id: 4 },
    { name: "Subjects", id: 5 },
    { name: "Cars", id: 6 },
  ],
  columns: {
    20: [
      { name: "To Do", id: 1, colour: "#EAEAEA" },
      { name: "In Progress", id: 2, colour: "#ACBEA3" },
      { name: "Code Review", id: 3, colour: "#DFF8EB" },
    ],
    74: [
      { name: "To Test", id: 4, colour: "#FECEF1" },
      { name: "In Progress", id: 5, colour: "#9DD9D2" },
      { name: "Done", id: 6, colour: "#FFEAEC" },
    ],
    49: [
      { name: "Pending", id: 7, colour: "#F39A9D" },
      { name: "In Progress", id: 8, colour: "#C0E0DE" },
      { name: "Done", id: 9, colour: "#DAD4EF" },
    ],
    1: [
      { name: "To Read", id: 1, colour: "#EAEAEA" },
      { name: "Reading Now", id: 2, colour: "#ACBEA3" },
      { name: "Read", id: 3, colour: "#DFF8EB" },
    ],
    2: [
      { name: "To Do", id: 1, colour: "#FECEF1" },
      { name: "In Progress", id: 2, colour: "#9DD9D2" },
      { name: "Done", id: 3, colour: "#FFEAEC" },
    ],
    3: [
      { name: "Observation", id: 1, colour: "#F39A9D" },
      { name: "Recording", id: 2, colour: "#C0E0DE" },
      { name: "Analysis", id: 3, colour: "#DAD4EF" },
    ],
    4: [
      { name: "To Do", id: 1, colour: "#FCC2BD" },
      { name: "In Progress", id: 2, colour: "#B9E6F0" },
      { name: "Completed", id: 3, colour: "#C8F4FF" },
    ],
    5: [
      { name: "Mathematics", id: 1, colour: "#FFD3B6" },
      { name: "Science", id: 2, colour: "#B2E4E0" },
      { name: "History", id: 3, colour: "#D0B3E6" },
    ],
    6: [
      { name: "To Buy", id: 1, colour: "#FFB6C1" },
      { name: "In Use", id: 2, colour: "#B6DEFD" },
      { name: "Sold", id: 3, colour: "#FDD7E4" },
    ],
  },
  rows: {
    20: {
      1: [
        { id: 11, content: "Setup project" },
        { id: 12, content: "Implement authentication" },
      ],
      2: [{ id: 13, content: "Refactor codebase" }],
    },
    74: {
      4: [{ id: 14, content: "Write unit tests" }],
      5: [{ id: 15, content: "Perform integration testing" }],
    },
    49: { 7: [{ id: 16, content: "Prepare deployment scripts" }] },
    1: {
      1: [
        { id: 1, content: "The Great Gatsby" },
        { id: 2, content: "To Kill a Mockingbird" },
        { id: 3, content: "1984" },
      ],
      2: [
        { id: 4, content: "Harry Potter and the Sorcerer's Stone" },
        { id: 5, content: "The Catcher in the Rye" },
        { id: 6, content: "Pride and Prejudice" },
      ],
    },
    2: {
      1: [
        { id: 1, content: "Laundry" },
        { id: 2, content: "Grocery Shopping" },
        { id: 3, content: "Clean the Garage" },
        { id: 4, content: "Mow the Lawn" },
      ],
      2: [
        { id: 5, content: "Wash the Car" },
        { id: 6, content: "Walk the Dog" },
      ],
    },
    3: {
      1: [
        { id: 1, content: "Cardinal" },
        { id: 2, content: "Blue Jay" },
        { id: 3, content: "Robin" },
      ],
      2: [
        { id: 4, content: "Sparrow" },
        { id: 5, content: "Finch" },
      ],
    },
    4: {
      1: [
        { id: 1, content: "Homework 1" },
        { id: 2, content: "Essay" },
        { id: 3, content: "Research Project" },
        { id: 4, content: "Presentation" },
        { id: 5, content: "Group Project" },
      ],
      2: [
        { id: 6, content: "Midterm Exam" },
        { id: 7, content: "Final Project" },
        { id: 8, content: "Quiz" },
      ],
    },
    5: {
      1: [
        { id: 1, content: "Algebra" },
        { id: 2, content: "Biology" },
        { id: 3, content: "Chemistry" },
        { id: 4, content: "Physics" },
      ],
      2: [
        { id: 5, content: "English Literature" },
        { id: 6, content: "World History" },
        { id: 7, content: "Geography" },
      ],
    },
    6: {
      1: [
        { id: 1, content: "Toyota Corolla" },
        { id: 2, content: "Honda Civic" },
        { id: 3, content: "Ford Mustang" },
        { id: 4, content: "Tesla Model 3" },
        { id: 5, content: "Chevrolet Camaro" },
      ],
      2: [
        { id: 6, content: "BMW 3 Series" },
        { id: 7, content: "Mercedes-Benz C-Class" },
        { id: 8, content: "Audi A4" },
        { id: 9, content: "Volkswagen Golf" },
      ],
    },
  },
};
