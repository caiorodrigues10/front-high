"use client";
import { TimerProvider } from "@/context/TimerContext";
import clsx from "clsx";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { SingUpForm } from "./SingUpForm";

export function CardForms() {
  const [activeLogin, setActiveLogin] = useState(true);

  return (
    <div className="flip-card ">
      <div
        className="flip-card-inner  "
        style={{
          transform: activeLogin ? "rotateY(180deg)" : "",
        }}
      >
        <div
          className="flip-card-front"
          style={{
            transform: "rotateY(180deg)",
          }}
        >
          <LoginForm setActiveLogin={setActiveLogin} />
        </div>
        <div className="flip-card-back z-10">
          <TimerProvider>
            <SingUpForm setActiveLogin={setActiveLogin} />
          </TimerProvider>
        </div>
      </div>
    </div>
  );
}
