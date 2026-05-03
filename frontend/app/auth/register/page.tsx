'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NeonCard } from '@/components/ui/NeonCard';
import { NeonInput } from '@/components/ui/NeonInput';
import { NeonButton } from '@/components/ui/NeonButton';
import { api } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: '', email: '', password: '', country: '', city: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateField = (field: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post('/auth/register', form);
      router.push('/auth/login');
    } catch {
      setError('Registration failed, please try another username/email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <NeonCard>
        <h1 className="neon-heading text-3xl font-bold">Create Account</h1>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <NeonInput placeholder="Username" value={form.username} onChange={(e) => updateField('username')(e.target.value)} required />
          <NeonInput type="email" placeholder="Email" value={form.email} onChange={(e) => updateField('email')(e.target.value)} required />
          <NeonInput
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => updateField('password')(e.target.value)}
            required
          />
          <NeonInput placeholder="Country" value={form.country} onChange={(e) => updateField('country')(e.target.value)} />
          <NeonInput placeholder="City" value={form.city} onChange={(e) => updateField('city')(e.target.value)} />
          {error ? <p className="text-sm text-[#ff3359]">{error}</p> : null}
          <NeonButton type="submit" className="w-full" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </NeonButton>
        </form>
      </NeonCard>
    </div>
  );
}
