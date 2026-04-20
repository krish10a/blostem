<!-- Landing Page - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Blostem AI - Sovereign Command</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#dae2fd",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "outline": "#8e90a2",
                        "surface-variant": "#2d3449",
                        "surface-container": "#171f33",
                        "on-secondary": "#003824",
                        "surface-container-high": "#222a3d",
                        "tertiary": "#b7c8e1",
                        "on-primary": "#002c70",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#b7c8e1",
                        "inverse-primary": "#0057cd",
                        "on-primary-fixed-variant": "#00419d",
                        "secondary": "#4edea3",
                        "on-tertiary": "#213145",
                        "on-secondary-container": "#00311f",
                        "on-tertiary-container": "#e9f0ff",
                        "on-primary-fixed": "#001946",
                        "outline-variant": "#434656",
                        "surface-tint": "#b1c5ff",
                        "primary-container": "#1165e7",
                        "secondary-fixed-dim": "#4edea3",
                        "secondary-container": "#00a572",
                        "on-primary-container": "#edefff",
                        "primary-fixed": "#dae2ff",
                        "primary-fixed-dim": "#b1c5ff",
                        "on-tertiary-fixed-variant": "#38485d",
                        "on-error": "#690005",
                        "inverse-on-surface": "#283044",
                        "surface-container-low": "#131b2e",
                        "tertiary-container": "#5e6e85",
                        "on-tertiary-fixed": "#0b1c30",
                        "surface-container-lowest": "#060e20",
                        "tertiary-fixed": "#d3e4fe",
                        "on-background": "#dae2fd",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "secondary-fixed": "#6ffbbe",
                        "on-surface-variant": "#c4c5d9",
                        "on-error-container": "#ffdad6",
                        "primary": "#b1c5ff",
                        "surface": "#0b1326",
                        "inverse-surface": "#dae2fd",
                        "on-secondary-fixed-variant": "#005236",
                        "surface-container-highest": "#2d3449",
                        "error-container": "#93000a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    }
                }
            }
        }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Animations & Hardware Acceleration */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translate3d(0, 40px, 0); }
            to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
            will-change: opacity, transform;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }

        @keyframes shiftMesh {
            0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
            33% { transform: translate3d(50px, -50px, 0) scale(1.1); }
            66% { transform: translate3d(-30px, 40px, 0) scale(0.95); }
        }
        .animate-mesh {
            animation: shiftMesh 25s ease-in-out infinite;
            will-change: transform;
        }
        .animate-mesh-slow {
            animation: shiftMesh 35s ease-in-out infinite reverse;
            will-change: transform;
        }

        @keyframes pulseCTA {
            0% { box-shadow: 0 0 0 0 rgba(177, 197, 255, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(177, 197, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(177, 197, 255, 0); }
        }
        .hover-pulse:hover {
            animation: pulseCTA 1.5s infinite cubic-bezier(0.16, 1, 0.3, 1);
            transform: scale(1.02);
            transition: transform 0.2s ease-out;
            will-change: transform, box-shadow;
        }

        .reveal {
            opacity: 0;
            transform: translate3d(0, 40px, 0);
            transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
        }
        .reveal.active {
            opacity: 1;
            transform: translate3d(0, 0, 0);
        }

        /* Glassy Cards & Shadows */
        .glass-card {
            background: rgba(23, 31, 51, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.05);
            box-shadow: 0 10px 40px -10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            transition: all 0.3s ease;
        }
        .glass-card:hover {
            border: 1px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 50px -10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1);
            transform: translateY(-4px);
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body antialiased relative overflow-x-hidden">
<!-- Cinematic Mesh Gradient Background -->
<div class="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#0b1326]">
<div class="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[120px] mix-blend-screen animate-mesh opacity-60"></div>
<div class="absolute top-[30%] -right-[10%] w-[40vw] h-[40vw] rounded-full bg-secondary/10 blur-[120px] mix-blend-screen animate-mesh-slow opacity-40"></div>
<div class="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-primary-container/10 blur-[150px] mix-blend-screen animate-mesh opacity-50"></div>
</div>
<!-- Top Navigation Bar -->
<nav class="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-xl border-b border-white/5 shadow-[0_20px_40px_rgba(6,14,32,0.4)]">
<div class="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
<div class="flex items-center space-x-8">
<a class="text-xl font-black text-slate-100 font-headline tracking-tight" href="#">Sovereign SaaS</a>
<!-- Desktop Navigation -->
<div class="hidden md:flex space-x-6">
<a class="text-[#2E5BFF] font-bold border-b-2 border-[#2E5BFF] pb-1 hover:bg-slate-800/50 transition-all duration-200 text-sm font-label" href="#">Product</a>
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 text-sm font-label py-1" href="#">Solutions</a>
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 text-sm font-label py-1" href="#">Pricing</a>
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 text-sm font-label py-1" href="#">Resources</a>
</div>
</div>
<div class="flex items-center space-x-4">
<button class="hidden md:flex items-center justify-center p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all rounded-full">
<span class="material-symbols-outlined text-[20px]">notifications</span>
</button>
<button class="hidden md:flex items-center justify-center p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all rounded-full">
<span class="material-symbols-outlined text-[20px]">settings</span>
</button>
<a class="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors" href="#">Sign In</a>
<a class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-5 py-2 rounded-md shadow-lg hover:shadow-primary/20 transition-all text-sm hover-pulse" href="#">Get Started</a>
<img alt="User profile" class="w-8 h-8 rounded-full border border-outline-variant/30 hidden md:block" data-alt="Close up professional headshot of a person looking forward against a neutral background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAv8K45ikT-CfVRFj88b7MxAtFBvdnSwBbe4eer7jjK6AfoIUOHxRqmsjb_7wvuUBBWa_pUGa6ITDeGl6GwnHOfGYm10dl-q95eLTr1IU2mdZklv5yhX-QFgvl1-UM1mAP07jvM8OU9QtlLcDDLiePCJkvL1YgP3founA2F7xxk_uNmQTXvgkVTKxz6EJ2mtBAYsNpAvw-PU2_YDdnjLYsAQ6EiOQJcPlfi9Os7w_iRiuEISREbkhaE5UvqN78kwLJfqx9I8-mo3N4"/>
</div>
</div>
</nav>
<!-- Main Content -->
<main class="pt-24 pb-16">
<!-- Hero Section -->
<section class="max-w-screen-2xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
<div class="space-y-8 z-10 relative">
<!-- Decorative blurred orb -->
<div class="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
<div class="inline-flex items-center space-x-2 bg-surface-container/50 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5 text-xs font-medium text-primary animate-fade-in-up">
<span class="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#4edea3]"></span>
<span>Introducing Blostem AI v2.0</span>
</div>
<h1 class="text-5xl md:text-6xl font-extrabold font-headline leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 animate-fade-in-up delay-100">
                    Sovereign Control.<br/>
<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-fixed-dim">Infinite Intelligence.</span>
</h1>
<p class="text-lg text-slate-400 font-body leading-relaxed max-w-xl animate-fade-in-up delay-200">
                    Command your data with unprecedented precision. Blostem AI transforms fragmented signals into actionable operational clarity, built for high-stakes environments.
                </p>
<div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in-up delay-300">
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-8 py-3.5 rounded-md shadow-[0_0_20px_rgba(177,197,255,0.15)] hover:shadow-[0_0_30px_rgba(177,197,255,0.25)] transition-all font-label tracking-wide flex items-center justify-center space-x-2 hover-pulse">
<span>Deploy Command Station</span>
<span class="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
<button class="px-8 py-3.5 rounded-md border border-white/10 bg-surface-container-low/50 backdrop-blur-sm text-slate-200 hover:bg-surface-container-high hover:border-white/20 transition-all duration-300 font-medium font-label flex items-center justify-center space-x-2 shadow-[0_10px_20px_rgba(6,14,32,0.3)] hover:-translate-y-0.5 will-change-transform">
<span class="material-symbols-outlined text-[18px]">play_circle</span>
<span>View Architecture</span>
</button>
</div>
</div>
<!-- Hero Mockup (Cinematic / Glassmorphic) -->
<div class="relative w-full aspect-square lg:aspect-auto lg:h-[600px] flex items-center justify-center animate-fade-in-up delay-400">
<!-- Abstract Background Glows -->
<div class="absolute inset-0 bg-gradient-to-tr from-surface-container-lowest/80 via-surface-container/80 to-surface-container-low/80 rounded-xl border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl">
<div class="absolute top-1/4 right-1/4 w-48 h-48 bg-primary-container/30 rounded-full blur-[80px]"></div>
<div class="absolute bottom-1/4 left-1/4 w-64 h-64 bg-secondary-container/20 rounded-full blur-[100px]"></div>
</div>
<!-- Floating UI Cards -->
<div class="relative w-full h-full p-8 flex flex-col justify-center space-y-6">
<!-- Main Dashboard Card -->
<div class="bg-surface-container-high/60 glass-card rounded-lg p-6 transform hover:-translate-y-2 transition-all duration-500 relative z-20">
<div class="flex justify-between items-center mb-4 border-b border-white/5 pb-4">
<h3 class="text-sm font-semibold font-headline text-slate-200">Live Signal Intelligence</h3>
<span class="material-symbols-outlined text-primary text-[18px]">query_stats</span>
</div>
<div class="space-y-4">
<div class="flex items-center justify-between">
<span class="text-xs text-slate-400 font-label">Global Ingestion Rate</span>
<span class="text-sm font-mono text-secondary drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]">4.2M/s</span>
</div>
<div class="w-full bg-surface-container-low rounded-full h-1.5 shadow-inner">
<div class="bg-gradient-to-r from-primary to-secondary h-1.5 rounded-full shadow-[0_0_10px_rgba(78,222,163,0.5)]" style="width: 85%"></div>
</div>
<div class="pt-2 grid grid-cols-3 gap-2">
<div class="bg-surface-container-low/50 rounded p-2 text-center border border-white/5">
<div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Alpha</div>
<div class="text-xs font-semibold text-slate-200">99.9%</div>
</div>
<div class="bg-surface-container-low/50 rounded p-2 text-center border border-white/5">
<div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Beta</div>
<div class="text-xs font-semibold text-slate-200">98.4%</div>
</div>
<div class="bg-surface-container-low/50 rounded p-2 text-center border border-white/5">
<div class="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Delta</div>
<div class="text-xs font-semibold text-primary drop-shadow-[0_0_5px_rgba(177,197,255,0.5)]">Active</div>
</div>
</div>
</div>
</div>
<!-- Floating Secondary Card 1 -->
<div class="absolute -right-4 top-1/4 w-64 bg-surface-container-highest/70 glass-card rounded-lg p-4 transform rotate-2 hover:rotate-0 hover:-translate-y-1 transition-all duration-500 z-30">
<div class="flex items-start space-x-3">
<div class="bg-primary/20 p-2 rounded-md border border-primary/20">
<span class="material-symbols-outlined text-primary text-[16px]">security</span>
</div>
<div>
<h4 class="text-xs font-bold text-slate-200 mb-1">Compliance Lock</h4>
<p class="text-[10px] text-slate-400 leading-tight">SOC2 Type II protocols actively securing 1.2M nodes.</p>
</div>
</div>
</div>
<!-- Floating Secondary Card 2 -->
<div class="absolute -left-6 bottom-1/4 w-56 bg-surface-container-lowest/70 glass-card rounded-lg p-4 transform -rotate-3 hover:rotate-0 hover:-translate-y-1 transition-all duration-500 z-10">
<div class="flex items-center space-x-3 mb-2">
<div class="w-2 h-2 rounded-full bg-secondary animate-pulse shadow-[0_0_8px_#4edea3]"></div>
<span class="text-xs font-medium text-slate-300">Lead Scoring Active</span>
</div>
<div class="flex items-end space-x-2">
<span class="text-2xl font-headline font-bold text-white drop-shadow-md">94</span>
<span class="text-xs text-secondary mb-1">High Intent</span>
</div>
</div>
</div>
</div>
</section>
<!-- How It Works Strip -->
<section class="w-full bg-surface-container-lowest/80 backdrop-blur-md border-y border-white/5 py-12 relative overflow-hidden reveal">
<!-- Subtle noise texture overlay simulation via bg pattern -->
<div class="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
<div class="max-w-screen-2xl mx-auto px-6 relative z-10">
<div class="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/5">
<div class="flex flex-col md:px-6 py-4 md:py-0 reveal delay-100">
<span class="text-primary font-mono text-sm mb-2 drop-shadow-[0_0_5px_rgba(177,197,255,0.4)]">01</span>
<h4 class="text-sm font-bold text-slate-200 mb-2 font-headline uppercase tracking-wider">Ingest</h4>
<p class="text-xs text-slate-400 leading-relaxed">Connect vast data lakes instantly with zero-config pipeline architecture.</p>
</div>
<div class="flex flex-col md:px-6 py-4 md:py-0 reveal delay-200">
<span class="text-primary font-mono text-sm mb-2 drop-shadow-[0_0_5px_rgba(177,197,255,0.4)]">02</span>
<h4 class="text-sm font-bold text-slate-200 mb-2 font-headline uppercase tracking-wider">Synthesize</h4>
<p class="text-xs text-slate-400 leading-relaxed">Neural networks structure chaotic inputs into uniform, querable schemas.</p>
</div>
<div class="flex flex-col md:px-6 py-4 md:py-0 reveal delay-300">
<span class="text-primary font-mono text-sm mb-2 drop-shadow-[0_0_5px_rgba(177,197,255,0.4)]">03</span>
<h4 class="text-sm font-bold text-slate-200 mb-2 font-headline uppercase tracking-wider">Analyze</h4>
<p class="text-xs text-slate-400 leading-relaxed">Real-time signal processing identifies anomalies and critical path opportunities.</p>
</div>
<div class="flex flex-col md:px-6 py-4 md:py-0 reveal delay-400">
<span class="text-primary font-mono text-sm mb-2 drop-shadow-[0_0_5px_rgba(177,197,255,0.4)]">04</span>
<h4 class="text-sm font-bold text-slate-200 mb-2 font-headline uppercase tracking-wider">Execute</h4>
<p class="text-xs text-slate-400 leading-relaxed">Deploy automated responses directly into your existing operational stack.</p>
</div>
</div>
</div>
</section>
<!-- Feature Grid (Bento Style) -->
<section class="max-w-screen-2xl mx-auto px-6 py-24">
<div class="mb-16 max-w-2xl reveal">
<h2 class="text-3xl md:text-4xl font-bold font-headline mb-4 text-white">Architectural Superiority</h2>
<p class="text-slate-400 text-sm leading-relaxed">Designed for environments where absolute certainty is not optional. Every module is a masterclass in deep integration and surface simplicity.</p>
</div>
<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
<!-- Large Feature 1 -->
<div class="md:col-span-2 glass-card rounded-xl p-8 flex flex-col justify-between group relative overflow-hidden reveal delay-100">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] group-hover:bg-primary/20 transition-colors duration-700"></div>
<div class="relative z-10 mb-12">
<div class="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_15px_rgba(177,197,255,0.1)]">
<span class="material-symbols-outlined text-primary">radar</span>
</div>
<h3 class="text-xl font-bold text-white mb-3 font-headline">Signal Intelligence</h3>
<p class="text-sm text-slate-400 max-w-md">Isolate critical data points from extreme noise. Our proprietary ingestion engine maps complex topographies instantly, presenting only actionable vectors.</p>
</div>
<!-- Abstract Visualization -->
<div class="w-full h-32 bg-surface-container-lowest/50 rounded-lg border border-white/5 relative overflow-hidden flex items-end px-4 gap-2 pb-2">
<!-- Simulated Bar Chart -->
<div class="w-8 bg-surface-variant rounded-t-sm h-12 transition-all duration-500 group-hover:h-16"></div>
<div class="w-8 bg-primary/40 rounded-t-sm h-24 transition-all duration-500 group-hover:h-28"></div>
<div class="w-8 bg-surface-variant rounded-t-sm h-8 transition-all duration-500 group-hover:h-12"></div>
<div class="w-8 bg-secondary/60 rounded-t-sm h-16 transition-all duration-500 group-hover:h-20 shadow-[0_0_10px_rgba(78,222,163,0.2)]"></div>
<div class="w-8 bg-primary rounded-t-sm h-28 transition-all duration-500 group-hover:h-32 shadow-[0_0_15px_rgba(177,197,255,0.3)]"></div>
<div class="w-8 bg-surface-variant rounded-t-sm h-10 transition-all duration-500 group-hover:h-14"></div>
<!-- Overlay gradient for depth -->
<div class="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent"></div>
</div>
</div>
<!-- Square Feature 2 -->
<div class="glass-card rounded-xl p-8 flex flex-col group reveal delay-200">
<div class="bg-secondary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-secondary/20 shadow-[0_0_15px_rgba(78,222,163,0.1)]">
<span class="material-symbols-outlined text-secondary">target</span>
</div>
<h3 class="text-lg font-bold text-white mb-3 font-headline">Lead Scoring Matrix</h3>
<p class="text-sm text-slate-400 flex-grow">Predictive algorithms assign conviction weights to inbound entities, prioritizing resource allocation dynamically.</p>
<div class="mt-8 flex items-center space-x-3">
<div class="w-10 h-10 rounded-full border-2 border-secondary flex items-center justify-center text-xs font-bold text-secondary shadow-[0_0_10px_rgba(78,222,163,0.2)]">98</div>
<span class="text-xs text-slate-500 uppercase tracking-widest">Confidence</span>
</div>
</div>
<!-- Square Feature 3 -->
<div class="glass-card rounded-xl p-8 flex flex-col group reveal delay-300">
<div class="bg-tertiary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-tertiary/20 shadow-[0_0_15px_rgba(183,200,225,0.1)]">
<span class="material-symbols-outlined text-tertiary">hub</span>
</div>
<h3 class="text-lg font-bold text-white mb-3 font-headline">Persona Mapping</h3>
<p class="text-sm text-slate-400">Construct multidimensional profiles automatically from sparse initial data sets, revealing structural hierarchy.</p>
</div>
<!-- Large Feature 4 -->
<div class="md:col-span-2 glass-card rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 group relative overflow-hidden reveal delay-400">
<div class="flex-1 relative z-10">
<div class="bg-error/10 w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-error/20 shadow-[0_0_15px_rgba(255,180,171,0.1)]">
<span class="material-symbols-outlined text-error">verified_user</span>
</div>
<h3 class="text-xl font-bold text-white mb-3 font-headline">Absolute Compliance</h3>
<p class="text-sm text-slate-400">Military-grade encryption at rest and in transit. Immutable audit logs ensure continuous compliance with global financial and data sovereignty regulations.</p>
</div>
<div class="w-full md:w-1/3 bg-[#060e20]/80 border border-white/5 rounded-lg p-4 font-mono text-[10px] text-slate-500 leading-relaxed shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] backdrop-blur-sm">
                        &gt; INITIATE SECURE HANDSHAKE...<br/>
                        &gt; PROTOCOL: TLS 1.3<br/>
<span class="text-secondary drop-shadow-[0_0_5px_rgba(78,222,163,0.5)]">&gt; STATUS: VERIFIED</span><br/>
                        &gt; AUDIT LOG: APPEND ONLY<br/>
                        &gt; ENCRYPTION: AES-256-GCM<br/>
<span class="text-secondary drop-shadow-[0_0_5px_rgba(78,222,163,0.5)]">&gt; KERNEL SECURE</span>
</div>
</div>
</div>
</section>
<!-- Testimonial / Credibility -->
<section class="max-w-screen-xl mx-auto px-6 py-20 relative reveal">
<div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"></div>
<div class="text-center mb-12">
<p class="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-2">Trusted by Tier 1 Operators</p>
<div class="flex justify-center items-center gap-8 md:gap-16 opacity-50 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
<!-- Placeholder Logos using typography for now -->
<span class="font-headline font-bold text-xl">Vanguard</span>
<span class="font-headline font-bold text-xl">Stratos</span>
<span class="font-headline font-bold text-xl">Aegis Capital</span>
</div>
</div>
<div class="glass-card rounded-2xl p-10 md:p-16 text-center">
<span class="material-symbols-outlined text-4xl text-primary/40 mb-6 block">format_quote</span>
<p class="text-xl md:text-2xl font-body text-slate-200 leading-relaxed mb-8 max-w-3xl mx-auto">
                    "Blostem AI didn't just improve our workflows; it fundamentally re-architected how we perceive and execute upon operational data. It is the definitive command center for the modern enterprise."
                </p>
<div class="flex items-center justify-center space-x-4">
<div class="w-12 h-12 rounded-full bg-surface-variant/50 border border-white/10 flex items-center justify-center text-slate-300 font-bold font-headline shadow-inner">EJ</div>
<div class="text-left">
<div class="text-sm font-bold text-white">Elena Jenkins</div>
<div class="text-xs text-slate-400">Chief Operating Officer, Stratos Global</div>
</div>
</div>
</div>
</section>
<!-- Final CTA -->
<section class="max-w-screen-lg mx-auto px-6 py-24 text-center reveal">
<h2 class="text-4xl md:text-5xl font-extrabold font-headline mb-6 text-white tracking-tight drop-shadow-lg">Initiate Sequence.</h2>
<p class="text-slate-400 mb-10 max-w-xl mx-auto text-sm leading-relaxed">
                Step into the command center. Request structural access to begin transforming your operational telemetry into decisive action.
            </p>
<div class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold px-10 py-4 rounded-md shadow-[0_0_30px_rgba(177,197,255,0.2)] hover:shadow-[0_0_40px_rgba(177,197,255,0.4)] transition-all font-label tracking-wide w-full sm:w-auto hover-pulse">
                    Request Structural Access
                </button>
<button class="px-10 py-4 rounded-md border border-white/10 bg-transparent text-slate-300 hover:bg-white/5 hover:border-white/20 transition-all duration-300 font-medium font-label w-full sm:w-auto backdrop-blur-sm hover:-translate-y-0.5 will-change-transform">
                    View Documentation
                </button>
</div>
</section>
</main>
<!-- Footer Component Integration -->
<footer class="bg-[#0b1326]/80 backdrop-blur-md w-full border-t border-white/5 py-12 relative z-10">
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
<div class="flex flex-col items-center md:items-start space-y-2">
<span class="text-base font-bold text-slate-400 font-headline">Sovereign Command</span>
<span class="font-['Inter'] text-xs text-slate-500">© 2024 Sovereign Command. All rights reserved.</span>
</div>
<div class="flex space-x-6">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Privacy Policy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Terms of Service</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Security</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Status</a>
</div>
</div>
</footer>
<script>
    // Intersection Observer for Scroll Reveals
    document.addEventListener("DOMContentLoaded", () => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach((elem) => {
            observer.observe(elem);
        });
    });
