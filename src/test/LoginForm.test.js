import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../pages/loginForm";

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: "dummy_token" }),
  })
);

describe("LoginForm", () => {
  it("renders login form", () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("logs in successfully", async () => {
    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "valid_user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "valid_password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(fetch).toHaveBeenCalled();
  });

  it("shows error message for invalid login", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({}),
      })
    );

    render(
      <AuthProvider>
        <Router>
          <LoginForm />
        </Router>
      </AuthProvider>
    );

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "invalid_user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "invalid_password" },
    });

    fireEvent.click(screen.getByText("Login"));

    expect(await screen.findByText("Login gagal")).toBeInTheDocument();
  });
});
