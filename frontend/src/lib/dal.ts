import * as types from "@/lib/types";
import * as schema from "@/lib/schema";
import { setCookie, sortAllWeekPlans } from "./utils";
import axios from "axios";

const ENV = "development";

const backendUrl = (url: string): string => {
  const api = "/api/v1";
  const link =
    ENV === "development" ? "http://localhost:3000" : "https://test.com";

  console.log(`The URL`);
  console.log(`${link}${api}${url}`);
  return `${link}${api}${url}`;
};

// Axios
const myAxios = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const myFetch = {
  async get(url: string) {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async post(url: string, body: any) {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
  async delete(url: string) {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  async put(url: string, body?: any) {
    return await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  },
};

//! Users
// Get all users
export async function getAllUsers() {
  try {
    const result = await myFetch.get(backendUrl("/user"));
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      // Convert to User objects
      const users = data.map((user: schema.User) => {
        return schema.UserClass.serverIn(user);
      });
      return users;
    } else {
      throw new Error(data.error);
    }
  } catch (error) {
    throw new Error(`Something went wrong getting users, ${error}`);
  }
}

// Create one user
export async function postNewUser(obj: schema.User) {
  try {
    const result = await myFetch.post(backendUrl("/user"), obj);
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// UpdateUsers
export async function updateNewUser(obj: schema.User) {
  try {
    const result = await myFetch.put(backendUrl("/user"), obj);
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Deactivate Users
export async function deactivateUser(userId: string) {
  try {
    const result = await myFetch.delete(backendUrl(`/user/${userId}`));
    const data = await result.json();
    console.log(data[0]);
    if (result.status === 200 || result.ok) {
      console.log("Deactivate Request successful");
      return data[0];
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete one user
export async function deleteOneUser(userId: string) {
  try {
    const result = await myFetch.delete(backendUrl(`/user/one/${userId}`));
    const data = await result.json();
    console.log(data);
    if (result.status === 200 || result.ok) {
      console.log("Deactivate Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//! Availabilities
// Get all availabilities
export async function getAllAvailabilities(weeklyId: string) {
  try {
    const result = await myFetch.get(
      backendUrl(`/availability/week/${weeklyId}`)
    );

    let finalData = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");

      const availabilities = finalData.map(
        (availability: schema.Availability) => {
          return schema.AvailabilityClass.serverIn(availability);
        }
      );

      return schema.WeekClass.new(availabilities);
    } else {
      throw new Error(finalData.error);
    }
  } catch (error) {
    throw new Error(`${error}`);
  }
}

// Post availability
export async function postAvailability(availableInfo: schema.Availability) {
  console.log(availableInfo);

  try {
    const result = await myFetch.post(
      backendUrl(`/availability`),
      availableInfo
    );

    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
      const zodded = schema.AvailabilitySchema.parse(data[0]);
      return schema.AvailabilityClass.serverIn(zodded);
      // return schema.AvailabilityClass.serverIn(data[0]);
      return data[0];
    } else if (result.status === 404 || data.failed) {
      console.log("Post Request failed");
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete availability
export async function deleteAvailability(spotsId: string) {
  try {
    const result = await myFetch.delete(backendUrl(`/availability/${spotsId}`));

    if (result.status === 200 || result.ok) {
      console.log("Delete Request successful");
      const data = await result.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Update availability
export async function updateAvailability(spotsId: string, time: string) {
  try {
    const result = await myFetch.put(backendUrl(`/availability`), {
      spotsId,
      time,
    });
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Update Request successful");
      return data[0];
    } else if (result.status === 404 || data.failed) {
      console.log("Update Request failed");
      return result;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

//! Login
export async function testLogin() {
  try {
    const result = await myFetch.get(backendUrl("/login/test"));
    const data = await result.json();

    if (result.status === 200 || data.success) {
      console.log("Login Request successful");
      return data;
    } else if (result.status === 401 || data.error) {
      const msg = data.error || "Username or password is incorrect.";
      console.log("Login Request failed");
      throw new Error(msg);
    } else {
      // Handle other error cases (e.g., server errors)
      throw new Error("An unexpected error occurred during login");
    }
  } catch (error) {
    console.error(error);
    throw error; // Rethrow the error
  }
}

export async function loginUser(info: schema.LoginEmail) {
  try {
    const result = await myAxios.post("/login", info);
    console.log(result);
    return result.data;
  } catch (error) {
    throw new Error("An unexpected error occurred during login");
  }

  // console.log(info);
  // try {
  // const result = await myFetch.post(backendUrl("/login"), info);
  // const data = await result.json();

  //   if (result.status === 200 || data.success) {
  //     console.log("Login Request successful");
  //     return data;
  //     // setCookie(data.myCookie.name, data.myCookie.value, data.myCookie.maxAge);
  //     // return data.user;
  //   } else if (result.status === 401 || data.error) {
  //     const msg = data.error || "Username or password is incorrect.";
  //     console.log("Login Request failed");
  //     throw new Error(msg);
  //   } else {
  //     // Handle other error cases (e.g., server errors)
  //     throw new Error("An unexpected error occurred during login");
  //   }
  // } catch (error) {
  //   console.error(error);
  //   throw error; // Rethrow the error
  // }
}

//! Weeks
// Get Weeks
export async function getAllWeeks(weeklyId: string) {
  let finalData;

  try {
    const result = await myFetch.get(backendUrl(`/weekplan/all/${weeklyId}`));
    finalData = await result.json();

    if (result.status === 200 || result.ok) {
      console.log(`finalData`);
      console.log(finalData);
      return sortAllWeekPlans(finalData);
    }
    console.log("Get Request failed");
    throw new Error(finalData.error);
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }
}

// Post Weeks
export async function postOneWeek(availableInfo: schema.Availability) {
  try {
    const result = await myFetch.post(backendUrl(`/weekplan`), availableInfo);
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Update WeekPlan Request successful");
      console.log(data[0]);
      return data[0];
    } else if (result.status === 404 || data.failed) {
      console.log("Update Request failed");
      return result;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Delete Weeks
export async function deleteOneWeekAvailability(spotsId: string) {
  try {
    const result = await myFetch.delete(backendUrl(`/weekplan/one/${spotsId}`));
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Delete Request successful");
      return data[0];
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Calculate Weeks
export async function calculateWeek(weeklyId: string) {
  try {
    const result = await myFetch.get(
      backendUrl(`/weekplan/create/${weeklyId}`)
    );
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      const zodded = schema.WeekStatusSchema.parse(data[0]);
      return zodded;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Recalculate Weeks
export async function reCalculateWeek(weeklyId: string) {
  try {
    const result = await myFetch.get(
      backendUrl(`/weekplan/calculate/${weeklyId}`)
    );
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      const zodded = schema.WeekStatusSchema.parse(data[0]);
      return zodded;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

//! WeekStatus
// Get all week status
export async function getAllWeekStatus() {
  try {
    const result = await myFetch.get(backendUrl("/weekstatus"));
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      return data.map((weekStatus: schema.WeekStatus) => {
        const zodded = schema.WeekStatusSchema.parse(weekStatus);
        return schema.WeekStatusClass.serverIn(zodded);
      });
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Update week status
export async function updateOneWeekStatus(weeklyId: string) {
  try {
    const result = await myFetch.put(backendUrl(`/weekstatus/${weeklyId}`));
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      const zodded = schema.SuccessSchema.parse(data);
      return zodded.success;
    }
    const zodded = schema.ErrorSchema.parse(data);
    throw new Error(zodded.error);
  } catch (error) {
    console.error(error);
    throw error;
  }
}
