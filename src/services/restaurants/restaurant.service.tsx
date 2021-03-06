import camilaze from "camelize";
import { host, isMock } from "../../utils/env";
import { MockProps, RestaurantProps } from "./types";

// type valueof<T> = T[keyof T]; // : Promise<valueof<typeof mocks>>

export const restaurantRequest = (
  location: string = "37.7749295,-122.4194155"
): Promise<MockProps> =>
  fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`).then(
    (res) => res.json()
  );

export const restaurantsTransform = ({
  results = [],
}: MockProps): RestaurantProps[] => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camilaze(mappedResults);
};
