import { z } from "zod";

export const ApplicationValidators = z.object({
  applier: z.string().min(1, { message: "Applier is required" }),
  agentName: z
    .string({
      required_error: "Agent name is required",
      invalid_type_error: "Agent name must be string",
    })
    .min(1, { message: "Agent name is required" })
    .min(3, { message: "Agent name can not be less than three" })
    .regex(/^[a-zA-Z\s]+$/, { message: "Agent name must contain letter only" }),
  age: z
    .string()
    .min(1, { message: "Age is required" })
    .regex(/^\d+$/, { message: "Please enter valid age" })
    .superRefine((val, ctx) => {
      if (parseInt(val) < 18) {
        ctx.addIssue({
          code: "custom",
          message: "Age should be greater than 18",
        });
      }
    }),
  sex: z
    .string()
    .min(1, { message: "Sex is required" })
    .transform((val) => val.toLowerCase())
    .refine((val) => ["male", "female"].includes(val), {
      message: "Sex must be either 'male' or 'female'",
    }),
  houseNumber: z
    .string()
    .min(1, { message: "House number is required" })
    .regex(/^\d+$/, { message: "Please enter valid house number" }),
  agentLogoUrl: z.string().min(1, { message: "agent logo is required" }),
  profileUrl: z.string().min(1, { message: "Profile picture is required" }),
  nationalIdUrls: z.string().min(1, { message: "National id is required" }),
  medicalUrls: z.string().min(1, { message: "Medical files is required" }),
  // footPrintUrl: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // jobExperienceUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  educationalUrls: z
    .string()
    .min(1, { message: "Educational files are required" }),
  // tradePermissionUrl: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // empQualificationAssuranceUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // structureOfAgencyUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // rulesUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // formRegistrationUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // warrantyUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // bankStatementUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  // houseRentUrls: z.array(
  //   z.object({
  //     url: z.string().url(),
  //   })
  // ),
  uniformDetailsUrls: z
    .string()
    .min(1, { message: "Uniform detail is required" }),
  employeeIdUrls: z.string().min(1, { message: "Employee id is required" }),
});

export type TApplicationValidator = z.infer<typeof ApplicationValidators>;
