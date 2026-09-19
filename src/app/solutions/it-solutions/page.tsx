import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  DisplayHeading,
  EditorialHeading,
  H2,
  Text,
  Breadcrumbs,
} from "@/components/ui";
import { ButtonLink } from "@/components/buttons";
import {
  ArrowRight,
  CheckCircle,
  Monitor,
  Laptop,
  Cpu,
  Printer,
  Mouse,
  Router,
  Network,
  Wifi,
  Layers,
  Share2,
  Video,
  Lock,
  ShieldCheck,
  Briefcase,
  HardDrive,
  PackageCheck,
  Code2,
  Wrench,
  Settings,
  LifeBuoy,
  ShieldAlert,
} from "lucide-react";
import { createMetadata, getBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "IT Solutions & Infrastructure | SOMYA INNOVATIONS",
  description:
    "IT infrastructure, hardware, networking, security technology, software and technical support solutions from SOMYA INNOVATIONS.",
  path: "/solutions/it-solutions",
});

const HARDWARE_ITEMS = [
  {
    title: "Computers",
    description:
      "Enterprise desktop towers, micro small-form-factor units, and all-in-one commercial PCs configured for administrative, commercial, and multi-display office operations.",
    icon: Monitor,
    features: [
      "Custom Corporate Desktop Builds",
      "Space-Saving Small Form Factor (SFF) Units",
      "Multi-Monitor Office Workstations",
      "Clean OS Staging & Deployment",
    ],
  },
  {
    title: "Laptops",
    description:
      "Commercial-grade ultrabooks, high-durability executive notebooks, and mobile workstation laptops provisioned for remote, hybrid, and traveling personnel.",
    icon: Laptop,
    features: [
      "Enterprise Ultrabooks & Business Portables",
      "High-Performance Mobile Workstations",
      "Fleet Provisioning & Standardization",
      "Asset Tagging & Hardware Warranty Verification",
    ],
  },
  {
    title: "Workstations",
    description:
      "High-throughput compute workstations equipped with high-memory capacities, multi-core processors, and dedicated graphics for CAD, video rendering, and simulation workloads.",
    icon: Cpu,
    features: [
      "Engineering & CAD Design Stations",
      "GPU-Accelerated Rendering Systems",
      "ECC Memory & High-Bandwidth Storage",
      "Thermal Stress-Tested Compute Rigs",
    ],
  },
  {
    title: "Peripherals",
    description:
      "Heavy-duty networked multifunction printers, high-resolution flatbed/feeder document scanners, interactive conference webcams, and presentation displays.",
    icon: Printer,
    features: [
      "Network Multifunction Copiers & Printers",
      "High-Speed Document Scanning Feeds",
      "Point-of-Sale (POS) & Receipt Peripherals",
      "Consumable Tracking & Driver Setup",
    ],
  },
  {
    title: "Accessories",
    description:
      "Universal multi-display USB-C/Thunderbolt docking stations, ergonomic mechanical keyboards, precision mice, monitor arms, and surge-protected power strips.",
    icon: Mouse,
    features: [
      "Dual & Triple 4K Display Docking Stations",
      "Ergonomic Commercial Keyboards & Mice",
      "Heavy-Duty Adjustable Desk Monitor Arms",
      "Certified Data Cabling & Power Adapters",
    ],
  },
];

const NETWORKING_ITEMS = [
  {
    title: "Routers",
    description:
      "Enterprise multi-WAN edge routers, hardware firewalls, and gateway appliances providing resilient bandwidth aggregation, failover links, and granular traffic shaping.",
    icon: Router,
    features: [
      "Multi-WAN Load Balancing & Auto-Failover",
      "High-Throughput Gateway Routing",
      "Hardware VPN Concentrators",
      "QoS Bandwidth Optimization",
    ],
  },
  {
    title: "Switches",
    description:
      "Managed Layer 2 and Layer 3 Gigabit and 10GbE network switches with Power over Ethernet (PoE+) distribution for IP phones, access points, and security cameras.",
    icon: Network,
    features: [
      "Managed L2/L3 Gigabit & 10G SFP+ Switching",
      "PoE/PoE+ Port Power Allocation",
      "VLAN Segmentation & Trunking",
      "Stackable Redundant Core Topologies",
    ],
  },
  {
    title: "Wi-Fi Infrastructure",
    description:
      "High-density business Wi-Fi 6, 6E, and 7 wireless access points engineered for seamless roaming, zero dead zones, and isolated guest network segmentation.",
    icon: Wifi,
    features: [
      "High-Density Wi-Fi 6/7 Access Points",
      "Centralized Controller Management",
      "Zero-Handoff Seamless Office Roaming",
      "Branded Captive Portal Guest Isolation",
    ],
  },
  {
    title: "Structured Networking",
    description:
      "Certified Cat6/Cat6A copper and multi-mode fiber optic cabling, server rack patch panel terminations, cable management trays, and precision signal testing.",
    icon: Layers,
    features: [
      "Certified Cat6/Cat6A & Fiber Backbones",
      "Wall-Mount & Floor Server Rack Installation",
      "Color-Coded Patch Panel Terminations",
      "Cable Certification & Attenuation Testing",
    ],
  },
  {
    title: "Connectivity",
    description:
      "Encrypted site-to-site IPsec VPN tunnels, secure remote employee teleworker connectivity, SD-WAN interconnects, and redundant ISP gateway switching.",
    icon: Share2,
    features: [
      "Branch-to-Branch Secure Site VPNs",
      "Remote Teleworker Encrypted Access",
      "Software-Defined WAN (SD-WAN) Routing",
      "Automatic Multi-ISP Uplink Failover",
    ],
  },
];

