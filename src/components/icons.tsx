import { SiCodeforces, SiGithub, SiLeetcode } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { LuFileText, LuMail } from 'react-icons/lu';
import type { LinkKind } from '../data/content';

export function LinkIcon({ kind, size = 20 }: { kind: LinkKind; size?: number }) {
  const props = { size, 'aria-hidden': true } as const;
  switch (kind) {
    case 'github':
      return <SiGithub {...props} />;
    case 'linkedin':
      return <FaLinkedinIn {...props} />;
    case 'codeforces':
      return <SiCodeforces {...props} />;
    case 'leetcode':
      return <SiLeetcode {...props} />;
    case 'email':
      return <LuMail {...props} />;
    case 'resume':
      return <LuFileText {...props} />;
  }
}
