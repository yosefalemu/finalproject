"use client";
import { MainSidebarComponents } from "@/config/";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface MainSidebarComponentsItemProps {
  role: string | undefined;
}
const MainNavigationComponentsItem = ({
  role,
}: MainSidebarComponentsItemProps) => {
  const router = useRouter();
  // const pathname = usePathname();
  const pathname = usePathname().split("/")[1].toLowerCase();
  console.log("PATH NAME", pathname);
  return (
    <div className="flex items-center justify-center gap-x-4 bg-customColor">
      {MainSidebarComponents.map((item, index) => (
        <div
          className={`pl-2 pr-6 py-2 flex items-center gap-x-2 hover:bg-customColorThree hover:text-customColor cursor-pointer text-customColorThree  ${
            pathname === item.url.toLowerCase().replace(/\s/g, "")
              ? "text-white font-semibold"
              : ""
          }  ${item.role?.includes(role || "") ? "" : "hidden"}`}
          key={index}
          onClick={() =>
            router.push(`/${item.url.toLowerCase().replace(/\s/g, "")}`)
          }
        >
          <div>
            <item.icon />
          </div>
          <h1 className="text-xl">{item.name}</h1>
        </div>
      ))}
    </div>
  );
};
export default MainNavigationComponentsItem;
