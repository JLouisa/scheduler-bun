import * as types from "@/lib/types";
import * as schema from "@/lib/schema";

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
  async put(url: string, body: any) {
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
    const result = await myFetch.get("http://localhost:3000/api/v1/user");
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

//! Availabilities
// Get all availabilities
export async function getAllAvailabilities(weeklyId: string) {
  try {
    const result = await myFetch.get(
      `http://localhost:3000/api/v1/availability/week/${weeklyId}`
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
      `http://localhost:3000/api/v1/availability`,
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
    return error;
  }
}

// Delete availability
export async function deleteAvailability(spotsId: string) {
  try {
    const result = await myFetch.delete(
      `http://localhost:3000/api/v1/availability/${spotsId}`
    );

    if (result.status === 200 || result.ok) {
      console.log("Delete Request successful");
      const data = await result.json();
      return data[0];
    }
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

// Update availability
export async function updateAvailability(spotsId: string, time: string) {
  try {
    const result = await myFetch.put(
      `http://localhost:3000/api/v1/availability`,
      {
        spotsId,
        time,
      }
    );
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
export async function loginUser(info: schema.LoginEmail) {
  try {
    const result = await myFetch.post(
      "http://localhost:3000/api/v1/login",
      info
    );
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

//! Weeks
// Get Weeks
export async function getAllWeeks(weeklyId: string) {
  let finalData;

  try {
    const result = await myFetch.get(
      `http://localhost:3000/api/v1/weekplan/create/${weeklyId}`
    );
    finalData = await result.json();

    if (result.status === 200 || result.ok) {
      console.log(`finalData`);
      console.log(finalData);
    } else {
      console.log("Get Request failed");
      throw new Error(finalData.error);
    }
  } catch (error) {
    console.error(error);
    throw new Error(error as string);
  }

  return (finalData = {
    Monday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "monday"
    ),
    Tuesday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "tuesday"
    ),
    Wednesday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "wednesday"
    ),
    Thursday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "thursday"
    ),
    Friday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "friday"
    ),
    Saturday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "saturday"
    ),
    Sunday: finalData.filter(
      (item: types.WeekProps) => item.day.toLowerCase() === "sunday"
    ),
  });
}

// Post Weeks
export async function postOneWeek({
  id,
  weeklyId,
  userId,
  day,
  time,
}: types.WeekProps) {
  try {
    const result = await myFetch.post(`http://localhost:3000/api/v1/weekplan`, {
      id,
      weeklyId,
      userId,
      day,
      time,
    });
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Update Request successful");
      console.log(data[0]);
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

// Delete Weeks
export async function deleteWeekAvailability(spotsId: string) {
  try {
    const result = await myFetch.delete(
      `http://localhost:3000/api/v1/weekplan/one/${spotsId}`
    );
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Delete Request successful");
      return data[0];
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

//! Users
// Create Users
export async function postNewUser(obj: schema.User) {
  try {
    const result = await myFetch.post("http://localhost:3000/api/v1/user", obj);
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

// UpdateUsers
export async function updateNewUser(obj: schema.User) {
  try {
    const result = await myFetch.put("http://localhost:3000/api/v1/user", obj);
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

// Deactivate Users
export async function deactivateUser(userId: string) {
  try {
    const result = await myFetch.delete(
      `http://localhost:3000/api/v1/user/${userId}`
    );
    const data = await result.json();
    console.log(data[0]);
    if (result.status === 200 || result.ok) {
      console.log("Deactivate Request successful");
      return data[0];
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

// Delete one user
export async function deleteOneUser(userId: string) {
  try {
    const result = await myFetch.delete(
      `http://localhost:3000/api/v1/user/one/${userId}`
    );
    const data = await result.json();
    console.log(data);
    if (result.status === 200 || result.ok) {
      console.log("Deactivate Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}

//! WeekStatus
// Get all week status
export async function getAllWeekStatus() {
  try {
    const result = await myFetch.get("http://localhost:3000/api/v1/weekstatus");
    const data = await result.json();
    if (result.status === 200 || result.ok) {
      console.log("Get Request successful");
      return data;
    }
    throw new Error(data.error);
  } catch (error) {
    console.error(error);
    return { error: error };
  }
}
