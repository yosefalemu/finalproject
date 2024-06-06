import { RegistorAsAgentValidators } from "../validators/registor-as-agent";
import { privateProcedure, publicProcedure, router } from "./trpc";
import { getPayloadClient } from "../get-payload";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { SignInCredentialValidator } from "../validators/sigin-validators";
import { UpdateUserProfile } from "../validators/update-profile";

export const authRouter = router({
  createOrdinaryUser: publicProcedure
    .input(RegistorAsAgentValidators)
    .mutation(async ({ input }) => {
      const {
        firstName,
        middleName,
        lastName,
        email,
        password,
        nationalId,
        phoneNumber,
        dateOfBirth,
        city,
        woreda,
        kebele,
      } = input;
      const payload = await getPayloadClient();
      const { docs: ordinaryUser } = await payload.find({
        collection: "ordinaryUser",
        where: {
          or: [
            {
              email: {
                equals: email,
              },
            },
            {
              nationalId: {
                equals: nationalId,
              },
            },
            {
              phoneNumber: {
                equals: phoneNumber,
              },
            },
          ],
        },
      });
      if (ordinaryUser.length !== 0) {
        const emailTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.email === email
        );
        const nationalIdTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.nationalId === nationalId
        );
        const phoneNumberTaken = ordinaryUser.find(
          (ordinaryUser) => ordinaryUser.phoneNumber === phoneNumber
        );

        if (emailTaken) {
          if (
            ordinaryUser[0].nationalIdVerified === "approved" &&
            ordinaryUser[0]._verified
          ) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "Email is taken",
            });
          } else {
            await payload.delete({
              collection: "ordinaryUser",
              id: ordinaryUser[0].id,
            });
          }
        } else if (nationalIdTaken) {
          if (ordinaryUser[0].nationalIdVerified) {
            throw new TRPCError({
              code: "CONFLICT",
              message: "National id is taken",
            });
          } else {
            await payload.delete({
              collection: "ordinaryUser",
              id: ordinaryUser[0].id,
            });
          }
        } else if (phoneNumberTaken) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Phone number is taken",
          });
        } else {
        }
      }
      await payload.create({
        collection: "ordinaryUser",
        data: {
          firstName,
          middleName,
          lastName,
          email,
          password,
          nationalId,
          nationalIdVerified: "pending",
          dateOfBirth,
          phoneNumber,
          city,
          woreda,
          kebele,
        },
      });
      return { success: true, sentToEmail: email, nationalId: nationalId };
    }),
  verifyEmail: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(async ({ input }) => {
      const { token } = input;
      const payload = await getPayloadClient();
      const { docs } = await payload.find({
        collection: "ordinaryUser",
        where: { _verificationToken: { equals: token } },
      });
      const isVerified = await payload.verifyEmail({
        collection: "ordinaryUser",
        token,
      });
      if (!isVerified) throw new TRPCError({ code: "UNAUTHORIZED" });

      return { success: true, email: docs[0].email };
    }),
  signInOrdinaryUser: publicProcedure
    .input(SignInCredentialValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      const { docs: registerUser } = await payload.find({
        collection: "ordinaryUser",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (registerUser?.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email",
        });
      }
      if (!registerUser[0]._verified) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Email is not verified yet",
        });
      }
      if (!(registerUser[0].nationalIdVerified === "approved")) {
        const userData = {
          firstName: registerUser[0].firstName,
          middleName: registerUser[0].middleName,
          lastName: registerUser[0].lastName,
          nationalId: registerUser[0].nationalId,
        };
        throw new TRPCError({
          code: "CONFLICT",
          message: "National is not verified",
          cause: { userData },
        });
      }

      try {
        const logedInUser = await payload.login({
          collection: "ordinaryUser",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true, loggedInUserId: logedInUser.user.id };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }
    }),
  signInUser: publicProcedure
    .input(SignInCredentialValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      const { docs: registerUser } = await payload.find({
        collection: "users",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (registerUser?.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email",
        });
      }
      try {
        const logedInUser = await payload.login({
          collection: "users",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true, loggedInUserId: logedInUser.user.id };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }
    }),
  signInAgent: publicProcedure
    .input(SignInCredentialValidator)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;
      const payload = await getPayloadClient();
      const { docs: registerUser } = await payload.find({
        collection: "agents",
        where: {
          email: {
            equals: email,
          },
        },
      });
      if (registerUser?.length === 0) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email",
        });
      }
      if (!registerUser[0]._verified) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Agent not verified. Please visit the office to verify.",
        });
      }
      if (!registerUser[0].permission) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Access denied. Check notification in your ordinary account",
        });
      }
      try {
        const logedInUser = await payload.login({
          collection: "agents",
          data: {
            email,
            password,
          },
          res,
        });
        return { success: true, loggedInUserId: logedInUser.user.id };
      } catch (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Incorrect password",
        });
      }
    }),
  verifyNationalId: publicProcedure
    .input(z.object({ email: z.string(), nationalId: z.string() }))
    .mutation(async ({ input }) => {
      const { email, nationalId } = input;

      // Normalize the input national ID by removing spaces and dashes
      const normalizedNationalId = nationalId.replace(/[\s-]/g, "");

      // Fetch the user's national ID from the database
      const payload = await getPayloadClient();
      const user = await payload.find({
        collection: "ordinaryUser",
        where: {
          email: { equals: email },
        },
      });

      // If the user is found, compare the normalized national IDs
      if (user && user.docs.length > 0) {
        const storedNationalId = user.docs[0].nationalId.replace(/[\s-]/g, "");

        if (storedNationalId === normalizedNationalId) {
          await payload.update({
            collection: "ordinaryUser",
            id: user.docs[0].id,
            data: {
              nationalIdVerified: "approved",
            },
          });
          return { message: "National ID verified successfully" };
        } else {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message:
              "The national ID does not match the one registered during sign-up. Please sign up again.",
          });
        }
      } else {
        throw new TRPCError({ code: "BAD_REQUEST", message: "User not found" });
      }
    }),
  getUserProfile: privateProcedure.query(async ({ ctx }) => {
    const { user } = ctx;
    const payload = await getPayloadClient();
    const userFound = await payload.findByID({
      collection: "users",
      id: user.id,
    });
    return { userFound };
  }),
  updateProfile: privateProcedure
    .input(UpdateUserProfile)
    .mutation(async ({ input, ctx }) => {
      const { profile, phoneNumber, email, city, woreda, kebele } = input;
      const { user } = ctx;
      const payload = await getPayloadClient();
      await payload.update({
        collection: "users",
        id: user.id,
        data: {
          profile,
          phoneNumber,
          email,
          city,
          woreda,
          kebele,
        },
      });
    }),
});
