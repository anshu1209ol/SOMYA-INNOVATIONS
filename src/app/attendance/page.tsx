"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  Lock,
  Key,
  Clock,
  Calendar,
  Users,
  UserCheck,
  AlertTriangle,
  UserX,
  TrendingUp,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  Download,
  RotateCcw,
  Shield,
  CheckCircle2,
  XCircle,
  Play,
  Square,
  ExternalLink,
  ChevronRight,
  MoreVertical,
  Building2,
  MapPin,
  Briefcase,
  Layers,
  Sparkles
} from "lucide-react";
import { DEFAULT_EMPLOYEES, DEFAULT_LEAVE_REQUESTS } from "@/lib/constants/attendance";
import {
  getEmployees,
  getLeaveRequests,
  addEmployee as serverAddEmployee,
  deleteEmployee as serverDeleteEmployee,
  updateLeaveRequestStatus as serverUpdateLeaveStatus,
  recordPunch as serverRecordPunch
} from "@/lib/actions/attendance";
import type { Employee, LeaveRequest } from "@/types";

export default function AttendanceDashboardPage() {
  // Authentication & Security Gatekeeper
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>("");
  const [pinError, setPinError] = useState<string>("");
  const [adminPin, setAdminPin] = useState<string>("SOMYA2026");

  // Core Data State
  const [employees, setEmployees] = useState<Employee[]>(DEFAULT_EMPLOYEES);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(DEFAULT_LEAVE_REQUESTS);
  const [loading, setLoading] = useState<boolean>(true);

  // Live Digital Clock
  const [currentTime, setCurrentTime] = useState<string>("");
  const [currentDate, setCurrentDate] = useState<string>("");

  // Punch-In / Punch-Out Shift State
  const [isPunchedIn, setIsPunchedIn] = useState<boolean>(false);
  const [punchStartTime, setPunchStartTime] = useState<Date | null>(null);
  const [elapsedTimer, setElapsedTimer] = useState<string>("00:00:00");
  const [checkInDisplay, setCheckInDisplay] = useState<string>("--:--");

  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [selectedStatus, setSelectedStatus] = useState<string>("ALL");

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // New Employee Form State
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpId, setNewEmpId] = useState("");
  const [newEmpRole, setNewEmpRole] = useState("");
  const [newEmpDept, setNewEmpDept] = useState("AI Engineering");
  const [newEmpStatus, setNewEmpStatus] = useState<Employee['status']>("Present");
  const [newEmpLocation, setNewEmpLocation] = useState("HQ - Somya Tower");
  const [newEmpAvatar, setNewEmpAvatar] = useState("");

  // Toast System
  const [toast, setToast] = useState<{ message: string; type: "success" | "info" | "error" } | null>(null);

  const showToast = (message: string, type: "success" | "info" | "error" = "info") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Check existing session on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedPin = localStorage.getItem("somya_admin_pin");
      if (savedPin) setAdminPin(savedPin);

      const sessionToken = sessionStorage.getItem("somya_auth_token");
      if (sessionToken === "authenticated") {
        setIsAuthenticated(true);
      }

      const storedEmployees = localStorage.getItem("somya_employees");
      if (storedEmployees) {
        try {
          const parsed = JSON.parse(storedEmployees);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setEmployees(parsed);
          }
        } catch {
          // fallback
        }
      }
    }
  }, []);

  // Fetch initial data from server action
  useEffect(() => {
    async function loadData() {
      try {
        const [empData, leaveData] = await Promise.all([
          getEmployees(),
          getLeaveRequests()
        ]);
        if (empData && empData.length > 0) {
          setEmployees(empData);
          if (typeof window !== "undefined") {
            localStorage.setItem("somya_employees", JSON.stringify(empData));
          }
        }
        if (leaveData && leaveData.length > 0) {
          setLeaveRequests(leaveData);
        }
      } catch (err) {
        console.error("Failed to load attendance records:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Live Digital Clock Ticker
  useEffect(() => {
    function updateClock() {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true
        })
      );
      setCurrentDate(
        now.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric"
        })
      );
    }
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Shift Timer Ticker
  useEffect(() => {
    let timerInterval: NodeJS.Timeout;
    if (isPunchedIn && punchStartTime) {
      timerInterval = setInterval(() => {
        const diffMs = new Date().getTime() - punchStartTime.getTime();
        const hours = Math.floor(diffMs / 3600000).toString().padStart(2, "0");
        const mins = Math.floor((diffMs % 3600000) / 60000).toString().padStart(2, "0");
        const secs = Math.floor((diffMs % 60000) / 1000).toString().padStart(2, "0");
        setElapsedTimer(`${hours}:${mins}:${secs}`);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isPunchedIn, punchStartTime]);

  // Security Gatekeeper Verification
  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput.trim() === adminPin || pinInput.trim() === "SOMYA2026") {
      sessionStorage.setItem("somya_auth_token", "authenticated");
      setIsAuthenticated(true);
      setPinError("");
      setPinInput("");
      showToast("Workforce Portal Authenticated & Unlocked!", "success");
    } else {
      setPinError("Incorrect Security PIN. Default access key is SOMYA2026");
    }
  };

  const handleLockPortal = () => {
    sessionStorage.removeItem("somya_auth_token");
    setIsAuthenticated(false);
    showToast("Portal Locked for Enterprise Security.", "info");
  };

  // Punch Clock Toggle
  const togglePunch = async () => {
    if (!isPunchedIn) {
      const now = new Date();
      setIsPunchedIn(true);
      setPunchStartTime(now);
      const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      setCheckInDisplay(timeStr);
      showToast("Shift Activated! Punch-In timestamp recorded.", "success");
      // Optionally sync to server
      await serverRecordPunch("EMP-1001", "in");
    } else {
      setIsPunchedIn(false);
      showToast(`Punch-Out recorded. Total shift duration: ${elapsedTimer}`, "info");
      await serverRecordPunch("EMP-1001", "out", elapsedTimer);
      setElapsedTimer("00:00:00");
      setCheckInDisplay("--:--");
      setPunchStartTime(null);
    }
  };

  // Filtering Logic
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const matchQuery =
        emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchQuery.toLowerCase());
      const matchDept = selectedDept === "ALL" || emp.dept === selectedDept;
      const matchStatus = selectedStatus === "ALL" || emp.status === selectedStatus;
      return matchQuery && matchDept && matchStatus;
    });
  }, [employees, searchQuery, selectedDept, selectedStatus]);

  // KPIs
  const totalCount = employees.length;
  const presentCount = employees.filter((e) => e.status === "Present" || e.status === "Remote").length;
  const lateCount = employees.filter((e) => e.status === "Late").length;
  const leaveCount = employees.filter((e) => e.status === "On Leave" || e.status === "Absent").length;
  const attendanceRate = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

  // Add Employee Handler
  const handleOpenAddModal = () => {
    setNewEmpId(`EMP-${1000 + employees.length + 1}`);
    setNewEmpName("");
    setNewEmpRole("");
    setNewEmpDept("AI Engineering");
    setNewEmpStatus("Present");
    setNewEmpLocation("HQ - Somya Tower");
    setNewEmpAvatar("");
    setIsAddModalOpen(true);
  };

  const handleSaveEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newEmpName.trim() || !newEmpRole.trim()) {
      showToast("Please provide both name and role", "error");
      return;
    }

    const defaultAvatar =
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";

    const newRecord: Employee = {
      id: newEmpId || `EMP-${1000 + employees.length + 1}`,
      name: newEmpName.trim(),
      role: newEmpRole.trim(),
      dept: newEmpDept,
      status: newEmpStatus,
      check_in:
        newEmpStatus === "Present" || newEmpStatus === "Remote"
          ? "09:00 AM"
          : newEmpStatus === "Late"
          ? "09:45 AM"
          : "--",
      check_out: "--",
      hours: newEmpStatus === "Absent" || newEmpStatus === "On Leave" ? "0h 00m" : "8h 00m",
      location: newEmpLocation.trim() || "HQ - Somya Tower",
      avatar: newEmpAvatar.trim() || defaultAvatar
    };

    const updated = [newRecord, ...employees];
    setEmployees(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("somya_employees", JSON.stringify(updated));
    }
    setIsAddModalOpen(false);
    showToast(`Added employee record: ${newRecord.name}`, "success");

    // Persist to Supabase in background
    await serverAddEmployee(newRecord);
  };

  // Delete Employee Handler
  const handleDeleteEmployee = async (id: string) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;

    if (confirm(`Are you sure you want to remove ${emp.name} (${emp.id}) from attendance records?`)) {
      const updated = employees.filter((e) => e.id !== id);
      setEmployees(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("somya_employees", JSON.stringify(updated));
      }
      setSelectedEmployee(null);
      showToast(`Removed employee ${emp.name}`, "info");

      // Persist to Supabase in background
      await serverDeleteEmployee(id);
    }
  };

  // Leave Request Action Handler
  const handleLeaveAction = async (id: string, status: "Approved" | "Rejected") => {
    setLeaveRequests((prev) => prev.filter((r) => r.id !== id));
    showToast(`Leave request ${status.toLowerCase()} successfully.`, status === "Approved" ? "success" : "info");
    await serverUpdateLeaveStatus(id, status);
  };

  // Export JSON Report
  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(employees, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `somya_workforce_attendance_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Workforce attendance dataset exported as JSON", "success");
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    if (confirm("Reset attendance dataset to initial corporate records?")) {
      setEmployees(DEFAULT_EMPLOYEES);
      if (typeof window !== "undefined") {
        localStorage.setItem("somya_employees", JSON.stringify(DEFAULT_EMPLOYEES));
      }
      showToast("Dataset reset to defaults", "info");
    }
  };

  // Department counts for distribution cards
  const depts = [
    { name: "AI Engineering", color: "bg-[#641F2A]" },
    { name: "IT Infrastructure", color: "bg-[#68704A]" },
    { name: "Digital Engineering", color: "bg-[#8E8A80]" },
    { name: "Sales & Client Success", color: "bg-[#D4AF73]" },
    { name: "Security", color: "bg-[#45151D]" }
  ];

  return (
    <div className="min-h-screen bg-[#11110F] text-[#F1EBDD] flex flex-col selection:bg-[#641F2A] selection:text-[#F1EBDD]">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl text-xs font-medium backdrop-blur-md shadow-2xl transition-all duration-300 border flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-[#68704A]/90 text-[#F1EBDD] border-[#68704A]"
              : toast.type === "error"
              ? "bg-[#641F2A]/90 text-[#F1EBDD] border-[#641F2A]"
              : "bg-[#141412]/95 text-[#F1EBDD] border-[#641F2A]/60"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              toast.type === "success" ? "bg-white" : toast.type === "error" ? "bg-red-400" : "bg-[#641F2A]"
            }`}
          />
          <span>{toast.message}</span>
        </div>
      )}

      {/* SECURITY LOCK SCREEN MODAL */}
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
          <div className="w-full max-w-md p-8 bg-[#161614] rounded-2xl shadow-2xl border border-white/10 text-center relative overflow-hidden">
            {/* Ambient Burgundy Glow */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-[#641F2A]/30 rounded-full blur-3xl pointer-events-none" />

            <div className="w-14 h-14 rounded-2xl bg-[#641F2A]/20 border border-[#641F2A]/50 flex items-center justify-center text-[#F1EBDD] mx-auto mb-5 shadow-lg">
              <Lock className="w-7 h-7 text-[#641F2A]" />
            </div>

            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-xs font-mono tracking-widest text-[#C8C2B3]/60 uppercase">
                SOMYA INNOVATIONS
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#F1EBDD] mb-2 tracking-tight">
              Restricted Portal Access
            </h2>
            <p className="text-xs text-[#C8C2B3]/80 mb-6 leading-relaxed">
              Employee attendance and workforce telemetry are protected under enterprise governance. Enter your Admin Access Key to proceed.
            </p>

            <form onSubmit={handleVerifyPin} className="space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono text-[#C8C2B3]/70 uppercase mb-1.5">
                  Enter Security PIN
                </label>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Default PIN: SOMYA2026"
                  className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-[#F1EBDD] placeholder:text-[#8E8A80] text-center tracking-widest font-mono text-sm focus:outline-none focus:border-[#641F2A] focus:ring-1 focus:ring-[#641F2A] transition-all"
                  autoFocus
                />
                {pinError && (
                  <p className="text-[11px] text-red-400 font-mono mt-1.5 text-center">
                    {pinError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-semibold bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(100,31,42,0.4)] transition-all cursor-pointer"
              >
                <Key className="w-4 h-4" />
                <span>Authenticate & Unlock</span>
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[10px] font-mono text-[#C8C2B3]/50">
              <span>Protected Route</span>
              <Link href="/" className="hover:text-[#F1EBDD] transition-colors flex items-center gap-1">
                <span>Return to Home</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MAIN PORTAL CONTENT */}
      {isAuthenticated && (
        <div className="min-h-screen flex flex-col">
          {/* Integrated Operational Sub-Navbar */}
          <div className="bg-[#161614]/70 border-b border-white/10 px-6 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C8C2B3]/70">
                <Link href="/" className="hover:text-[#F1EBDD] transition-colors">
                  Home
                </Link>
                <span>/</span>
                <Link href="/admin" className="hover:text-[#F1EBDD] transition-colors">
                  Portals
                </Link>
                <span>/</span>
                <span className="text-[#F1EBDD] font-semibold">Workforce Attendance</span>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase font-semibold bg-[#68704A]/20 text-[#D4E0A5] border border-[#68704A]/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#68704A] animate-ping" />
                Live Telemetry
              </span>
            </div>

            {/* Live Clock & Navigation Actions */}
            <div className="flex items-center gap-4">
              {/* Digital Clock */}
              <div className="hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10">
                <Clock className="w-4 h-4 text-[#68704A]" />
                <div className="flex flex-col text-right">
                  <span className="text-xs font-mono font-bold text-[#F1EBDD]">{currentTime}</span>
                  <span className="text-[9px] font-mono text-[#C8C2B3]/60 uppercase">{currentDate}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <Link
                  href="/admin"
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#F1EBDD]/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors hidden sm:inline-flex items-center gap-1.5"
                >
                  <span>Admin Hub</span>
                </Link>

                <button
                  onClick={handleExportData}
                  className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#F1EBDD]/80 hover:text-white border border-white/10 transition-colors"
                  title="Export Attendance JSON Report"
                >
                  <Download className="w-4 h-4" />
                </button>

                <button
                  onClick={handleLockPortal}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#FFA5B3] bg-[#641F2A]/20 hover:bg-[#641F2A]/40 border border-[#641F2A]/50 transition-colors flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Lock Portal</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Dashboard Body */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Top Operational Bar: Live Shift Punch & Quick Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Shift Punch Card */}
              <div className="p-6 rounded-2xl bg-[#161614] border border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#641F2A]/15 rounded-full blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#68704A] animate-ping" />
                      <span className="text-[11px] font-mono uppercase tracking-wider text-[#C8C2B3]">
                        Shift Punch Station
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-mono tracking-wider font-semibold uppercase ${
                        isPunchedIn
                          ? "bg-[#68704A]/20 text-[#D4E0A5] border border-[#68704A]/40"
                          : "bg-white/[0.05] text-[#C8C2B3] border border-white/10"
                      }`}
                    >
                      {isPunchedIn ? "SHIFT ACTIVE" : "NOT PUNCHED IN"}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#F1EBDD] tracking-tight mb-1">
                    Employee Self-Service Clock
                  </h3>
                  <p className="text-xs text-[#C8C2B3]/70 mb-4">
                    Record your operational shift arrival and departure times with biometric timestamp verification.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-xs">
                    <span className="text-[#C8C2B3]/60">Check-in Time:</span>
                    <span className="text-[#F1EBDD] font-bold">{checkInDisplay}</span>
                    <span className="text-[#C8C2B3]/60">Duration:</span>
                    <span className="text-[#68704A] font-bold">{elapsedTimer}</span>
                  </div>

                  <button
                    onClick={togglePunch}
                    className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer ${
                      isPunchedIn
                        ? "bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] shadow-[0_4px_20px_rgba(100,31,42,0.5)]"
                        : "bg-[#68704A] hover:bg-[#585f3e] text-[#F1EBDD] shadow-[0_4px_20px_rgba(104,112,74,0.4)]"
                    }`}
                  >
                    {isPunchedIn ? (
                      <>
                        <Square className="w-4 h-4 fill-current" />
                        <span>PUNCH OUT OF SHIFT</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current" />
                        <span>PUNCH IN TO SHIFT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Workforce KPI Telemetry Cards */}
              <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {/* Total Workforce */}
                <div className="p-4 rounded-2xl bg-[#161614] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C8C2B3]/70">
                      Total Staff
                    </span>
                    <Users className="w-4 h-4 text-[#C8C2B3]/50" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#F1EBDD]">
                      {totalCount}
                    </div>
                    <span className="text-[10px] text-[#C8C2B3]/60 mt-1 block">
                      Enrolled active
                    </span>
                  </div>
                </div>

                {/* Present Today */}
                <div className="p-4 rounded-2xl bg-[#161614] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4E0A5]">
                      Present
                    </span>
                    <UserCheck className="w-4 h-4 text-[#68704A]" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D4E0A5]">
                      {presentCount}
                    </div>
                    <span className="text-[10px] text-[#68704A] mt-1 block">
                      On-site & Remote
                    </span>
                  </div>
                </div>

                {/* Late Arrivals */}
                <div className="p-4 rounded-2xl bg-[#161614] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF73]">
                      Late
                    </span>
                    <AlertTriangle className="w-4 h-4 text-[#D4AF73]" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#D4AF73]">
                      {lateCount}
                    </div>
                    <span className="text-[10px] text-[#D4AF73]/80 mt-1 block">
                      After 09:30 AM
                    </span>
                  </div>
                </div>

                {/* On Leave / Absent */}
                <div className="p-4 rounded-2xl bg-[#161614] border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#FFA5B3]">
                      On Leave
                    </span>
                    <UserX className="w-4 h-4 text-[#641F2A]" />
                  </div>
                  <div className="mt-3">
                    <div className="text-2xl sm:text-3xl font-bold font-mono text-[#FFA5B3]">
                      {leaveCount}
                    </div>
                    <span className="text-[10px] text-[#FFA5B3]/80 mt-1 block">
                      Approved & off
                    </span>
                  </div>
                </div>

                {/* Full-width Attendance Rate Banner */}
                <div className="col-span-2 sm:col-span-4 p-4 rounded-2xl bg-[#161614] border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#68704A]/20 border border-[#68704A]/40 flex items-center justify-center text-[#D4E0A5]">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[#F1EBDD]">
                        Daily Enterprise Attendance Rate
                      </div>
                      <div className="text-[11px] text-[#C8C2B3]/60">
                        Workforce participation threshold targeted at ≥ 90%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold font-mono text-[#D4E0A5]">
                      {attendanceRate}%
                    </span>
                    <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden mt-1">
                      <div
                        className="h-full bg-[#68704A] rounded-full transition-all duration-500"
                        style={{ width: `${attendanceRate}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Distribution & Weekly Analytics Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Department Breakdown */}
              <div className="p-6 rounded-2xl bg-[#161614] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#F1EBDD] flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#641F2A]" />
                    <span>Department Distribution</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase">
                    5 Units
                  </span>
                </div>

                <div className="space-y-3">
                  {depts.map((d) => {
                    const count = employees.filter((e) => e.dept === d.name).length;
                    const pct = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                    return (
                      <div key={d.name} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-[#C8C2B3]">{d.name}</span>
                          <span className="font-mono text-[#F1EBDD] font-semibold">
                            {count} ({pct}%)
                          </span>
                        </div>
                        <div className="w-full h-1.5 rounded-full bg-white/[0.05] overflow-hidden">
                          <div
                            className={`h-full ${d.color} rounded-full transition-all`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Pending Leave Requests Queue */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-[#161614] border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-[#F1EBDD] flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#68704A]" />
                    <span>Pending Leave Requests</span>
                  </h4>
                  <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase">
                    {leaveRequests.length} Pending Actions
                  </span>
                </div>

                {leaveRequests.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-[#C8C2B3]/60 bg-white/[0.02] rounded-xl border border-white/5">
                    No pending leave requests in queue. All approvals up to date.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
                    {leaveRequests.map((req) => (
                      <div
                        key={req.id}
                        className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] flex items-center justify-between gap-4"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-[#F1EBDD]">
                              {req.employee_name}
                            </span>
                            <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-white/[0.05] text-[#C8C2B3] border border-white/10">
                              {req.type}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#C8C2B3]/70">
                            {req.dept} • <span className="font-mono text-[#F1EBDD]">{req.dates}</span>
                          </div>
                          <div className="text-[10px] text-[#8E8A80] italic mt-0.5">
                            &ldquo;{req.reason}&rdquo;
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleLeaveAction(req.id, "Approved")}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#D4E0A5] bg-[#68704A]/20 hover:bg-[#68704A]/40 border border-[#68704A]/40 transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleLeaveAction(req.id, "Rejected")}
                            className="px-2.5 py-1 rounded-lg text-xs font-medium text-[#FFA5B3] bg-[#641F2A]/20 hover:bg-[#641F2A]/40 border border-[#641F2A]/40 transition-colors cursor-pointer"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Workforce Directory Filter & Search Header */}
            <div className="p-6 rounded-2xl bg-[#161614] border border-white/10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-[#F1EBDD] tracking-tight">
                    Workforce Attendance Register
                  </h3>
                  <p className="text-xs text-[#C8C2B3]/70">
                    Showing {filteredEmployees.length} of {employees.length} active employee records
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleResetDefaults}
                    className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-[#C8C2B3] hover:text-white border border-white/10 transition-colors"
                    title="Reset to default initial dataset"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenAddModal}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] flex items-center gap-2 shadow-[0_2px_14px_rgba(100,31,42,0.4)] transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Employee</span>
                  </button>
                </div>
              </div>

              {/* Filters Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Search query */}
                <div className="relative">
                  <Search className="w-4 h-4 text-[#C8C2B3]/50 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, ID, or designation..."
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-xs text-[#F1EBDD] placeholder:text-[#8E8A80] focus:outline-none focus:border-[#641F2A]"
                  />
                </div>

                {/* Department filter */}
                <div>
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161614] border border-white/10 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="ALL">All Departments</option>
                    <option value="AI Engineering">AI Engineering</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Digital Engineering">Digital Engineering</option>
                    <option value="Sales & Client Success">Sales & Client Success</option>
                    <option value="Security">Security</option>
                  </select>
                </div>

                {/* Status filter */}
                <div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161614] border border-white/10 text-xs text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="ALL">All Attendance Statuses</option>
                    <option value="Present">Present</option>
                    <option value="Remote">Remote</option>
                    <option value="Late">Late</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              {/* Employee Table */}
              <div className="overflow-x-auto rounded-xl border border-white/5 mt-2">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02] text-[11px] font-mono uppercase tracking-wider text-[#C8C2B3]/70">
                      <th className="px-5 py-3">Employee</th>
                      <th className="px-5 py-3">Department</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Check-in</th>
                      <th className="px-5 py-3">Hours</th>
                      <th className="px-5 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredEmployees.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-6 py-10 text-center text-xs font-mono text-[#C8C2B3]/60">
                          No matching employee records found.
                        </td>
                      </tr>
                    ) : (
                      filteredEmployees.map((emp) => {
                        let statusColor = "bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40";
                        if (emp.status === "Late") statusColor = "bg-[#D4AF73]/20 text-[#D4AF73] border-[#D4AF73]/40";
                        else if (emp.status === "On Leave") statusColor = "bg-[#641F2A]/20 text-[#FFA5B3] border-[#641F2A]/40";
                        else if (emp.status === "Absent") statusColor = "bg-white/[0.05] text-[#8E8A80] border-white/10";
                        else if (emp.status === "Remote") statusColor = "bg-[#68704A]/20 text-[#D4E0A5] border-[#68704A]/40";

                        return (
                          <tr key={emp.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-3">
                                <img
                                  src={
                                    emp.avatar ||
                                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                                  }
                                  alt={emp.name}
                                  className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0"
                                />
                                <div>
                                  <div className="text-xs font-semibold text-[#F1EBDD]">{emp.name}</div>
                                  <div className="text-[10px] font-mono text-[#C8C2B3]/60">
                                    {emp.id} • {emp.role}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-5 py-3.5 text-xs text-[#C8C2B3]">{emp.dept}</td>
                            <td className="px-5 py-3.5">
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border ${statusColor}`}
                              >
                                {emp.status}
                              </span>
                            </td>
                            <td className="px-5 py-3.5 text-xs font-mono text-[#F1EBDD]">{emp.check_in || "--"}</td>
                            <td className="px-5 py-3.5 text-xs font-mono text-[#C8C2B3]">{emp.hours || "8h 00m"}</td>
                            <td className="px-5 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => setSelectedEmployee(emp)}
                                  className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-[#F1EBDD]/80 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-colors cursor-pointer"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleDeleteEmployee(emp.id)}
                                  className="px-2 py-1 rounded-lg text-[11px] font-medium text-[#FFA5B3] hover:text-white bg-[#641F2A]/20 hover:bg-[#641F2A]/40 border border-[#641F2A]/40 transition-colors cursor-pointer"
                                  title="Delete Employee Record"
                                >
                                  ✕
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>

          {/* Footer Bar */}
          <footer className="mt-auto border-t border-white/10 px-6 py-4 text-center text-xs font-mono text-[#C8C2B3]/60">
            SOMYA INNOVATIONS Workforce Telemetry • Built with Quiet Luxury Architecture
          </footer>
        </div>
      )}

      {/* ADD EMPLOYEE MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg p-6 rounded-2xl bg-[#161614] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#641F2A]/30 border border-[#641F2A]/60 flex items-center justify-center text-[#F1EBDD]">
                  <Plus className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#F1EBDD]">Add New Employee</h3>
                  <p className="text-[11px] text-[#C8C2B3]/60">Enroll employee into Somya Innovations workforce register</p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[#F1EBDD]/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEmployee} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmpId}
                    onChange={(e) => setNewEmpId(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#F1EBDD] font-mono focus:outline-none focus:border-[#641F2A]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                    Status
                  </label>
                  <select
                    value={newEmpStatus}
                    onChange={(e) => setNewEmpStatus(e.target.value as Employee['status'])}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161614] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="Present">Present</option>
                    <option value="Remote">Remote</option>
                    <option value="Late">Late</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Absent">Absent</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                    Department
                  </label>
                  <select
                    value={newEmpDept}
                    onChange={(e) => setNewEmpDept(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#161614] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  >
                    <option value="AI Engineering">AI Engineering</option>
                    <option value="IT Infrastructure">IT Infrastructure</option>
                    <option value="Digital Engineering">Digital Engineering</option>
                    <option value="Sales & Client Success">Sales & Client Success</option>
                    <option value="Security">Security</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    value={newEmpRole}
                    onChange={(e) => setNewEmpRole(e.target.value)}
                    placeholder="e.g. Senior Systems Engineer"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                  Work Location
                </label>
                <input
                  type="text"
                  value={newEmpLocation}
                  onChange={(e) => setNewEmpLocation(e.target.value)}
                  placeholder="e.g. HQ - Somya Tower or Remote"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-[#C8C2B3]/80 uppercase mb-1">
                  Avatar Image URL (Optional)
                </label>
                <input
                  type="url"
                  value={newEmpAvatar}
                  onChange={(e) => setNewEmpAvatar(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/10 text-[#F1EBDD] focus:outline-none focus:border-[#641F2A]"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2.5 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white/[0.05] hover:bg-white/10 text-[#C8C2B3]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-semibold bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] shadow-md cursor-pointer"
                >
                  Save Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EMPLOYEE DETAILS MODAL */}
      {selectedEmployee && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md p-6 rounded-2xl bg-[#161614] border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={
                    selectedEmployee.avatar ||
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  }
                  alt={selectedEmployee.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/20"
                />
                <div>
                  <h3 className="text-base font-bold text-[#F1EBDD]">{selectedEmployee.name}</h3>
                  <p className="text-xs font-mono text-[#C8C2B3]/70">
                    {selectedEmployee.id} • {selectedEmployee.role}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/10 text-[#F1EBDD]/70 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase block mb-1">Department</span>
                <span className="font-semibold text-[#F1EBDD]">{selectedEmployee.dept}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase block mb-1">Current Status</span>
                <span className="font-semibold text-[#68704A]">{selectedEmployee.status}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase block mb-1">Check-in Time</span>
                <span className="font-mono text-[#F1EBDD]">{selectedEmployee.check_in || "09:00 AM"}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <span className="text-[10px] font-mono text-[#C8C2B3]/60 uppercase block mb-1">Location</span>
                <span className="font-semibold text-[#F1EBDD]">{selectedEmployee.location || "HQ - Somya Tower"}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-between gap-3 border-t border-white/10">
              <button
                onClick={() => handleDeleteEmployee(selectedEmployee.id)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-[#FFA5B3] bg-[#641F2A]/20 hover:bg-[#641F2A]/40 border border-[#641F2A]/40 transition-colors cursor-pointer"
              >
                Remove Record
              </button>
              <button
                onClick={() => setSelectedEmployee(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#641F2A] hover:bg-[#7D2836] text-[#F1EBDD] transition-colors cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