const SECURITY_ITEMS = [
  {
    title: "CCTV",
    description:
      "High-definition commercial IP surveillance systems, weather-resistant dome/bullet cameras, wide dynamic range night-vision optics, and high-capacity NVR appliances.",
    icon: Video,
    features: [
      "4K Ultra-HD Commercial IP Cameras",
      "Multi-Terabyte Network Video Recorders (NVR)",
      "Infrared Night Vision & Motion Detection",
      "Encrypted Local & Remote Mobile Live Feeds",
    ],
  },
  {
    title: "Access Control",
    description:
      "Biometric fingerprint terminals, encrypted RFID smart-card readers, electronic magnetic door locks, and real-time personnel entry/exit auditing consoles.",
    icon: Lock,
    features: [
      "Biometric & RFID Proximity Card Readers",
      "Heavy-Duty Electronic Magnetic Locks",
      "Automated Time-Stamped Entry Logs",
      "Emergency Fail-Safe Release Integration",
    ],
  },
  {
    title: "Security-Related Technology Solutions",
    description:
      "Integrated server room environmental sensors (temperature, humidity, water leak), intrusion beam alarms, perimeter alert telemetry, and emergency backup power alerts.",
    icon: ShieldCheck,
    features: [
      "Server Room Climate & Leak Monitoring",
      "Perimeter Motion & Intrusion Sensors",
      "Automated SMS/Email Emergency Alerts",
      "Power Interruption Telemetry Alarms",
    ],
  },
];

const SOFTWARE_ITEMS = [
  {
    title: "Business Software",
    description:
      "Deployment and configuration of commercial ERP systems, CRM platforms, accounting packages, inventory trackers, and point-of-sale business applications.",
    icon: Briefcase,
    features: [
      "Enterprise ERP & Accounting Software Staging",
      "Customer Relationship Management (CRM) Setup",
      "Inventory & Supply Chain Software Modules",
      "Commercial Point-of-Sale (POS) Configuration",
    ],
  },
  {
    title: "Operating Systems",
    description:
      "Corporate operating system rollouts across enterprise Windows, Linux server distributions (Ubuntu, Red Hat, Rocky Linux), and business macOS environments.",
    icon: HardDrive,
    features: [
      "Enterprise Windows 11 & Windows Server Setup",
      "Hardened Linux Server Deployments",
      "macOS Business Fleet Integration",
      "Automated Imaging & Driver Ingestion",
    ],
  },
  {
    title: "Productivity Tools",
    description:
      "Corporate productivity suite provisioning, enterprise email migrations, secure cloud storage setup, and unified team collaboration software pipelines.",
    icon: PackageCheck,
    features: [
      "Enterprise Office Productivity Deployments",
      "Business Domain Email Setup & Migration",
      "Secure Cloud Drive & Collaboration Portals",
      "Centralized License Administration",
    ],
  },
  {
    title: "Custom Applications",
    description:
      "Engineering bespoke internal operational software, specialized database frontends, and automated workflow scripts tailored to your company's operational rules.",
    icon: Code2,
    features: [
      "Bespoke Internal Operational Software",
      "Tailored Database Management Interfaces",
      "Automated Scripting & Routine Pipelines",
      "Full Source Code & Architecture Handover",
    ],
  },
];

