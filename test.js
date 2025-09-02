import http from "k6/http";
import { check } from "k6";

// Test configuration
export const options = {
  scenarios: {
    chat_endpoint_test: {
      executor: "constant-vus", //Type of load
      exec: "chatTest", // The function to execute for this scenario
      vus: 7, // 7 virtual users dedicated to this scenario
      duration: "30s",
    },
    tts_endpoint_test: {
      executor: "constant-vus",
      exec: "ttsTest",
      vus: 3,
      duration: "30s",
    },
  },
};

export function chatTest() {
  const res = http.get("http://localhost:5001/chat?question=hello");
  check(res, { "chat status is 200": (r) => r.status === 200 });
}

export function ttsTest() {
  const res = http.get("http://localhost:5001/tts?word=testing");
  check(res, { "tts status is 200": (r) => r.status === 200 });
