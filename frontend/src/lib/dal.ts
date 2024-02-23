import * as types from "@/lib/types";

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

export async function getAllUsers() {
  try {
    const result = await myFetch.get("http://localhost:3000/api/v1/user");
    const data = await result.json();
    return data;
  } catch (error) {
    return { error: error };
  }
}

export async function getAllAvailabilities(weeklyId: string) {
  let finalData;

  try {
    const result = await myFetch.get(
      `http://localhost:3000/api/v1/availability/week/${weeklyId}`
    );
    finalData = await result.json();
  } catch (error) {
    console.error(error);
    return { error: error };
  }

  return (finalData = {
    Monday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "monday"
    ),
    Tuesday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "tuesday"
    ),
    Wednesday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "wednesday"
    ),
    Thursday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "thursday"
    ),
    Friday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "friday"
    ),
    Saturday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "saturday"
    ),
    Sunday: finalData.filter(
      (item: types.AvailableProps) => item.day.toLowerCase() === "sunday"
    ),
  });
}

export async function postAvailability({
  availabilityId,
  userId,
  day,
  time,
}: types.postAvailability) {
  try {
    const result = await myFetch.post(
      `http://localhost:3000/api/v1/availability`,
      {
        availabilityId,
        userId,
        day,
        time,
      }
    );
    const data = await result.json();

    if (result.status === 200 || result.ok) {
      console.log("Post Request successful");
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

export async function loginUser(info: types.LoginEmail) {
  try {
    const result = await myFetch.post(
      "http://localhost:3000/api/v1/login",
      info
    );
    const data = await result.json();

    if (result.status === 200 || result.ok) {
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
