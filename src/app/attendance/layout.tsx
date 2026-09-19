import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance Portal | SOMYA INNOVATIONS",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
