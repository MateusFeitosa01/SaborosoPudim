"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (title: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <div key={item.title}>
              {item.items && item.items.length > 0 ? (
                <>
                  <SidebarMenuItem>
                    <button
                      onClick={() => toggleItem(item.title)}
                      className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.icon}
                      <span>{item.title}</span>
                      <ChevronRightIcon
                        className={`ml-auto size-4 transition-transform ${
                          openItems[item.title] ? "rotate-90" : ""
                        }`}
                      />
                    </button>
                  </SidebarMenuItem>
                  {openItems[item.title] && (
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  )}
                </>
              ) : (
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </div>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
