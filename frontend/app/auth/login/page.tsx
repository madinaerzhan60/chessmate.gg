'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonInput } from '@/components/ui/NeonInput';
import { NeonButton } from '@/components/ui/NeonButton';
import { api } from '@/lib/api';
import { PageFrame } from '@/components/layout/PageFrame';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/auth/login', { email, password });
      router.push('/play');
    } catch {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageFrame
      eyebrow="ACCESS"
      title="Login"
      description="Sign in through a landing-style frame with the same atmosphere as the rest of the app."
    >
      <div className="mx-auto max-w-md">
        <NeonCard className="border-white/5 bg-black/35">
          <form className="mt-4 space-y-3" onSubmit={onSubmit}>
            <NeonInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <NeonInput
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? <p className="text-sm text-[#ff3359]">{error}</p> : null}
            <NeonButton type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </NeonButton>
          </form>
        </NeonCard>
      </div>
    </PageFrame>
  );
}
