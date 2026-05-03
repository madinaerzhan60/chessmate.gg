import { motion } from 'framer-motion';

export function EloChange({ delta }: { delta: number }) {
  const positive = delta >= 0;
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-2 font-['JetBrains_Mono'] text-sm ${positive ? 'text-[#00ff88]' : 'text-[#ff3359]'}`}
    >
      {positive ? '+' : ''}
      {delta}
    </motion.p>
  );
}
