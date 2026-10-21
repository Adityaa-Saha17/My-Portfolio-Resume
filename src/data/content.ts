/**
 * Everything the site says lives here. When the résumé changes, edit this file.
 * Inline `code` in bullet strings (wrapped in backticks) renders in the mono face,
 * and **double asterisks** render as emphasis.
 */

export const profile = {
  name: 'Adityaa Saha',
  first: 'Adityaa',
  last: 'Saha',
  degree: 'B.Tech, Computer Science and Engineering',
  institute: 'Indian Institute of Technology Bhubaneswar',
  instituteShort: 'IIT Bhubaneswar',
  years: '2023 – 2027',
  email: '23cs01002@iitbbs.ac.in',
  resume: 'Resume.pdf',
  rotating: ['network stacks', 'CUDA kernels', 'load balancers', 'storage engines', 'CPU pipelines'],
  intro:
    'Final-year computer science student at IIT Bhubaneswar, working in C++ and CUDA, from the packet on the wire to the instruction in the pipeline.',
  about:
    'I write the kind of software most people import. A userspace TCP/IP stack on a raw TAP device, an L4/L7 load balancer on epoll, a recursive DNS resolver, an LSM-tree storage engine and a pipelined RISC-V CPU. In summer 2026 I took it down to the GPU, optimizing sparse matrix kernels in CUDA.',
  facts: [
    { term: 'Now', detail: 'Final year of B.Tech CSE at IIT Bhubaneswar, graduating 2027' },
    { term: 'Last summer', detail: 'Research intern, sparse matrix kernels in CUDA on NVIDIA T4 GPUs' },
    { term: 'Looking for', detail: 'Software, systems and infrastructure engineering roles' }
  ]
};

export type LinkKind = 'github' | 'linkedin' | 'codeforces' | 'leetcode' | 'email' | 'resume';

export const links: { kind: LinkKind; label: string; handle: string; href: string }[] = [
  { kind: 'github', label: 'GitHub', handle: 'Adityaa-Saha17', href: 'https://github.com/Adityaa-Saha17' },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    handle: 'Adityaa Saha',
    href: 'https://www.linkedin.com/in/adityaa-saha-533b02299/'
  },
  { kind: 'codeforces', label: 'Codeforces', handle: 'ats17', href: 'https://codeforces.com/profile/ats17' },
  { kind: 'leetcode', label: 'LeetCode', handle: 'whocares17', href: 'https://leetcode.com/u/whocares17/' },
  { kind: 'email', label: 'Email', handle: '23cs01002@iitbbs.ac.in', href: 'mailto:23cs01002@iitbbs.ac.in' },
  { kind: 'resume', label: 'Résumé', handle: 'PDF', href: 'Resume.pdf' }
];

export const experience = {
  role: 'Research Intern',
  org: 'IIT Bhubaneswar, School of Electrical Sciences',
  dates: 'May – Jul 2026',
  advisor: 'Dr. Devashree Tripathy',
  links: [
    {
      label: 'Certificate',
      href: 'https://drive.google.com/file/d/1WfAxMYu9Ciw2C3xp4QJN93tk1-4IyfOY/view?usp=sharing'
    },
    { label: 'Code', href: 'https://github.com/Adityaa-Saha17/Sparse-Matrix-Multiplication' }
  ],
  points: [
    'Optimized architecture-aware **Sparse Matrix Multiplication (SpMM)** kernels in **CUDA** on **NVIDIA T4** GPUs, restructuring global, shared and distributed memory access patterns',
    'Re-architected the Tensor Core path from **2:4 structured sparsity** to **block-sparse (BCSR)** after identifying that Turing (sm_75) lacks the Ampere-only `mma.sp.sync` instruction',
    'Scaled execution to multiple GPUs through framework-level partitioning with **PyTorch/NCCL** on dual-T4 nodes, adapting the DSM-style design to a toolchain without `nvcc`',
    'Built a **CUDA benchmarking harness** comparing memory optimization strategies across shared and global memory'
  ]
};

export type ProjectVisual = 'dns' | 'lb' | 'tcp' | 'lsm' | 'cpu';

export interface Project {
  id: ProjectVisual;
  title: string;
  short: string;
  layer: string;
  stack: string;
  href: string;
  summary: string;
  points: string[];
}

