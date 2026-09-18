export type ProductCategory =
  | "Computing"
  | "Networking"
  | "Accessories"
  | "Security"
  | "Electronics"
  | "Office Technology";

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  category: ProductCategory;
  sku: string;
  badge?: string;
  availability: "Available on Order" | "Inquire for Sourcing" | "Custom Build";
  specs: Record<string, string>;
  features: string[];
  isDemoPlaceholder: boolean;
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Computing",
  "Networking",
  "Accessories",
  "Security",
  "Electronics",
  "Office Technology",
];

export const PRODUCTS: Product[] = [
  // ─── 1. Computing ───────────────────────────────────────────────
  {
    id: "comp-01",
    slug: "commercial-desktop-tower",
    name: "Enterprise Workstation Desktop Tower",
    shortDescription:
      "Heavy-duty desktop tower engineered for demanding business tasks, multi-screen multitasking, and continuous commercial runtime.",
    longDescription:
      "Designed for business environments requiring dependable compute power, silent thermal management, and comprehensive expandability. Supports high-speed NVMe storage arrays, expandable ECC/DDR5 memory configurations, and dual 4K display outputs for productive office multitasking.",
    category: "Computing",
    sku: "SOMYA-CMP-DSK01",
    badge: "Sample Configuration",
    availability: "Available on Order",
    specs: {
      "Processor Family": "14th Gen Intel Core i7 / i9 or AMD Ryzen 7 Pro",
      "Memory Capacity": "32GB / 64GB DDR5 5600MHz",
      "Storage": "1TB M.2 PCIe 4.0 NVMe SSD + Optional 2TB HDD",
      "Graphics Support": "Integrated UHD / Optional NVIDIA Dedicated GPU",
      "Operating System": "Windows 11 Pro / Ubuntu LTS Pre-configured",
      "Chassis Form Factor": "Mid-Tower Toolless Steel Chassis",
    },
    features: [
      "Toolless chassis access for rapid component maintenance",
      "Dual DisplayPort and HDMI 2.1 outputs for dual-screen setups",
      "Hardware TPM 2.0 security chip for cryptographic drive protection",
      "80-Plus Gold certified high-efficiency power supply unit",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "comp-02",
    slug: "business-fleet-laptop-14",
    name: "Commercial Executive Business Laptop 14\"",
    shortDescription:
      "Lightweight, durable 14-inch corporate ultrabook built with military-grade chassis resilience and all-day battery efficiency.",
    longDescription:
      "Engineered for hybrid and mobile workforces, this commercial notebook pairs responsive multi-core processing with a 16:10 anti-glare display, hardware privacy shutter, and rapid Thunderbolt charging. Validated for corporate fleet staging and enterprise management protocols.",
    category: "Computing",
    sku: "SOMYA-CMP-LPT02",
    badge: "Sample Fleet Unit",
    availability: "Available on Order",
    specs: {
      "Screen Size": "14.0-inch WUXGA (1920x1200) IPS Anti-Glare 400 nits",
      "Processor": "Intel Core Ultra 7 / AMD Ryzen 7 PRO",
      "Memory": "16GB / 32GB LPDDR5x",
      "Storage": "512GB / 1TB PCIe NVMe SSD",
      "Battery Life": "Up to 14 hours with Rapid Charge (80% in 60 min)",
      "Weight": "1.32 kg (2.9 lbs) Magnesium-Aluminum Chassis",
    },
    features: [
      "MIL-STD-810H military-tested structural durability",
      "Physical webcam privacy shutter & IR facial recognition login",
      "Dual Thunderbolt 4 / USB-C ports with Power Delivery and DisplayPort",
      "Spill-resistant backlit commercial keyboard",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "comp-03",
    slug: "high-performance-cad-workstation",
    name: "Engineering & CAD Precision Workstation",
    shortDescription:
      "Heavyweight multi-core workstation built for 3D modeling, structural simulation, computational CAD, and video production.",
    longDescription:
      "A purpose-engineered computing powerhouse designed to handle large-scale geometric datasets, finite element simulations, and real-time ray-traced rendering. Equipped with workstation-grade multi-core architecture and high-capacity error-correcting memory.",
    category: "Computing",
    sku: "SOMYA-CMP-WKS03",
    badge: "Custom Build Spec",
    availability: "Custom Build",
    specs: {
      "Processor": "Intel Xeon W-series / AMD Ryzen Threadripper PRO",
      "Memory": "64GB / 128GB ECC Registered DDR5",
      "Graphics": "NVIDIA RTX 4000 / 5000 Ada Generation 16GB VRAM",
      "Storage": "2TB Gen5 NVMe OS Drive + 4TB RAID-1 Scratch Array",
      "Power Supply": "1000W 80-Plus Platinum Modular PSU",
      "Cooling": "Closed-Loop Liquid Thermal Management System",
    },
    features: [
      "Certified for Autodesk, SolidWorks, Blender & Adobe Premier pipelines",
      "ECC memory safeguarding against computational bit-flip corruption",
      "High-bandwidth PCIe 5.0 expansion slots for multi-GPU arrays",
      "Comprehensive 3-year commercial on-site support eligibility",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "comp-04",
    slug: "compact-sff-office-pc",
    name: "Compact Small-Form-Factor (SFF) Office PC",
    shortDescription:
      "Space-saving micro-footprint desktop delivering reliable performance for teller stations, administrative desks, and call centers.",
    longDescription:
      "Designed for high-density office environments where desktop real estate is at a premium. The compact chassis can be deployed horizontally, vertically, or mounted behind VESA monitors without compromising performance or thermal stability.",
    category: "Computing",
    sku: "SOMYA-CMP-SFF04",
    badge: "Fleet Spec",
    availability: "Available on Order",
    specs: {
      "Form Factor": "Ultra Small Form Factor (USFF / Mini-ITX)",
      "Processor": "Intel Core i5-14500 / AMD Ryzen 5 Pro",
      "Memory": "16GB DDR5 4800MHz (expandable to 64GB)",
      "Storage": "512GB NVMe M.2 SSD",
      "Networking": "Gigabit Ethernet + Wi-Fi 6E & Bluetooth 5.3",
      "Mounting": "VESA Mount Compatible / Under-Desk Bracket",
    },
    features: [
      "Ultra-compact 1-liter volume chassis footprint",
      "Whisper-quiet acoustic profile under full office load (<22dB)",
      "Front-facing high-speed USB-C and USB 3.2 Gen 2 ports",
      "Low power consumption meeting Energy Star 8.0 guidelines",
    ],
    isDemoPlaceholder: true,
  },

  // ─── 2. Networking ──────────────────────────────────────────────
  {
    id: "net-01",
    slug: "24-port-managed-gigabit-poe-switch",
    name: "24-Port Managed Gigabit PoE+ Switch",
    shortDescription:
      "Enterprise Layer 2/3 switch delivering 370W of Power-over-Ethernet alongside 4 high-speed 10G SFP+ uplink ports.",
    longDescription:
      "The foundational backbone for commercial office networks, VoIP telephone systems, and IP surveillance cameras. Features comprehensive Layer 2+ switching capabilities, VLAN isolation, QoS priority queues, and an intuitive web management dashboard with CLI support.",
    category: "Networking",
    sku: "SOMYA-NET-SW24",
    badge: "Infrastructure Core",
    availability: "Available on Order",
    specs: {
      "Port Configuration": "24x 10/100/1000BASE-T RJ45 + 4x 10G SFP+ Slots",
      "PoE Power Budget": "370W Total (up to 30W per port on 802.3at PoE+)",
      "Switching Capacity": "128 Gbps Non-Blocking Forwarding Bandwidth",
      "Management Protocol": "Web GUI, SNMP v1/v2c/v3, RMON, Telnet/SSH CLI",
      "Rack Mounting": "Standard 19-inch 1U Metal Rackmount Enclosure",
    },
    features: [
      "Independent 10G SFP+ optical fiber uplink ports",
      "Dynamic 802.1Q VLAN support for departmental security isolation",
      "L2/L3/L4 Access Control Lists (ACL) and Port Security safeguards",
      "Energy-efficient Green Ethernet port power scheduling",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "net-02",
    slug: "enterprise-multi-wan-gateway-router",
    name: "Enterprise Multi-WAN Security Gateway Router",
    shortDescription:
      "High-throughput multi-WAN security router with integrated hardware firewall, dual-ISP load balancing, and IPsec VPN support.",
    longDescription:
      "Designed for multi-site businesses requiring continuous internet uptime and encrypted branch communications. Automatically balances outbound network loads across multiple broadband providers and shifts traffic instantly during ISP outages.",
    category: "Networking",
    sku: "SOMYA-NET-RTR02",
    badge: "Edge Security",
    availability: "Available on Order",
    specs: {
      "WAN Interfaces": "Up to 4x Configurable Gigabit WAN Ports (Dual-WAN / Multi-WAN)",
      "LAN Interfaces": "4x Gigabit LAN Ports + 1x SFP Port",
      "NAT Throughput": "Up to 1.8 Gbps Concurrent Traffic",
      "VPN Capacity": "Up to 100 Concurrent IPsec / OpenVPN Tunnels",
      "Failover Mode": "Link Backup, Policy Routing, Load Balancing",
    },
    features: [
      "Automatic zero-downtime multi-provider ISP failover",
      "Deep Packet Inspection (DPI) application traffic shaping",
      "Hardware-accelerated cryptographic site-to-site VPN encryption",
      "Built-in stateful firewall defending against DoS attacks",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "net-03",
    slug: "wifi-6-dual-band-access-point",
    name: "High-Density Wi-Fi 6 Ceiling Access Point",
    shortDescription:
      "Enterprise ceiling-mounted Wi-Fi 6 wireless access point supporting 500+ concurrent clients with 3000 Mbps aggregate throughput.",
    longDescription:
      "Engineered for high-density office floors, educational auditoriums, and open corporate spaces. Provides seamless client roaming, beamforming technology, isolated guest networks, and centralized controller management.",
    category: "Networking",
    sku: "SOMYA-NET-AP03",
    badge: "Wireless Fleet",
    availability: "Available on Order",
    specs: {
      "Wireless Standard": "Wi-Fi 6 (802.11ax) Dual-Band Concurrent",
      "Speed Rating": "Up to 2402 Mbps on 5GHz + 574 Mbps on 2.4GHz",
      "Antenna Design": "Internal Omnidirectional High-Gain MIMO Antennas",
      "Client Capacity": "Up to 512 Concurrent Devices",
      "Power Source": "802.3at PoE+ Powered or 12V DC Adapter",
      "Mounting": "Ceiling / Wall Mount Plate Kit Included",
    },
    features: [
      "OFDMA and MU-MIMO for smooth multi-device data streaming",
      "802.11k/v/r seamless roaming across multi-AP campus layouts",
      "Isolated Captive Portal with custom terms and landing pages",
      "Centralized cloud controller management with remote monitoring",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "net-04",
    slug: "48-port-cat6a-patch-panel",
    name: "48-Port Cat6A Shielded 1U Rack Patch Panel",
    shortDescription:
      "Heavy-gauge shielded patch panel with gold-plated contact pins for 10-Gigabit structured cabling termination.",
    longDescription:
      "Ensures reliable, crosstalk-free structured cabling in corporate server rooms and distribution racks. Built with a heavy-duty cold-rolled steel frame, integrated rear cable management bar, and universal T568A/T568B color-coded punch-down blocks.",
    category: "Networking",
    sku: "SOMYA-NET-PCH04",
    badge: "Structured Cabling",
    availability: "Available on Order",
    specs: {
      "Port Density": "48 RJ45 Shielded Cat6A Ports in 1U Space",
      "Bandwidth Rating": "Certified up to 500 MHz (10GBASE-T Speeds)",
      "Contact Plating": "50-Micron Gold Plating over Nickel Contacts",
      "Wiring Standard": "Universal TIA/EIA 568A and 568B Color Coding",
      "Enclosure": "1.5mm Cold-Rolled SPCC Steel Chassis",
    },
    features: [
      "Fully shielded against electromagnetic interference (EMI/RFI)",
      "Detachable rear cable tie-down bar preventing strain on terminations",
      "Port numbering and write-on label fields for clean administration",
      "Standard 19-inch rackmount footprint fits all standard cabinets",
    ],
    isDemoPlaceholder: true,
  },

  // ─── 3. Accessories ─────────────────────────────────────────────
  {
    id: "acc-01",
    slug: "thunderbolt-4-docking-station",
    name: "Universal Thunderbolt 4 Dual-4K Docking Hub",
    shortDescription:
      "Single-cable multi-port workstation dock delivering 100W laptop power charging and dual 4K 60Hz display expansion.",
    longDescription:
      "Streamlines corporate hot-desking and permanent executive workstations. A single Thunderbolt 4 or USB4 cable connects a laptop to dual external monitors, Gigabit wired networking, audio, and multiple high-speed peripherals while simultaneously powering the laptop.",
    category: "Accessories",
    sku: "SOMYA-ACC-DCK01",
    badge: "Workstation Hub",
    availability: "Available on Order",
    specs: {
      "Upstream Port": "Thunderbolt 4 / USB4 with 100W Power Delivery",
      "Display Outputs": "2x DisplayPort 1.4 + 1x HDMI 2.1 (Dual 4K@60Hz)",
      "USB Ports": "4x USB 3.2 Gen 2 Type-A + 2x USB-C 10Gbps",
      "Networking": "1x 2.5 Gigabit Ethernet RJ45 Port",
      "Audio / Storage": "3.5mm Combo Audio Jack + SD 4.0 Card Reader",
      "Housing": "Anodized Space Gray Aluminum Alloy",
    },
    features: [
      "Plug-and-play universal compatibility with Windows and macOS laptops",
      "100W dynamic intelligent power allocation charging laptops at full speed",
      "Kensington security lock slot for theft deterrence on open desks",
      "Front-facing 10Gbps fast-charge ports for phones and accessories",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "acc-02",
    slug: "ergonomic-mechanical-business-keyboard",
    name: "Commercial Low-Noise Ergonomic Keyboard",
    shortDescription:
      "Full-sized ergonomic mechanical business keyboard with sound-dampened tactile switches and detachable memory foam wrist rest.",
    longDescription:
      "Designed for long data entry and programming shifts. Combines responsive mechanical tactile feedback with silent internal dampening layers to maintain quiet office acoustic standards while reducing wrist strain.",
    category: "Accessories",
    sku: "SOMYA-ACC-KBD02",
    badge: "Ergonomics",
    availability: "Available on Order",
    specs: {
      "Layout": "Full 104-Key Standard ANSI Layout with Numeric Keypad",
      "Key Switches": "Commercial Silent Tactile Switches (50M Keystroke Lifespan)",
      "Connectivity": "Detachable Braided USB-C Cable + 2.4GHz Wireless / Bluetooth",
      "Battery Life": "Up to 300 hours on wireless (non-backlit mode)",
      "Wrist Support": "Ergonomic Contoured Magnetic Memory Foam Cushion",
    },
    features: [
      "Dual acoustic dampening pads eliminating hollow typing resonance",
      "Laser-etched oil-resistant PBT keycaps preventing key surface shine",
      "Multi-device pairing switch between workstation, laptop, and tablet",
      "Multi-angle tilt adjustment feet with non-slip rubber grips",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "acc-03",
    slug: "precision-multi-device-wireless-mouse",
    name: "Precision Ergonomic Multi-Device Office Mouse",
    shortDescription:
      "Contoured multi-device optical mouse featuring hyperscroll wheel, thumb gestures, and instant multi-computer pairing.",
    longDescription:
      "Engineered for detailed spreadsheet manipulation, design inspection, and all-day office comfort. Equipped with an optical sensor that tracks accurately on all surfaces including glass, with customizable thumb shortcut buttons.",
    category: "Accessories",
    sku: "SOMYA-ACC-MOU03",
    badge: "Office Peripherals",
    availability: "Available on Order",
    specs: {
      "Sensor Type": "High-Precision Darkfield Optical Sensor (200 - 4000 DPI)",
      "Scroll Mechanism": "Electromagnetic Smartshift Dual-Mode Scroll Wheel",
      "Connectivity": "Bluetooth Low Energy + 2.4GHz USB Receiver",
      "Multi-Device Pairing": "Connects up to 3 devices with instant switch button",
      "Battery": "USB-C Rechargeable Li-Po (Up to 70 days per charge)",
    },
    features: [
      "Silent click switches reducing acoustic distractions in shared spaces",
      "Thumb gesture button for rapid application switching and window tiling",
      "Quick 1-minute charge provides up to 3 hours of operational runtime",
      "Ergonomic palm support sculpted for neutral forearm alignment",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "acc-04",
    slug: "dual-heavy-duty-monitor-arm",
    name: "Dual Heavy-Duty Gas-Spring Desk Monitor Arm",
    shortDescription:
      "Counterbalanced gas-spring dual monitor mount supporting screens up to 32 inches with integrated cable management.",
    longDescription:
      "Maximizes desk productivity and clean ergonomics. Counterbalance gas springs allow effortless height, tilt, swivel, and 360-degree rotation adjustments for dual monitors without requiring hex keys after initial tension calibration.",
    category: "Accessories",
    sku: "SOMYA-ACC-MNT04",
    badge: "Ergonomics",
    availability: "Available on Order",
    specs: {
      "Screen Support": "Fits two displays from 17\" up to 32\" each",
      "Weight Capacity": "Up to 9 kg (19.8 lbs) per monitor arm",
      "VESA Standard": "75x75mm and 100x100mm quick-release plates",
      "Adjustment Range": "Tilt +90°/-45°, Swivel 180°, Screen Rotation 360°",
      "Mounting Options": "Desk Edge C-Clamp or Grommet Hole Mounting Kit",
    },
    features: [
      "Integrated under-arm cable routing channels for clutter-free desks",
      "Quick-disconnect VESA mounting brackets for fast 1-person assembly",
      "Aircraft-grade die-cast aluminum arms engineered for zero sag",
      "Independent arm height adjustment for horizontal or vertical orientations",
    ],
    isDemoPlaceholder: true,
  },

  // ─── 4. Security ────────────────────────────────────────────────
  {
    id: "sec-01",
    slug: "4k-weatherproof-ip-bullet-camera",
    name: "Commercial 4K Ultra-HD Weatherproof IP Camera",
    shortDescription:
      "Outdoor vandal-resistant 4K IP security camera with motorized zoom, smart infrared night vision, and PoE power.",
    longDescription:
      "Provides crisp perimeter surveillance, vehicle license plate identification, and facility entry monitoring under all weather conditions. Features motorized varifocal zoom, high dynamic range (WDR) to handle backlit scenes, and onboard event detection.",
    category: "Security",
    sku: "SOMYA-SEC-CAM01",
    badge: "Facility Security",
    availability: "Available on Order",
    specs: {
      "Image Sensor": "1/2.8\" Progressive Scan 8MP CMOS Sensor (3840x2160)",
      "Lens": "2.8mm - 12mm Motorized Varifocal Optical Zoom Lens",
      "Night Vision": "Smart IR Illuminators up to 50 meters (164 ft)",
      "Weather Rating": "IP67 Weatherproof & IK10 Vandal-Proof Metal Casing",
      "Power Protocol": "Power-over-Ethernet (IEEE 802.3af PoE) or 12V DC",
      "Compression": "H.265+ / H.265 / H.264 High-Efficiency Video Codec",
    },
    features: [
      "Smart motion classification distinguishing vehicles and persons",
      "True 120dB Wide Dynamic Range (WDR) eliminating glare and shadows",
      "Onboard MicroSD slot supporting edge recording fallback up to 256GB",
      "Encrypted RTSP/HTTPS video streaming compatible with standard NVRs",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "sec-02",
    slug: "16-channel-4k-nvr-appliance",
    name: "16-Channel 4K Network Video Recorder (NVR)",
    shortDescription:
      "Dedicated commercial surveillance recorder supporting 16 IP camera streams, dual SATA storage bays, and remote viewing apps.",
    longDescription:
      "The central recording hub for corporate security systems. Delivers continuous, motion-triggered, or scheduled video recording across 16 IP cameras with HDMI 4K monitor output and encrypted multi-user remote access via desktop and mobile.",
    category: "Security",
    sku: "SOMYA-SEC-NVR02",
    badge: "Surveillance Core",
    availability: "Available on Order",
    specs: {
      "Channel Capacity": "16 IP Camera Channels at up to 8MP/4K Resolution",
      "Storage Interface": "2x SATA III Bays (Up to 16TB per drive, 32TB total)",
      "Display Outputs": "1x HDMI (up to 4K 3840x2160) + 1x VGA (1080p)",
      "Incoming Bandwidth": "160 Mbps Recording & Live Forwarding",
      "Networking": "1x Gigabit Ethernet RJ45 Port + 2x USB 2.0 Ports",
      "Form Factor": "1U Rackmount / Standalone Metal Chassis",
    },
    features: [
      "Automated video loop recording with smart footage search bookmarks",
      "Scheduled cloud backup of key event snippets and alarm footage",
      "Multi-user permission levels (Admin, Operator, Auditor views)",
      "Zero recurring cloud subscription fees — total on-premise video storage",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "sec-03",
    slug: "biometric-rfid-access-control-terminal",
    name: "Biometric Fingerprint & RFID Access Control Terminal",
    shortDescription:
      "Networked entry terminal combining optical fingerprint recognition, RFID card authentication, and time-stamped attendance logging.",
    longDescription:
      "Controls secure facility doors, server room access points, and executive offices. Operates standalone or networked over TCP/IP, triggering electromagnetic door strikes and recording tamper-resistant logs of all entry attempts.",
    category: "Security",
    sku: "SOMYA-SEC-ACS03",
    badge: "Access Control",
    availability: "Available on Order",
    specs: {
      "Verification Methods": "Fingerprint, RFID Card (13.56MHz / 125kHz), PIN Code",
      "User Capacity": "3,000 Fingerprints, 5,000 RFID Cards, 100,000 Event Logs",
      "Verification Speed": "< 0.5 seconds per authentication transaction",
      "Relay Interface": "Door Lock Output, Door Sensor, Exit Button, Tamper Alarm",
      "Communication": "TCP/IP Ethernet, USB Host, RS485, Wiegand Input/Output",
    },
    features: [
      "Anti-passback protocols preventing unauthorized credential sharing",
      "Automated integration with electronic magnetic and drop-bolt locks",
      "Exportable employee attendance and entry audit reports in Excel/CSV",
      "Emergency fail-safe unlock override integration for fire safety",
    ],
    isDemoPlaceholder: true,
  },

  // ─── 5. Electronics ─────────────────────────────────────────────
  {
    id: "elec-01",
    slug: "commercial-55-4k-conference-display",
    name: "Commercial 55\" 4K Anti-Glare Meeting Display",
    shortDescription:
      "Professional 55-inch commercial display engineered for 16/7 boardroom operation, wireless screen sharing, and high ambient visibility.",
    longDescription:
      "Designed specifically for conference rooms and presentation suites. Unlike domestic televisions, this commercial panel features a 28% haze anti-glare coating, commercial power components rated for continuous runtime, and clean landscape/portrait mounting.",
    category: "Electronics",
    sku: "SOMYA-ELC-DSP01",
    badge: "Commercial AV",
    availability: "Available on Order",
    specs: {
      "Screen Diagonal": "55-inch Commercial IPS Panel (3840x2160 4K UHD)",
      "Brightness": "400 nits with Anti-Glare Matte Surface Treatment",
      "Duty Cycle": "16 Hours / 7 Days Continuous Operation Rating",
      "Inputs": "3x HDMI 2.0, 1x DisplayPort, 2x USB, 1x RJ45 LAN, RS232C",
      "Audio": "Built-in 2x 10W Stereo Speakers with Audio Return (eARC)",
    },
    features: [
      "Wireless screen mirroring from laptops, phones, and tablets without dongles",
      "Automated wake-on-signal powering up displays when video cable connects",
      "Commercial RS-232C and IP network control for building automation",
      "VESA standard 400x400 wall mounting reinforcement",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "elec-02",
    slug: "all-in-one-video-conference-bar",
    name: "All-in-One 4K Video Conferencing Soundbar",
    shortDescription:
      "Plug-and-play USB video bar combining an ultra-wide 4K camera, 6-microphone beamforming array, and room-filling acoustics.",
    longDescription:
      "Elevates meeting rooms into modern hybrid collaboration suites. Works instantly with Microsoft Teams, Zoom, and Google Meet via a single USB-C connection, using AI auto-framing to keep all meeting participants centered automatically.",
    category: "Electronics",
    sku: "SOMYA-ELC-VCB02",
    badge: "Meeting Room AV",
    availability: "Available on Order",
    specs: {
      "Camera Optics": "4K Ultra-HD with 120° Wide Field of View (FOV) & 5x Zoom",
      "Microphone System": "6-Element Beamforming Microphones (6-meter pickup range)",
      "Audio Processing": "Acoustic Echo Cancellation (AEC) & AI Noise Suppression",
      "Speaker Output": "Integrated High-Fidelity Studio Soundbar (90dB SPL)",
      "Connectivity": "Plug-and-Play USB-C 3.0 / Bluetooth 5.1 / HDMI Out",
    },
    features: [
      "Intelligent speaker tracking highlighting active speakers in real time",
      "Background noise elimination silencing keyboard typing and HVAC hums",
      "Universal driverless USB operation with Windows, macOS, and Chromebooks",
      "Wall and display top mounting brackets included in package",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "elec-03",
    slug: "1500va-rackmount-online-ups",
    name: "1500VA Online Double-Conversion Rackmount UPS",
    shortDescription:
      "True online double-conversion power backup protecting critical server racks and networking switches from outages and brownouts.",
    longDescription:
      "Guarantees pure sine-wave electricity with zero transfer time to batteries during power outages. Protects sensitive servers, switches, and NVRs from lightning surges, voltage sags, harmonics, and sudden utility drops.",
    category: "Electronics",
    sku: "SOMYA-ELC-UPS03",
    badge: "Power Protection",
    availability: "Available on Order",
    specs: {
      "Output Capacity": "1500VA / 1350 Watts True Online Double-Conversion",
      "Waveform": "Pure Sine Wave with 0ms (Zero) Transfer Time to Battery",
      "Form Factor": "2U Rackmount / Tower Convertible Enclosure",
      "Receptacles": "8x IEC C13 Outlets with Surge Suppression",
      "Management Card": "Optional SNMP/Web Card Slot for Automated Server Shutdown",
    },
    features: [
      "Zero millisecond transfer time preventing server reboots during brownouts",
      "Interactive LCD status panel displaying load percentage and battery minutes",
      "Hot-swappable user-replaceable battery packs without cutting equipment power",
      "Automatic voltage regulation (AVR) compensating for dirty power lines",
    ],
    isDemoPlaceholder: true,
  },

  // ─── 6. Office Technology ────────────────────────────────────────
  {
    id: "off-01",
    slug: "enterprise-multifunction-network-printer",
    name: "Heavy-Duty Enterprise Network Multifunction Printer",
    shortDescription:
      "High-volume commercial laser multifunction printer delivering 45 ppm duplex printing, rapid scanning, and departmental PIN accounting.",
    longDescription:
      "Engineered to serve busy corporate departments and administrative offices. Handles heavy monthly duty cycles with low per-page operating costs, rapid double-sided scanning, secure PIN-release printing, and paper capacities exceeding 1,200 sheets.",
    category: "Office Technology",
    sku: "SOMYA-OFC-PRN01",
    badge: "Office Print Core",
    availability: "Available on Order",
    specs: {
      "Print Speed": "Up to 45 pages per minute (ppm) Monochrome & Color",
      "Monthly Duty Cycle": "Recommended 10,000 - 50,000 pages per month",
      "Paper Capacity": "Standard 1,200 Sheets across Dual Trays (expandable to 2,300)",
      "Scanning Mechanism": "Single-Pass Duplex Automatic Document Feeder (80 ipm)",
      "Connectivity": "Gigabit Ethernet, Wi-Fi Direct, High-Speed USB 2.0",
      "Security": "Encrypted Hard Drive + Departmental User PIN Print Release",
    },
    features: [
      "Scan-to-email, scan-to-network folder, and searchable PDF conversion",
      "Individual departmental print volume limits and accounting reports",
      "Large 7-inch color touchscreen interface with customizable workflows",
      "Consumable tracking notifying administrators before toner runs dry",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "off-02",
    slug: "high-speed-desktop-document-scanner",
    name: "Commercial High-Speed Document Feed Scanner",
    shortDescription:
      "Dedicated 80-page-per-minute duplex document scanner for legal, accounting, and bulk digital archiving operations.",
    longDescription:
      "Converts stacks of paper invoices, contracts, receipts, and identification cards into searchable digital archives in seconds. Equipped with ultrasonic double-feed detection preventing paper jams and skewed scans.",
    category: "Office Technology",
    sku: "SOMYA-OFC-SCN02",
    badge: "Document Archive",
    availability: "Available on Order",
    specs: {
      "Scanning Speed": "80 pages per minute / 160 images per minute Duplex",
      "Automatic Feeder (ADF)": "100-Sheet Heavy-Duty Document Tray",
      "Optical Resolution": "Up to 600 dpi Optical Hardware Resolution",
      "Supported Media": "Standard Paper, Embossed ID Cards, Receipts, Passports",
      "Connection": "USB 3.0 High-Speed + Gigabit Ethernet LAN",
    },
    features: [
      "Ultrasonic multi-feed sensor stopping scans if two pages stick together",
      "Built-in hardware OCR creating searchable PDF/Word text outputs",
      "Automated skew correction, blank page deletion, and color drop-out",
      "Direct one-touch scanning to cloud folders and network directories",
    ],
    isDemoPlaceholder: true,
  },
  {
    id: "off-03",
    slug: "wireless-2d-barcode-asset-scanner",
    name: "Industrial 2D Barcode & QR Asset Scanner",
    shortDescription:
      "Ruggedized cordless 2D barcode scanner with charging base station, 100-meter wireless range, and drop-resistant casing.",
    longDescription:
      "Built for warehouse inventory checks, dispatch areas, point-of-sale desks, and corporate IT asset tagging. Captures damaged, faint, or screen-displayed 1D and 2D QR codes instantly with audible and haptic scan feedback.",
    category: "Office Technology",
    sku: "SOMYA-OFC-BCS03",
    badge: "Asset Tracking",
    availability: "Available on Order",
    specs: {
      "Decoding Capabilities": "All Standard 1D Barcodes + 2D DataMatrix, QR, PDF417",
      "Wireless Range": "Up to 100 meters (330 ft) with 2.4GHz USB Cradle Station",
      "Battery Life": "Up to 50,000 scans per full charge (USB-C Rechargeable)",
      "Drop Resistance": "Survives repeated 1.8m (6 ft) concrete drops onto concrete",
      "Ingress Protection": "IP54 Dust and Splash Water Sealed",
    },
    features: [
      "Batch inventory memory mode storing up to 100,000 barcodes offline",
      "Instant read capability from computer screens and mobile device displays",
      "Audible beeper, vibration motor, and green confirmation LED",
      "Plug-and-play driverless integration acting as standard keyboard input",
    ],
    isDemoPlaceholder: true,
  },
];

// ─── Query Functions (Ready to bind to DB) ────────────────────────

export async function getProducts(): Promise<Product[]> {
  // Simulates an async database fetch
  return PRODUCTS;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const product = PRODUCTS.find((p) => p.slug === slug);
  return product || null;
}

export async function getRelatedProducts(
  productId: string,
  category: ProductCategory,
  limit: number = 3
): Promise<Product[]> {
  // Returns products from the same category first, excluding the active product
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== productId && p.category === category
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  // If not enough in same category, supplement from other categories
  const others = PRODUCTS.filter(
    (p) => p.id !== productId && p.category !== category
  );
  return [...sameCategory, ...others].slice(0, limit);
}
