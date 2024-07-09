export const userData = [
  {
    id: 1,
    avatar: "/img/User1.png",
    messages: [
      {
        id: 1,
        avatar: "/img/User1.png",
        name: "Jane Doe",
        message: "Hey, Jakob",
      },
    ],
    name: "Jane Doe",
  },
  {
    id: 2,
    avatar: "/img/User2.png",
    name: "John Doe",
  },
  {
    id: 3,
    avatar: "/img/User3.png",
    name: "Elizabeth Smith",
  },
  {
    id: 4,
    avatar: "/img/User4.png",
    name: "John Smith",
  },
];

export type UserData = (typeof userData)[number];

export const loggedInUserData = {
  id: 5,
  avatar: "/img/LoggedInUser.jpg",
  name: "Jakob Hoeg",
};

export type LoggedInUserData = typeof loggedInUserData;

export interface Message {
  id: number;
  avatar: string;
  name: string;
  message: string;
}

export interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}
