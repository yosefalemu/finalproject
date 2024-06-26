import { z } from "zod";
import { privateProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { OrdinaryUser, User } from "@/payload-types";

export const managerRouter = router({
  getApplicationForManager: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, limit } = input;
      const { user } = ctx;
      console.log("LIMIT IN PAYLOAD", limit);

      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "applications",
        where: {
          and: [
            {
              responseOfScreener: {
                equals: "approved",
              },
            },
            {
              selectedManager: {
                equals: user.id,
              },
            },
            {
              responseOfManager: { equals: "pending" },
            },
          ],
        },
        depth: 1,
        limit,
        page,
      });
      console.log("FOUND APPLICATION", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getSingleApplication: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ input }) => {
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (!applicationFound) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Application not found",
        });
      }
      return applicationFound;
    }),
  verifyIndividualsByManager: privateProcedure
    .input(
      z.object({
        controller: z.string(),
        applicationId: z.string(),
        approved: z.boolean(),
        message: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { applicationId, controller, approved, message } = input;
      const payload = await getPayloadClient();
      //UPDATE FOR THE AGENT URL
      if (controller === "agentLogoUrl") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "approved",
              agentLogoRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusAgentLogoUrl: "rejected",
              agentLogoRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR THE PROFILE PICTURE
      if (controller === "profileUrl") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusProfileUrl: "approved",
              profilePictureRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusProfileUrl: "rejected",
              profilePictureRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR THE NATIONAL ID
      if (controller === "nationalIdUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusNationalIdUrl: "approved",
              nationalIdRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusNationalIdUrl: "rejected",
              nationalIdRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR MEDICALS
      if (controller === "medicalUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusMedicalUrl: "approved",
              medicalFilesRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusMedicalUrl: "rejected",
              medicalFilesRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR EDUCATION URL
      if (controller === "educationalUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEducationalUrl: "approved",
              educationalFilesRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEducationalUrl: "rejected",
              educationalFilesRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR UNIFORM DETAILS
      if (controller === "uniformDetailsUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusUniformDetailUrl: "approved",
              uniformDetailRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusUniformDetailUrl: "rejected",
              uniformDetailRejectionReason: message,
            },
          });
        }
      }
      //UPDATE FOR EMPLOYEE ID
      if (controller === "employeeIdUrls") {
        if (approved) {
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEmployeeIdUrl: "approved",
              employeeIdRejectionReason: "",
            },
          });
        } else {
          if (!message || message?.length < 30) {
            throw new TRPCError({
              code: "BAD_REQUEST",
              message: "Please provide elaborative rejection reason",
            });
          }
          await payload.update({
            collection: "applications",
            id: applicationId,
            data: {
              statusEmployeeIdUrl: "rejected",
              employeeIdRejectionReason: message,
            },
          });
        }
      }
    }),
  approveByManager: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { applicationId } = input;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (applicationFound.statusAgentLogoUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent logo is not approved yet!",
        });
      } else if (applicationFound.statusProfileUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile picture is not approved yet!",
        });
      } else if (applicationFound.statusNationalIdUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "National id is not approved yet!",
        });
      } else if (applicationFound.statusEducationalUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Educational files is not approved yet!",
        });
      } else if (applicationFound.statusMedicalUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Medical files is not approved yet!",
        });
      } else if (applicationFound.statusEmployeeIdUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Employee id is not approved yet!",
        });
      } else if (applicationFound.statusUniformDetailUrl !== "approved") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uniform detail is not approved yet!",
        });
      } else {
        const { user } = ctx;
        function generateStrongPassword() {
          const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
          const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
          const numbers = "0123456789";
          const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?";

          const allCharacters =
            uppercaseLetters + lowercaseLetters + numbers + specialCharacters;
          let password = "";

          for (let i = 0; i < 8; i++) {
            const randomIndex = Math.floor(
              Math.random() * allCharacters.length
            );
            password += allCharacters[randomIndex];
          }

          return password;
        }

        const password = generateStrongPassword();
        const applier = applicationFound.applier as OrdinaryUser;
        await payload.create({
          collection: "agents",
          data: {
            application: applicationId,
            agentAdmin: applier.id,
            email: applier.email,
            password: password,
            randomPassword: password,
          },
        });
        await payload.create({
          collection: "ordinaryNotification",
          data: {
            application: applicationId,
            reciever: applier.id as string,
            sender: user.id,
            message: `Congratulations! Dear ${applier.firstName} ${applier.middleName} ${applier.lastName} your application has been successfully accepted. Please visit our office to receive your certificate and login credentials. You can then continue as an agent.`,
          },
        });
        await payload.update({
          collection: "applications",
          id: applicationId,
          data: { responseOfManager: "approved" },
        });
      }
    }),
  rejectByManager: privateProcedure
    .input(z.object({ applicationId: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { applicationId } = input;
      const { user } = ctx;
      const payload = await getPayloadClient();
      const applicationFound = await payload.findByID({
        collection: "applications",
        id: applicationId,
      });
      if (applicationFound.statusAgentLogoUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Agent logo is not validated yet!",
        });
      } else if (applicationFound.statusProfileUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Profile picture is not validate yet!",
        });
      } else if (applicationFound.statusNationalIdUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "National id is not validate yet!",
        });
      } else if (applicationFound.statusEducationalUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Educational files are not validate yet!",
        });
      } else if (applicationFound.statusMedicalUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Medical files are not validate yet!",
        });
      } else if (applicationFound.statusEmployeeIdUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Employee id is not validate yet",
        });
      } else if (applicationFound.statusUniformDetailUrl === "pending") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Uniform detail is not validate yet!",
        });
      } else if (applicationFound.responseOfManager === "rejected") {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Application is already rejected!",
        });
      } else {
        console.log("DONE");
        console.log("DONE");
      }
      await payload.update({
        collection: "applications",
        id: applicationId,
        data: {
          responseOfManager: "rejected",
          responseOfScreener: "pending",
        },
      });
      const reciever = applicationFound.selectedScreener as User;
      await payload.create({
        collection: "ordinaryNotification",
        data: {
          application: applicationId,
          reciever: reciever.id as string,
          sender: user.id,
          message: `Application with agent name ${applicationFound.agentName} is rejected`,
        },
      });
    }),
  getAllUsers: privateProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const { cursor, limit } = input;
      const { user } = ctx;
      console.log("LIMIT IN PAYLOAD", limit);

      const payload = await getPayloadClient();

      const page = cursor || 1;

      const {
        docs: items,
        hasNextPage,
        nextPage,
      } = await payload.find({
        collection: "users",
        depth: 1,
        limit,
        page,
      });
      console.log("FOUND APPLICATION", items);

      return {
        items,
        nextPage: hasNextPage ? nextPage : null,
      };
    }),
  getSingleUser: privateProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const { userId } = input;
      const payload = await getPayloadClient();
      const userFound = await payload.findByID({
        collection: "users",
        id: userId,
      });
      return { success: true, userFound: userFound };
    }),
});
