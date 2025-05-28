import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import InsuranceForm from "./index";
import Header from "../components/header";
import { TotalTrackerProvider } from "../components/totaltracker";

// Mock fetch API globally
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          totalPremium: 123.45,
          breakdown: {
            base: 100,
            adjustment: 23.45,
          },
        }),
    })
  ) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

test("submits form, calls API, and updates header with total premium", async () => {
  render(
    <TotalTrackerProvider>
      <Header />
      <InsuranceForm />
    </TotalTrackerProvider>
  );

  // Fill the form inputs
  userEvent.type(screen.getByPlaceholderText(/dog breed/i), "Labrador");
  userEvent.type(screen.getByPlaceholderText(/dog age/i), "5");
  userEvent.selectOptions(screen.getByRole("combobox", { name: /pre-existing/i }), "false");
  userEvent.selectOptions(screen.getByRole("combobox", { name: /coverage/i }), "standard");

  // Submit the form
  userEvent.click(screen.getByRole("button", { name: /calculate/i }));

  // Wait for the API call and UI update
  await waitFor(() => {
    expect(screen.getByText(/total premium/i)).toHaveTextContent("123.45");
  });

  // Check fetch was called with right data
  expect(global.fetch).toHaveBeenCalledWith(
    "https://pet-insurance.matthayward.workers.dev/calculate",
    expect.objectContaining({
      method: "POST",
      body: JSON.stringify({
        breed: "Labrador",
        age: 5,
        hasPreExistingConditions: false,
        coverageLevel: "standard",
      }),
    })
  );
});
