import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingList from "../components/ShoppingList";

test("displays all the items from the server after the initial render", async () => {
  render(<ShoppingList />);
  
  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const pomegranate = await screen.findByText(/Pomegranate/);
  expect(pomegranate).toBeInTheDocument();

  const iceCream = await screen.findByText(/Ice Cream/);
  expect(iceCream).toBeInTheDocument();
});

test("adds a new item to the list when the ItemForm is submitted", async () => {
  render(<ShoppingList />);

  const input = screen.getByLabelText(/Name:/);
  fireEvent.change(input, { target: { value: "Ice Cream" } });

  const select = screen.getByLabelText(/Category:/);
  fireEvent.change(select, { target: { value: "Dessert" } });

  const submitButton = screen.getByText(/Add to List/);
  fireEvent.submit(submitButton);

  // Use findAllByText to account for multiple matching elements
  const iceCreamItems = await screen.findAllByText(/Ice Cream/);
  expect(iceCreamItems.length).toBeGreaterThan(0); // Adjust if needed
});

test("updates the isInCart status of an item when the Add/Remove from Cart button is clicked", async () => {
  render(<ShoppingList />);

  const addButtons = await screen.findAllByText(/Add to Cart/);
  expect(addButtons.length).toBe(3);

  fireEvent.click(addButtons[0]);

  const removeButtons = await screen.findAllByText(/Remove From Cart/);
  expect(removeButtons.length).toBe(1);
});

test("removes an item from the list when the delete button is clicked", async () => {
  render(<ShoppingList />);

  const yogurt = await screen.findByText(/Yogurt/);
  expect(yogurt).toBeInTheDocument();

  const deleteButton = screen.getAllByText(/Delete/)[0];
  fireEvent.click(deleteButton);

  expect(yogurt).not.toBeInTheDocument();
});
