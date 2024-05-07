"use client";
import HomeNavbar from "@/components/HomeNavbar";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import {
  TRegistorAsAgentValidators,
  RegistorAsAgentValidators,
} from "@/validators/registor-as-agent";
import { ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegistorAsAgent = () => {
  const router = useRouter();
  const [visible, setVisible] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<TRegistorAsAgentValidators>({
    resolver: zodResolver(RegistorAsAgentValidators),
  });

  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TRegistorAsAgentValidators);
  };
  const { mutate, isLoading, isSuccess } =
    trpc.auth.createOrdinaryUser.useMutation({
      onError: (err) => {
        if (err.data?.code === "CONFLICT") {
          toast.error(err.message);
        }
      },
      onSuccess: ({ sentToEmail, nationalId }) => {
        toast.success("Verification link is send to your email");
        router.push(`/verify-email?to=${sentToEmail}&nationalId=${nationalId}`);
      },
    });

  const onSubmit = ({
    firstName,
    middleName,
    lastName,
    email,
    password,
    confirmPassword,
    nationalId,
    phoneNumber,
    city,
    woreda,
    kebele,
  }: TRegistorAsAgentValidators) => {
    console.log(
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
      nationalId,
      phoneNumber,
      city,
      woreda,
      kebele
    );

    if (password !== confirmPassword) {
      console.log("TRUE", password !== confirmPassword);
      clearErrors("password");
      clearErrors("confirmPassword");
      console.log("ERROR OCCURED PASSWORD DOESNOT MATCH");

      // Set error messages for password and confirmPassword

      setError("password", {
        type: "manual",
        message: "Passwords do not match",
      });
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      console.log("errors", errors?.password?.message);

      return;
    }
    console.log("errors", errors?.password?.message);
    mutate({
      firstName,
      middleName,
      lastName,
      email,
      password,
      confirmPassword,
      nationalId,
      phoneNumber,
      city,
      woreda,
      kebele,
    });
  };

  return (
    <div>
      <MaxWidthWrapper className="">
        <div className="flex flex-col gap-y-8 items-center py-14">
          <div className="relative h-52 w-52">
            <Image fill src="/mainImages/logo.png" alt="LOGO IMAGES" />
          </div>
          <div className="w-full text-center">
            <h1 className="text-3xl text-customColor">
              Please fill all the required information correctly!
            </h1>
            <Link
              href={"sign-in"}
              className={buttonVariants({
                variant: "link",
                className: "gap-1 text-customColor text-xl",
              })}
            >
              Already have an account
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <form
              className="w-5/6 sm:w-2/3 lg:1/2 xl:w-1/3"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="py-2">
                <Label
                  htmlFor="firstName"
                  className="text-xl text-customColor font-normal"
                >
                  First Name
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("firstName")}
                    placeholder="Yosef"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.firstName,
                    })}
                    onChange={() => handleInputChange("firstName")}
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="middleName"
                  className="text-xl text-customColor font-normal"
                >
                  Middle Name
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("middleName")}
                    placeholder="Alemu"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.middleName,
                    })}
                    onChange={() => handleInputChange("middletName")}
                  />
                  {errors?.middleName && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.middleName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="lastName"
                  className="text-xl text-customColor font-normal"
                >
                  Last Name
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("lastName")}
                    placeholder="Mengstie"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.lastName,
                    })}
                    onChange={() => handleInputChange("lastName")}
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="email"
                  className="text-xl text-customColor font-normal"
                >
                  Email
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("email")}
                    placeholder="you@example.com"
                    className={cn({
                      "focus-visible:ring-red-600": errors.email,
                    })}
                    onChange={() => handleInputChange("email")}
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="nationalId"
                  className="text-xl text-customColor font-normal"
                >
                  National Id
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("nationalId")}
                    placeholder="000-000-0000-0000"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.nationalId,
                    })}
                    onChange={() => handleInputChange("nationalId")}
                  />
                  {errors?.nationalId && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.nationalId.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-xl text-customColor font-normal"
                >
                  Phone Number
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("phoneNumber")}
                    placeholder="0982010318"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.phoneNumber,
                    })}
                    onChange={() => handleInputChange("phoneNumber")}
                  />
                  {errors?.phoneNumber && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="city"
                  className="text-xl text-customColor font-normal"
                >
                  City
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("city")}
                    placeholder="Addis Ababa"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.city,
                    })}
                    onChange={() => handleInputChange("city")}
                  />
                  {errors?.city && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="woreda"
                  className="text-xl text-customColor font-normal"
                >
                  Woreda
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("woreda")}
                    placeholder="Arada"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.woreda,
                    })}
                    onChange={() => handleInputChange("woreda")}
                  />
                  {errors?.woreda && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.woreda.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="py-2">
                <Label
                  htmlFor="kebele"
                  className="text-xl text-customColor font-normal"
                >
                  Kebele
                </Label>
                <div className="gap-1 py-2">
                  <Input
                    {...register("kebele")}
                    placeholder="08"
                    type="text"
                    className={cn({
                      "focus-visible:ring-red-600": errors.kebele,
                    })}
                    onChange={() => handleInputChange("kebele")}
                  />
                  {errors?.kebele && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.kebele.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2 py-2">
                <Label
                  htmlFor="password"
                  className="text-xl text-customColor font-normal"
                >
                  Password
                </Label>
                <div className="flex gap-2 py-2 relative">
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                    {visible ? (
                      <EyeOff
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    ) : (
                      <Eye
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </div>

                  <Input
                    {...register("password")}
                    placeholder="Password"
                    type={visible ? "text" : "password"}
                    className={cn(
                      {
                        "focus-visible:ring-red-600": errors.password?.message,
                      },
                      "auto-rows-max"
                    )}
                    onChange={() => handleInputChange("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2 py-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xl text-customColor font-normal"
                >
                  Confirm Password
                </Label>
                <div className="flex gap-2 py-2 relative">
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                    {visible ? (
                      <EyeOff
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    ) : (
                      <Eye
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </div>

                  <Input
                    {...register("confirmPassword")}
                    placeholder="Password"
                    type={visible ? "text" : "password"}
                    className={cn(
                      {
                        "focus-visible:ring-red-600":
                          errors.confirmPassword?.message,
                      },
                      "auto-rows-max"
                    )}
                    onChange={() => handleInputChange("confirmPassword")}
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {isLoading ? (
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "disabled:cursor-not-allowed w-full text-lg mt-6",
                  })}
                  disabled={isLoading}
                >
                  Processing
                  <Loader2
                    size={22}
                    className="animate-spin text-zinc-300 ml-2"
                  />
                </Button>
              ) : (
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                  })}
                  disabled={isSuccess}
                >
                  Registor
                </Button>
              )}
            </form>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};
export default RegistorAsAgent;