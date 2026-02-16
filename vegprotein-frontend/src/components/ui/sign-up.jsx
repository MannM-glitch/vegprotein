import { cn } from "../../lib/utils";
import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo, useCallback, createContext, Children } from "react";
import { cva } from "class-variance-authority";
import { ArrowRight, Mail, Lock, Eye, EyeOff, ArrowLeft, X, AlertCircle, PartyPopper, Loader } from "lucide-react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import confetti from "canvas-confetti";

// --- CONFETTI LOGIC ---
const Confetti = forwardRef((props, ref) => {
  const { options, globalOptions = { resize: true, useWorker: true }, manualstart = false, ...rest } = props;
  const instanceRef = useRef(null);
  const canvasRef = useCallback((node) => {
    if (node !== null) {
      if (instanceRef.current) return;
      instanceRef.current = confetti.create(node, { ...globalOptions, resize: true });
    } else {
      if (instanceRef.current) {
        instanceRef.current.reset();
        instanceRef.current = null;
      }
    }
  }, [globalOptions]);
  const fire = useCallback((opts = {}) => instanceRef.current?.({ ...options, ...opts }), [options]);
  const api = useMemo(() => ({ fire }), [fire]);
  useImperativeHandle(ref, () => api, [api]);
  useEffect(() => { if (!manualstart) fire(); }, [manualstart, fire]);
  return <canvas ref={canvasRef} {...rest} />;
});
Confetti.displayName = "Confetti";

