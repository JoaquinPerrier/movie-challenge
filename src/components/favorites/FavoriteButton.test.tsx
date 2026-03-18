import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FavoriteButton } from "./FavoriteButton";
import { TestWrapper } from "@/test/wrapper";

describe("FavoriteButton", () => {
  it("renders with 'Add to favorites' label when not favorited", () => {
    render(
      <TestWrapper>
        <FavoriteButton isFavorite={false} onToggle={vi.fn()} />
      </TestWrapper>,
    );
    expect(
      screen.getByLabelText("Add to favorites"),
    ).toBeInTheDocument();
  });

  it("renders with 'Remove from favorites' label when favorited", () => {
    render(
      <TestWrapper>
        <FavoriteButton isFavorite={true} onToggle={vi.fn()} />
      </TestWrapper>,
    );
    expect(
      screen.getByLabelText("Remove from favorites"),
    ).toBeInTheDocument();
  });

  it("calls onToggle when clicked", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    render(
      <TestWrapper>
        <FavoriteButton isFavorite={false} onToggle={onToggle} />
      </TestWrapper>,
    );

    await user.click(screen.getByLabelText("Add to favorites"));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("stops event propagation on click", async () => {
    const user = userEvent.setup();
    const parentClick = vi.fn();
    const onToggle = vi.fn();

    render(
      <TestWrapper>
        <div onClick={parentClick}>
          <FavoriteButton isFavorite={false} onToggle={onToggle} />
        </div>
      </TestWrapper>,
    );

    await user.click(screen.getByLabelText("Add to favorites"));
    expect(onToggle).toHaveBeenCalled();
    expect(parentClick).not.toHaveBeenCalled();
  });
});
