import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";
import { DataModel, Id } from '../convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../convex/_generated/api';

// For demo purposes. In a real app, you'd have real user data.
const NAME = getOrSetFakeName();

export default function App() {
  // TODO: Add mutation hook here.
  const createBuilding = useMutation(api.tasks.editing.buildings.createBuilding);

  return (
    <main className="chat">
      <header>
        <h1>Convex Chat</h1>
        <p>
          Connected as <strong>{NAME}</strong>
        </p>
      </header>
      {messages?.map((message) => (
        <article key={message._id} className={message.formerUse === NAME ? 'message-mine' : ''}>
          <div>{message.formerUse}</div>

          <p>{message.type}</p>
        </article>
      ))}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await createBuilding({ formerUse: NAME, buildingType: newMessageText });
          setNewMessageText('');
        }}
      >
        <input
          value={newMessageText}
          onChange={async (e) => {
            const text = e.target.value;
            setNewMessageText(text);
          }}
          placeholder="Write a message…"
          autoFocus
        />
        <button type="submit" disabled={!newMessageText}>
          Send
        </button>
      </form>
    </main>
  );
}

function getOrSetFakeName() {
  const NAME_KEY = "tutorial_name";
  const name = sessionStorage.getItem(NAME_KEY);
  if (!name) {
    const newName = faker.person.firstName();
    sessionStorage.setItem(NAME_KEY, newName);
    return newName;
  }
  return name;
}