// --- TEXT LOOP ANIMATION COMPONENT ---
function TextLoop({ children, className, interval = 2, transition = { duration: 0.3 }, variants, onIndexChange, stopOnEnd = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = Children.toArray(children);
  useEffect(() => {
    const intervalMs = interval * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((current) => {
        if (stopOnEnd && current === items.length - 1) {
          clearInterval(timer);
          return current;
        }
        const next = (current + 1) % items.length;
        onIndexChange?.(next);
        return next;
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [items.length, interval, onIndexChange, stopOnEnd]);
  const motionVariants = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  };
  return (
    <div className={cn('relative inline-block whitespace-nowrap', className)}>
      <AnimatePresence mode='popLayout' initial={false}>
        <motion.div key={currentIndex} initial='initial' animate='animate' exit='exit' transition={transition} variants={variants || motionVariants}>
          {items[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// --- BLUR FADE ANIMATION COMPONENT ---
function BlurFade({ children, className, variant, duration = 0.4, delay = 0, yOffset = 6, inView = true, inViewMargin = "-50px", blur = "6px" }) {
  const ref = useRef(null);
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin });
  const isInView = !inView || inViewResult;
  const defaultVariants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -yOffset, opacity: 1, filter: `blur(0px)` },
  };
  const combinedVariants = variant || defaultVariants;
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} exit="hidden" variants={combinedVariants} transition={{ delay: 0.04 + delay, duration, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}

// --- GLASS BUTTON COMPONENT ---
const glassButtonVariants = cva("relative isolate all-unset cursor-pointer rounded-full transition-all", { variants: { size: { default: "text-base font-medium", sm: "text-sm font-medium", lg: "text-lg font-medium", icon: "h-10 w-10" } }, defaultVariants: { size: "default" } });
const glassButtonTextVariants = cva("glass-button-text relative block select-none tracking-tighter", { variants: { size: { default: "px-6 py-3.5", sm: "px-4 py-2", lg: "px-8 py-4", icon: "flex h-10 w-10 items-center justify-center" } }, defaultVariants: { size: "default" } });

const GlassButton = React.forwardRef(({ className, children, size, contentClassName, onClick, ...props }, ref) => {
  const handleWrapperClick = (e) => {
    const button = e.currentTarget.querySelector('button');
    if (button && e.target !== button) button.click();
  };
  return (
    <div className={cn("glass-button-wrap cursor-pointer rounded-full relative", className)} onClick={handleWrapperClick}>
      <button className={cn("glass-button relative z-10", glassButtonVariants({ size }))} ref={ref} onClick={onClick} {...props}>
        <span className={cn(glassButtonTextVariants({ size }), contentClassName)}>{children}</span>
      </button>
      <div className="glass-button-shadow rounded-full pointer-events-none"></div>
    </div>
  );
});
GlassButton.displayName = "GlassButton";

// --- GRADIENT BACKGROUND (VegProtein Green Theme) ---
const GradientBackground = () => (
  <>
    <style>
      {`@keyframes float1 { 0% { transform: translate(0, 0); } 50% { transform: translate(-10px, 10px); } 100% { transform: translate(0, 0); } } @keyframes float2 { 0% { transform: translate(0, 0); } 50% { transform: translate(10px, -10px); } 100% { transform: translate(0, 0); } }`}
    </style>
    <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" className="absolute top-0 left-0 w-full h-full">
      <defs>
        <linearGradient id="rev_grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#22c55e', stopOpacity: 0.6}} />
          <stop offset="100%" style={{stopColor: '#16a34a', stopOpacity: 0.4}} />
        </linearGradient>
        <linearGradient id="rev_grad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#4ade80', stopOpacity: 0.5}} />
          <stop offset="50%" style={{stopColor: '#22c55e', stopOpacity: 0.3}} />
          <stop offset="100%" style={{stopColor: '#15803d', stopOpacity: 0.4}} />
        </linearGradient>
        <radialGradient id="rev_grad3" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{stopColor: '#86efac', stopOpacity: 0.5}} />
          <stop offset="100%" style={{stopColor: '#22c55e', stopOpacity: 0.2}} />
        </radialGradient>
        <filter id="rev_blur1" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="35"/></filter>
        <filter id="rev_blur2" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="25"/></filter>
        <filter id="rev_blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="45"/></filter>
      </defs>
      <g style={{ animation: 'float1 20s ease-in-out infinite' }}>
        <ellipse cx="200" cy="500" rx="250" ry="180" fill="url(#rev_grad1)" filter="url(#rev_blur1)" transform="rotate(-30 200 500)"/>
        <rect x="500" y="100" width="300" height="250" rx="80" fill="url(#rev_grad2)" filter="url(#rev_blur2)" transform="rotate(15 650 225)"/>
      </g>
      <g style={{ animation: 'float2 25s ease-in-out infinite' }}>
        <circle cx="650" cy="450" r="150" fill="url(#rev_grad3)" filter="url(#rev_blur3)" opacity="0.7"/>
        <ellipse cx="50" cy="150" rx="180" ry="120" fill="#bbf7d0" filter="url(#rev_blur2)" opacity="0.5"/>
      </g>
    </svg>
  </>
);

// --- ICONS ---
const GoogleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-6 h-6">
    <g fillRule="evenodd" fill="none">
      <g fillRule="nonzero" transform="translate(3, 2)">
        <path fill="#4285F4" d="M57.8123233,30.1515267 C57.8123233,27.7263183 57.6155321,25.9565533 57.1896408,24.1212666 L29.4960833,24.1212666 L29.4960833,35.0674653 L45.7515771,35.0674653 C45.4239683,37.7877475 43.6542033,41.8844383 39.7213169,44.6372555 L39.6661883,45.0037254 L48.4223791,51.7870338 L49.0290201,51.8475849 C54.6004021,46.7020943 57.8123233,39.1313952 57.8123233,30.1515267"></path>
        <path fill="#34A853" d="M29.4960833,58.9921667 C37.4599129,58.9921667 44.1456164,56.3701671 49.0290201,51.8475849 L39.7213169,44.6372555 C37.2305867,46.3742596 33.887622,47.5868638 29.4960833,47.5868638 C21.6960582,47.5868638 15.0758763,42.4415991 12.7159637,35.3297782 L12.3700541,35.3591501 L3.26524241,42.4054492 L3.14617358,42.736447 C7.9965904,52.3717589 17.959737,58.9921667 29.4960833,58.9921667"></path>
        <path fill="#FBBC05" d="M12.7159637,35.3297782 C12.0932812,33.4944915 11.7329116,31.5279353 11.7329116,29.4960833 C11.7329116,27.4640054 12.0932812,25.4976752 12.6832029,23.6623884 L12.6667095,23.2715173 L3.44779955,16.1120237 L3.14617358,16.2554937 C1.14708246,20.2539019 0,24.7439491 0,29.4960833 C0,34.2482175 1.14708246,38.7380388 3.14617358,42.736447 L12.7159637,35.3297782"></path>
        <path fill="#EB4335" d="M29.4960833,11.4050769 C35.0347044,11.4050769 38.7707997,13.7975244 40.9011602,15.7968415 L49.2255853,7.66898166 C44.1130815,2.91684746 37.4599129,0 29.4960833,0 C17.959737,0 7.9965904,6.62018183 3.14617358,16.2554937 L12.6832029,23.6623884 C15.0758763,16.5505675 21.6960582,11.4050769 29.4960833,11.4050769"></path>
      </g>
    </g>
  </svg>
);

const GitHubIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6">
    <path fill="currentColor" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
  </svg>
);

const modalSteps = [
  { message: "Signing you up...", icon: <Loader className="w-12 h-12 text-green-500 animate-spin" /> },
  { message: "Setting up your profile...", icon: <Loader className="w-12 h-12 text-green-500 animate-spin" /> },
  { message: "Finalizing...", icon: <Loader className="w-12 h-12 text-green-500 animate-spin" /> },
  { message: "Welcome to VegProtein!", icon: <PartyPopper className="w-12 h-12 text-green-500" /> }
];
const TEXT_LOOP_INTERVAL = 1.5;

// --- MAIN COMPONENT ---
export function SignUp({ onSkip, onSuccess, onAuth, authError }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authStep, setAuthStep] = useState("email");
  const [modalStatus, setModalStatus] = useState('closed');
  const [modalErrorMessage, setModalErrorMessage] = useState('');
  const confettiRef = useRef(null);

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 6;
  const isConfirmPasswordValid = confirmPassword.length >= 6;
  
  const passwordInputRef = useRef(null);
  const confirmPasswordInputRef = useRef(null);
  
  const fireSideCanons = () => {
    const fire = confettiRef.current?.fire;
    if (fire) {
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100, colors: ['#22c55e', '#4ade80', '#86efac', '#16a34a'] };
      const particleCount = 50;
      fire({ ...defaults, particleCount, origin: { x: 0, y: 1 }, angle: 60 });
      fire({ ...defaults, particleCount, origin: { x: 1, y: 1 }, angle: 120 });
    }
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (modalStatus !== 'closed') return;
    
    // For login mode, we don't need confirm password
    if (!isLoginMode && authStep !== 'confirmPassword') return;
    if (isLoginMode && authStep !== 'password') return;

    if (!isLoginMode && password !== confirmPassword) {
      setModalErrorMessage("Passwords do not match!");
      setModalStatus('error');
      return;
    }
    
    setModalStatus('loading');
    
    // If onAuth is provided, actually call the API
    if (onAuth) {
      const result = await onAuth(email, password, isLoginMode);
      if (!result.success) {
        setModalErrorMessage(result.error || "Authentication failed");
        setModalStatus('error');
        return;
      }
    }
    
    // Success animation
    const loadingStepsCount = modalSteps.length - 1;
    const totalDuration = loadingStepsCount * TEXT_LOOP_INTERVAL * 1000;
    setTimeout(() => {
      fireSideCanons();
      setModalStatus('success');
      setTimeout(() => {
        onSuccess?.();
      }, 1500);
    }, totalDuration);
  };

  const handleProgressStep = () => {
    if (authStep === 'email') {
      if (isEmailValid) setAuthStep("password");
    } else if (authStep === 'password') {
      if (isPasswordValid) {
        if (isLoginMode) {
          // For login, submit directly from password step
          handleFinalSubmit({ preventDefault: () => {} });
        } else {
          setAuthStep("confirmPassword");
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleProgressStep();
    }
  };

  const handleGoBack = () => {
    if (authStep === 'confirmPassword') {
      setAuthStep('password');
      setConfirmPassword('');
    } else if (authStep === 'password') setAuthStep('email');
  };

  const closeModal = () => {
    setModalStatus('closed');
    setModalErrorMessage('');
  };

  useEffect(() => {
    if (authStep === 'password') setTimeout(() => passwordInputRef.current?.focus(), 500);
    else if (authStep === 'confirmPassword') setTimeout(() => confirmPasswordInputRef.current?.focus(), 500);
  }, [authStep]);

  useEffect(() => {
    if (modalStatus === 'success') {
      fireSideCanons();
    }
  }, [modalStatus]);
  
  const Modal = () => (
    <AnimatePresence>
      {modalStatus !== 'closed' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white border border-neutral-200 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4 mx-4 shadow-xl">
            {(modalStatus === 'error' || modalStatus === 'success') && (
              <button onClick={closeModal} className="absolute top-3 right-3 p-1 text-neutral-400 hover:text-neutral-600 transition-colors">
                <X className="w-5 h-5" />
              </button>
            )}
            {modalStatus === 'error' && (
              <>
                <AlertCircle className="w-12 h-12 text-red-500" />
                <p className="text-lg font-medium text-neutral-900">{modalErrorMessage}</p>
                <button onClick={closeModal} className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors">
                  Try Again
                </button>
              </>
            )}
            {modalStatus === 'loading' && (
              <TextLoop interval={TEXT_LOOP_INTERVAL} stopOnEnd={true}>
                {modalSteps.slice(0, -1).map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4">
                    {step.icon}
                    <p className="text-lg font-medium text-neutral-900">{step.message}</p>
                  </div>
                ))}
              </TextLoop>
            )}
            {modalStatus === 'success' && (
              <div className="flex flex-col items-center gap-4">
                {modalSteps[modalSteps.length - 1].icon}
                <p className="text-lg font-medium text-neutral-900">{modalSteps[modalSteps.length - 1].message}</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="bg-white min-h-screen w-full flex flex-col">
      <style>{`
        input[type="password"]::-ms-reveal, input[type="password"]::-ms-clear { display: none !important; }
        input:-webkit-autofill { -webkit-box-shadow: 0 0 0 30px white inset !important; }
        .glass-input-wrap { position: relative; border-radius: 9999px; }
        .glass-input { display: flex; position: relative; width: 100%; align-items: center; gap: 0.5rem; border-radius: 9999px; padding: 0.25rem; background: white; border: 1px solid #e5e5e5; transition: all 200ms ease; }
        .glass-input:focus-within { border-color: #22c55e; box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1); }
      `}</style>

      <Confetti ref={confettiRef} manualstart className="fixed top-0 left-0 w-full h-full pointer-events-none z-[999]" />
      <Modal />

      {/* Header */}
      <div className="fixed top-4 left-4 z-20 flex items-center gap-2 md:left-1/2 md:-translate-x-1/2">
        <div className="w-8 h-8 bg-green-600 rounded-md flex items-center justify-center">
          <span className="text-white font-bold text-sm">VP</span>
        </div>
        <h1 className="text-base font-semibold text-neutral-900">VegProtein</h1>
      </div>

      {/* Skip Button */}
      <button
        onClick={onSkip}
        className="fixed top-4 right-4 z-20 text-sm font-medium text-neutral-500 hover:text-neutral-700 transition-colors"
      >
        Skip for now →
      </button>

      <div className="flex w-full flex-1 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0"><GradientBackground /></div>
        
        <fieldset disabled={modalStatus !== 'closed'} className="relative z-10 flex flex-col items-center gap-8 w-[320px] mx-auto p-6">
          <AnimatePresence mode="wait">
            {authStep === "email" && (
              <motion.div key="email-content" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center gap-4">
                <BlurFade delay={0.1} className="w-full">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">{isLoginMode ? 'Welcome back' : 'Get started'}</h2>
                    <p className="mt-2 text-neutral-600">{isLoginMode ? 'Sign in to your account' : 'Create your account to track protein'}</p>
                  </div>
                </BlurFade>
                <BlurFade delay={0.2}>
                  <p className="text-sm font-medium text-neutral-500">Continue with</p>
                </BlurFade>
                <BlurFade delay={0.3}>
                  <div className="flex items-center justify-center gap-3 w-full">
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
                      <GoogleIcon />
                      <span className="font-medium text-neutral-700">Google</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 transition-colors">
                      <GitHubIcon />
                      <span className="font-medium text-neutral-700">GitHub</span>
                    </button>
                  </div>
                </BlurFade>
                <BlurFade delay={0.4} className="w-full">
                  <div className="flex items-center w-full gap-3 py-2">
                    <hr className="flex-1 border-neutral-200"/>
                    <span className="text-xs font-medium text-neutral-400">OR</span>
                    <hr className="flex-1 border-neutral-200"/>
                  </div>
                </BlurFade>
              </motion.div>
            )}
            {authStep === "password" && (
              <motion.div key="password-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-2">
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">{isLoginMode ? 'Enter password' : 'Create password'}</h2>
                <p className="text-neutral-600">{isLoginMode ? 'Enter your account password' : 'Must be at least 6 characters'}</p>
              </motion.div>
            )}
            {authStep === "confirmPassword" && (
              <motion.div key="confirm-title" initial={{ y: 6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full flex flex-col items-center text-center gap-2">
                <h2 className="text-3xl font-bold text-neutral-900 tracking-tight">Confirm password</h2>
                <p className="text-neutral-600">Re-enter your password</p>
              </motion.div>
            )}
          </AnimatePresence>
          
          <form onSubmit={handleFinalSubmit} className="w-full space-y-4">
            <AnimatePresence>
              {authStep !== 'confirmPassword' && (
                <motion.div key="email-password-fields" exit={{ opacity: 0, filter: 'blur(4px)' }} transition={{ duration: 0.3, ease: "easeOut" }} className="w-full space-y-4">
                  <BlurFade delay={authStep === 'email' ? 0.5 : 0} inView={true} className="w-full">
                    <div className="relative w-full">
                      {authStep === "password" && (
                        <motion.label initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="block text-xs text-neutral-500 font-medium mb-1.5 ml-1">
                          Email
                        </motion.label>
                      )}
                      <div className="glass-input-wrap w-full">
                        <div className="glass-input">
                          <div className="flex-shrink-0 flex items-center justify-center w-10 pl-2">
                            <Mail className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="h-11 w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none pr-2"
                          />
                          {isEmailValid && authStep === 'email' && (
                            <button
                              type="button"
                              onClick={handleProgressStep}
                              className="flex-shrink-0 w-9 h-9 mr-1 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                            >
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </BlurFade>
                  <AnimatePresence>
                    {authStep === "password" && (
                      <BlurFade key="password-field" className="w-full">
                        <div className="relative w-full">
                          <label className="block text-xs text-neutral-500 font-medium mb-1.5 ml-1">Password</label>
                          <div className="glass-input-wrap w-full">
                            <div className="glass-input">
                              <div className="flex-shrink-0 flex items-center justify-center w-10 pl-2">
                                {isPasswordValid ? (
                                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                  </button>
                                ) : (
                                  <Lock className="h-5 w-5 text-neutral-400" />
                                )}
                              </div>
                              <input
                                ref={passwordInputRef}
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="h-11 w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none pr-2"
                              />
                              {isPasswordValid && (
                                <button
                                  type="button"
                                  onClick={handleProgressStep}
                                  className="flex-shrink-0 w-9 h-9 mr-1 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                                >
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                        <button type="button" onClick={handleGoBack} className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                          <ArrowLeft className="w-4 h-4" /> Back
                        </button>
                      </BlurFade>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
            <AnimatePresence>
              {authStep === 'confirmPassword' && (
                <BlurFade key="confirm-password-field" className="w-full">
                  <div className="relative w-full">
                    <label className="block text-xs text-neutral-500 font-medium mb-1.5 ml-1">Confirm Password</label>
                    <div className="glass-input-wrap w-full">
                      <div className="glass-input">
                        <div className="flex-shrink-0 flex items-center justify-center w-10 pl-2">
                          {isConfirmPasswordValid ? (
                            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="text-neutral-400 hover:text-neutral-600 transition-colors">
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          ) : (
                            <Lock className="h-5 w-5 text-neutral-400" />
                          )}
                        </div>
                        <input
                          ref={confirmPasswordInputRef}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Re-enter password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-11 w-full bg-transparent text-neutral-900 placeholder:text-neutral-400 focus:outline-none pr-2"
                        />
                        {isConfirmPasswordValid && (
                          <button
                            type="submit"
                            className="flex-shrink-0 w-9 h-9 mr-1 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="button" onClick={handleGoBack} className="mt-3 flex items-center gap-1.5 text-sm text-neutral-500 hover:text-neutral-700 transition-colors">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                </BlurFade>
              )}
            </AnimatePresence>
            
            {/* Login/Signup toggle */}
            {authStep === 'email' && (
              <BlurFade delay={0.6} className="w-full">
                <p className="text-center text-sm text-neutral-500">
                  {isLoginMode ? "Don't have an account? " : "Already have an account? "}
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="font-medium text-green-600 hover:text-green-700 transition-colors"
                  >
                    {isLoginMode ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </BlurFade>
            )}
          </form>
        </fieldset>
      </div>
    </div>
  );
}
