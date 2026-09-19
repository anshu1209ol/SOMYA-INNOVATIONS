import type { Employee, LeaveRequest } from '@/types'

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: "EMP-1001",
    name: "Aarav Sharma",
    role: "Lead AI Engineer",
    dept: "AI Engineering",
    status: "Present",
    check_in: "09:02 AM",
    check_out: "--",
    hours: "7h 45m",
    location: "HQ - Floor 4",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1002",
    name: "Priya Patel",
    role: "Cloud Architect",
    dept: "IT Infrastructure",
    status: "Present",
    check_in: "08:55 AM",
    check_out: "--",
    hours: "7h 52m",
    location: "HQ - Floor 3",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1003",
    name: "Rohan Verma",
    role: "Cybersecurity Analyst",
    dept: "Security",
    status: "Late",
    check_in: "10:15 AM",
    check_out: "--",
    hours: "6h 32m",
    location: "HQ - Floor 2",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1004",
    name: "Ananya Iyer",
    role: "Full Stack Engineer",
    dept: "Digital Engineering",
    status: "Remote",
    check_in: "09:00 AM",
    check_out: "--",
    hours: "7h 47m",
    location: "Remote - Bengaluru",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1005",
    name: "Vikram Malhotra",
    role: "Enterprise Sales Director",
    dept: "Sales & Client Success",
    status: "Present",
    check_in: "08:45 AM",
    check_out: "--",
    hours: "8h 02m",
    location: "Client Site - Delhi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1006",
    name: "Neha Gupta",
    role: "ML Operations Lead",
    dept: "AI Engineering",
    status: "On Leave",
    check_in: "--",
    check_out: "--",
    hours: "0h 00m",
    location: "Medical Leave",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1007",
    name: "Karan Singh",
    role: "DevOps Engineer",
    dept: "IT Infrastructure",
    status: "Present",
    check_in: "09:10 AM",
    check_out: "--",
    hours: "7h 37m",
    location: "HQ - Floor 3",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1008",
    name: "Sneha Reddy",
    role: "UI/UX Product Designer",
    dept: "Digital Engineering",
    status: "Absent",
    check_in: "--",
    check_out: "--",
    hours: "0h 00m",
    location: "Unexcused",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
  },
  {
    id: "EMP-1009",
    name: "Aditya Nair",
    role: "Data Scientist",
    dept: "AI Engineering",
    status: "Present",
    check_in: "08:58 AM",
    check_out: "--",
    hours: "7h 49m",
    location: "HQ - Floor 4",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80"
  }
]

export const DEFAULT_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    employee_name: "Neha Gupta",
    dept: "AI Engineering",
    dates: "Sep 18 - Sep 20",
    reason: "Medical Leave",
    type: "Sick Leave",
    status: "Pending"
  },
  {
    id: "2",
    employee_name: "Kunal Mehra",
    dept: "IT Infrastructure",
    dates: "Sep 22 - Sep 25",
    reason: "Conference Attendance",
    type: "Duty Leave",
    status: "Pending"
  },
  {
    id: "3",
    employee_name: "Meera Deshmukh",
    dept: "Digital Engineering",
    dates: "Oct 01 - Oct 05",
    reason: "Annual Vacation",
    type: "Casual Leave",
    status: "Pending"
  }
]
