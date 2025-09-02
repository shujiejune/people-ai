import http from "k6/http";
import { check } from "k6";

// Test configuration
export const options = {
  vus: 10, // 10 virtual users
  duration: "30s", // Test duration
};

// The code that will be executed by each virtual user
export default function main_test() {
  const res = http.get("http://localhost:3000/api/your-endpoint");
  check(res, {
    "status is 200": (r) => r.status === 200,
  });
}
