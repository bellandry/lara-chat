import React, { useState } from "react";

export const EventBusContext = React.createContext()

export const EventBusProvider = ({ children }) => {
  const [events, setEvents] = useState({})

  const emit = (name, data) => {
    if (events[name]) {
      for (let callbackName of events[name]) {
        callbackName(data)
      }
    }
  }

  const on = (name, callbackName) => {
    if (!events[name]) {
      events[name] = []
    }

    events[name].push(callbackName)

    return () => {
      events[name] = events[name].filter((callback) => callback !== callbackName)
    }
  }

  return (
    <EventBusContext.Provider value={{ emit, on }}>
      {children}
    </EventBusContext.Provider>
  )
}

export const UserEventBus = () => {
  return React.useContext(EventBusContext)
}