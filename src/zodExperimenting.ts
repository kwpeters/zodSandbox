import { z } from "zod";

const hobbies = ["Programming", "Weight Lifting", "Guitar"] as const;

const userSchema = z.object({
    username: z.string(),
    age: z.number().default(Math.random),
    birthday: z.date(),
    isProgrammer: z.boolean(),
    hobby: z.enum(hobbies)
});

type User = z.infer<typeof userSchema>;

const unvalidatedUser = {
    username: "kwpeters",
    birthday: new Date(),
    isProgrammer: false,
    hobby: "Knitting"
};

const res = userSchema.safeParse(unvalidatedUser);
if (res.success) {
    console.log("User is valid.");
    const validatedUser: User = res.data;
    console.log(JSON.stringify(validatedUser, undefined, 4));
}
else {
    console.log("User is invalid.");
    console.log(res.error.issues);
}


// Gives definitions for each element in the schema:
// userSchema.shape

// Use partial() to get a schema where every property is optional.
// Useful when validating user entered data in a form where the entire form
// may not be completely filled out yet.
const partialUserSchema = userSchema.partial();

// Use schema.pick() and schema.omit()