const SUPPORT_ITEMS = [
  {
    title: "Installation",
    description:
      "On-site physical equipment unpacking, server rack mounting, workstation assembly, peripheral cabling, and verified hardware power-on testing.",
    icon: Wrench,
    features: [
      "Clean Server Rack Mounting & Power Balancing",
      "On-Site Workstation Assembly & Cabling",
      "Peripheral & Display Calibration",
      "Verified Hardware Commissioning Tests",
    ],
  },
  {
    title: "Configuration",
    description:
      "Active Directory and LDAP domain joining, group policy deployment, network printer mapping, automated backup scheduling, and user credential staging.",
    icon: Settings,
    features: [
      "Domain Controller & Active Directory Setup",
      "User Permission & Group Policy Enforcement",
      "Automated Daily Backup Scheduling",
      "Network Drive & Printer Mapping",
    ],
  },
  {
    title: "Troubleshooting",
    description:
      "Rapid remote desktop support, on-site technician dispatch, hardware diagnostic stress-testing, network packet bottleneck analysis, and emergency incident resolution.",
    icon: LifeBuoy,
    features: [
      "Rapid Remote Helpdesk Assistance",
      "On-Site Field Technician Dispatch",
      "Hardware Diagnostic Stress-Testing",
      "Guaranteed Incident Response SLAs",
    ],
  },
  {
    title: "Maintenance",
    description:
      "Scheduled preventive maintenance visits, physical dust removal, thermal paste repasting, OS patch audits, firmware updates, and power supply health checks.",
    icon: ShieldAlert,
    features: [
      "Scheduled Preventative Maintenance Audits",
      "Thermal Inspection & Hardware Cleaning",
      "Firmware & Security Patch Validation",
      "UPS Battery & Power Condition Testing",
    ],
  },
];