/** Ordered top of the stack down: application layer first, the processor last. */
export const projects: Project[] = [
  {
    id: 'dns',
    title: 'Recursive DNS Resolver',
    short: 'DNS Resolver',
    layer: 'Layer 7',
    stack: 'C++',
    href: 'https://github.com/Adityaa-Saha17/DNS-Implementation',
    summary: 'UDP/TCP DNS server with a hand-rolled wire codec, an authoritative zone engine and an LRU cache.',
    points: [
      'Built a UDP/TCP DNS server on a **thread pool** with a hand-rolled **wire codec** (name compression, EDNS0, TC-bit)',
      'Implemented an **authoritative zone engine** (A, AAAA, CNAME, MX, NS, TXT, SOA) with wildcards, CNAME chasing, negative answers and a conditional forwarder',
      'Added blocklisting, a Prometheus `/metrics` endpoint with a latency histogram, rotating logs and a `dig`/`nc` suite for malformed-packet resilience',
      'Added a **shared-mutex LRU cache** with TTL decay and negative caching, plus per-IP **token-bucket rate limiting** to bound amplification abuse'
    ]
  },
  {
    id: 'lb',
    title: 'L4/L7 HTTP Load Balancer',
    short: 'Load Balancer',
    layer: 'Layers 4 and 7',
    stack: 'C++, Linux',
    href: 'https://github.com/Adityaa-Saha17/Load-Balancer',
    summary: 'Edge-triggered epoll load balancer with four balancing strategies, health checks and a circuit breaker.',
    points: [
      'Built a load balancer on **edge-triggered, non-blocking epoll** I/O designed for C10K-scale concurrency, with weighted round robin, least connections, **power-of-two-choices** and **consistent hashing** with virtual nodes',
      'Added active/passive **health checks** with hysteresis and slow-start recovery, plus a **circuit breaker** (closed/open/half-open) to isolate failing backends',
      'Wrote a state-machine **HTTP/1.1 parser** with keep-alive pooling and **request-smuggling (CL.TE) defenses**; hot-reloads TOML config via atomic pointer swap and exports Prometheus RED metrics'
    ]
  },
  {
    id: 'tcp',
    title: 'Userspace TCP/IP Stack',
    short: 'TCP/IP Stack',
    layer: 'Layers 2 to 4',
    stack: 'C++23, Linux',
    href: 'https://github.com/Adityaa-Saha17/TCP-IP',
    summary: 'Ethernet to TCP over a raw TAP device, with RFC 9293 state machine and Reno congestion control.',
    points: [
      'Implemented Ethernet, ARP, IPv4/ICMP, UDP and an **RFC 9293 TCP state machine** over a raw **TAP device** via **epoll**',
      'Handled three-way handshake, four-way close, retransmission with **Karn/Jacobson RTT estimation** and **Reno congestion control** (slow start, congestion avoidance, fast retransmit/recovery)',
      'Used `std::expected` error handling, bounds-checked cursors over `std::span` and **zero-copy** fixed buffers on the hot path; validated with an HTTP/1.0 server tested via `tcpdump`, `arping` and `curl`'
    ]
  },
  {
    id: 'lsm',
    title: 'Key–Value Storage Engine',
    short: 'LSM-Tree KV Store',
    layer: 'Storage',
    stack: 'C++',
    href: 'https://github.com/Adityaa-Saha17/KV-Storing-engine-with-LSM-Tree',
    summary: 'LSM tree with a skip-list memtable, crash-safe WAL, Bloom-filtered SSTables and pluggable compaction.',
    points: [
      'Built an LSM-tree store with a **skip-list memtable**, crash-safe **WAL** and **SSTables** with block indexes and **Bloom filters**',
      'Designed compaction behind a pluggable strategy interface (**leveled** and **size-tiered**) to compare write vs. read amplification; background flush/compaction uses **atomic manifest swaps** so readers get consistent, non-blocking snapshots'
    ]
  },
  {
    id: 'cpu',
    title: '32-bit RISC-V CPU Simulator',
    short: 'RISC-V Simulator',
    layer: 'Processor',
    stack: 'C++',
    href: 'https://github.com/Adityaa-Saha17/32-bit-RISC-V-CPU-Simulator',
    summary: 'Cycle-accurate RV32I with a 5-stage pipeline, forwarding, hazard stalls and per-cycle tracing.',
    points: [
      'Built a cycle-accurate **RV32I** simulator with a **5-stage pipeline** and a single-pass R/I/S/B/J assembler',
      'Designed a **control unit** driving per-opcode signals and an **ALU control decoder** for the datapath',
      'Implemented **EX/MEM and MEM/WB forwarding**, load-use interlock stalls and branch flushing on taken branches, with per-cycle stage and register-file tracing'
    ]
  }
];

export const education = [
  {
    title: 'B.Tech, Computer Science and Engineering',
    place: 'Indian Institute of Technology Bhubaneswar',
    years: '2023 – 2027',
    score: 'CGPA 6.47'
  },
  { title: 'Class XII', place: 'Shiv Jyoti Convent School', years: '2023', score: '82%' },
  { title: 'Class X', place: 'North Point Senior Secondary Public School', years: '2021', score: '90%' }
];

export const skills = [
  { group: 'Languages', items: ['C', 'C++ (11/17/23)', 'CUDA', 'Bash'] },
  {
    group: 'Systems and networking',
    items: [
      'Linux systems programming',
      'epoll and event-driven I/O',
      'Sockets',
      'TCP/IP',
      'DNS',
      'HTTP/1.1',
      'Multithreading',
      'Atomics and lock-free concurrency',
      'Storage engines',
      'GPU memory hierarchies'
    ]
  },
  { group: 'Tools and libraries', items: ['PyTorch/NCCL', 'Git', 'CMake', 'Prometheus', 'tcpdump', 'dig'] },
  {
    group: 'Coursework',
    items: [
      'Data Structures',
      'Design and Analysis of Algorithms',
      'Advanced Algorithms',
      'Operating Systems',
      'Computer Networks',
      'Database Systems',
      'Computer Organization and Architecture',
      'Networks and System Security',
      'Artificial Intelligence'
    ]
  }
];

/** Concepts that scroll past in the marquee. All of them appear in the projects above. */
export const concepts = [
  ['epoll', 'Reno congestion control', 'consistent hashing', 'Bloom filters', 'EDNS0', 'circuit breakers'],
  ['BCSR sparsity', 'Tensor Cores', 'skip lists', 'write-ahead logs', 'RV32I forwarding', 'token buckets']
];
