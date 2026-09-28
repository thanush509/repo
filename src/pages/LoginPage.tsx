import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { authService } from '../services/auth.service';
import { ArrowRight, Lock, Mail, Sparkles, UserCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('keerthick.work@example.com');
  const [password, setPassword] = useState('password123');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    await authService.login(email, 'Keerthick R', false);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    await authService.login('keerthick.work@example.com', 'Keerthick R', false);
    setIsLoading(false);
    navigate('/dashboard');
  };

  const handleNewAccount = async () => {
    setIsLoading(true);
    await authService.login('new.coder@example.com', 'New User', true);
    setIsLoading(false);
    navigate('/onboarding');
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-lg sm:text-xl font-bold tracking-tight text-zinc-900">
          Sign in to JobPilot
        </h2>
        <p className="text-xs text-zinc-500">
          Access your personal autonomous job application agent.
        </p>
      </div>

      {/* 1-Click Demo User Button */}
      <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/80 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-zinc-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-zinc-700" />
            <span>Instant Demo Access</span>
          </span>
          <span className="text-[10px] text-zinc-400 font-mono">Pre-seeded</span>
        </div>
        <p className="text-[11px] text-zinc-500 leading-relaxed">
          Log in as <strong>Keerthick R</strong> (Medical Coder, 1 yr experience, 20+ jobs matching).
        </p>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="w-full"
          leftIcon={<UserCheck className="w-3.5 h-3.5" />}
          onClick={handleDemoLogin}
          isLoading={isLoading}
        >
          Enter as Demo User
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="border-t border-zinc-200 w-full" />
        <span className="bg-white px-3 text-[11px] text-zinc-400 uppercase tracking-wider font-medium absolute">
          Or custom sign in
        </span>
      </div>

      {/* Manual Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="name@example.com"
          leftIcon={<Mail className="w-4 h-4" />}
          required
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          leftIcon={<Lock className="w-4 h-4" />}
          required
        />

        <Button
          type="submit"
          variant="outline"
          className="w-full"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Sign In
        </Button>
      </form>

      {/* Start Fresh Onboarding */}
      <div className="pt-2 border-t border-zinc-100 text-center">
        <button
          type="button"
          onClick={handleNewAccount}
          className="text-xs text-zinc-500 hover:text-zinc-900 font-medium transition-colors cursor-pointer"
        >
          Want to test the 5-step onboarding flow? <span className="underline font-semibold text-zinc-800">Start setup</span>
        </button>
      </div>
    </div>
  );
};
