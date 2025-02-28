import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import HomePage from "../../Pages/Home";
import { useAuthenticator } from "@aws-amplify/ui-react";

jest.mock("@aws-amplify/ui-react", () => ({
  useAuthenticator: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router/dom"),
  useNavigate: () => ({
    navigate: jest.fn().mockImplementation(() => ({})),
  }),
}));

describe("HomePage Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders welcome message", () => {
    useAuthenticator.mockReturnValue({
      authStatus: "unauthenticated",
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome to Service Portal/i)).toBeInTheDocument();
  });

  test("renders login button when not authenticated", () => {
    useAuthenticator.mockReturnValue({
      authStatus: "unauthenticated",
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText("Get Started")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Get Started"));
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders dashboard and files buttons when authenticated", () => {
    useAuthenticator.mockReturnValue({
      authStatus: "authenticated",
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(screen.getByText("View Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Browse Files")).toBeInTheDocument();

    fireEvent.click(screen.getByText("View Dashboard"));
    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");

    fireEvent.click(screen.getByText("Browse Files"));
    expect(mockNavigate).toHaveBeenCalledWith("/files");
  });
});
