import { expect, test } from "vitest";
import { render } from "@testing-library/react";
import PetItem from "../components/PetItem";
import { StaticRouter } from "react-router-dom/server";

test("displays a default thumbnail", async () => {
  const petItem = render(
    <StaticRouter>
      <PetItem />
    </StaticRouter>
  );

  const petThumbnail = await petItem.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("none.jpg");
  petItem.unmount();
});

test("displays a non-default thumbnail", async () => {
  const petItem = render(
    <StaticRouter>
      <PetItem images={["1.jpg", "2.jpg", "3.jpg"]} />
    </StaticRouter>
  );

  const petThumbnail = await petItem.findByTestId("thumbnail");
  expect(petThumbnail.src).toContain("1.jpg");
  petItem.unmount();
});
