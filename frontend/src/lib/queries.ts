import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "@/components/ui/use-toast";
import * as DAL from "@/lib/dal";
import * as schema from "@/lib/schema";
import { capitalizeFirstLetter } from "./utils";

export const queryClient = new QueryClient();

// GET all users
export const useUserDataQuery = useQuery({
  queryKey: ["users"],
  queryFn: DAL.getAllUsers,
  refetchOnMount: "always",
  refetchOnReconnect: true,
});

// GET all availabilities
export const useAvailabilitiesQuery = (weeklyId: string) =>
  useQuery({
    queryKey: ["availabilities"],
    queryFn: () => DAL.getAllAvailabilities(weeklyId),
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

// GET all weekStatus
export const useWeekStatusQuery = useQuery({
  queryKey: ["weekStatus"],
  queryFn: DAL.getAllWeekStatus,
  refetchOnMount: "always",
  refetchOnReconnect: true,
});

// GET all weekPlans
export const getAllWeekPlans = (weeklyId: string) =>
  useQuery({
    queryKey: ["weekPlans"],
    queryFn: () => DAL.getAllWeeks(weeklyId),
    refetchOnMount: "always",
    refetchOnReconnect: true,
  });

//? ============================================

// POST a new weekStatus
export const updateAvailability = useMutation({
  mutationKey: ["postAvailability"],
  mutationFn: async (data: string) => {
    const result = await DAL.updateOneWeekStatus(data);
    return result;
  },
  onSuccess: (data) => {
    toast({
      title: `${data}`,
    });
  },
  onError: (error) => {
    toast({
      variant: "destructive",
      title: `Uh oh! Something went wrong.`,
      description: `There was a problem saving the week, ${error.message}`,
    });
  },
});

// POST a weekStatus
export const updateWeekStatus = useMutation({
  mutationKey: ["postWeekPlan"],
  mutationFn: async (data: string) => {
    const result = await DAL.updateOneWeekStatus(data);
    return result;
  },
  onSuccess: (data) => {
    toast({
      title: `${data}`,
    });
  },
  onError: (error) => {
    toast({
      variant: "destructive",
      title: `Uh oh! Something went wrong.`,
      description: `There was a problem saving the week, ${error.message}`,
    });
  },
});

// POST a new user
export const createNewUser = useMutation({
  mutationKey: ["postNewUser"],
  mutationFn: async (data: schema.User) => {
    const result = await DAL.postNewUser(data as schema.User);
    return result;
  },
  onSuccess: (user: schema.User) => {
    toast({
      title: `${capitalizeFirstLetter(user.firstName)} ${user.lastName}`,
      description: `${capitalizeFirstLetter(
        user.firstName
      )}'s info has been Successfully created!`,
    });

    // if (edit) {
    //   setTheUser!(user);
    // } else {
    //   window.location.reload();
    // }

    // setOpen(false);
  },
  onError: (error) => {
    toast({
      title: "Oops! Something went wrong!",
      variant: "destructive",
      description: `Error: ${error}`,
    });
  },
});

// POST update a user
export const updateNewUser = useMutation({
  mutationKey: ["updateNewUser"],
  mutationFn: async (data: schema.User) => {
    const result = await DAL.updateNewUser(data as schema.User);
    return result;
  },
  onSuccess: (user: schema.User) => {
    toast({
      title: `${capitalizeFirstLetter(user.firstName)} ${user.lastName}`,
      description: `${capitalizeFirstLetter(
        user.firstName
      )}${" has been successfully Updated"}!`,
    });

    // if (edit) {
    //   setTheUser!(user);
    // } else {
    //   window.location.reload();
    // }

    // setOpen(false);
  },
  onError: (error) => {
    toast({
      title: "Oops! Something went wrong!",
      variant: "destructive",
      description: `Error: ${error}`,
    });
  },
});

//? ============================================

// DELETE one availability
export const deleteOneAvailability = useMutation({
  mutationKey: ["deleteAvailability"],
  mutationFn: async (id: string) => {
    const result = await DAL.deleteAvailability(id);
    return result;
  },
  onSuccess: () => {
    toast({
      title: "Deletion successful",
      description: "Availability Deleted",
    });
    // setSpotsId(undefined);
    // setTimeValue(schema.ScheduleTime.None);
  },
  onError: (error) => {
    toast({
      title: "Deletion went wrong",
      description: `Availability Deleted, ${error.message}`,
    });
  },
});

// DELETE one WeekPlan
export const deleteOneWeekPlan = useMutation({
  mutationKey: ["deleteOneWeekPlan"],
  mutationFn: async (id: string) => {
    const result = await DAL.deleteOneWeekAvailability(id);
    return result;
  },
  onSuccess: () => {
    toast({
      title: "Deletion successful",
      description: "Week Spot Deleted",
    });
    // setSpotsId(undefined);
    // setTimeValue(schema.ScheduleTime.None);
  },
  onError: (error) => {
    toast({
      title: "Deletion went wrong",
      description: `Week Spot Deleted, ${error.message}`,
    });
  },
});