export default function ItSolutionsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/solutions/it-solutions" },
    { name: "IT Solutions", url: "/solutions/it-solutions" },
  ]);

  return (
    <div className="py-12 sm:py-16 lg:py-24 bg-[#F1EBDD] text-[#11110F]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Solutions" },
            { label: "IT Solutions" },
          ]}
        />

        {/* ─── HERO SECTION ────────────────────────────────────────────── */}
        <div className="relative pt-6 pb-16 lg:pb-24 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <h1 className="text-xs font-mono uppercase tracking-[0.2em] text-[#68704A]">
              <Badge variant="olive" dot>
                IT Solutions
              </Badge>
            </h1>
          </div>

          <DisplayHeading as="h2" className="max-w-4xl mx-auto mb-6 text-[#11110F]">
            Complete IT Solutions for{" "}
            <EditorialHeading italic className="text-[#68704A]">
              continuous business uptime.
            </EditorialHeading>
          </DisplayHeading>

          <Text variant="lead" className="max-w-3xl mx-auto mb-10 text-[#11110F]/80">
            SOMYA INNOVATIONS delivers end-to-end IT capabilities designed around operational stability, security, and scalability.
            From compute hardware provisioning to high-throughput networking, security systems, and SLA-governed technical support.
          </Text>

          {/* Quick-Jump Section Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto mb-10 text-left">
            {[
              { label: "Hardware", href: "#hardware", icon: Monitor, count: "05 Categories" },
              { label: "Networking", href: "#networking", icon: Network, count: "05 Categories" },
              { label: "Security", href: "#security", icon: ShieldCheck, count: "03 Categories" },
              { label: "Software", href: "#software", icon: HardDrive, count: "04 Categories" },
              { label: "Support", href: "#support", icon: Wrench, count: "04 Categories" },
            ].map((nav) => {
              const Icon = nav.icon;
              return (
                <a
                  key={nav.label}
                  href={nav.href}
                  className="p-4 rounded-xl bg-white border border-black/[0.08] hover:border-[#68704A] hover-elevate transition-all duration-300 group block"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#68704A]/15 border border-[#68704A]/25 flex items-center justify-center text-[#68704A] mb-2.5 group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-[#11110F] group-hover:text-[#68704A] transition-colors">
                    {nav.label}
                  </h3>
                  <span className="text-[11px] text-[#11110F]/60 font-mono block">
                    {nav.count}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ButtonLink
              href="/request-quote?service=IT+Solutions"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Request IT Quote
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary-dark" size="md">
              Speak with an IT Specialist
            </ButtonLink>
          </div>
        </div>

        {/* ─── 1. HARDWARE SECTION ─────────────────────────────────────── */}
        <section id="hardware" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 01 • Compute & Fleet Hardware
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
                HARDWARE
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#11110F]/70">
                Direct enterprise equipment sourcing, custom workstation builds, laptop fleet deployments, and commercial peripherals
                backed by genuine vendor warranties.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/request-quote?service=Hardware"
                variant="secondary-dark"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Hardware Quote
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HARDWARE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 hover-elevate shadow-sm"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#11110F] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-black/[0.08] pt-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#11110F]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <Link
                      href={`/request-quote?service=Hardware`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                    >
                      <span>Inquire about {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 2. NETWORKING SECTION ───────────────────────────────────── */}
        <section id="networking" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 02 • Infrastructure & Connectivity
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
                NETWORKING
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#11110F]/70">
                Architecting high-throughput, fault-tolerant enterprise networks. We design structured cabling backbones,
                install managed switches, deploy high-density Wi-Fi 6/7, and establish encrypted interconnectivity.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/request-quote?service=IT+Solutions"
                variant="secondary-dark"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Networking Quote
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NETWORKING_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 hover-elevate shadow-sm"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#11110F] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-black/[0.08] pt-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#11110F]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <Link
                      href={`/request-quote?service=IT+Solutions`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                    >
                      <span>Inquire about {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 3. SECURITY SECTION ─────────────────────────────────────── */}
        <section id="security" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 03 • Surveillance & Physical Protection
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
                SECURITY
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#11110F]/70">
                Safeguarding physical facilities, enterprise server rooms, and corporate assets with commercial IP surveillance,
                biometric entry controls, and automated telemetry alerts.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/request-quote?service=IT+Solutions"
                variant="secondary-dark"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Security Quote
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECURITY_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 hover-elevate shadow-sm"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#11110F] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-black/[0.08] pt-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#11110F]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <Link
                      href={`/request-quote?service=IT+Solutions`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                    >
                      <span>Inquire about {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 4. SOFTWARE SECTION ─────────────────────────────────────── */}
        <section id="software" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 04 • Systems & Enterprise Platforms
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
                SOFTWARE
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#11110F]/70">
                Operating system deployment, business software licensing, corporate productivity environments,
                and custom software developed specifically to match internal operational rules.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/request-quote?service=Software"
                variant="secondary-dark"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Software Quote
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOFTWARE_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 hover-elevate shadow-sm"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#11110F] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-black/[0.08] pt-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#11110F]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <Link
                      href={`/request-quote?service=Software`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                    >
                      <span>Inquire about {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 5. SUPPORT SECTION ──────────────────────────────────────── */}
        <section id="support" className="py-16 sm:py-24 border-t border-black/[0.1] scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-3">
                <Badge variant="olive" dot>
                  Section 05 • Lifecycle Operations & SLAs
                </Badge>
              </div>
              <H2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#11110F] tracking-tight">
                SUPPORT
              </H2>
              <Text className="mt-3 max-w-2xl text-base text-[#11110F]/70">
                Guaranteed operational uptime through turnkey staging, precision configuration, multi-tier troubleshooting,
                and scheduled preventive maintenance routines.
              </Text>
            </div>
            <div className="shrink-0">
              <ButtonLink
                href="/request-quote?service=IT+Solutions"
                variant="secondary-dark"
                size="sm"
                icon={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Request Support SLA
              </ButtonLink>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SUPPORT_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="group relative flex flex-col justify-between p-7 rounded-2xl bg-white border border-black/[0.08] hover:border-[#68704A]/60 transition-all duration-300 hover-elevate shadow-sm"
                >
                  <div>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#68704A]/15 text-[#68704A] border border-[#68704A]/25 mb-5 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-[#11110F] tracking-tight mb-2.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#11110F]/70 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <ul className="space-y-2.5 mb-6 border-t border-black/[0.08] pt-4">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-start gap-2 text-xs text-[#11110F]/80">
                          <CheckCircle className="w-3.5 h-3.5 text-[#68704A] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/[0.08]">
                    <Link
                      href={`/request-quote?service=IT+Solutions`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#68704A] hover:text-[#4D5437] transition-colors"
                    >
                      <span>Inquire about {item.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── FINAL CALL TO ACTION ────────────────────────────────────── */}
        <section className="py-16 sm:py-24 border-t border-black/[0.1]">
          <div className="relative rounded-3xl overflow-hidden bg-[#11110F] text-[#F1EBDD] p-8 sm:p-14 text-center shadow-2xl border border-white/[0.08]">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Badge variant="burgundy" dot className="mb-4">
                Enterprise IT Partnership
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#F1EBDD] tracking-tight mb-4">
                Request an IT Proposal
              </h2>
              <p className="text-sm sm:text-base text-[#F1EBDD]/70 leading-relaxed mb-8">
                Connect with our systems engineering team to receive an itemized proposal for hardware supply,
                network overhaul, commercial security installations, or ongoing managed IT support.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <ButtonLink
                  href="/request-quote?service=IT+Solutions"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Request IT Quote
                </ButtonLink>
                <ButtonLink
                  href="/contact"
                  variant="secondary"
                  size="md"
                >
                  Contact IT Specialists
                </ButtonLink>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