</script>
</body></html>

<!-- Dashboard - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Blostem AI - Operational Dashboard</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#dae2fd",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "outline": "#8e90a2",
                        "surface-variant": "#2d3449",
                        "surface-container": "#171f33",
                        "on-secondary": "#003824",
                        "surface-container-high": "#222a3d",
                        "tertiary": "#b7c8e1",
                        "on-primary": "#002c70",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#b7c8e1",
                        "inverse-primary": "#0057cd",
                        "on-primary-fixed-variant": "#00419d",
                        "secondary": "#4edea3",
                        "on-tertiary": "#213145",
                        "on-secondary-container": "#00311f",
                        "on-tertiary-container": "#e9f0ff",
                        "on-primary-fixed": "#001946",
                        "outline-variant": "#434656",
                        "surface-tint": "#b1c5ff",
                        "primary-container": "#1165e7",
                        "secondary-fixed-dim": "#4edea3",
                        "secondary-container": "#00a572",
                        "on-primary-container": "#edefff",
                        "primary-fixed": "#dae2ff",
                        "primary-fixed-dim": "#b1c5ff",
                        "on-tertiary-fixed-variant": "#38485d",
                        "on-error": "#690005",
                        "inverse-on-surface": "#283044",
                        "surface-container-low": "#131b2e",
                        "tertiary-container": "#5e6e85",
                        "on-tertiary-fixed": "#0b1c30",
                        "surface-container-lowest": "#060e20",
                        "tertiary-fixed": "#d3e4fe",
                        "on-background": "#dae2fd",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "secondary-fixed": "#6ffbbe",
                        "on-surface-variant": "#c4c5d9",
                        "on-error-container": "#ffdad6",
                        "primary": "#b1c5ff",
                        "surface": "#0b1326",
                        "inverse-surface": "#dae2fd",
                        "on-secondary-fixed-variant": "#005236",
                        "surface-container-highest": "#2d3449",
                        "error-container": "#93000a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {},
                    "fontFamily": {
                        "headline": [
                            "Manrope"
                        ],
                        "body": [
                            "Inter"
                        ],
                        "label": [
                            "Inter"
                        ]
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #0b1326; color: #dae2fd; }
        h1, h2, h3, h4, h5, h6, .font-headline { font-family: 'Manrope', sans-serif; }
        .glass-card {
            background: rgba(23, 31, 51, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(67, 70, 86, 0.15);
        }
        
        /* Grid Background Parallax */
        .bg-mesh {
            background-image: 
                linear-gradient(to right, rgba(218, 226, 253, 0.03) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(218, 226, 253, 0.03) 1px, transparent 1px);
            background-size: 40px 40px;
            animation: panBackground 40s linear infinite;
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 0;
        }
        @keyframes panBackground {
            from { background-position: 0 0; }
            to { background-position: -40px -40px; }
        }

        /* Mouse Glow Effect */
        .mouse-glow {
            position: relative;
            overflow: hidden;
        }
        .mouse-glow::before {
            content: "";
            position: absolute;
            top: var(--y, 50%);
            left: var(--x, 50%);
            width: 250px;
            height: 250px;
            background: radial-gradient(circle, rgba(177, 197, 255, 0.08) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 0;
        }
        .mouse-glow:hover::before {
            opacity: 1;
        }

        /* KPI Value Counter Animation */
        @keyframes countUp {
            from { opacity: 0; transform: translateY(10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .kpi-value {
            animation: countUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }

        /* Active Glow */
        .active-glow {
            box-shadow: 0 0 12px 2px rgba(255, 180, 171, 0.4);
        }

        /* Funnel Reveal */
        @keyframes slideInWidth {
            from { clip-path: inset(0 100% 0 0); }
            to { clip-path: inset(0 0 0 0); }
        }
        .animate-funnel {
            animation: slideInWidth 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
            clip-path: inset(0 100% 0 0);
        }
    </style>
</head>
<body class="bg-background text-on-background flex min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden relative">
<!-- Mesh Background -->
<div class="bg-mesh"></div>
<!-- SideNavBar -->
<nav class="h-screen w-64 fixed left-0 top-0 flex flex-col border-r border-slate-800/20 bg-[#0b1326]/70 backdrop-blur-2xl flex-shrink-0 z-40 py-6 px-4 space-y-2 mouse-glow">
<div class="mb-8 px-4 flex items-center space-x-3 relative z-10">
<div class="h-10 w-10 rounded bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(177,197,255,0.3)]">
<span class="material-symbols-outlined text-on-primary" style="font-variation-settings: 'FILL' 1;">dataset</span>
</div>
<div>
<h1 class="text-lg font-bold text-slate-50 font-['Manrope'] tracking-tight">Sovereign Command</h1>
<p class="font-['Inter'] text-sm tracking-wide text-slate-400">Operational Intelligence</p>
</div>
</div>
<div class="flex-1 overflow-y-auto space-y-1 px-2 relative z-10">
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-[#171f33]/80 text-[#2E5BFF] font-semibold border-l-4 border-[#2E5BFF] transition-opacity duration-150 backdrop-blur-md" href="#">
<span class="material-symbols-outlined text-primary" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span class="font-label text-sm tracking-wide">Dashboard</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#2d3449]/50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">insights</span>
<span class="font-label text-sm tracking-wide">Analytics</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#2d3449]/50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">account_tree</span>
<span class="font-label text-sm tracking-wide">Pipeline</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#2d3449]/50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">inventory_2</span>
<span class="font-label text-sm tracking-wide">Inventory</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#2d3449]/50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">group</span>
<span class="font-label text-sm tracking-wide">Customers</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-[#2d3449]/50 transition-colors duration-200" href="#">
<span class="material-symbols-outlined">description</span>
<span class="font-label text-sm tracking-wide">Reports</span>
</a>
</div>
<div class="px-4 py-4 space-y-4 relative z-10">
<button class="w-full py-2.5 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-md font-label font-medium text-sm flex items-center justify-center space-x-2 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300">
<span class="material-symbols-outlined text-sm">rocket_launch</span>
<span>Upgrade Plan</span>
</button>
<div class="space-y-1">
<a class="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#2d3449]/50 transition-colors" href="#">
<span class="material-symbols-outlined text-sm">help</span>
<span class="font-label text-xs tracking-wide">Support</span>
</a>
<a class="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#2d3449]/50 transition-colors" href="#">
<span class="material-symbols-outlined text-sm">settings</span>
<span class="font-label text-xs tracking-wide">Settings</span>
</a>
</div>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 flex flex-col min-h-screen relative overflow-hidden bg-transparent">
<!-- Ambient Background Light -->
<div class="absolute top-0 left-1/4 w-[800px] h-[500px] bg-primary-container/5 rounded-full blur-[120px] pointer-events-none"></div>
<!-- Header -->
<header class="px-8 py-8 flex justify-between items-end relative z-30 sticky top-0 bg-background/60 backdrop-blur-xl border-b border-outline-variant/10">
<div>
<p class="font-label text-sm text-primary tracking-widest uppercase mb-1 font-semibold">Blostem AI Overview</p>
<h2 class="font-headline text-3xl font-extrabold text-on-surface tracking-tight">Intelligence Dashboard</h2>
</div>
<div class="flex items-center space-x-4">
<div class="relative">
<span class="absolute inset-y-0 left-0 flex items-center pl-3">
<span class="material-symbols-outlined text-outline text-sm">search</span>
</span>
<input class="bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant/15 rounded-md pl-9 pr-4 py-2 text-sm font-label text-on-surface focus:border-primary focus:ring-2 focus:ring-surface-tint/20 transition-all w-64 placeholder-outline hover:bg-surface-container-low/80" placeholder="Search accounts..." type="text"/>
</div>
<div class="h-10 w-10 rounded-full bg-surface-container-low/50 backdrop-blur-sm border border-outline-variant/15 flex items-center justify-center cursor-pointer hover:bg-surface-container-high transition-colors shadow-sm">
<span class="material-symbols-outlined text-on-surface text-lg">notifications</span>
</div>
</div>
</header>
<!-- Content Area -->
<div class="px-8 pb-12 pt-8 space-y-8 relative z-10">
<!-- KPI Grid (Bento Style) -->
<div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
<div class="glass-card mouse-glow rounded-xl p-5 flex flex-col justify-between group hover:border-primary/30 transition-colors cursor-default" style="animation-delay: 0.1s;">
<div class="flex justify-between items-start mb-4 relative z-10">
<p class="font-label text-xs font-medium text-on-surface-variant uppercase tracking-wider">Total Accounts</p>
<span class="material-symbols-outlined text-outline text-sm group-hover:text-primary transition-colors">corporate_fare</span>
</div>
<div class="relative z-10">
<h3 class="font-headline text-3xl font-bold text-on-surface kpi-value">14,208</h3>
<div class="flex items-center mt-2 space-x-1">
<span class="material-symbols-outlined text-secondary text-xs">trending_up</span>
<span class="font-label text-xs text-secondary font-medium">+12.5%</span>
</div>
</div>
</div>
<div class="bg-surface-container-low/80 backdrop-blur-md mouse-glow rounded-xl p-5 flex flex-col justify-between border border-outline-variant/15 hover:border-outline-variant/40 transition-colors">
<div class="flex justify-between items-start mb-4 relative z-10">
<p class="font-label text-xs font-medium text-on-surface-variant uppercase tracking-wider">High Priority</p>
<div class="h-2 w-2 rounded-full bg-error animate-pulse active-glow shadow-sm"></div>
</div>
<div class="relative z-10">
<h3 class="font-headline text-3xl font-bold text-on-surface kpi-value" style="animation-delay: 0.1s;">342</h3>
<div class="flex items-center mt-2 space-x-1">
<span class="material-symbols-outlined text-error text-xs">priority_high</span>
<span class="font-label text-xs text-outline font-medium">Requires action</span>
</div>
</div>
</div>
<div class="bg-surface-container-low/80 backdrop-blur-md mouse-glow rounded-xl p-5 flex flex-col justify-between border border-outline-variant/15 hover:border-outline-variant/40 transition-colors">
<div class="flex justify-between items-start mb-4 relative z-10">
<p class="font-label text-xs font-medium text-on-surface-variant uppercase tracking-wider">Approved</p>
<span class="material-symbols-outlined text-secondary-container text-sm" style="font-variation-settings: 'FILL' 1;">check_circle</span>
</div>
<div class="relative z-10">
<h3 class="font-headline text-3xl font-bold text-on-surface kpi-value" style="animation-delay: 0.2s;">8,912</h3>
<div class="flex items-center mt-2 space-x-1">
<span class="font-label text-xs text-outline font-medium">62% conversion rate</span>
</div>
</div>
</div>
<div class="bg-surface-container-low/80 backdrop-blur-md mouse-glow rounded-xl p-5 flex flex-col justify-between border border-outline-variant/15 hover:border-outline-variant/40 transition-colors">
<div class="flex justify-between items-start mb-4 relative z-10">
<p class="font-label text-xs font-medium text-on-surface-variant uppercase tracking-wider">Flagged</p>
<span class="material-symbols-outlined text-tertiary text-sm">flag</span>
</div>
<div class="relative z-10">
<h3 class="font-headline text-3xl font-bold text-on-surface kpi-value" style="animation-delay: 0.3s;">128</h3>
<div class="flex items-center mt-2 space-x-1">
<span class="material-symbols-outlined text-secondary text-xs">trending_down</span>
<span class="font-label text-xs text-secondary font-medium">-4.2%</span>
</div>
</div>
</div>
<div class="bg-gradient-to-br from-surface-container to-surface-container-high rounded-xl p-5 flex flex-col justify-between border border-primary/20 relative overflow-hidden mouse-glow shadow-[0_4px_20px_rgba(177,197,255,0.05)] hover:border-primary/40 transition-colors">
<div class="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
<div class="flex justify-between items-start mb-4 relative z-10">
<p class="font-label text-xs font-medium text-primary uppercase tracking-wider">Avg Confidence</p>
<span class="material-symbols-outlined text-primary text-sm">radar</span>
</div>
<div class="relative z-10">
<div class="flex items-baseline space-x-1">
<h3 class="font-headline text-3xl font-bold text-primary-fixed kpi-value" style="animation-delay: 0.4s;">94</h3>
<span class="text-sm font-label text-primary-fixed-dim">%</span>
</div>
<div class="w-full bg-surface-container-highest h-1.5 mt-3 rounded-full overflow-hidden">
<div class="bg-primary h-full rounded-full w-[94%] animate-funnel" style="animation-delay: 0.5s;"></div>
</div>
</div>
</div>
</div>
<!-- Complex Layout: Funnel & Updates -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Conversion Funnel -->
<div class="lg:col-span-2 bg-surface-container-low/80 backdrop-blur-md rounded-xl border border-outline-variant/15 p-6 flex flex-col mouse-glow transition-colors hover:border-outline-variant/30">
<div class="flex justify-between items-center mb-6 relative z-10">
<h3 class="font-headline text-lg font-bold text-on-surface">Processing Funnel</h3>
<button class="text-xs font-label text-primary hover:text-primary-fixed transition-colors flex items-center group">
                            View Deep Dive <span class="material-symbols-outlined text-xs ml-1 transform group-hover:translate-x-1 transition-transform">arrow_forward</span>
</button>
</div>
<div class="flex-1 flex flex-col justify-center space-y-4 relative z-10">
<!-- Funnel Stages -->
<div class="relative flex items-center group">
<div class="w-32 text-right pr-4 font-label text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Intake</div>
<div class="flex-1 bg-surface-container-highest/50 h-8 rounded-r flex items-center overflow-hidden">
<div class="bg-surface-variant h-full w-[100%] border-l-2 border-primary/30 flex items-center px-3 animate-funnel" style="animation-delay: 0.1s;">
<span class="text-xs font-label text-on-surface">14,208</span>
</div>
</div>
</div>
<div class="relative flex items-center group">
<div class="w-32 text-right pr-4 font-label text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Scoring</div>
<div class="flex-1 bg-surface-container-highest/50 h-8 rounded-r flex items-center overflow-hidden">
<div class="bg-surface-container-high h-full w-[85%] border-l-2 border-primary/50 flex items-center px-3 animate-funnel" style="animation-delay: 0.2s;">
<span class="text-xs font-label text-on-surface">12,076</span>
</div>
</div>
</div>
<div class="relative flex items-center group">
<div class="w-32 text-right pr-4 font-label text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Persona</div>
<div class="flex-1 bg-surface-container-highest/50 h-8 rounded-r flex items-center overflow-hidden">
<div class="bg-surface-container h-full w-[72%] border-l-2 border-primary/70 flex items-center px-3 animate-funnel" style="animation-delay: 0.3s;">
<span class="text-xs font-label text-on-surface">10,229</span>
</div>
</div>
</div>
<div class="relative flex items-center group">
<div class="w-32 text-right pr-4 font-label text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Outreach</div>
<div class="flex-1 bg-surface-container-highest/50 h-8 rounded-r flex items-center overflow-hidden">
<div class="bg-primary-container/40 h-full w-[55%] border-l-2 border-primary flex items-center px-3 animate-funnel" style="animation-delay: 0.4s;">
<span class="text-xs font-label text-on-surface">7,814</span>
</div>
</div>
</div>
<div class="relative flex items-center group">
<div class="w-32 text-right pr-4 font-label text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">Approval</div>
<div class="flex-1 bg-surface-container-highest/50 h-8 rounded-r flex items-center overflow-hidden">
<div class="bg-primary/80 h-full w-[45%] border-l-2 border-primary-fixed flex items-center px-3 animate-funnel shadow-[0_0_10px_rgba(177,197,255,0.2)]" style="animation-delay: 0.5s;">
<span class="text-xs font-label text-on-primary font-medium">6,394</span>
</div>
</div>
</div>
</div>
</div>
<!-- Recent Updates Timeline -->
<div class="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/10 rounded-xl p-6 mouse-glow transition-colors hover:border-outline-variant/30">
<h3 class="font-headline text-lg font-bold text-on-surface mb-6 relative z-10">Live Operations</h3>
<div class="space-y-6 relative z-10 before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-surface-container-high before:to-transparent">
<!-- Timeline Item -->
<div class="relative flex items-start justify-between group">
<div class="flex items-start space-x-3 w-full">
<div class="relative mt-1">
<div class="h-6 w-6 rounded-full bg-secondary-container flex items-center justify-center ring-4 ring-background z-10 relative group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[12px] text-on-secondary-container">check</span>
</div>
</div>
<div class="flex-1 min-w-0">
<p class="font-label text-sm font-medium text-on-surface">Batch Alpha-7 Approved</p>
<p class="font-label text-xs text-outline mt-0.5 truncate">450 accounts processed automatically.</p>
</div>
<span class="font-label text-xs text-surface-variant ml-2 whitespace-nowrap">2m ago</span>
</div>
</div>
<!-- Timeline Item -->
<div class="relative flex items-start justify-between group">
<div class="flex items-start space-x-3 w-full">
<div class="relative mt-1">
<div class="h-6 w-6 rounded-full bg-surface-container-highest flex items-center justify-center ring-4 ring-background z-10 relative group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[12px] text-primary">psychology</span>
</div>
</div>
<div class="flex-1 min-w-0">
<p class="font-label text-sm font-medium text-on-surface">Model Retraining Triggered</p>
<p class="font-label text-xs text-outline mt-0.5 truncate">Drift detected in sector 'Finance'.</p>
</div>
<span class="font-label text-xs text-surface-variant ml-2 whitespace-nowrap">15m ago</span>
</div>
</div>
<!-- Timeline Item -->
<div class="relative flex items-start justify-between group">
<div class="flex items-start space-x-3 w-full">
<div class="relative mt-1">
<div class="h-6 w-6 rounded-full bg-error-container flex items-center justify-center ring-4 ring-background z-10 relative group-hover:scale-110 transition-transform animate-pulse shadow-[0_0_8px_rgba(255,180,171,0.3)]">
<span class="material-symbols-outlined text-[12px] text-on-error-container">warning</span>
</div>
</div>
<div class="flex-1 min-w-0">
<p class="font-label text-sm font-medium text-on-surface">Anomaly Flagged</p>
<p class="font-label text-xs text-outline mt-0.5 truncate">Account ID #8992 requires manual review.</p>
</div>
<span class="font-label text-xs text-surface-variant ml-2 whitespace-nowrap">1h ago</span>
</div>
</div>
<!-- Timeline Item -->
<div class="relative flex items-start justify-between opacity-60 group hover:opacity-100 transition-opacity">
<div class="flex items-start space-x-3 w-full">
<div class="relative mt-1">
<div class="h-6 w-6 rounded-full bg-surface-container-high flex items-center justify-center ring-4 ring-background z-10 relative group-hover:scale-110 transition-transform">
<span class="material-symbols-outlined text-[12px] text-outline">data_object</span>
</div>
</div>
<div class="flex-1 min-w-0">
<p class="font-label text-sm font-medium text-on-surface">Intake Sync Complete</p>
<p class="font-label text-xs text-outline mt-0.5 truncate">1.2M records ingested from CRM.</p>
</div>
<span class="font-label text-xs text-surface-variant ml-2 whitespace-nowrap">3h ago</span>
</div>
</div>
</div>
</div>
</div>
<!-- Data Table: Top Priority -->
<div class="bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/10 rounded-xl overflow-hidden mouse-glow shadow-sm">
<div class="px-6 py-5 flex justify-between items-center bg-surface-container-low/90 border-b border-outline-variant/15 relative z-10">
<h3 class="font-headline text-lg font-bold text-on-surface">Priority Targets</h3>
<div class="flex space-x-2">
<button class="h-8 px-3 text-xs font-label font-medium bg-surface-variant text-on-surface rounded-md border border-outline-variant/30 hover:bg-surface-container-highest hover:shadow-md transition-all">Export</button>
</div>
</div>
<div class="overflow-x-auto relative z-10">
<table class="w-full text-left border-collapse">
<thead>
<tr class="bg-surface-container-lowest/50 font-label text-xs uppercase tracking-wider text-outline border-b border-outline-variant/10">
<th class="px-6 py-4 font-medium">Account Name</th>
<th class="px-6 py-4 font-medium">Sector</th>
<th class="px-6 py-4 font-medium">Est. Value</th>
<th class="px-6 py-4 font-medium">AI Score</th>
<th class="px-6 py-4 font-medium">Status</th>
</tr>
</thead>
<tbody class="font-label text-sm divide-y divide-outline-variant/5">
<tr class="hover:bg-surface-container-low/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out transform hover:-translate-y-px group cursor-pointer relative z-10">
<td class="px-6 py-4 flex items-center space-x-3">
<div class="h-8 w-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/10 transition-colors">G</div>
<span class="font-medium text-on-surface group-hover:text-primary transition-colors">Global Logistics Inc.</span>
</td>
<td class="px-6 py-4 text-on-surface-variant group-hover:text-on-surface transition-colors">Supply Chain</td>
<td class="px-6 py-4 text-on-surface font-medium">$2.4M</td>
<td class="px-6 py-4">
<div class="inline-flex items-center px-2 py-1 rounded bg-secondary-container/20 text-secondary-fixed text-xs font-medium border border-secondary/20 group-hover:bg-secondary-container/30 transition-colors">
                                        98.5
                                    </div>
</td>
<td class="px-6 py-4">
<span class="flex items-center text-xs text-outline group-hover:text-on-surface transition-colors">
<span class="w-1.5 h-1.5 rounded-full bg-secondary mr-2 active-glow"></span> Outbound Sent
                                    </span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out transform hover:-translate-y-px group cursor-pointer relative z-10">
<td class="px-6 py-4 flex items-center space-x-3">
<div class="h-8 w-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-xs font-bold text-primary group-hover:bg-primary/10 transition-colors">A</div>
<span class="font-medium text-on-surface group-hover:text-primary transition-colors">Apex Financial</span>
</td>
<td class="px-6 py-4 text-on-surface-variant group-hover:text-on-surface transition-colors">Banking</td>
<td class="px-6 py-4 text-on-surface font-medium">$1.8M</td>
<td class="px-6 py-4">
<div class="inline-flex items-center px-2 py-1 rounded bg-secondary-container/20 text-secondary-fixed text-xs font-medium border border-secondary/20 group-hover:bg-secondary-container/30 transition-colors">
                                        96.2
                                    </div>
</td>
<td class="px-6 py-4">
<span class="flex items-center text-xs text-outline group-hover:text-on-surface transition-colors">
<span class="w-1.5 h-1.5 rounded-full bg-primary mr-2 animate-pulse active-glow"></span> Generating Persona
                                    </span>
</td>
</tr>
<tr class="hover:bg-surface-container-low/80 hover:shadow-[0_4px_12px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out transform hover:-translate-y-px group cursor-pointer relative z-10">
<td class="px-6 py-4 flex items-center space-x-3">
<div class="h-8 w-8 rounded bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-xs font-bold text-tertiary group-hover:bg-tertiary/10 transition-colors">V</div>
<span class="font-medium text-on-surface group-hover:text-tertiary-fixed transition-colors">Vanguard Health</span>
</td>
<td class="px-6 py-4 text-on-surface-variant group-hover:text-on-surface transition-colors">Healthcare</td>
<td class="px-6 py-4 text-on-surface font-medium">$950K</td>
<td class="px-6 py-4">
<div class="inline-flex items-center px-2 py-1 rounded bg-surface-variant text-on-surface text-xs font-medium border border-outline-variant/30 group-hover:border-outline-variant/60 transition-colors">
                                        88.0
                                    </div>
</td>
<td class="px-6 py-4">
<span class="flex items-center text-xs text-outline group-hover:text-on-surface transition-colors">
<span class="w-1.5 h-1.5 rounded-full bg-error mr-2 animate-pulse active-glow"></span> Review Needed
                                    </span>
</td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</main>
<script>
    // Mouse Glow Effect Logic
    document.addEventListener('mousemove', e => {
        document.querySelectorAll('.mouse-glow').forEach(card => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
</script>
</body></html>

<!-- Pricing - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Pricing - Blostem AI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<style>
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
            animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        
        .card-hover {
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
            transform: translateY(-8px) scale(1.01);
            box-shadow: 0 30px 60px rgba(0,0,0,0.4);
        }
        
        .glow-border {
            position: relative;
        }
        .glow-border::before {
            content: '';
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            background: linear-gradient(45deg, #b1c5ff, #1165e7, #b1c5ff);
            z-index: -1;
            animation: borderGlow 3s linear infinite;
            opacity: 0.8;
            filter: blur(4px);
        }
        @keyframes borderGlow {
            0% { filter: hue-rotate(0deg) blur(4px); }
            100% { filter: hue-rotate(360deg) blur(4px); }
        }
    </style>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-surface": "#dae2fd",
                      "background": "#0b1326",
                      "on-secondary-fixed": "#002113",
                      "outline": "#8e90a2",
                      "surface-variant": "#2d3449",
                      "surface-container": "#171f33",
                      "on-secondary": "#003824",
                      "surface-container-high": "#222a3d",
                      "tertiary": "#b7c8e1",
                      "on-primary": "#002c70",
                      "error": "#ffb4ab",
                      "tertiary-fixed-dim": "#b7c8e1",
                      "inverse-primary": "#0057cd",
                      "on-primary-fixed-variant": "#00419d",
                      "secondary": "#4edea3",
                      "on-tertiary": "#213145",
                      "on-secondary-container": "#00311f",
                      "on-tertiary-container": "#e9f0ff",
                      "on-primary-fixed": "#001946",
                      "outline-variant": "#434656",
                      "surface-tint": "#b1c5ff",
                      "primary-container": "#1165e7",
                      "secondary-fixed-dim": "#4edea3",
                      "secondary-container": "#00a572",
                      "on-primary-container": "#edefff",
                      "primary-fixed": "#dae2ff",
                      "primary-fixed-dim": "#b1c5ff",
                      "on-tertiary-fixed-variant": "#38485d",
                      "on-error": "#690005",
                      "inverse-on-surface": "#283044",
                      "surface-container-low": "#131b2e",
                      "tertiary-container": "#5e6e85",
                      "on-tertiary-fixed": "#0b1c30",
                      "surface-container-lowest": "#060e20",
                      "tertiary-fixed": "#d3e4fe",
                      "on-background": "#dae2fd",
                      "surface-dim": "#0b1326",
                      "surface-bright": "#31394d",
                      "secondary-fixed": "#6ffbbe",
                      "on-surface-variant": "#c4c5d9",
                      "on-error-container": "#ffdad6",
                      "primary": "#b1c5ff",
                      "surface": "#0b1326",
                      "inverse-surface": "#dae2fd",
                      "on-secondary-fixed-variant": "#005236",
                      "surface-container-highest": "#2d3449",
                      "error-container": "#93000a"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {},
              "fontFamily": {
                      "headline": [
                              "Manrope"
                      ],
                      "body": [
                              "Inter"
                      ],
                      "label": [
                              "Inter"
                      ]
              }
      },
          },
        }
      </script>
</head>
<body class="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container scroll-smooth">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(6,14,32,0.4)] transition-all duration-300">
<div class="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
<div class="flex items-center gap-8">
<a class="text-xl font-black text-slate-100 font-headline tracking-tight hover:text-primary transition-colors" href="#">Sovereign SaaS</a>
<nav class="hidden md:flex items-center gap-6">
<a class="text-slate-400 font-medium hover:text-slate-200 transition-all duration-200 text-sm" href="#">Product</a>
<a class="text-slate-400 font-medium hover:text-slate-200 transition-all duration-200 text-sm" href="#">Solutions</a>
<a class="text-[#2E5BFF] font-bold border-b-2 border-[#2E5BFF] pb-1 text-sm transition-all duration-200" href="#">Pricing</a>
<a class="text-slate-400 font-medium hover:text-slate-200 transition-all duration-200 text-sm" href="#">Resources</a>
</nav>
</div>
<div class="flex items-center gap-4">
<div class="hidden md:flex items-center gap-2 mr-4">
<span class="text-sm font-medium text-slate-400">Guest Mode</span>
</div>
<button class="text-slate-400 hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-800/50">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 0;">notifications</span>
</button>
<button class="text-slate-400 hover:text-slate-200 transition-colors p-2 rounded-full hover:bg-slate-800/50">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 0;">settings</span>
</button>
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-4 py-2 rounded-md text-sm hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 transition-all ml-2">
                    Sign In
                </button>
</div>
</div>
</header>
<main class="flex-grow pt-32 pb-24 px-6 max-w-screen-xl mx-auto w-full">
<!-- Hero Section -->
<section class="text-center mb-20 max-w-3xl mx-auto">
<h1 class="font-headline text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-on-surface animate-fade-up">
                Pricing for <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">operational excellence</span>
</h1>
<p class="font-body text-xl text-on-surface-variant max-w-2xl mx-auto animate-fade-up delay-100">
                Scale your command center with plans designed for maximum density, precision, and security.
            </p>
<div class="mt-10 inline-flex items-center bg-surface-container-low p-1 rounded-full border border-outline-variant/15 animate-fade-up delay-200 hover:border-outline-variant/30 transition-colors">
<button class="px-6 py-2 rounded-full text-sm font-semibold bg-surface-container-highest text-on-surface shadow-sm transition-transform hover:scale-105">Monthly</button>
<button class="px-6 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface transition-all">Annually <span class="text-secondary text-xs ml-1 bg-secondary-container/20 px-2 py-0.5 rounded-full">-20%</span></button>
</div>
</section>
<!-- Pricing Cards -->
<section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 relative perspective-1000">
<!-- Free Plan -->
<div class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/15 flex flex-col card-hover animate-fade-up delay-100 hover:border-outline-variant/30">
<div class="mb-8">
<h3 class="font-headline text-2xl font-bold text-on-surface mb-2">Starter</h3>
<p class="text-on-surface-variant text-sm h-10">Essential tools for individual operators.</p>
<div class="mt-6 flex items-baseline gap-1">
<span class="text-4xl font-extrabold text-on-surface font-headline">$0</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="flex-grow space-y-4 mb-8">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Basic operational dashboard</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Up to 3 active projects</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Community support</span>
</li>
</ul>
<button class="w-full py-3 rounded-md border border-outline-variant text-on-surface font-medium hover:bg-surface-container-highest transition-all duration-300 text-sm hover:border-outline">
                    Get Started
                </button>
</div>
<!-- Pro Plan (Recommended) -->
<div class="bg-surface-container rounded-xl p-8 relative flex flex-col shadow-[0_20px_40px_rgba(17,101,231,0.15)] transform md:-translate-y-4 z-10 card-hover glow-border animate-fade-up delay-200 bg-clip-padding border border-transparent">
<div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
<span class="bg-gradient-to-r from-primary to-primary-container text-on-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">Recommended</span>
</div>
<div class="mb-8">
<h3 class="font-headline text-2xl font-bold text-on-surface mb-2">Command Pro</h3>
<p class="text-on-surface-variant text-sm h-10">Advanced telemetry and limitless operational scope.</p>
<div class="mt-6 flex items-baseline gap-1">
<span class="text-4xl font-extrabold text-on-surface font-headline">$49</span>
<span class="text-on-surface-variant text-sm">/mo</span>
</div>
</div>
<ul class="flex-grow space-y-4 mb-8">
<li class="flex items-start gap-3 group">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">check</span>
<span class="text-sm text-on-surface font-medium">Unlimited projects &amp; pipelines</span>
</li>
<li class="flex items-start gap-3 group">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">check</span>
<span class="text-sm text-on-surface font-medium">Real-time data synchronization</span>
</li>
<li class="flex items-start gap-3 group">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">check</span>
<span class="text-sm text-on-surface font-medium">Advanced asymmetric routing</span>
</li>
<li class="flex items-start gap-3 group">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">check</span>
<span class="text-sm text-on-surface font-medium">Priority 24/7 support</span>
</li>
</ul>
<button class="w-full py-3 rounded-md bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold hover:opacity-90 hover:shadow-[0_0_30px_rgba(177,197,255,0.4)] transition-all duration-300 text-sm transform hover:-translate-y-1">
                    Upgrade to Pro
                </button>
</div>
<!-- Enterprise Plan -->
<div class="bg-surface-container-low rounded-xl p-8 border border-outline-variant/15 flex flex-col card-hover animate-fade-up delay-300 hover:border-outline-variant/30">
<div class="mb-8">
<h3 class="font-headline text-2xl font-bold text-on-surface mb-2">Sovereign</h3>
<p class="text-on-surface-variant text-sm h-10">Custom architecture for global deployments.</p>
<div class="mt-6 flex items-baseline gap-1">
<span class="text-4xl font-extrabold text-on-surface font-headline">Custom</span>
</div>
</div>
<ul class="flex-grow space-y-4 mb-8">
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Dedicated cluster &amp; infrastructure</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">SSO &amp; SAML integration</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Custom security policies</span>
</li>
<li class="flex items-start gap-3">
<span class="material-symbols-outlined text-primary text-[20px]">check</span>
<span class="text-sm text-on-surface-variant">Dedicated success manager</span>
</li>
</ul>
<button class="w-full py-3 rounded-md border border-outline-variant text-on-surface font-medium hover:bg-surface-container-highest transition-all duration-300 text-sm hover:border-outline">
                    Contact Sales
                </button>
</div>
</section>
<!-- Detailed Comparison -->
<section class="max-w-5xl mx-auto animate-fade-up delay-400">
<h2 class="font-headline text-3xl font-bold text-on-surface mb-10 text-center">Architectural Comparison</h2>
<div class="bg-surface-container-lowest rounded-xl border border-outline-variant/15 overflow-hidden shadow-2xl transition-all duration-500 hover:border-outline-variant/30 hover:shadow-primary/5">
<div class="grid grid-cols-4 p-6 border-b border-outline-variant/15 bg-surface-container-low">
<div class="col-span-1 font-headline font-semibold text-on-surface-variant text-sm uppercase tracking-wider">Features</div>
<div class="col-span-1 text-center font-headline font-semibold text-on-surface text-sm">Starter</div>
<div class="col-span-1 text-center font-headline font-bold text-primary text-sm">Command Pro</div>
<div class="col-span-1 text-center font-headline font-semibold text-on-surface text-sm">Sovereign</div>
</div>
<!-- Section 1 -->
<div class="bg-surface-container/30 px-6 py-3 border-b border-outline-variant/10">
<h4 class="font-medium text-sm text-on-surface">Core Telemetry</h4>
</div>
<div class="grid grid-cols-4 p-6 border-b border-outline-variant/10 hover:bg-surface-container-highest/40 transition-colors duration-300 cursor-default group">
<div class="col-span-1 text-sm text-on-surface-variant flex items-center group-hover:text-on-surface transition-colors">Data Retention</div>
<div class="col-span-1 text-center text-sm text-on-surface-variant flex items-center justify-center">7 Days</div>
<div class="col-span-1 text-center text-sm text-on-surface font-medium flex items-center justify-center group-hover:text-primary transition-colors">1 Year</div>
<div class="col-span-1 text-center text-sm text-on-surface-variant flex items-center justify-center">Unlimited</div>
</div>
<div class="grid grid-cols-4 p-6 border-b border-outline-variant/10 hover:bg-surface-container-highest/40 transition-colors duration-300 cursor-default group">
<div class="col-span-1 text-sm text-on-surface-variant flex items-center group-hover:text-on-surface transition-colors">API Rate Limit</div>
<div class="col-span-1 text-center text-sm text-on-surface-variant flex items-center justify-center">100 / min</div>
<div class="col-span-1 text-center text-sm text-on-surface font-medium flex items-center justify-center group-hover:text-primary transition-colors">10,000 / min</div>
<div class="col-span-1 text-center text-sm text-on-surface-variant flex items-center justify-center">Custom</div>
</div>
<!-- Section 2 -->
<div class="bg-surface-container/30 px-6 py-3 border-b border-outline-variant/10">
<h4 class="font-medium text-sm text-on-surface">Security</h4>
</div>
<div class="grid grid-cols-4 p-6 border-b border-outline-variant/10 hover:bg-surface-container-highest/40 transition-colors duration-300 cursor-default group">
<div class="col-span-1 text-sm text-on-surface-variant flex items-center group-hover:text-on-surface transition-colors">End-to-End Encryption</div>
<div class="col-span-1 text-center flex items-center justify-center">
<span class="material-symbols-outlined text-outline-variant text-[20px]">remove</span>
</div>
<div class="col-span-1 text-center flex items-center justify-center">
<span class="material-symbols-outlined text-primary text-[20px] group-hover:scale-110 transition-transform">check</span>
</div>
<div class="col-span-1 text-center flex items-center justify-center">
<span class="material-symbols-outlined text-on-surface text-[20px]">check</span>
</div>
</div>
<div class="grid grid-cols-4 p-6 hover:bg-surface-container-highest/40 transition-colors duration-300 cursor-default group">
<div class="col-span-1 text-sm text-on-surface-variant flex items-center group-hover:text-on-surface transition-colors">Audit Logs</div>
<div class="col-span-1 text-center flex items-center justify-center">
<span class="material-symbols-outlined text-outline-variant text-[20px]">remove</span>
</div>
<div class="col-span-1 text-center text-sm text-on-surface font-medium flex items-center justify-center group-hover:text-primary transition-colors">30 Days</div>
<div class="col-span-1 text-center text-sm text-on-surface-variant flex items-center justify-center">Unlimited</div>
</div>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full border-t border-slate-800/30 py-12 bg-[#0b1326] mt-auto">
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="text-base font-bold text-slate-400 font-headline">Sovereign Command</div>
<div class="flex gap-6">
<a class="text-slate-500 hover:text-slate-300 font-['Inter'] text-xs uppercase tracking-widest hover:underline transition-all" href="#">Privacy Policy</a>
<a class="text-slate-500 hover:text-slate-300 font-['Inter'] text-xs uppercase tracking-widest hover:underline transition-all" href="#">Terms of Service</a>
<a class="text-slate-500 hover:text-slate-300 font-['Inter'] text-xs uppercase tracking-widest hover:underline transition-all" href="#">Security</a>
<a class="text-slate-500 hover:text-slate-300 font-['Inter'] text-xs uppercase tracking-widest hover:underline transition-all" href="#">Status</a>
</div>
<div class="text-slate-500 font-['Inter'] text-xs uppercase tracking-widest text-center md:text-right">
                © 2024 Sovereign Command. All rights reserved.
            </div>
</div>
</footer>
<script>
        document.addEventListener("DOMContentLoaded", () => {
            const observerOptions = {
                root: null,
                rootMargin: '0px',
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-up');
                        entry.target.style.opacity = "1";
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.animate-fade-up').forEach((el) => {
                if(!el.style.opacity) el.style.opacity = "0";
                observer.observe(el);
            });
        });
    </script>
</body></html>

<!-- Features - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Features - Blostem AI Pipeline</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&amp;family=Manrope:wght@400;500;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              "colors": {
                      "on-surface": "#dae2fd",
                      "background": "#0b1326",
                      "on-secondary-fixed": "#002113",
                      "outline": "#8e90a2",
                      "surface-variant": "#2d3449",
                      "surface-container": "#171f33",
                      "on-secondary": "#003824",
                      "surface-container-high": "#222a3d",
                      "tertiary": "#b7c8e1",
                      "on-primary": "#002c70",
                      "error": "#ffb4ab",
                      "tertiary-fixed-dim": "#b7c8e1",
                      "inverse-primary": "#0057cd",
                      "on-primary-fixed-variant": "#00419d",
                      "secondary": "#4edea3",
                      "on-tertiary": "#213145",
                      "on-secondary-container": "#00311f",
                      "on-tertiary-container": "#e9f0ff",
                      "on-primary-fixed": "#001946",
                      "outline-variant": "#434656",
                      "surface-tint": "#b1c5ff",
                      "primary-container": "#1165e7",
                      "secondary-fixed-dim": "#4edea3",
                      "secondary-container": "#00a572",
                      "on-primary-container": "#edefff",
                      "primary-fixed": "#dae2ff",
                      "primary-fixed-dim": "#b1c5ff",
                      "on-tertiary-fixed-variant": "#38485d",
                      "on-error": "#690005",
                      "inverse-on-surface": "#283044",
                      "surface-container-low": "#131b2e",
                      "tertiary-container": "#5e6e85",
                      "on-tertiary-fixed": "#0b1c30",
                      "surface-container-lowest": "#060e20",
                      "tertiary-fixed": "#d3e4fe",
                      "on-background": "#dae2fd",
                      "surface-dim": "#0b1326",
                      "surface-bright": "#31394d",
                      "secondary-fixed": "#6ffbbe",
                      "on-surface-variant": "#c4c5d9",
                      "on-error-container": "#ffdad6",
                      "primary": "#b1c5ff",
                      "surface": "#0b1326",
                      "inverse-surface": "#dae2fd",
                      "on-secondary-fixed-variant": "#005236",
                      "surface-container-highest": "#2d3449",
                      "error-container": "#93000a"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "spacing": {},
              "fontFamily": {
                      "headline": [
                              "Manrope"
                      ],
                      "body": [
                              "Inter"
                      ],
                      "label": [
                              "Inter"
                      ]
              }
      },
          },
        }
      </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .icon-fill {
            font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }

        /* Cinematic Animations */
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(40px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
        }

        @keyframes pulseSoft {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        .reveal {
            opacity: 0;
            animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        
        .animate-float {
            animation: float 8s ease-in-out infinite;
        }

        .animate-pulse-soft {
            animation: pulseSoft 4s ease-in-out infinite;
        }
        
        .card-hover {
            transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .card-hover:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 30px 60px -12px rgba(6, 14, 32, 0.9), 0 18px 36px -18px rgba(17, 101, 231, 0.15);
            border-color: rgba(177, 197, 255, 0.2);
            z-index: 10;
        }
      </style>
</head>
<body class="bg-background text-on-surface font-body antialiased selection:bg-primary-container selection:text-on-primary-container overflow-x-hidden">
<!-- Navigation Shell -->
<nav class="fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-md shadow-[0_20px_40px_rgba(6,14,32,0.4)] border-b-0 transition-transform duration-500">
<div class="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
<div class="text-xl font-black text-slate-100 font-headline tracking-tight hover:scale-105 transition-transform duration-300 cursor-pointer">Sovereign SaaS</div>
<div class="hidden md:flex space-x-8 items-center">
<a class="text-[#2E5BFF] font-bold border-b-2 border-[#2E5BFF] pb-1 font-body hover:bg-slate-800/50 transition-all duration-200" href="#">Product</a>
<a class="text-slate-400 font-medium hover:text-slate-200 font-body hover:bg-slate-800/50 transition-all duration-200" href="#">Solutions</a>
<a class="text-slate-400 font-medium hover:text-slate-200 font-body hover:bg-slate-800/50 transition-all duration-200" href="#">Pricing</a>
<a class="text-slate-400 font-medium hover:text-slate-200 font-body hover:bg-slate-800/50 transition-all duration-200" href="#">Resources</a>
</div>
<div class="flex items-center space-x-6">
<div class="hidden md:flex items-center space-x-4">
<button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:rotate-12 p-2 rounded-full group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform" data-icon="notifications">notifications</span>
</button>
<button class="text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-300 hover:rotate-90 p-2 rounded-full group">
<span class="material-symbols-outlined group-hover:scale-110 transition-transform" data-icon="settings">settings</span>
</button>
</div>
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-5 py-2 rounded-md shadow-md hover:shadow-[0_0_20px_rgba(17,101,231,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 text-sm">
                    Sign In
                </button>
</div>
</div>
</nav>
<main class="pt-24 pb-32">
<!-- Hero / Thesis Statement -->
<header class="max-w-7xl mx-auto px-6 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
<div class="absolute inset-0 bg-gradient-to-b from-primary-container/5 to-transparent pointer-events-none -z-10 h-full w-full"></div>
<div class="lg:col-span-7 space-y-8 reveal">
<div class="inline-flex items-center space-x-2 px-3 py-1 bg-surface-container-low border border-outline-variant/30 rounded-full hover:border-secondary/50 transition-colors duration-300 cursor-default">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse-soft"></span>
<span class="text-xs font-label text-on-surface-variant uppercase tracking-widest">The Blostem Pipeline</span>
</div>
<h1 class="font-headline text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-on-surface">
                    Intelligence <br/> <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container hover:from-primary-container hover:to-primary transition-all duration-700 bg-[length:200%_auto] hover:bg-right">Orchestrated.</span>
</h1>
<p class="font-body text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                    A rigorous operational system transforming unstructured data into precise outreach. Not just features, but a contiguous flow of automated strategy.
                </p>
<div class="flex items-center space-x-4 pt-4">
<button class="bg-gradient-to-r from-primary to-primary-container text-on-primary font-semibold px-8 py-3 rounded-md shadow-[0_10px_20px_rgba(17,101,231,0.2)] hover:shadow-[0_15px_30px_rgba(17,101,231,0.4)] hover:-translate-y-1 transition-all duration-300">
                        Deploy Pipeline
                    </button>
<button class="px-8 py-3 rounded-md text-primary font-medium border border-outline-variant/30 hover:bg-surface-container-low hover:border-primary/50 transition-all duration-300">
                        View Architecture
                    </button>
</div>
</div>
<div class="lg:col-span-5 relative reveal delay-200">
<div class="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse-soft"></div>
<div class="relative bg-surface-container border border-outline-variant/15 p-6 rounded-xl shadow-[0_30px_60px_rgba(6,14,32,0.8)] animate-float transform-gpu hover:rotate-1 transition-transform duration-700">
<img alt="Abstract digital network showing nodes connecting in a deep blue operational environment" class="rounded-lg w-full h-auto object-cover border border-outline-variant/10 shadow-inner" data-alt="Abstract digital network visualization with glowing nodes and lines connecting in a deep navy and slate environment, cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCA5SSqKvCX_t34Vz2EkAhmjHAD3CWAWSb8ME1fL70swJ56Vy_EYkmnzS6OT-Eq8n-PXcx-HpQCaTIK69IOP74Uxl2iM3RsHTB5HXZwvtFGs5AAPYc-ubCftdtmRXoyjZ48dtVOY7ARhiiYETppQWrUgyrTE8nR-kN0JN1Jn_3ed--iggMnWKxLaxVdPBYfY7ui5HiO8tse2uF5xH5cv90YlXSEnyYh5HSyt3S926b8ouzQ0K2ERapYW2_K25u-OSUUkdIH2Fzx3rs"/>
</div>
</div>
</header>
<!-- The Pipeline Steps (Bento Style) -->
<section class="max-w-7xl mx-auto px-6 py-16">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
<!-- 1. Signals -->
<article class="col-span-1 lg:col-span-2 bg-surface-container-low rounded-xl p-8 card-hover relative overflow-hidden group reveal delay-100">
<div class="absolute -top-10 -right-10 p-8 opacity-10 group-hover:opacity-30 group-hover:rotate-12 group-hover:scale-125 transition-all duration-700">
<span class="material-symbols-outlined text-9xl icon-fill" data-icon="radar">radar</span>
</div>
<div class="relative z-10 flex flex-col h-full justify-between">
<div>
<span class="text-primary font-headline text-lg font-bold mb-2 block tracking-wide group-hover:translate-x-1 transition-transform duration-300">01 / Signals</span>
<h2 class="text-3xl font-headline font-bold text-on-surface mb-4">Signal Acquisition Engine</h2>
<p class="text-on-surface-variant font-body mb-6 max-w-md group-hover:text-on-surface transition-colors duration-300">
                                Continuous monitoring of digital exhaust. We ingest billions of data points across public registries, social sentiment, and financial disclosures to detect intent before it manifests.
                            </p>
</div>
<div class="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/15 flex items-center space-x-4 group-hover:border-secondary/30 transition-colors duration-300">
<span class="material-symbols-outlined text-secondary group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" data-icon="check_circle">check_circle</span>
<div>
<p class="text-sm font-label text-on-surface font-medium">Why it matters</p>
<p class="text-xs font-body text-on-surface-variant">Moves you from reactive searching to proactive engagement.</p>
</div>
</div>
</div>
</article>
<!-- 2. Scoring -->
<article class="col-span-1 bg-surface-container-low rounded-xl p-8 card-hover group reveal delay-200">
<span class="text-primary font-headline text-lg font-bold mb-2 block tracking-wide group-hover:translate-x-1 transition-transform duration-300">02 / Scoring</span>
<h2 class="text-2xl font-headline font-bold text-on-surface mb-4">Proprietary Propensity Matrix</h2>
<p class="text-on-surface-variant font-body mb-8 text-sm group-hover:text-on-surface transition-colors duration-300">
                        Raw signals are meaningless without context. Our models score leads dynamically based on historical conversion vectors and real-time behavioral shifts.
                    </p>
<div class="space-y-3">
<div class="flex justify-between items-center bg-surface-container-lowest p-3 rounded-md group-hover:bg-surface-container transition-colors duration-300">
<span class="text-xs font-label text-on-surface-variant uppercase">Conversion Probability</span>
<span class="text-sm font-bold text-secondary">94.2%</span>
</div>
<div class="flex justify-between items-center bg-surface-container-lowest p-3 rounded-md group-hover:bg-surface-container transition-colors duration-300">
<span class="text-xs font-label text-on-surface-variant uppercase">Velocity Score</span>
<span class="text-sm font-bold text-primary">High</span>
</div>
</div>
</article>
<!-- 3. Personas & 4. Outreach (Split Row) -->
<article class="col-span-1 lg:col-span-1 bg-surface-container-low rounded-xl p-8 card-hover group reveal delay-300">
<span class="text-primary font-headline text-lg font-bold mb-2 block tracking-wide group-hover:translate-x-1 transition-transform duration-300">03 / Personas</span>
<h2 class="text-2xl font-headline font-bold text-on-surface mb-4">Dynamic Identity Synthesis</h2>
<p class="text-on-surface-variant font-body text-sm group-hover:text-on-surface transition-colors duration-300">
                        We don't just find targets; we understand them. The system auto-generates deep psychographic profiles, tailoring messaging to distinct decision-maker personas automatically.
                    </p>
<div class="mt-6 flex space-x-2">
<span class="px-2 py-1 bg-surface-container-highest text-xs rounded text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors duration-300 cursor-default">CFO / Risk Averse</span>
<span class="px-2 py-1 bg-surface-container-highest text-xs rounded text-on-surface-variant hover:bg-primary hover:text-on-primary transition-colors duration-300 cursor-default">VP Ops / Efficiency</span>
</div>
</article>
<article class="col-span-1 lg:col-span-2 bg-gradient-to-br from-surface-container-low to-surface-container-highest rounded-xl p-8 relative overflow-hidden border border-outline-variant/10 card-hover group reveal delay-400">
<div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
<div class="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
<div class="flex-1">
<span class="text-primary font-headline text-lg font-bold mb-2 block tracking-wide group-hover:translate-x-1 transition-transform duration-300">04 / Outreach</span>
<h2 class="text-3xl font-headline font-bold text-on-surface mb-4">Autonomous Engagement Orchestration</h2>
<p class="text-on-surface-variant font-body mb-6 group-hover:text-on-surface transition-colors duration-300">
                                Multi-channel sequencing deployed with surgical precision. Email, LinkedIn, and targeted ads operate synchronously, adjusting cadence based on real-time recipient engagement.
                            </p>
<button class="text-primary font-label text-sm font-semibold hover:text-primary-container transition-colors flex items-center group/btn">
                                View Sequence Logic <span class="material-symbols-outlined text-sm ml-1 group-hover/btn:translate-x-2 transition-transform duration-300" data-icon="arrow_forward">arrow_forward</span>
</button>
</div>
<div class="w-full md:w-1/3 bg-surface-container-lowest p-4 rounded-lg shadow-inner group-hover:shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)] transition-shadow duration-300">
<div class="space-y-3">
<div class="h-2 bg-surface-variant rounded w-full group-hover:bg-surface-bright transition-colors duration-300"></div>
<div class="h-2 bg-surface-variant rounded w-3/4 group-hover:bg-surface-bright transition-colors duration-300"></div>
<div class="h-2 bg-primary/40 rounded w-1/2 group-hover:bg-primary/60 transition-colors duration-300 animate-pulse-soft"></div>
</div>
</div>
</div>
</article>
<!-- 5. Compliance & 6. Analytics -->
<article class="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 reveal delay-500">
<div class="bg-surface-container-low rounded-xl p-8 border-l-4 border-error/50 card-hover group">
<div class="flex items-start space-x-4">
<span class="material-symbols-outlined text-error/80 text-3xl group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" data-icon="shield_locked">shield_locked</span>
<div>
<span class="text-error/80 font-headline text-sm font-bold mb-1 block uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">05 / Compliance Protocol</span>
<h3 class="text-xl font-headline font-bold text-on-surface mb-2">Immutable Governance</h3>
<p class="text-on-surface-variant font-body text-sm group-hover:text-on-surface transition-colors duration-300">
                                    Enterprise-grade guardrails. Automated suppression lists, frequency capping, and built-in GDPR/CCPA checks ensure aggressive outreach never becomes a liability.
                                </p>
</div>
</div>
</div>
<div class="bg-surface-container-low rounded-xl p-8 flex flex-col justify-center relative overflow-hidden card-hover group">
<div class="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-15 group-hover:-translate-y-4 group-hover:-translate-x-4 transition-all duration-700">
<span class="material-symbols-outlined text-[12rem]" data-icon="monitoring">monitoring</span>
</div>
<div class="relative z-10">
<span class="text-primary font-headline text-sm font-bold mb-1 block uppercase tracking-wider group-hover:translate-x-1 transition-transform duration-300">06 / Analytics</span>
<h3 class="text-xl font-headline font-bold text-on-surface mb-2">Full-Cycle Attribution</h3>
<p class="text-on-surface-variant font-body text-sm mb-4 group-hover:text-on-surface transition-colors duration-300">
                            Crystal clear visibility from initial signal to closed revenue. Understand exactly which data vectors are driving pipeline velocity.
                        </p>
</div>
</div>
</article>
</div>
</section>
</main>
<!-- Footer -->
<footer class="w-full border-t border-slate-800/30 py-12 bg-[#0b1326] relative z-10">
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
<div class="text-base font-bold text-slate-400 font-headline hover:text-slate-200 transition-colors duration-300 cursor-pointer">
                Sovereign SaaS
            </div>
<div class="flex flex-wrap justify-center gap-6">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:-translate-y-1 inline-block transition-all duration-300" href="#">Privacy Policy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:-translate-y-1 inline-block transition-all duration-300" href="#">Terms of Service</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:-translate-y-1 inline-block transition-all duration-300" href="#">Security</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:-translate-y-1 inline-block transition-all duration-300" href="#">Status</a>
</div>
<div class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500">
                © 2024 Sovereign Command. All rights reserved.
            </div>
</div>
</footer>
</body></html>

<!-- Login / Signup - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sovereign SaaS - Authentication</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Manrope:wght@400;600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            "colors": {
                    "on-surface": "#dae2fd",
                    "background": "#0b1326",
                    "on-secondary-fixed": "#002113",
                    "outline": "#8e90a2",
                    "surface-variant": "#2d3449",
                    "surface-container": "#171f33",
                    "on-secondary": "#003824",
                    "surface-container-high": "#222a3d",
                    "tertiary": "#b7c8e1",
                    "on-primary": "#002c70",
                    "error": "#ffb4ab",
                    "tertiary-fixed-dim": "#b7c8e1",
                    "inverse-primary": "#0057cd",
                    "on-primary-fixed-variant": "#00419d",
                    "secondary": "#4edea3",
                    "on-tertiary": "#213145",
                    "on-secondary-container": "#00311f",
                    "on-tertiary-container": "#e9f0ff",
                    "on-primary-fixed": "#001946",
                    "outline-variant": "#434656",
                    "surface-tint": "#b1c5ff",
                    "primary-container": "#1165e7",
                    "secondary-fixed-dim": "#4edea3",
                    "secondary-container": "#00a572",
                    "on-primary-container": "#edefff",
                    "primary-fixed": "#dae2ff",
                    "primary-fixed-dim": "#b1c5ff",
                    "on-tertiary-fixed-variant": "#38485d",
                    "on-error": "#690005",
                    "inverse-on-surface": "#283044",
                    "surface-container-low": "#131b2e",
                    "tertiary-container": "#5e6e85",
                    "on-tertiary-fixed": "#0b1c30",
                    "surface-container-lowest": "#060e20",
                    "tertiary-fixed": "#d3e4fe",
                    "on-background": "#dae2fd",
                    "surface-dim": "#0b1326",
                    "surface-bright": "#31394d",
                    "secondary-fixed": "#6ffbbe",
                    "on-surface-variant": "#c4c5d9",
                    "on-error-container": "#ffdad6",
                    "primary": "#b1c5ff",
                    "surface": "#0b1326",
                    "inverse-surface": "#dae2fd",
                    "on-secondary-fixed-variant": "#005236",
                    "surface-container-highest": "#2d3449",
                    "error-container": "#93000a"
            },
            "borderRadius": {
                    "DEFAULT": "0.125rem",
                    "lg": "0.25rem",
                    "xl": "0.5rem",
                    "full": "0.75rem"
            },
            "spacing": {},
            "fontFamily": {
                    "headline": [
                            "Manrope"
                    ],
                    "body": [
                            "Inter"
                    ],
                    "label": [
                            "Inter"
                    ]
            }
    },
        },
      }
    </script>
<style>
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        
        @keyframes mesh-drift {
            0% { background-position: 0% 0%; }
            50% { background-position: 100% 100%; }
            100% { background-position: 0% 0%; }
        }
        
        @keyframes fade-slide-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .bg-mesh-gradient {
            background-color: #0b1326;
            background-image: 
                radial-gradient(at 0% 0%, hsla(220,100%,70%,0.15) 0px, transparent 50%),
                radial-gradient(at 100% 100%, hsla(220,100%,70%,0.1) 0px, transparent 50%);
            background-size: 200% 200%;
            animation: mesh-drift 20s ease-in-out infinite;
        }
        
        .glass-panel {
            background: rgba(23, 31, 51, 0.6);
            backdrop-filter: blur(24px);
            -webkit-backdrop-filter: blur(24px);
        }
        
        .animate-entrance {
            animation: fade-slide-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
    </style>
</head>
<body class="bg-background text-on-surface font-body antialiased min-h-screen flex items-center justify-center bg-mesh-gradient overflow-hidden">
<!-- Ambient Glow Orbs -->
<div class="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-primary-container/20 blur-[120px] pointer-events-none"></div>
<div class="absolute bottom-[-20%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-secondary-container/10 blur-[100px] pointer-events-none"></div>
<div class="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
<!-- Left Column: Branding & Value Prop -->
<div class="hidden md:flex flex-col justify-center space-y-12 pr-8 border-r border-outline-variant/15">
<div class="space-y-6">
<div class="flex items-center space-x-3 text-on-surface">
<span class="material-symbols-outlined text-4xl text-primary" data-weight="fill" style="font-variation-settings: 'FILL' 1;">language</span>
<span class="font-headline font-black text-2xl tracking-tight">Sovereign Command</span>
</div>
<h1 class="font-headline text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight">
                    Operational <br/>
<span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Intelligence</span>
</h1>
<p class="font-body text-on-surface-variant text-lg leading-relaxed max-w-md">
                    Access high-stakes orchestration tools designed for scale, precision, and zero-latency decision making.
                </p>
</div>
<div class="space-y-6 pt-6 border-t border-outline-variant/15">
<div class="flex items-center space-x-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0 border border-outline-variant/20">
<span class="material-symbols-outlined text-secondary text-xl">verified_user</span>
</div>
<div>
<h4 class="font-headline font-bold text-sm text-on-surface">Enterprise Grade Security</h4>
<p class="font-label text-xs text-on-surface-variant mt-0.5 tracking-wide">End-to-end encryption &amp; SSO</p>
</div>
</div>
<div class="flex items-center space-x-4">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center flex-shrink-0 border border-outline-variant/20">
<span class="material-symbols-outlined text-primary text-xl">speed</span>
</div>
<div>
<h4 class="font-headline font-bold text-sm text-on-surface">Zero-Latency Execution</h4>
<p class="font-label text-xs text-on-surface-variant mt-0.5 tracking-wide">Real-time data synchronization</p>
</div>
</div>
</div>
</div>
<!-- Right Column: Authentication Form -->
<div class="w-full max-w-md mx-auto">
<div class="glass-panel rounded-xl border border-outline-variant/20 shadow-[0_20px_40px_rgba(6,14,32,0.4)] p-8 sm:p-10 relative overflow-hidden animate-entrance opacity-0">
<!-- Subtle Top Highlight -->
<div class="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
<!-- Mobile Logo Fallback -->
<div class="md:hidden flex items-center justify-center space-x-2 mb-8">
<span class="material-symbols-outlined text-3xl text-primary" data-weight="fill" style="font-variation-settings: 'FILL' 1;">language</span>
<span class="font-headline font-black text-xl tracking-tight text-on-surface">Sovereign Command</span>
</div>
<div class="text-center mb-8">
<h2 class="font-headline text-2xl font-bold text-on-surface tracking-tight">Access Command</h2>
<p class="font-body text-sm text-on-surface-variant mt-2">Authenticate to continue securely</p>
</div>
<!-- Social/OAuth Logins -->
<div class="space-y-4 mb-8">
<button class="w-full flex items-center justify-center space-x-3 bg-surface-container hover:bg-surface-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] active:translate-y-0 text-on-surface font-label font-medium text-sm py-3 px-4 rounded-lg border border-outline-variant/20 shadow-sm relative group overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
<img alt="Google Logo" class="w-5 h-5 relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEaVzqV66Pru0wTiNgMuEzgE5u2B2f4nHxg1GV0ChZSvVPx5O3zLBjfXoA5CpJMoN7ukJbRwjRki1x7BshM6KxuZ1j9fgI2NG6WZFXLxp3nNRt18F_QpygEKSn4Y6smNBR4yQEGJhbbrIaPzLqllW8ZtfMZUjiYi6lLVOiBDTl8NMfKi8bkexJCLLVSO91dDREu70XzFbX50FuHoRw1TLkULa7tUHihe6LvxPBXqgCORC455f58Top3eNEdxPoIjRuMKi4J3Vrp9w"/>
<span class="relative z-10">Continue with Google</span>
</button>
<button class="w-full flex items-center justify-center space-x-3 bg-surface-container hover:bg-surface-bright transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_16px_rgba(0,0,0,0.2)] active:translate-y-0 text-on-surface font-label font-medium text-sm py-3 px-4 rounded-lg border border-outline-variant/20 shadow-sm relative group overflow-hidden">
<div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
<img alt="Microsoft Logo" class="w-5 h-5 relative z-10" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJiR3eJkjsp_qm9bxO98-L2DUYiXOxIf_e3GHh4LJBDlcBpk3ipSRblLxgv4PGFcm6Jh_sIhZnTHrmLDIejfvI2iJNvwea_KzH4Fig_FgSjkd5Ka7HvOVXMmrU4KS14iFm7wa0gwKSBjGyrwi4jziPnu-TSGGzpj2cqMgtAqKppUnGB9U_M5cpjj51AWVHs5r00304EgsO9PuVCw9hMq1Y7UXNqUVdjtLGT0Hj_bPjc6r6aml4WaqDqeb-OhwkuX7JencjExu21Ww"/>
<span class="relative z-10">Continue with Microsoft</span>
</button>
</div>
<!-- Divider -->
<div class="flex items-center space-x-4 mb-8">
<div class="flex-1 h-[1px] bg-outline-variant/20"></div>
<span class="font-label text-xs font-medium text-outline uppercase tracking-widest">Or use email</span>
<div class="flex-1 h-[1px] bg-outline-variant/20"></div>
</div>
<!-- Email Magic Link Form -->
<form class="space-y-5">
<div class="space-y-1.5">
<label class="block font-label text-xs font-medium text-on-surface-variant uppercase tracking-widest" for="email">Work Email</label>
<div class="relative group">
<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
<span class="material-symbols-outlined text-outline group-focus-within:text-primary transition-colors text-xl">mail</span>
</div>
<input class="w-full bg-surface-container-low text-on-surface font-body text-sm py-3 pl-10 pr-4 rounded-lg border border-outline-variant/30 focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_15px_rgba(17,101,231,0.4)] focus:outline-none transition-all placeholder-outline/50 shadow-sm" id="email" name="email" placeholder="name@company.com" required="" type="email"/>
</div>
</div>
<button class="w-full bg-gradient-to-r from-primary to-primary-container hover:from-primary-fixed-dim hover:to-primary text-on-primary font-headline font-bold text-sm py-3 px-4 rounded-lg shadow-[0_8px_16px_rgba(17,101,231,0.2)] hover:shadow-[0_8px_20px_rgba(17,101,231,0.3)] transition-all duration-200 relative overflow-hidden group" type="submit">
<div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
<span class="relative z-10 flex items-center justify-center space-x-2">
<span>Send Magic Link</span>
<span class="material-symbols-outlined text-lg" data-weight="fill" style="font-variation-settings: 'FILL' 1;">auto_awesome</span>
</span>
</button>
</form>
<!-- Guest Mode CTA -->
<div class="mt-8 pt-6 border-t border-outline-variant/20 text-center">
<a class="inline-flex items-center space-x-2 font-label text-sm text-on-surface-variant hover:text-primary transition-colors group" href="#">
<span>Continue without signing in</span>
<span class="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_right_alt</span>
</a>
</div>
</div>
<div class="mt-8 text-center px-4 animate-entrance opacity-0" style="animation-delay: 0.2s;">
<p class="font-label text-xs text-outline/60 leading-relaxed">
                    By continuing, you agree to the Sovereign Command <br/>
<a class="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4" href="#">Terms of Service</a> and 
                    <a class="text-on-surface-variant hover:text-primary transition-colors underline decoration-outline-variant/30 underline-offset-4" href="#">Privacy Policy</a>.
                </p>
</div>
</div>
</div>
</body></html>

<!-- Pipeline Workbench - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Pipeline Execution Workbench - Blostem AI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Manrope:wght@400;500;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#dae2fd",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "outline": "#8e90a2",
                        "surface-variant": "#2d3449",
                        "surface-container": "#171f33",
                        "on-secondary": "#003824",
                        "surface-container-high": "#222a3d",
                        "tertiary": "#b7c8e1",
                        "on-primary": "#002c70",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#b7c8e1",
                        "inverse-primary": "#0057cd",
                        "on-primary-fixed-variant": "#00419d",
                        "secondary": "#4edea3",
                        "on-tertiary": "#213145",
                        "on-secondary-container": "#00311f",
                        "on-tertiary-container": "#e9f0ff",
                        "on-primary-fixed": "#001946",
                        "outline-variant": "#434656",
                        "surface-tint": "#b1c5ff",
                        "primary-container": "#1165e7",
                        "secondary-fixed-dim": "#4edea3",
                        "secondary-container": "#00a572",
                        "on-primary-container": "#edefff",
                        "primary-fixed": "#dae2ff",
                        "primary-fixed-dim": "#b1c5ff",
                        "on-tertiary-fixed-variant": "#38485d",
                        "on-error": "#690005",
                        "inverse-on-surface": "#283044",
                        "surface-container-low": "#131b2e",
                        "tertiary-container": "#5e6e85",
                        "on-tertiary-fixed": "#0b1c30",
                        "surface-container-lowest": "#060e20",
                        "tertiary-fixed": "#d3e4fe",
                        "on-background": "#dae2fd",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "secondary-fixed": "#6ffbbe",
                        "on-surface-variant": "#c4c5d9",
                        "on-error-container": "#ffdad6",
                        "primary": "#b1c5ff",
                        "surface": "#0b1326",
                        "inverse-surface": "#dae2fd",
                        "on-secondary-fixed-variant": "#005236",
                        "surface-container-highest": "#2d3449",
                        "error-container": "#93000a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "fontFamily": {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    }
                }
            }
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; background-color: #0b1326; color: #dae2fd; }
        h1, h2, h3, h4, h5, h6, .font-headline { font-family: 'Manrope', sans-serif; }
        .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
        .ghost-border { border: 1px solid rgba(67, 70, 86, 0.15); }
        .ambient-shadow { box-shadow: 0 20px 40px rgba(6, 14, 32, 0.4); }
        
        /* Custom scrollbar for deep space feel */
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #060e20; }
        ::-webkit-scrollbar-thumb { background: #2d3449; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #434656; }

        /* Motion & Polish Enhancements */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            opacity: 0;
        }
        .delay-50 { animation-delay: 50ms; }
        .delay-100 { animation-delay: 100ms; }
        .delay-150 { animation-delay: 150ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-250 { animation-delay: 250ms; }
        .delay-300 { animation-delay: 300ms; }
        
        @keyframes softPulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.85; transform: scale(1.02); }
        }
        .animate-soft-pulse {
            animation: softPulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pipelineGlow {
            0%, 100% { box-shadow: 0 0 15px rgba(17,101,231,0.4), inset 0 0 0 rgba(255,255,255,0); }
            50% { box-shadow: 0 0 30px rgba(17,101,231,0.7), inset 0 0 8px rgba(255,255,255,0.2); }
        }
        .btn-pipeline {
            animation: pipelineGlow 3s infinite;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn-pipeline:hover {
            transform: translateY(-2px) scale(1.02);
            box-shadow: 0 0 40px rgba(17,101,231,0.8), inset 0 0 15px rgba(255,255,255,0.3) !important;
        }
        .btn-pipeline:active {
            transform: translateY(1px) scale(0.98);
        }

        @keyframes shimmer {
            100% { transform: translateX(100%); }
        }
        .animate-shimmer {
            animation: shimmer 2s infinite;
        }

        /* Haptic Hover Utility */
        .haptic-hover {
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .haptic-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 24px -8px rgba(0, 0, 0, 0.4);
        }
        .haptic-hover:active {
            transform: translateY(1px);
        }
    </style>
</head>
<body class="bg-background text-on-background flex h-screen overflow-hidden">
<!-- SideNavBar -->
<nav class="h-screen w-64 fixed left-0 top-0 flex flex-col border-r border-slate-800/20 bg-[#0b1326] bg-[#131b2e] tonal stacking flat no shadows z-50">
<div class="p-6 pb-2">
<div class="flex items-center gap-3 mb-8">
<img alt="Organization Logo" class="w-10 h-10 rounded-lg object-cover ring-2 ring-primary/20 animate-soft-pulse" data-alt="Abstract deep blue and luminous cyan glowing orb resembling an AI core or high-tech intelligence hub" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVRHGtPAXMfx1l6WYaWr_2s4xxsgvtIOJ5jURxaVMn03emK-SoAKSwzFTdjCaXK5zOhscOUKyPIaISU4-iUCBB2EZ36rrnHTdGvUIudSvjCpArO5eUUPTzyqT3CIdl_2r2HUAzgzbYC2OE-FTcEVmmTnzlic2Ok7pXqsUgPx7fPi279JY52XI955Yu-kssTJfX_dRtJArr5FIWF5AcJyHyq68_hsBl6MqdsHuXLcPhD6dyd9Euv6OU6WhCmkfA22Glo-72dLzW6NU"/>
<div>
<h1 class="text-lg font-bold text-slate-50 font-['Manrope'] tracking-tight">Sovereign Command</h1>
<p class="text-xs text-on-surface-variant font-['Inter'] tracking-wide">Operational Intelligence</p>
</div>
</div>
<button class="w-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-body font-semibold py-2.5 px-4 rounded-md shadow-[0_0_15px_rgba(17,101,231,0.3)] hover:shadow-[0_0_25px_rgba(17,101,231,0.5)] transition-all mb-6 flex items-center justify-center gap-2 haptic-hover">
<span class="material-symbols-outlined text-sm">rocket_launch</span>
                Upgrade Plan
            </button>
</div>
<div class="flex flex-col h-full py-6 px-4 space-y-2 overflow-y-auto">
<div class="space-y-1 mb-8">
<p class="px-4 text-[10px] uppercase tracking-widest text-on-surface-variant/60 font-headline font-bold mb-2">Core Operations</p>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]">dashboard</span>
<span>Dashboard</span>
</a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]">insights</span>
<span>Analytics</span>
</a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-[#171f33] text-[#2E5BFF] font-semibold border-l-4 border-[#2E5BFF] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]" data-weight="fill" style="font-variation-settings: 'FILL' 1;">account_tree</span>
<span>Pipeline</span>
</a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]">inventory_2</span>
<span>Inventory</span>
</a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]">group</span>
<span>Customers</span>
</a>
<a class="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] font-['Inter'] text-sm tracking-wide transition-opacity duration-150" href="#">
<span class="material-symbols-outlined text-[20px]">description</span>
<span>Reports</span>
</a>
</div>
</div>
<div class="p-4 mt-auto border-t border-slate-800/20">
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#2d3449] transition-colors font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined text-[18px]">help</span>
<span>Support</span>
</a>
<a class="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#2d3449] transition-colors font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined text-[18px]">settings</span>
<span>Settings</span>
</a>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="ml-64 flex-1 h-screen flex flex-col bg-surface overflow-hidden relative">
<!-- Atmospheric Top Glow -->
<div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary-container/10 to-transparent pointer-events-none"></div>
<!-- Top Header for Main Area -->
<header class="h-16 flex items-center justify-between px-8 bg-surface-container-low/80 backdrop-blur-md sticky top-0 z-40 border-b border-outline-variant/10">
<div class="flex items-center gap-4">
<h2 class="font-headline font-bold text-xl text-on-surface">Execution Workbench</h2>
<span class="bg-surface-container-high text-primary px-2.5 py-0.5 rounded text-xs font-body font-medium ghost-border">Blostem AI Environment</span>
</div>
<div class="flex items-center gap-4">
<button class="text-on-surface-variant hover:text-on-surface transition-colors">
<span class="material-symbols-outlined">search</span>
</button>
<div class="w-px h-5 bg-outline-variant/30"></div>
<button class="btn-pipeline bg-gradient-to-r from-primary to-primary-container text-on-primary font-body font-semibold py-1.5 px-4 rounded-md flex items-center gap-2 relative overflow-hidden group">
<div class="absolute inset-0 -translate-x-full group-hover:animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
<span class="material-symbols-outlined text-sm relative z-10">play_arrow</span>
<span class="relative z-10">Run Full Pipeline</span>
</button>
</div>
</header>
<!-- Two Column Layout -->
<div class="flex-1 flex overflow-hidden p-6 gap-6 max-w-[1600px] mx-auto w-full">
<!-- Left Column: Intake & List (Dense, 40% width) -->
<div class="w-[40%] flex flex-col gap-4 min-w-[400px]">
<!-- Intake Controls -->
<div class="bg-surface-container-low rounded-xl p-4 flex flex-col gap-4 animate-fade-in-up">
<div class="flex items-center justify-between">
<h3 class="font-headline font-semibold text-on-surface text-sm uppercase tracking-wider">Intake Vector</h3>
<button class="text-xs text-primary hover:text-primary-fixed transition-colors flex items-center gap-1 haptic-hover">
<span class="material-symbols-outlined text-[14px]">upload_file</span>
                            Bulk Upload
                        </button>
</div>
<div class="flex gap-2">
<div class="relative flex-1">
<span class="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
<input class="w-full bg-surface-container border border-outline-variant/20 rounded-md py-2 pl-9 pr-3 text-sm text-on-surface focus:border-primary focus:ring-1 focus:ring-surface-tint focus:outline-none transition-all placeholder:text-on-surface-variant/50" placeholder="Search prospects, domains..." type="text"/>
</div>
<button class="bg-surface-container-high border border-outline-variant/20 hover:bg-surface-bright text-on-surface px-3 rounded-md transition-colors flex items-center justify-center haptic-hover" title="Filter">
<span class="material-symbols-outlined text-sm">filter_list</span>
</button>
</div>
<button class="w-full py-2 border border-dashed border-outline-variant/40 rounded-md text-on-surface-variant hover:text-on-surface hover:border-outline-variant hover:bg-surface-container transition-all flex items-center justify-center gap-2 text-sm font-medium haptic-hover">
<span class="material-symbols-outlined text-sm">science</span>
                        Seed Demo Data
                    </button>
</div>
<!-- Prospect List -->
<div class="bg-surface-container-low rounded-xl flex-1 flex flex-col overflow-hidden relative animate-fade-in-up delay-50">
<div class="p-4 border-b border-outline-variant/10 flex items-center justify-between bg-surface-container-low/95 z-10 sticky top-0">
<div class="flex items-center gap-2">
<h3 class="font-headline font-semibold text-on-surface text-sm">Active Queue</h3>
<span class="bg-surface-container-highest text-on-surface-variant text-[10px] px-2 py-0.5 rounded-full animate-soft-pulse">142</span>
</div>
<div class="flex bg-surface-container rounded-md p-0.5 border border-outline-variant/10">
<button class="p-1 rounded bg-surface-variant text-primary shadow-sm transition-all haptic-hover"><span class="material-symbols-outlined text-sm block">view_list</span></button>
<button class="p-1 rounded text-on-surface-variant hover:text-on-surface transition-all haptic-hover"><span class="material-symbols-outlined text-sm block">grid_view</span></button>
</div>
</div>
<div class="flex-1 overflow-y-auto p-2 space-y-1">
<!-- Active Prospect Item -->
<div class="bg-surface-container-highest rounded-lg p-3 cursor-pointer border-l-2 border-primary ambient-shadow group animate-fade-in-up delay-100 haptic-hover">
<div class="flex justify-between items-start mb-2">
<div>
<h4 class="font-headline font-bold text-sm text-on-surface group-hover:text-primary transition-colors">Elena Rostova</h4>
<p class="font-body text-xs text-on-surface-variant">VP Engineering @ QuantumLogic</p>
</div>
<div class="bg-secondary-container/20 text-secondary-fixed px-1.5 py-0.5 rounded text-[10px] font-bold border border-secondary/20 flex items-center gap-1 animate-soft-pulse">
<div class="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    94
                                </div>
</div>
<div class="flex items-center gap-3 text-[11px] text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px] text-primary">psychology</span> Technical Buyer</span>
<span class="w-1 h-1 rounded-full bg-outline-variant/50"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">schedule</span> 2h ago</span>
</div>
</div>
<!-- Inactive Prospect Items -->
<div class="bg-surface-container rounded-lg p-3 cursor-pointer hover:bg-surface-container-high border border-transparent hover:border-outline-variant/20 transition-all animate-fade-in-up delay-150 haptic-hover">
<div class="flex justify-between items-start mb-2">
<div>
<h4 class="font-headline font-medium text-sm text-on-surface">Marcus Vance</h4>
<p class="font-body text-xs text-on-surface-variant">Director of IT @ Nexus Bank</p>
</div>
<div class="bg-tertiary-container/20 text-tertiary-fixed px-1.5 py-0.5 rounded text-[10px] font-bold border border-tertiary/20 flex items-center gap-1">
<div class="w-1.5 h-1.5 rounded-full bg-tertiary"></div>
                                    88
                                </div>
</div>
<div class="flex items-center gap-3 text-[11px] text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">gavel</span> Compliance Focus</span>
</div>
</div>
<div class="bg-surface-container rounded-lg p-3 cursor-pointer hover:bg-surface-container-high border border-transparent hover:border-outline-variant/20 transition-all animate-fade-in-up delay-200 haptic-hover">
<div class="flex justify-between items-start mb-2">
<div>
<h4 class="font-headline font-medium text-sm text-on-surface">Sarah Jenkins</h4>
<p class="font-body text-xs text-on-surface-variant">CTO @ DataStream</p>
</div>
<div class="bg-error-container/20 text-error px-1.5 py-0.5 rounded text-[10px] font-bold border border-error/20 flex items-center gap-1">
<div class="w-1.5 h-1.5 rounded-full bg-error"></div>
                                    42
                                </div>
</div>
<div class="flex items-center gap-3 text-[11px] text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[12px]">block</span> Low Intent</span>
</div>
</div>
</div>
</div>
</div>
<!-- Right Column: Detail View (Bento/Card layout, 60% width) -->
<div class="w-[60%] flex flex-col gap-4 overflow-y-auto pr-2 pb-8">
<!-- Detail Header -->
<div class="bg-surface-container-lowest rounded-xl p-6 ghost-border relative overflow-hidden animate-fade-in-up delay-100">
<div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 animate-soft-pulse"></div>
<div class="flex justify-between items-start relative z-10">
<div class="flex gap-4 items-center">
<div class="w-16 h-16 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/20 shadow-inner">
<span class="font-headline text-2xl font-bold text-primary">ER</span>
</div>
<div>
<div class="flex items-center gap-3 mb-1">
<h2 class="font-headline font-bold text-2xl text-on-surface tracking-tight">Elena Rostova</h2>
<span class="bg-secondary/10 text-secondary border border-secondary/20 px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 animate-soft-pulse">
<span class="material-symbols-outlined text-[12px]">verified_user</span>
                                        Safe to Send
                                    </span>
</div>
<div class="flex items-center gap-4 text-sm text-on-surface-variant">
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">work</span> VP Eng @ QuantumLogic</span>
<span class="w-1 h-1 rounded-full bg-outline-variant/50"></span>
<span class="flex items-center gap-1"><span class="material-symbols-outlined text-[16px]">location_on</span> San Francisco, CA</span>
</div>
</div>
</div>
<button class="bg-surface-container hover:bg-surface-container-high text-on-surface px-4 py-2 rounded-md font-body text-sm font-medium transition-colors ghost-border flex items-center gap-2 haptic-hover">
<span class="material-symbols-outlined text-[18px]">more_horiz</span>
                            Actions
                        </button>
</div>
</div>
<!-- Stages Grid -->
<div class="grid grid-cols-2 gap-4">
<!-- Scoring & Signals -->
<div class="bg-surface-container-low rounded-xl p-5 flex flex-col gap-4 animate-fade-in-up delay-150">
<h3 class="font-headline font-semibold text-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-tertiary">radar</span>
                            Signals &amp; Scoring
                        </h3>
<div class="flex items-end gap-4 mb-2">
<div class="text-5xl font-headline font-black text-on-surface tracking-tighter">94<span class="text-xl text-on-surface-variant/50">/100</span></div>
<div class="mb-2">
<div class="h-2 w-32 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-gradient-to-r from-secondary-container to-secondary w-[94%] relative overflow-hidden">
<div class="absolute inset-0 bg-white/20 -translate-x-full animate-shimmer"></div>
</div>
</div>
<p class="text-[10px] text-secondary mt-1 font-semibold animate-soft-pulse">Top 5% Intent Profile</p>
</div>
</div>
<div class="space-y-2 mt-auto">
<div class="flex justify-between items-center text-xs bg-surface-container p-2 rounded hover:bg-surface-container-high transition-colors">
<span class="text-on-surface-variant">Tech Stack Match</span>
<span class="text-on-surface font-medium">High (AWS, React)</span>
</div>
<div class="flex justify-between items-center text-xs bg-surface-container p-2 rounded hover:bg-surface-container-high transition-colors">
<span class="text-on-surface-variant">Recent Funding</span>
<span class="text-secondary font-medium">Series B ($40M)</span>
</div>
</div>
</div>
<!-- Persona Map -->
<div class="bg-surface-container-low rounded-xl p-5 flex flex-col gap-4 animate-fade-in-up delay-200">
<h3 class="font-headline font-semibold text-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-primary">hub</span>
                            Persona Synthesis
                        </h3>
<div class="flex flex-wrap gap-2">
<!-- 5 Persona Cards as requested -->
<div class="bg-surface-container-highest px-3 py-2 rounded-md border border-outline-variant/10 text-xs text-on-surface flex-1 min-w-[120px] hover:border-primary/30 transition-colors haptic-hover">
<div class="text-on-surface-variant text-[10px] uppercase mb-1">Archetype</div>
<div class="font-medium">Technical Decider</div>
</div>
<div class="bg-surface-container-highest px-3 py-2 rounded-md border border-outline-variant/10 text-xs text-on-surface flex-1 min-w-[120px] hover:border-error/30 transition-colors haptic-hover">
<div class="text-on-surface-variant text-[10px] uppercase mb-1">Pain Point</div>
<div class="font-medium text-error-container">Scale Bottlenecks</div>
</div>
<div class="bg-surface-container-highest px-3 py-2 rounded-md border border-outline-variant/10 text-xs text-on-surface flex-1 min-w-[120px] hover:border-primary/30 transition-colors haptic-hover">
<div class="text-on-surface-variant text-[10px] uppercase mb-1">Communication Style</div>
<div class="font-medium">Direct / Data-driven</div>
</div>
<div class="bg-surface-container-highest px-3 py-2 rounded-md border border-outline-variant/10 text-xs text-on-surface flex-1 min-w-[120px] hover:border-primary/30 transition-colors haptic-hover">
<div class="text-on-surface-variant text-[10px] uppercase mb-1">Objection Likely</div>
<div class="font-medium">Integration Time</div>
</div>
<div class="bg-surface-container-highest px-3 py-2 rounded-md border border-outline-variant/10 text-xs text-on-surface w-full hover:border-primary/50 transition-colors haptic-hover">
<div class="text-on-surface-variant text-[10px] uppercase mb-1">Value Prop Hook</div>
<div class="font-medium text-primary">"Automated infrastructure scaling without dedicated DevOps overhead."</div>
</div>
</div>
</div>
</div>
<!-- Outreach Studio -->
<div class="bg-surface-container-low rounded-xl flex flex-col mt-2 animate-fade-in-up delay-250">
<div class="p-4 border-b border-outline-variant/10 flex justify-between items-center">
<h3 class="font-headline font-semibold text-sm uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
<span class="material-symbols-outlined text-[16px] text-inverse-primary animate-soft-pulse">campaign</span>
                            Outreach Orchestration
                        </h3>
</div>
<!-- Tabs -->
<div class="flex px-4 pt-2 border-b border-outline-variant/10 bg-surface-container-lowest/50">
<button class="px-4 py-2 border-b-2 border-primary text-primary font-medium text-sm flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[16px]">mail</span> Email
                        </button>
<button class="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[16px]">connect_without_contact</span> LinkedIn
                        </button>
<button class="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[16px]">call</span> Call Script
                        </button>
<button class="px-4 py-2 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm flex items-center gap-2 transition-colors">
<span class="material-symbols-outlined text-[16px]">edit_note</span> Notes
                        </button>
</div>
<!-- Email Composer Body -->
<div class="p-4 flex flex-col gap-4">
<div class="bg-surface-container rounded-lg p-4 border border-outline-variant/20 font-body text-sm text-on-surface/90 leading-relaxed shadow-inner hover:border-primary/30 transition-colors">
<p class="mb-4">Subject: Accelerating Engineering Velocity at QuantumLogic</p>
<p class="mb-3">Hi Elena,</p>
<p class="mb-3">Noticed QuantumLogic's recent Series B raise to scale the engineering team—congratulations. As you expand, balancing feature delivery with infrastructure stability often becomes the primary bottleneck.</p>
<p class="mb-3">We help teams like yours automate infrastructure scaling without needing to hire dedicated DevOps headcount immediately. Our platform integrates directly with your existing AWS setup in under an hour.</p>
<p class="mb-3">Would you be open to a brief look at how this could fit into your H2 technical roadmap?</p>
<p>Best,<br/>Alex</p>
</div>
<div class="flex justify-between items-center mt-2">
<div class="flex gap-2">
<button class="bg-surface-container hover:bg-surface-bright p-2 rounded text-on-surface-variant transition-colors haptic-hover" title="Regenerate">
<span class="material-symbols-outlined text-[18px]">cycle</span>
</button>
<button class="bg-surface-container hover:bg-surface-bright p-2 rounded text-on-surface-variant transition-colors haptic-hover" title="Adjust Tone">
<span class="material-symbols-outlined text-[18px]">tune</span>
</button>
</div>
<div class="flex items-center gap-3">
<span class="text-xs text-on-surface-variant flex items-center gap-1 animate-soft-pulse">
<span class="material-symbols-outlined text-[14px] text-primary">psychology</span> AI Drafted
                                </span>
<button class="bg-primary text-on-primary font-body font-semibold py-2 px-6 rounded-md hover:bg-primary-fixed transition-colors flex items-center gap-2 haptic-hover">
<span class="material-symbols-outlined text-[18px]">send</span>
                                    Queue Email
                                </button>
</div>
</div>
</div>
</div>
<!-- Next Action Banner -->
<div class="bg-surface-container-high border border-primary/20 rounded-xl p-4 flex items-center justify-between mt-2 shadow-[0_0_20px_rgba(17,101,231,0.05)] animate-fade-in-up delay-300 hover:border-primary/40 transition-colors group cursor-pointer haptic-hover">
<div class="flex items-center gap-4">
<div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors animate-soft-pulse">
<span class="material-symbols-outlined">fast_forward</span>
</div>
<div>
<p class="text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Next Recommended Action</p>
<p class="font-headline font-bold text-on-surface text-sm">Review &amp; Approve Outreach Sequence</p>
</div>
</div>
<button class="text-primary group-hover:text-primary-fixed text-sm font-medium flex items-center gap-1 transition-colors group-hover:translate-x-1 duration-300">
                        Execute <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
</button>
</div>
</div>
</div>
</main>
</body></html>

<!-- Analytics - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Sovereign SaaS - Analytics</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    colors: {
                        "on-surface": "#dae2fd",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "outline": "#8e90a2",
                        "surface-variant": "#2d3449",
                        "surface-container": "#171f33",
                        "on-secondary": "#003824",
                        "surface-container-high": "#222a3d",
                        "tertiary": "#b7c8e1",
                        "on-primary": "#002c70",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#b7c8e1",
                        "inverse-primary": "#0057cd",
                        "on-primary-fixed-variant": "#00419d",
                        "secondary": "#4edea3",
                        "on-tertiary": "#213145",
                        "on-secondary-container": "#00311f",
                        "on-tertiary-container": "#e9f0ff",
                        "on-primary-fixed": "#001946",
                        "outline-variant": "#434656",
                        "surface-tint": "#b1c5ff",
                        "primary-container": "#1165e7",
                        "secondary-fixed-dim": "#4edea3",
                        "secondary-container": "#00a572",
                        "on-primary-container": "#edefff",
                        "primary-fixed": "#dae2ff",
                        "primary-fixed-dim": "#b1c5ff",
                        "on-tertiary-fixed-variant": "#38485d",
                        "on-error": "#690005",
                        "inverse-on-surface": "#283044",
                        "surface-container-low": "#131b2e",
                        "tertiary-container": "#5e6e85",
                        "on-tertiary-fixed": "#0b1c30",
                        "surface-container-lowest": "#060e20",
                        "tertiary-fixed": "#d3e4fe",
                        "on-background": "#dae2fd",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "secondary-fixed": "#6ffbbe",
                        "on-surface-variant": "#c4c5d9",
                        "on-error-container": "#ffdad6",
                        "primary": "#b1c5ff",
                        "surface": "#0b1326",
                        "inverse-surface": "#dae2fd",
                        "on-secondary-fixed-variant": "#005236",
                        "surface-container-highest": "#2d3449",
                        "error-container": "#93000a"
                    },
                    borderRadius: {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    spacing: {},
                    fontFamily: {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    },
                    keyframes: {
                        fadeInUp: {
                            '0%': { opacity: '0', transform: 'translateY(24px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' }
                        },
                        revealBar: {
                            '0%': { transform: 'scaleX(0)' },
                            '100%': { transform: 'scaleX(1)' }
                        }
                    },
                    animation: {
                        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'reveal-bar': 'revealBar 1s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                    }
                },
            },
        }
    </script>
<style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #0b1326;
            color: #dae2fd;
        }
        h1, h2, h3, h4, h5, h6 {
            font-family: 'Manrope', sans-serif;
        }
        .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
    </style>
</head>
<body class="bg-surface text-on-surface flex h-screen overflow-hidden">
<!-- SideNavBar -->
<nav class="h-screen w-64 fixed left-0 top-0 flex flex-col border-r border-slate-800/20 bg-[#0b1326] hidden md:flex z-40">
<div class="p-6">
<div class="flex items-center gap-3 mb-8 hover:scale-105 transition-transform duration-300 cursor-pointer">
<div class="w-8 h-8 rounded bg-primary-container flex items-center justify-center text-on-primary font-bold shadow-[0_0_15px_rgba(17,101,231,0.4)]">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">hexagon</span>
</div>
<div>
<div class="text-lg font-bold text-slate-50 font-['Manrope']">Sovereign Command</div>
<div class="text-xs text-on-surface-variant">Operational Intelligence</div>
</div>
</div>
</div>
<div class="flex flex-col h-full py-6 px-4 space-y-2 overflow-y-auto">
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] hover:bg-[#2d3449] transition-colors Click: transition-opacity duration-150 font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg bg-[#171f33] text-[#2E5BFF] font-semibold border-l-4 border-[#2E5BFF] hover:bg-[#2d3449] transition-all duration-300 font-['Inter'] text-sm tracking-wide shadow-[inset_4px_0_0_#2E5BFF,0_0_10px_rgba(46,91,255,0.1)]" href="#">
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">insights</span>
                Analytics
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] hover:bg-[#2d3449] transition-colors Click: transition-opacity duration-150 font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined">account_tree</span>
                Pipeline
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] hover:bg-[#2d3449] transition-colors Click: transition-opacity duration-150 font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined">inventory_2</span>
                Inventory
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] hover:bg-[#2d3449] transition-colors Click: transition-opacity duration-150 font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined">group</span>
                Customers
            </a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] hover:bg-[#2d3449] transition-colors Click: transition-opacity duration-150 font-['Inter'] text-sm tracking-wide" href="#">
<span class="material-symbols-outlined">description</span>
                Reports
            </a>
</div>
<div class="p-4 mt-auto">
<button class="w-full py-2 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-md font-medium text-sm hover:opacity-90 hover:shadow-[0_0_20px_rgba(17,101,231,0.5)] transition-all duration-300 mb-4">
                Upgrade Plan
            </button>
<div class="space-y-1">
<a class="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] rounded-lg text-sm transition-colors duration-200" href="#">
<span class="material-symbols-outlined">help</span> Support
                </a>
<a class="flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-slate-200 hover:bg-[#131b2e] rounded-lg text-sm transition-colors duration-200" href="#">
<span class="material-symbols-outlined">settings</span> Settings
                </a>
</div>
</div>
</nav>
<!-- TopNavBar (Mobile) -->
<header class="md:hidden fixed top-0 w-full z-50 bg-[#0b1326]/80 backdrop-blur-md flex justify-between items-center px-6 py-3 max-w-screen-2xl mx-auto shadow-[0_20px_40px_rgba(6,14,32,0.4)]">
<div class="text-xl font-black text-slate-100 font-['Manrope'] tracking-tight">Sovereign SaaS</div>
<div class="flex items-center gap-4">
<span class="material-symbols-outlined text-slate-400">notifications</span>
<span class="material-symbols-outlined text-slate-400">settings</span>
</div>
</header>
<!-- Main Content Canvas -->
<main class="flex-1 ml-0 md:ml-64 pt-16 md:pt-0 overflow-y-auto bg-surface relative">
<!-- Header / Filters -->
<div class="sticky top-0 z-30 bg-surface/90 backdrop-blur-sm border-b border-outline-variant/10 px-8 py-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
<div class="opacity-0 animate-fade-in-up">
<h1 class="font-headline text-3xl font-bold text-on-surface tracking-tight">Executive Analytics</h1>
<p class="font-body text-sm text-on-surface-variant mt-1">Blostem AI Performance Overview</p>
</div>
<div class="flex flex-wrap gap-3 opacity-0 animate-fade-in-up [animation-delay:100ms]">
<div class="bg-surface-container-low border border-outline-variant/20 rounded-md px-3 py-2 flex items-center gap-2 text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">
<span class="material-symbols-outlined text-[18px]">calendar_today</span>
<span>Q3 2024</span>
<span class="material-symbols-outlined text-[18px]">arrow_drop_down</span>
</div>
<div class="bg-surface-container-low border border-outline-variant/20 rounded-md px-3 py-2 flex items-center gap-2 text-sm text-on-surface-variant hover:bg-surface-container-high transition-colors cursor-pointer">
<span class="material-symbols-outlined text-[18px]">filter_list</span>
<span>All Regions</span>
<span class="material-symbols-outlined text-[18px]">arrow_drop_down</span>
</div>
<button class="bg-primary/10 text-primary border border-primary/20 rounded-md px-4 py-2 text-sm font-medium hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(177,197,255,0.2)] transition-all duration-300 flex items-center gap-2">
<span class="material-symbols-outlined text-[18px]">download</span>
                    Export Report
                </button>
</div>
</div>
<div class="p-8 max-w-[1600px] mx-auto space-y-8">
<!-- Summary Cards -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1 -->
<div class="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group opacity-0 animate-fade-in-up hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
<span class="material-symbols-outlined text-6xl text-primary">monitoring</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Total Pipeline Value</p>
<h3 class="font-headline text-3xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">$24.5M</h3>
<div class="flex items-center gap-2 mt-4 text-sm">
<span class="text-secondary flex items-center bg-secondary/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(78,222,163,0.15)]">
<span class="material-symbols-outlined text-[14px]">trending_up</span> +12.4%
                        </span>
<span class="text-on-surface-variant/60">vs last quarter</span>
</div>
</div>
<!-- Card 2 -->
<div class="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group opacity-0 animate-fade-in-up [animation-delay:100ms] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
<span class="material-symbols-outlined text-6xl text-primary">fact_check</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Avg Approval Rate</p>
<h3 class="font-headline text-3xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">68.2%</h3>
<div class="flex items-center gap-2 mt-4 text-sm">
<span class="text-secondary flex items-center bg-secondary/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(78,222,163,0.15)]">
<span class="material-symbols-outlined text-[14px]">trending_up</span> +3.1%
                        </span>
<span class="text-on-surface-variant/60">vs last quarter</span>
</div>
</div>
<!-- Card 3 -->
<div class="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group opacity-0 animate-fade-in-up [animation-delay:200ms] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500">
<span class="material-symbols-outlined text-6xl text-primary">hourglass_empty</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-on-surface-variant mb-2">Time to Close</p>
<h3 class="font-headline text-3xl font-bold text-on-surface group-hover:text-primary transition-colors duration-300">18 Days</h3>
<div class="flex items-center gap-2 mt-4 text-sm">
<span class="text-secondary flex items-center bg-secondary/10 px-1.5 py-0.5 rounded shadow-[0_0_10px_rgba(78,222,163,0.15)]">
<span class="material-symbols-outlined text-[14px]">trending_down</span> -2 Days
                        </span>
<span class="text-on-surface-variant/60">vs last quarter</span>
</div>
</div>
<!-- Card 4 -->
<div class="bg-gradient-to-br from-surface-container to-surface-container-high p-6 rounded-xl relative overflow-hidden group border border-primary/20 opacity-0 animate-fade-in-up [animation-delay:300ms] shadow-[0_0_20px_rgba(177,197,255,0.1)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(177,197,255,0.25)] transition-all duration-300">
<div class="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">
<span class="material-symbols-outlined text-6xl text-primary">lightbulb</span>
</div>
<p class="font-label text-xs uppercase tracking-widest text-primary mb-2">AI Insights</p>
<h3 class="font-headline text-xl font-bold text-on-surface mt-2 leading-tight">Enterprise segment conversion predicted to rise 15% next month.</h3>
<div class="mt-4">
<button class="text-xs font-semibold text-primary hover:text-primary-container flex items-center gap-1 transition-colors group/btn">
                            View Analysis <span class="material-symbols-outlined text-[14px] group-hover/btn:translate-x-1 transition-transform duration-300">arrow_forward</span>
</button>
</div>
</div>
</div>
<!-- Bento Grid: Charts & Lists -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Main Chart Area -->
<div class="lg:col-span-2 bg-surface-container-low rounded-xl p-6 flex flex-col opacity-0 animate-fade-in-up [animation-delay:400ms] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300">
<div class="flex justify-between items-center mb-6">
<h2 class="font-headline text-xl font-bold text-on-surface">Pipeline Conversion Funnel</h2>
<div class="flex gap-2">
<button class="px-3 py-1 text-xs font-medium rounded bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors">Vol</button>
<button class="px-3 py-1 text-xs font-medium rounded bg-primary/20 text-primary border border-primary/30 hover:shadow-[0_0_10px_rgba(177,197,255,0.3)] transition-shadow duration-300">Value</button>
</div>
</div>
<div class="flex-1 bg-surface-container-lowest rounded-lg border border-outline-variant/10 p-4 flex flex-col justify-center gap-4 relative min-h-[300px]">
<!-- Abstract Funnel Visualization -->
<div class="w-full flex justify-between items-center px-4 group">
<div class="w-1/4 text-right pr-4 border-r border-outline-variant/20 transition-colors duration-300 group-hover:border-primary/50">
<div class="text-sm text-on-surface-variant">Leads</div>
<div class="font-bold text-lg group-hover:text-primary transition-colors duration-300">12,450</div>
</div>
<div class="w-3/4 h-12 bg-surface-container rounded-r-full relative overflow-hidden">
<div class="absolute left-0 top-0 h-full bg-surface-variant w-full origin-left animate-reveal-bar [animation-delay:600ms]"></div>
</div>
</div>
<div class="w-full flex justify-between items-center px-4 group">
<div class="w-1/4 text-right pr-4 border-r border-outline-variant/20 transition-colors duration-300 group-hover:border-primary/50">
<div class="text-sm text-on-surface-variant">Qualified</div>
<div class="font-bold text-lg group-hover:text-primary transition-colors duration-300">8,200</div>
</div>
<div class="w-3/4 h-12 flex items-center">
<div class="h-12 bg-surface-container rounded-r-full relative overflow-hidden w-[65%] ml-auto group-hover:shadow-[0_0_15px_rgba(177,197,255,0.2)] transition-shadow duration-300">
<div class="absolute left-0 top-0 h-full bg-primary/30 w-full origin-left animate-reveal-bar [animation-delay:800ms]"></div>
</div>
<div class="text-xs text-primary ml-2 font-mono opacity-0 animate-fade-in-up [animation-delay:1200ms]">65%</div>
</div>
</div>
<div class="w-full flex justify-between items-center px-4 group">
<div class="w-1/4 text-right pr-4 border-r border-outline-variant/20 transition-colors duration-300 group-hover:border-primary/50">
<div class="text-sm text-on-surface-variant">Proposals</div>
<div class="font-bold text-lg group-hover:text-primary transition-colors duration-300">3,150</div>
</div>
<div class="w-3/4 h-12 flex items-center">
<div class="h-12 bg-surface-container rounded-r-full relative overflow-hidden w-[38%] ml-auto group-hover:shadow-[0_0_15px_rgba(177,197,255,0.3)] transition-shadow duration-300">
<div class="absolute left-0 top-0 h-full bg-primary/60 w-full origin-left animate-reveal-bar [animation-delay:1000ms]"></div>
</div>
<div class="text-xs text-primary ml-2 font-mono opacity-0 animate-fade-in-up [animation-delay:1400ms]">38%</div>
</div>
</div>
<div class="w-full flex justify-between items-center px-4 group">
<div class="w-1/4 text-right pr-4 border-r border-outline-variant/20 transition-colors duration-300 group-hover:border-secondary/50">
<div class="text-sm text-on-surface-variant text-secondary">Closed Won</div>
<div class="font-bold text-lg text-secondary drop-shadow-[0_0_8px_rgba(78,222,163,0.5)]">1,200</div>
</div>
<div class="w-3/4 h-12 flex items-center">
<div class="h-12 bg-surface-container rounded-r-full relative overflow-hidden w-[15%] ml-auto shadow-[0_0_15px_rgba(78,222,163,0.3)] group-hover:shadow-[0_0_25px_rgba(78,222,163,0.6)] transition-shadow duration-300">
<div class="absolute left-0 top-0 h-full bg-secondary w-full origin-left animate-reveal-bar [animation-delay:1200ms]"></div>
</div>
<div class="text-xs text-secondary ml-2 font-mono opacity-0 animate-fade-in-up [animation-delay:1600ms]">15%</div>
</div>
</div>
</div>
</div>
<!-- Leaderboard -->
<div class="bg-surface-container-low rounded-xl p-6 flex flex-col opacity-0 animate-fade-in-up [animation-delay:500ms] hover:shadow-[0_8px_30px_rgba(0,0,0,0.2)] transition-shadow duration-300">
<div class="flex justify-between items-center mb-6">
<h2 class="font-headline text-xl font-bold text-on-surface">Top Prospects</h2>
<span class="material-symbols-outlined text-on-surface-variant hover:text-primary cursor-pointer transition-colors duration-300 hover:rotate-90">more_horiz</span>
</div>
<div class="flex-1 flex flex-col gap-1">
<!-- List Item 1 -->
<div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-all duration-300 cursor-pointer group opacity-0 animate-fade-in-up [animation-delay:600ms] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-x-1">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(177,197,255,0.2)] transition-all duration-300">
                                    AC
                                </div>
<div>
<div class="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors duration-300">Acme Corp</div>
<div class="text-xs text-on-surface-variant">Enterprise \u2022 Healthcare</div>
</div>
</div>
<div class="text-right">
<div class="font-bold text-sm text-on-surface group-hover:scale-105 transition-transform origin-right duration-300">$1.2M</div>
<div class="text-xs text-secondary bg-secondary/10 px-1 rounded inline-block mt-0.5 group-hover:shadow-[0_0_8px_rgba(78,222,163,0.2)] transition-shadow duration-300">92% Score</div>
</div>
</div>
<!-- List Item 2 -->
<div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-all duration-300 cursor-pointer group opacity-0 animate-fade-in-up [animation-delay:700ms] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-x-1">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(177,197,255,0.2)] transition-all duration-300">
                                    GT
                                </div>
<div>
<div class="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors duration-300">Global Tech</div>
<div class="text-xs text-on-surface-variant">Mid-Market \u2022 SaaS</div>
</div>
</div>
<div class="text-right">
<div class="font-bold text-sm text-on-surface group-hover:scale-105 transition-transform origin-right duration-300">$850K</div>
<div class="text-xs text-secondary bg-secondary/10 px-1 rounded inline-block mt-0.5 group-hover:shadow-[0_0_8px_rgba(78,222,163,0.2)] transition-shadow duration-300">88% Score</div>
</div>
</div>
<!-- List Item 3 -->
<div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-all duration-300 cursor-pointer group opacity-0 animate-fade-in-up [animation-delay:800ms] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-x-1">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(177,197,255,0.2)] transition-all duration-300">
                                    NX
                                </div>
<div>
<div class="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors duration-300">Nexus Ind.</div>
<div class="text-xs text-on-surface-variant">Enterprise \u2022 Mfg</div>
</div>
</div>
<div class="text-right">
<div class="font-bold text-sm text-on-surface group-hover:scale-105 transition-transform origin-right duration-300">$2.4M</div>
<div class="text-xs text-secondary bg-secondary/10 px-1 rounded inline-block mt-0.5 group-hover:shadow-[0_0_8px_rgba(78,222,163,0.2)] transition-shadow duration-300">85% Score</div>
</div>
</div>
<!-- List Item 4 -->
<div class="flex items-center justify-between p-3 rounded-lg hover:bg-surface-container-highest transition-all duration-300 cursor-pointer group opacity-0 animate-fade-in-up [animation-delay:900ms] hover:shadow-[0_4px_15px_rgba(0,0,0,0.2)] hover:-translate-x-1">
<div class="flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-sm border border-outline-variant/20 group-hover:border-primary/50 group-hover:shadow-[0_0_10px_rgba(177,197,255,0.2)] transition-all duration-300">
                                    VL
                                </div>
<div>
<div class="font-semibold text-sm text-on-surface group-hover:text-primary transition-colors duration-300">Vanguard Log.</div>
<div class="text-xs text-on-surface-variant">Mid-Market \u2022 Supply</div>
</div>
</div>
<div class="text-right">
<div class="font-bold text-sm text-on-surface group-hover:scale-105 transition-transform origin-right duration-300">$420K</div>
<div class="text-xs text-tertiary bg-tertiary/10 px-1 rounded inline-block mt-0.5 group-hover:shadow-[0_0_8px_rgba(183,200,225,0.2)] transition-shadow duration-300">76% Score</div>
</div>
</div>
</div>
<button class="mt-4 w-full py-2 text-sm text-primary hover:bg-primary/5 rounded transition-all duration-300 font-medium hover:tracking-wide">View All Prospects</button>
</div>
</div>
</div>
<!-- Footer -->
<footer class="w-full border-t border-slate-800/30 py-12 bg-[#0b1326] mt-12 opacity-0 animate-fade-in-up [animation-delay:1000ms]">
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
<div class="text-base font-bold text-slate-400 font-['Inter'] text-xs uppercase tracking-widest">
                    \u00a9 2024 Sovereign Command. All rights reserved.
                </div>
<div class="flex gap-6">
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Privacy Policy</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Terms of Service</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Security</a>
<a class="font-['Inter'] text-xs uppercase tracking-widest text-slate-500 hover:text-slate-300 hover:underline transition-all" href="#">Status</a>
</div>
</div>
</footer>
</main>
</body></html>

<!-- Export Center - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Export Center - Blostem AI</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Manrope:wght@600;700;800&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
          darkMode: "class",
          theme: {
            extend: {
              keyframes: {
                'fade-in-up': {
                  '0%': { opacity: '0', transform: 'translateY(24px)' },
                  '100%': { opacity: '1', transform: 'translateY(0)' },
                }
              },
              animation: {
                'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              },
              "colors": {
                      "on-surface": "#dae2fd",
                      "background": "#0b1326",
                      "on-secondary-fixed": "#002113",
                      "outline": "#8e90a2",
                      "surface-variant": "#2d3449",
                      "surface-container": "#171f33",
                      "on-secondary": "#003824",
                      "surface-container-high": "#222a3d",
                      "tertiary": "#b7c8e1",
                      "on-primary": "#002c70",
                      "error": "#ffb4ab",
                      "tertiary-fixed-dim": "#b7c8e1",
                      "inverse-primary": "#0057cd",
                      "on-primary-fixed-variant": "#00419d",
                      "secondary": "#4edea3",
                      "on-tertiary": "#213145",
                      "on-secondary-container": "#00311f",
                      "on-tertiary-container": "#e9f0ff",
                      "on-primary-fixed": "#001946",
                      "outline-variant": "#434656",
                      "surface-tint": "#b1c5ff",
                      "primary-container": "#1165e7",
                      "secondary-fixed-dim": "#4edea3",
                      "secondary-container": "#00a572",
                      "on-primary-container": "#edefff",
                      "primary-fixed": "#dae2ff",
                      "primary-fixed-dim": "#b1c5ff",
                      "on-tertiary-fixed-variant": "#38485d",
                      "on-error": "#690005",
                      "inverse-on-surface": "#283044",
                      "surface-container-low": "#131b2e",
                      "tertiary-container": "#5e6e85",
                      "on-tertiary-fixed": "#0b1c30",
                      "surface-container-lowest": "#060e20",
                      "tertiary-fixed": "#d3e4fe",
                      "on-background": "#dae2fd",
                      "surface-dim": "#0b1326",
                      "surface-bright": "#31394d",
                      "secondary-fixed": "#6ffbbe",
                      "on-surface-variant": "#c4c5d9",
                      "on-error-container": "#ffdad6",
                      "primary": "#b1c5ff",
                      "surface": "#0b1326",
                      "inverse-surface": "#dae2fd",
                      "on-secondary-fixed-variant": "#005236",
                      "surface-container-highest": "#2d3449",
                      "error-container": "#93000a"
              },
              "borderRadius": {
                      "DEFAULT": "0.125rem",
                      "lg": "0.25rem",
                      "xl": "0.5rem",
                      "full": "0.75rem"
              },
              "fontFamily": {
                      "headline": ["Manrope"],
                      "body": ["Inter"],
                      "label": ["Inter"]
              }
            }
          }
        }
      </script>
<style>
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
      </style>
</head>
<body class="bg-[#060b14] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0f182b] via-[#060b14] to-[#04070d] text-on-surface font-body min-h-screen flex flex-col antialiased selection:bg-primary-container selection:text-on-primary-container">
<!-- TopNavBar -->
<header class="fixed top-0 w-full z-50 bg-[#0b1326]/60 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
<div class="flex justify-between items-center w-full px-6 py-3 max-w-screen-2xl mx-auto">
<div class="flex items-center gap-8">
<a class="text-xl font-black text-slate-100 font-headline tracking-tight" href="#">Sovereign SaaS</a>
<div class="hidden md:flex items-center bg-surface-container-low/50 rounded-full px-4 py-1.5 border border-outline-variant/30 focus-within:border-primary focus-within:ring-1 focus-within:ring-surface-tint/50 transition-all">
<span class="material-symbols-outlined text-outline text-sm mr-2" data-icon="search">search</span>
<input class="bg-transparent border-none outline-none text-sm font-label text-on-surface placeholder-outline w-64" placeholder="Search operations..." type="text"/>
</div>
</div>
<nav class="hidden md:flex items-center gap-6">
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 px-3 py-1.5 rounded-lg text-sm" href="#">Product</a>
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 px-3 py-1.5 rounded-lg text-sm" href="#">Solutions</a>
<a class="text-slate-400 font-medium hover:text-slate-200 hover:bg-slate-800/50 transition-all duration-200 px-3 py-1.5 rounded-lg text-sm" href="#">Pricing</a>
<a class="text-[#2E5BFF] font-bold border-b-2 border-[#2E5BFF] pb-1 px-3 py-1.5 text-sm" href="#">Resources</a>
</nav>
<div class="flex items-center gap-4">
<button class="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container/50">
<span class="material-symbols-outlined" data-icon="notifications">notifications</span>
</button>
<button class="text-outline hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container/50">
<span class="material-symbols-outlined" data-icon="settings">settings</span>
</button>
<a class="text-sm font-semibold bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2 rounded-md hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]" href="#">Sign In</a>
</div>
</div>
</header>
<div class="flex flex-1 pt-16 relative z-10">
<!-- SideNavBar -->
<aside class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-white/[0.05] bg-[#0b1326]/40 backdrop-blur-xl pt-16 z-40">
<div class="flex flex-col h-full py-6 px-4 space-y-2">
<div class="mb-8 px-2">
<h2 class="text-lg font-bold text-slate-50 font-['Manrope'] tracking-tight">Sovereign Command</h2>
<p class="text-xs text-outline mt-1 font-label">Operational Intelligence</p>
</div>
<nav class="flex-1 space-y-1">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors" data-icon="dashboard">dashboard</span>
<span class="font-label text-sm font-medium">Dashboard</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors" data-icon="insights">insights</span>
<span class="font-label text-sm font-medium">Analytics</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors" data-icon="account_tree">account_tree</span>
<span class="font-label text-sm font-medium">Pipeline</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors" data-icon="inventory_2">inventory_2</span>
<span class="font-label text-sm font-medium">Inventory</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors group" href="#">
<span class="material-symbols-outlined text-[20px] group-hover:text-primary transition-colors" data-icon="group">group</span>
<span class="font-label text-sm font-medium">Customers</span>
</a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-r-lg bg-primary/10 text-primary font-semibold border-l-4 border-primary" href="#">
<span class="material-symbols-outlined text-[20px]" data-icon="description">description</span>
<span class="font-label text-sm">Reports</span>
</a>
</nav>
<div class="mt-auto space-y-4 pt-6 border-t border-white/[0.05]">
<button class="w-full text-sm font-semibold bg-gradient-to-r from-primary to-primary-container text-on-primary px-4 py-2.5 rounded-md hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]">Upgrade Plan</button>
<div class="space-y-1">
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="help">help</span>
<span class="font-label text-xs">Support</span>
</a>
<a class="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/[0.03] transition-colors" href="#">
<span class="material-symbols-outlined text-[18px]" data-icon="settings">settings</span>
<span class="font-label text-xs">Settings</span>
</a>
</div>
</div>
</div>
</aside>
<!-- Main Content -->
<main class="flex-1 md:ml-64 p-6 lg:p-12 max-w-7xl mx-auto w-full opacity-0 animate-fade-in-up" style="animation-delay: 0.05s;">
<!-- Page Header -->
<div class="mb-12">
<div class="inline-flex items-center gap-2 px-3 py-1 bg-surface-container-low/50 backdrop-blur-md rounded-full border border-outline-variant/20 mb-4 shadow-lg shadow-black/20">
<span class="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span class="text-xs font-label text-on-surface-variant uppercase tracking-wider">Blostem AI Synthesis Complete</span>
</div>
<h1 class="text-4xl lg:text-5xl font-headline font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-on-surface to-outline tracking-tight mb-4 drop-shadow-sm">Export Center</h1>
<p class="text-outline text-lg max-w-2xl font-body leading-relaxed">Your data has been processed and structured. Select a format below to extract your insights into your operational workflows.</p>
</div>
<!-- Export Cards Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
<!-- Card 1: XLSX All -->
<div class="group relative bg-surface-container-low/60 backdrop-blur-sm rounded-xl p-8 hover:bg-surface-container/80 transition-all duration-500 border border-outline-variant/10 hover:border-outline-variant/30 overflow-hidden flex flex-col shadow-xl shadow-black/20 opacity-0 animate-fade-in-up hover:-translate-y-1" style="animation-delay: 0.1s;">
<div class="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary/20 transition-colors duration-700"></div>
<div class="flex items-start justify-between mb-6 relative z-10">
<div class="w-14 h-14 rounded-lg bg-surface-container-highest/80 flex items-center justify-center border border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
<span class="material-symbols-outlined text-3xl text-secondary" data-icon="table_chart">table_chart</span>
</div>
<span class="text-xs font-label font-semibold tracking-wider text-outline px-3 py-1 bg-surface/50 backdrop-blur-md rounded-full border border-white/5">.XLSX</span>
</div>
<h3 class="text-2xl font-headline font-bold text-white mb-2 relative z-10">Complete Dataset</h3>
<p class="text-slate-400 text-sm font-body mb-6 flex-1 relative z-10">Export the entire unedited dataset, including all raw fields, preliminary flags, and unverified entries generated by Blostem AI.</p>
<div class="bg-surface-container-lowest/50 backdrop-blur-md p-4 rounded-lg mb-8 border border-white/5 relative z-10">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-primary text-[18px]" data-icon="info">info</span>
<span class="text-xs font-label font-semibold text-primary uppercase tracking-wider">Why it matters</span>
</div>
<p class="text-sm text-slate-300 font-body">Crucial for deep compliance audits and historical record-keeping. Contains full data lineage before human intervention.</p>
</div>
<button class="w-full mt-auto flex items-center justify-center gap-2 bg-surface-variant/80 backdrop-blur-sm text-white hover:bg-surface-bright transition-all duration-300 ease-out py-3 rounded-lg border border-white/10 font-label font-medium group/btn relative z-10 hover:shadow-lg hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] group-hover/btn:-translate-y-0.5 transition-transform" data-icon="download">download</span>
                        Download Full Archive
                    </button>
</div>
<!-- Card 2: XLSX Approved -->
<div class="group relative bg-surface-container-low/60 backdrop-blur-sm rounded-xl p-8 hover:bg-surface-container/80 transition-all duration-500 border border-outline-variant/10 hover:border-outline-variant/30 overflow-hidden flex flex-col shadow-xl shadow-black/20 opacity-0 animate-fade-in-up hover:-translate-y-1" style="animation-delay: 0.2s;">
<div class="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
<div class="flex items-start justify-between mb-6 relative z-10">
<div class="w-14 h-14 rounded-lg bg-surface-container-highest/80 flex items-center justify-center border border-primary/30 shadow-[0_10px_30px_rgba(17,101,231,0.2)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
<span class="material-symbols-outlined text-3xl text-primary drop-shadow-[0_0_8px_rgba(17,101,231,0.5)]" data-icon="verified">verified</span>
</div>
<span class="text-xs font-label font-semibold tracking-wider text-outline px-3 py-1 bg-surface/50 backdrop-blur-md rounded-full border border-white/5">.XLSX</span>
</div>
<h3 class="text-2xl font-headline font-bold text-white mb-2 relative z-10">Approved Entries</h3>
<p class="text-slate-400 text-sm font-body mb-6 flex-1 relative z-10">A sanitized export containing only records that have passed validation rules or received manual approval.</p>
<div class="bg-surface-container-lowest/50 backdrop-blur-md p-4 rounded-lg mb-8 border border-white/5 relative z-10">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-secondary text-[18px]" data-icon="bolt">bolt</span>
<span class="text-xs font-label font-semibold text-secondary uppercase tracking-wider">Why it matters</span>
</div>
<p class="text-sm text-slate-300 font-body">The standard format for importing into your ERP or BI tools. Ensures only clean, verified data enters your downstream systems.</p>
</div>
<button class="w-full mt-auto flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-container text-white hover:brightness-110 transition-all duration-300 ease-out py-3 rounded-lg font-label font-semibold group/btn relative z-10 shadow-[0_8px_24px_rgba(17,101,231,0.3)] hover:shadow-[0_12px_32px_rgba(17,101,231,0.4)] hover:scale-[1.02] active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] group-hover/btn:-translate-y-0.5 transition-transform drop-shadow-md" data-icon="download">download</span>
                        Download Approved Data
                    </button>
</div>
<!-- Card 3: JSON -->
<div class="group relative bg-surface-container-low/60 backdrop-blur-sm rounded-xl p-8 hover:bg-surface-container/80 transition-all duration-500 border border-outline-variant/10 hover:border-outline-variant/30 overflow-hidden flex flex-col shadow-xl shadow-black/20 opacity-0 animate-fade-in-up hover:-translate-y-1" style="animation-delay: 0.3s;">
<div class="absolute bottom-0 left-0 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl -ml-16 -mb-16 group-hover:bg-tertiary/20 transition-colors duration-700"></div>
<div class="flex items-start justify-between mb-6 relative z-10">
<div class="w-14 h-14 rounded-lg bg-surface-container-highest/80 flex items-center justify-center border border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
<span class="material-symbols-outlined text-3xl text-tertiary" data-icon="data_object">data_object</span>
</div>
<span class="text-xs font-label font-semibold tracking-wider text-outline px-3 py-1 bg-surface/50 backdrop-blur-md rounded-full border border-white/5">.JSON</span>
</div>
<h3 class="text-2xl font-headline font-bold text-white mb-2 relative z-10">Developer Payload</h3>
<p class="text-slate-400 text-sm font-body mb-6 flex-1 relative z-10">Structured JSON representation maintaining all hierarchical relationships, nested arrays, and metadata tags.</p>
<div class="bg-surface-container-lowest/50 backdrop-blur-md p-4 rounded-lg mb-8 border border-white/5 relative z-10">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-tertiary text-[18px]" data-icon="code">code</span>
<span class="text-xs font-label font-semibold text-tertiary uppercase tracking-wider">Why it matters</span>
</div>
<p class="text-sm text-slate-300 font-body">Ideal for direct API ingestion, custom scripts, or migrating complex relational data models without flattening.</p>
</div>
<button class="w-full mt-auto flex items-center justify-center gap-2 bg-transparent text-primary hover:bg-primary/10 transition-all duration-300 ease-out py-3 rounded-lg border border-primary/30 font-label font-medium group/btn relative z-10 hover:shadow-lg hover:shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] group-hover/btn:-translate-y-0.5 transition-transform" data-icon="download">download</span>
                        Download Payload
                    </button>
</div>
<!-- Card 4: CSV -->
<div class="group relative bg-surface-container-low/60 backdrop-blur-sm rounded-xl p-8 hover:bg-surface-container/80 transition-all duration-500 border border-outline-variant/10 hover:border-outline-variant/30 overflow-hidden flex flex-col shadow-xl shadow-black/20 opacity-0 animate-fade-in-up hover:-translate-y-1" style="animation-delay: 0.4s;">
<div class="flex items-start justify-between mb-6 relative z-10">
<div class="w-14 h-14 rounded-lg bg-surface-container-highest/80 flex items-center justify-center border border-white/5 shadow-[0_10px_20px_rgba(0,0,0,0.4)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-500">
<span class="material-symbols-outlined text-3xl text-on-surface-variant" data-icon="format_list_bulleted">format_list_bulleted</span>
</div>
<span class="text-xs font-label font-semibold tracking-wider text-outline px-3 py-1 bg-surface/50 backdrop-blur-md rounded-full border border-white/5">.CSV</span>
</div>
<h3 class="text-2xl font-headline font-bold text-white mb-2 relative z-10">Flattened Matrix</h3>
<p class="text-slate-400 text-sm font-body mb-6 flex-1 relative z-10">A simple, universally compatible comma-separated values file representing the core dataset in a flat structure.</p>
<div class="bg-surface-container-lowest/50 backdrop-blur-md p-4 rounded-lg mb-8 border border-white/5 relative z-10">
<div class="flex items-center gap-2 mb-2">
<span class="material-symbols-outlined text-outline text-[18px]" data-icon="layers_clear">layers_clear</span>
<span class="text-xs font-label font-semibold text-outline uppercase tracking-wider">Why it matters</span>
</div>
<p class="text-sm text-slate-300 font-body">Provides maximum compatibility with legacy systems, basic analytics tools, and quick lightweight reviews.</p>
</div>
<button class="w-full mt-auto flex items-center justify-center gap-2 bg-transparent text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300 ease-out py-3 rounded-lg border border-white/10 font-label font-medium group/btn relative z-10 hover:shadow-lg hover:shadow-black/40 hover:scale-[1.02] active:scale-[0.98]">
<span class="material-symbols-outlined text-[20px] group-hover/btn:-translate-y-0.5 transition-transform" data-icon="download">download</span>
                        Download CSV
                    </button>
</div>
</div>
</main>
</div>
<!-- Footer -->
<footer class="w-full border-t border-white/[0.05] py-12 bg-[#0b1326]/60 backdrop-blur-xl mt-auto relative z-10">
<div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
<span class="text-base font-bold text-slate-400 font-headline">Sovereign Command</span>
<span class="text-xs text-slate-500 font-label uppercase tracking-widest">© 2024 Sovereign Command. All rights reserved.</span>
<div class="flex gap-6 text-xs text-slate-500 font-label uppercase tracking-widest">
<a class="hover:text-slate-300 hover:underline transition-all" href="#">Privacy Policy</a>
<a class="hover:text-slate-300 hover:underline transition-all" href="#">Terms of Service</a>
<a class="hover:text-slate-300 hover:underline transition-all" href="#">Security</a>
<a class="hover:text-slate-300 hover:underline transition-all" href="#">Status</a>
</div>
</div>
</footer>
</body></html>

<!-- Billing & Settings - Enhanced Motion -->
<!DOCTYPE html>

<html class="dark" lang="en"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Blostem AI - Settings &amp; Billing</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&amp;family=Inter:wght@400;500;600;700&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&amp;display=swap" rel="stylesheet"/>
<script id="tailwind-config">
        tailwind.config = {
            darkMode: "class",
            theme: {
                extend: {
                    "colors": {
                        "on-surface": "#dae2fd",
                        "background": "#0b1326",
                        "on-secondary-fixed": "#002113",
                        "outline": "#8e90a2",
                        "surface-variant": "#2d3449",
                        "surface-container": "#171f33",
                        "on-secondary": "#003824",
                        "surface-container-high": "#222a3d",
                        "tertiary": "#b7c8e1",
                        "on-primary": "#002c70",
                        "error": "#ffb4ab",
                        "tertiary-fixed-dim": "#b7c8e1",
                        "inverse-primary": "#0057cd",
                        "on-primary-fixed-variant": "#00419d",
                        "secondary": "#4edea3",
                        "on-tertiary": "#213145",
                        "on-secondary-container": "#00311f",
                        "on-tertiary-container": "#e9f0ff",
                        "on-primary-fixed": "#001946",
                        "outline-variant": "#434656",
                        "surface-tint": "#b1c5ff",
                        "primary-container": "#1165e7",
                        "secondary-fixed-dim": "#4edea3",
                        "secondary-container": "#00a572",
                        "on-primary-container": "#edefff",
                        "primary-fixed": "#dae2ff",
                        "primary-fixed-dim": "#b1c5ff",
                        "on-tertiary-fixed-variant": "#38485d",
                        "on-error": "#690005",
                        "inverse-on-surface": "#283044",
                        "surface-container-low": "#131b2e",
                        "tertiary-container": "#5e6e85",
                        "on-tertiary-fixed": "#0b1c30",
                        "surface-container-lowest": "#060e20",
                        "tertiary-fixed": "#d3e4fe",
                        "on-background": "#dae2fd",
                        "surface-dim": "#0b1326",
                        "surface-bright": "#31394d",
                        "secondary-fixed": "#6ffbbe",
                        "on-surface-variant": "#c4c5d9",
                        "on-error-container": "#ffdad6",
                        "primary": "#b1c5ff",
                        "surface": "#0b1326",
                        "inverse-surface": "#dae2fd",
                        "on-secondary-fixed-variant": "#005236",
                        "surface-container-highest": "#2d3449",
                        "error-container": "#93000a"
                    },
                    "borderRadius": {
                        "DEFAULT": "0.125rem",
                        "lg": "0.25rem",
                        "xl": "0.5rem",
                        "full": "0.75rem"
                    },
                    "spacing": {},
                    "fontFamily": {
                        "headline": ["Manrope"],
                        "body": ["Inter"],
                        "label": ["Inter"]
                    },
                    animation: {
                        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    },
                    keyframes: {
                        fadeIn: {
                            '0%': { opacity: '0' },
                            '100%': { opacity: '1' },
                        },
                        slideUp: {
                            '0%': { opacity: '0', transform: 'translateY(20px)' },
                            '100%': { opacity: '1', transform: 'translateY(0)' },
                        }
                    }
                },
            },
        }
    </script>
<style>
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, h5, h6, .font-headline { font-family: 'Manrope', sans-serif; }
        
        /* Custom Scrollbar for dark theme */
        ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0b1326;
        }
        ::-webkit-scrollbar-thumb {
            background: #2d3449;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: #434656;
        }

        .glass-panel {
            background: rgba(23, 31, 51, 0.6);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(142, 144, 162, 0.1);
        }

        .haptic-btn {
            transition: transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1), 
                        box-shadow 0.2s ease, 
                        background-color 0.2s ease;
        }
        .haptic-btn:active {
            transform: scale(0.96);
        }

        .stagger-1 { animation-delay: 100ms; }
        .stagger-2 { animation-delay: 200ms; }
        .stagger-3 { animation-delay: 300ms; }
        .stagger-4 { animation-delay: 400ms; }
    </style>
</head>
<body class="bg-background text-on-surface min-h-screen flex flex-col md:flex-row antialiased selection:bg-primary-container selection:text-on-primary-container bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container-high/40 via-background to-background">
<!-- SideNavBar (from JSON) -->
<nav class="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 border-r border-slate-800/20 bg-[#0b1326]/80 backdrop-blur-xl py-6 px-4 space-y-2 z-40 shadow-[0_20px_40px_rgba(6,14,32,0.4)] transition-all duration-300">
<div class="flex items-center gap-3 px-3 mb-8 animate-fade-in">
<div class="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-[0_0_15px_rgba(177,197,255,0.3)]">
<span class="material-symbols-outlined text-on-primary text-sm font-bold" data-icon="rocket_launch" data-weight="fill" style="font-variation-settings: 'FILL' 1;">rocket_launch</span>
</div>
<div>
<h1 class="text-lg font-bold text-slate-50 font-['Manrope'] tracking-tight">Sovereign Command</h1>
<p class="text-xs text-slate-400 font-['Inter']">Operational Intelligence</p>
</div>
</div>
<div class="flex-1 space-y-1 animate-slide-up stagger-1 opacity-0">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="dashboard">dashboard</span>
                Dashboard
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="insights">insights</span>
                Analytics
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="account_tree">account_tree</span>
                Pipeline
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="inventory_2">inventory_2</span>
                Inventory
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="group">group</span>
                Customers
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="description">description</span>
                Reports
            </a>
</div>
<div class="pt-4 border-t border-slate-800/20 space-y-1 animate-slide-up stagger-2 opacity-0">
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-surface-container-high/50 transition-all duration-200 font-['Inter'] text-sm tracking-wide group" href="#">
<span class="material-symbols-outlined text-lg group-hover:scale-110 transition-transform duration-200" data-icon="help">help</span>
                Support
            </a>
<a class="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-surface-container-high/80 text-[#2E5BFF] font-semibold shadow-[inset_4px_0_0_0_#2E5BFF] hover:bg-surface-container-high transition-all duration-200 font-['Inter'] text-sm tracking-wide group relative overflow-hidden" href="#">
<div class="absolute inset-0 bg-gradient-to-r from-[#2E5BFF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
<span class="material-symbols-outlined text-lg relative z-10" data-icon="settings" data-weight="fill" style="font-variation-settings: 'FILL' 1;">settings</span>
<span class="relative z-10">Settings</span>
</a>
<div class="mt-6 px-3">
<button class="haptic-btn w-full py-2.5 px-4 bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-lg font-medium text-sm shadow-[0_0_15px_rgba(177,197,255,0.2)] hover:shadow-[0_0_20px_rgba(177,197,255,0.4)] hover:-translate-y-0.5 relative overflow-hidden group">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
<span class="relative z-10">Upgrade Plan</span>
</button>
</div>
</div>
</nav>
<!-- TopNavBar (Mobile Only) -->
<nav class="md:hidden flex justify-between items-center w-full px-6 py-3 bg-[#0b1326]/80 backdrop-blur-xl fixed top-0 z-50 shadow-[0_20px_40px_rgba(6,14,32,0.4)] border-b border-white/5">
<span class="text-xl font-black text-slate-100 font-['Manrope']">Sovereign Command</span>
<div class="flex gap-4">
<span class="material-symbols-outlined text-slate-400 haptic-btn active:text-white" data-icon="menu">menu</span>
</div>
</nav>
<!-- Main Content Canvas -->
<main class="flex-1 md:ml-64 pt-16 md:pt-0 p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
<!-- Header Section -->
<header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 animate-slide-up opacity-0">
<div>
<h2 class="text-3xl md:text-4xl font-headline font-bold text-on-surface tracking-tight mb-2 drop-shadow-sm">Settings &amp; Billing</h2>
<p class="text-surface-variant-light text-sm md:text-base text-on-surface-variant max-w-2xl">Manage your organization's configuration, billing plans, and operational preferences.</p>
</div>
<div class="flex gap-3">
<button class="haptic-btn px-4 py-2 rounded-lg border border-outline-variant/30 text-on-surface text-sm font-medium hover:bg-surface-container-high hover:border-outline-variant/50 transition-all flex items-center gap-2">
<span class="material-symbols-outlined text-sm" data-icon="download">download</span>
                    Export Data
                </button>
<button class="haptic-btn px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-medium shadow-[0_0_15px_rgba(177,197,255,0.2)] hover:shadow-[0_0_20px_rgba(177,197,255,0.4)] transition-all flex items-center gap-2 relative overflow-hidden group">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
<span class="material-symbols-outlined text-sm relative z-10" data-icon="save">save</span>
<span class="relative z-10">Save Changes</span>
</button>
</div>
</header>
<!-- Settings Tabs -->
<div class="flex border-b border-outline-variant/20 mb-8 overflow-x-auto hide-scrollbar animate-slide-up stagger-1 opacity-0 relative">
<button class="px-6 py-3 border-b-2 border-primary text-primary font-medium text-sm whitespace-nowrap transition-all duration-300 hover:bg-primary/5">Profile</button>
<button class="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm whitespace-nowrap transition-all duration-300 hover:bg-white/5">Preferences</button>
<button class="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm whitespace-nowrap transition-all duration-300 hover:bg-white/5">Billing</button>
<button class="px-6 py-3 border-b-2 border-transparent text-on-surface-variant hover:text-on-surface font-medium text-sm whitespace-nowrap transition-all duration-300 hover:bg-white/5">API Keys</button>
</div>
<!-- Bento Grid Layout for Settings Content -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
<!-- Left Column: Profile & Personal -->
<div class="lg:col-span-2 space-y-6">
<!-- Profile Card -->
<section class="glass-panel rounded-2xl p-6 relative overflow-hidden group animate-slide-up stagger-2 opacity-0 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500">
<div class="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
<h3 class="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2 relative z-10">
<div class="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
<span class="material-symbols-outlined text-primary text-sm" data-icon="person">person</span>
</div>
                        Profile Management
                    </h3>
<div class="flex flex-col sm:flex-row gap-8 items-start mb-8 relative z-10">
<div class="relative group/avatar cursor-pointer">
<div class="absolute -inset-1 bg-gradient-to-r from-primary to-primary-container rounded-xl blur opacity-25 group-hover/avatar:opacity-50 transition duration-500"></div>
<img alt="Profile" class="w-24 h-24 rounded-xl object-cover border border-white/10 relative z-10" data-alt="Professional headshot of a woman in a dark blazer against a muted background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQ6_BHiyWMXsws3rialIfZP7Wvp9QFl6KVuN0Lq61maeX6mYqowYqj4LWnKkeUBXUdAH4RMZjmjVT6vaeTk1AElml0Jo2sfqXT-eNLFPdUO7PotD6hwHmRphotW6uYSm3oKUgx0TsmtAmQZV7B2zta2_0-uJ8hse9FdLrpWXYEejdGR5YX1jHsyMFrNBWRfv4b-e1Xxg1JA9oIv13Bl9p8J8gRLW0FiDpie1sEUyDq2a2oAGe6uUQKuu_AxttMDB6bIeeJbu-MfK8"/>
<button class="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-surface-container-highest border border-white/20 flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary transition-all duration-300 z-20 shadow-lg haptic-btn">
<span class="material-symbols-outlined text-sm" data-icon="edit">edit</span>
</button>
</div>
<div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
<div class="space-y-1.5 group/input">
<label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider group-focus-within/input:text-primary transition-colors">Full Name</label>
<input class="w-full bg-surface/50 border border-outline-variant/20 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300 hover:bg-surface/80 shadow-inner" type="text" value="Sarah Jenkins"/>
</div>
<div class="space-y-1.5 group/input">
<label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider group-focus-within/input:text-primary transition-colors">Title</label>
<input class="w-full bg-surface/50 border border-outline-variant/20 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300 hover:bg-surface/80 shadow-inner" type="text" value="Head of Operations"/>
</div>
<div class="space-y-1.5 sm:col-span-2 group/input">
<label class="text-xs font-semibold text-on-surface-variant uppercase tracking-wider group-focus-within/input:text-primary transition-colors">Email Address</label>
<input class="w-full bg-surface/50 border border-outline-variant/20 text-on-surface rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all duration-300 hover:bg-surface/80 shadow-inner" type="email" value="sarah.j@blostem.ai"/>
</div>
</div>
</div>
</section>
<!-- Preferences Card -->
<section class="glass-panel rounded-2xl p-6 animate-slide-up stagger-3 opacity-0 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500">
<h3 class="text-xl font-headline font-bold text-on-surface mb-6 flex items-center gap-2">
<div class="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
<span class="material-symbols-outlined text-secondary text-sm" data-icon="tune">tune</span>
</div>
                        App Preferences
                    </h3>
<div class="space-y-4">
<div class="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
<div>
<h4 class="font-medium text-on-surface text-sm">Theme Toggle</h4>
<p class="text-xs text-on-surface-variant mt-1">Switch between light and dark modes.</p>
</div>
<div class="flex bg-surface-container-highest/80 rounded-lg p-1 border border-white/5 shadow-inner">
<button class="haptic-btn px-3 py-1.5 rounded-md text-on-surface-variant hover:text-on-surface text-sm flex items-center gap-2 transition-all">
<span class="material-symbols-outlined text-sm" data-icon="light_mode">light_mode</span>
                                    Light
                                </button>
<button class="haptic-btn px-3 py-1.5 rounded-md bg-surface border border-white/10 text-primary text-sm flex items-center gap-2 shadow-sm relative overflow-hidden">
<div class="absolute inset-0 bg-primary/10"></div>
<span class="material-symbols-outlined text-sm relative z-10" data-icon="dark_mode" data-weight="fill">dark_mode</span>
<span class="relative z-10">Dark</span>
</button>
</div>
</div>
<div class="flex items-center justify-between p-4 bg-surface/30 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
<div>
<h4 class="font-medium text-on-surface text-sm">Email Notifications</h4>
<p class="text-xs text-on-surface-variant mt-1">Receive daily summaries and alerts.</p>
</div>
<label class="relative inline-flex items-center cursor-pointer haptic-btn">
<input checked="" class="sr-only peer" type="checkbox" value=""/>
<div class="w-11 h-6 bg-surface-container-highest/80 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all duration-300 peer-checked:bg-primary border border-white/10 shadow-inner"></div>
</label>
</div>
</div>
</section>
</div>
<!-- Right Column: Billing Snapshot -->
<div class="space-y-6">
<!-- Current Plan Card -->
<section class="glass-panel rounded-2xl p-6 relative overflow-hidden animate-slide-up stagger-2 opacity-0 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500 group">
<div class="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-bl-full -mr-8 -mt-8 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
<div class="absolute -inset-1 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"></div>
<div class="flex justify-between items-start mb-6 relative z-10">
<h3 class="text-xl font-headline font-bold text-on-surface flex items-center gap-2">
<div class="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center border border-tertiary/20">
<span class="material-symbols-outlined text-tertiary text-sm" data-icon="credit_card">credit_card</span>
</div>
                            Current Plan
                        </h3>
<span class="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-md border border-primary/20 shadow-[0_0_10px_rgba(177,197,255,0.1)]">Pro Tier</span>
</div>
<div class="mb-6 pb-6 border-b border-white/5 relative z-10">
<div class="flex items-baseline gap-1 group-hover:translate-x-1 transition-transform duration-300">
<span class="text-4xl font-headline font-extrabold text-on-surface drop-shadow-md">$299</span>
<span class="text-sm text-on-surface-variant font-medium">/mo</span>
</div>
<p class="text-xs text-on-surface-variant mt-2">Next billing date: Oct 15, 2024</p>
</div>
<div class="space-y-4 mb-8 relative z-10">
<h4 class="text-sm font-semibold text-on-surface mb-2 uppercase tracking-wider text-xs">Entitlements</h4>
<div class="flex justify-between items-center text-sm">
<span class="text-on-surface-variant">API Requests</span>
<span class="text-on-surface font-medium">45k / 50k</span>
</div>
<div class="w-full bg-surface-container-highest/80 rounded-full h-1.5 shadow-inner overflow-hidden">
<div class="bg-gradient-to-r from-primary to-primary-container h-full rounded-full relative" style="width: 90%">
<div class="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
</div>
</div>
<div class="flex justify-between items-center text-sm pt-2">
<span class="text-on-surface-variant">Active Seats</span>
<span class="text-on-surface font-medium">8 / 10</span>
</div>
<div class="w-full bg-surface-container-highest/80 rounded-full h-1.5 shadow-inner overflow-hidden">
<div class="bg-gradient-to-r from-secondary to-secondary-container h-full rounded-full" style="width: 80%"></div>
</div>
</div>
<div class="flex flex-col gap-3 relative z-10">
<button class="haptic-btn w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-container text-on-primary text-sm font-medium shadow-[0_0_15px_rgba(177,197,255,0.2)] hover:shadow-[0_0_25px_rgba(177,197,255,0.4)] transition-all relative overflow-hidden group/btn">
<div class="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out"></div>
<span class="relative z-10">Upgrade Plan</span>
</button>
<button class="haptic-btn w-full py-2.5 rounded-xl border border-white/10 bg-surface/30 text-on-surface text-sm font-medium hover:bg-surface-container-highest hover:border-white/20 transition-all">
                            Manage Billing
                        </button>
</div>
</section>
<!-- Recent Invoices Mini-List -->
<section class="glass-panel rounded-2xl p-6 animate-slide-up stagger-4 opacity-0 hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-500">
<div class="flex justify-between items-center mb-4">
<h4 class="text-sm font-headline font-bold text-on-surface">Recent Invoices</h4>
<button class="text-primary text-xs font-medium hover:underline hover:text-primary-container transition-colors haptic-btn">View All</button>
</div>
<div class="space-y-3">
<div class="flex justify-between items-center p-3 bg-surface/30 rounded-xl border border-white/5 hover:border-white/10 hover:bg-surface/50 transition-all duration-300 cursor-pointer group haptic-btn hover:-translate-y-0.5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm" data-icon="receipt">receipt</span>
</div>
<div>
<p class="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">INV-2024-09</p>
<p class="text-[10px] text-on-surface-variant">Sep 15, 2024</p>
</div>
</div>
<span class="text-xs font-bold text-on-surface">$299.00</span>
</div>
<div class="flex justify-between items-center p-3 bg-surface/30 rounded-xl border border-white/5 hover:border-white/10 hover:bg-surface/50 transition-all duration-300 cursor-pointer group haptic-btn hover:-translate-y-0.5">
<div class="flex items-center gap-3">
<div class="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center group-hover:bg-primary/10 transition-colors">
<span class="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-sm" data-icon="receipt">receipt</span>
</div>
<div>
<p class="text-xs font-medium text-on-surface group-hover:text-primary transition-colors">INV-2024-08</p>
<p class="text-[10px] text-on-surface-variant">Aug 15, 2024</p>
</div>
</div>
<span class="text-xs font-bold text-on-surface">$299.00</span>
</div>
</div>
</section>
</div>
</div>
</main>
<style>
@keyframes progress {
  0% { background-position: 1rem 0; }
  100% { background-position: 0 0; }
}
</style>
</body></html>