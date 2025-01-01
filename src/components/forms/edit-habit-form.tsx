"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { editHabitAction } from "~/actions/actions";
import { parseFrom24Hour } from "~/lib/time";
import { type habits } from "~/server/db/schema";
import { habitFormSchema } from "~/zod-schemas";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const days = [
  { id: "sunday", label: "Sunday" },
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
] as const;

interface Props {
  habit: typeof habits.$inferSelect;
}

export default function EditHabitForm({ habit }: Readonly<Props>) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [time, mode] = parseFrom24Hour(habit.time).split(" ");
  if (!time || !mode) throw new Error("THIS SHOULD NEVER HAPPEN");

  const [hour, minute] = time.split(":");
  if (!hour || !minute) throw new Error("THIS SHOULD NEVER HAPPEN");

  const form = useForm<z.infer<typeof habitFormSchema>>({
    resolver: zodResolver(habitFormSchema),
    defaultValues: {
      title: habit.title,
      description: habit.description,
      days: JSON.parse(habit.days) as string[],
      time: {
        hour,
        minute,
        mode: mode as "am" | "pm",
      },
    },
  });

  async function onSubmit(data: z.infer<typeof habitFormSchema>) {
    startTransition(async () => {
      const { success } = await editHabitAction(habit.id, data);
      if (success) {
        router.refresh();
      } else {
        console.error("ERROR ON INSERT");
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-h-[500px] flex-col gap-4 pl-1 pr-6"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base"># Title:</FormLabel>
              <FormControl>
                <Input placeholder="Read a book!" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base"># Description:</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="I would like to read a book every night."
                  className="resize-y"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="days"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base"># Days:</FormLabel>
                <FormDescription>
                  Select the days you want to track.
                </FormDescription>
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-2 pb-1">
                {days.map((day) => (
                  <FormField
                    key={day.id}
                    control={form.control}
                    name="days"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={day.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(day.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, day.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== day.id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {day.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={() => (
            <FormItem>
              <FormLabel className="text-base"># Ideal Time:</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="time.hour"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 12 }).map((_, i) => (
                            <SelectItem
                              key={`${i}a`}
                              value={(i + 1).toString().padStart(2, "0")}
                            >
                              {(i + 1).toString().padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time.minute"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from({ length: 60 }).map((_, i) => (
                            <SelectItem
                              key={`${i}b`}
                              value={i.toString().padStart(2, "0")}
                            >
                              {i.toString().padStart(2, "0")}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="time.mode"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="am">AM</SelectItem>
                          <SelectItem value="pm">PM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit" className="mt-4">
          {isPending && <Loader className="animate-spin" />}
          {isPending ? "Saving..." : "Edit Habit"}
        </Button>
      </form>
    </Form>
  );
}
