import { AvailabilityClass } from "../domain/availability";
import { UserClass } from "../domain/user";
import { Roles } from "../domain/types";
// import * as helper from "../domain/types";
// import { theLogicT } from "../service/types";

// Bubble sort the available spots
export const bubbleSort = (arr: AvailabilityClass[]) => {
  const arrayLength = arr.length;

  // Iterate through each element in the array
  for (let i = 0; i < arrayLength; i++) {
    // Iterate through each element except the last i elements
    // (since the last i elements are already sorted after each iteration)
    for (let j = 0; j < arrayLength - i - 1; j++) {
      // Compare adjacent elements
      if (arr[j].time > arr[j + 1].time) {
        // Swap elements if they are in the wrong order
        const temporary = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temporary;
      }
    }
  }

  return arr;
};

// Filter users by role
function filterUsersByRole(users: UserClass[], role: Roles): UserClass[] {
  const filteredUsers = users.filter(
    (user) => user.primaryRole === role || user.secondaryRole === role
  );
  return filteredUsers;
}

// Get availabilities for management
function getAvailableUserByRoles(
  list: AvailabilityClass[],
  users: UserClass[]
): AvailabilityClass[] {
  const availableSpots: AvailabilityClass[] = [];
  users.forEach((user) => {
    list.forEach((availability) => {
      if (user.id === availability.userId) {
        availableSpots.push(availability);
      }
    });
  });
  return availableSpots;
}

// Put the vast users first
function prioVastUsers(
  users: UserClass[],
  list: AvailabilityClass[]
): AvailabilityClass[] {
  const theChosenAvailableUser: AvailabilityClass[] = [];
  const restAvailableUser: AvailabilityClass[] = [];

  const avaList = [...list];

  const vastUser = users.filter((user) => user.vast === true);

  if (vastUser.length !== 0) {
    avaList.forEach((availability) => {
      vastUser.forEach((vast) => {
        if (vast.id === availability.userId) {
          theChosenAvailableUser.push(availability);
        } else {
          restAvailableUser.push(availability);
        }
      });
    });
  } else {
    return avaList;
  }

  return [...theChosenAvailableUser, ...restAvailableUser];
}

// Get employees day work
type WorkerT = {
  management: AvailabilityClass[];
  griller: AvailabilityClass[];
  bar: AvailabilityClass[];
  dishwasher: AvailabilityClass[];
  kitchen: AvailabilityClass[];
  service: AvailabilityClass[];
};

export function roleListCreator(
  availableListOfDay: AvailabilityClass[],
  users: UserClass[],
  role: Roles
) {
  const roleList: AvailabilityClass[] = prioVastUsers(
    users,
    getAvailableUserByRoles(availableListOfDay, filterUsersByRole(users, role))
  );
  return roleList;
}
