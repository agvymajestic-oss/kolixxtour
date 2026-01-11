import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Send } from 'lucide-react';

const VKIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.678.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
  </svg>
);

const socialLinks = [
  {
    name: 'VK',
    url: 'https://vk.ru/kolixx.music',
    icon: VKIcon
  },
  {
    name: 'Telegram',
    url: 'https://t.me/kolixx_music',
    icon: Send
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/kolixx.music?igsh=cXM5YWpuaHNjZ2tk',
    icon: Instagram
  }
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  

  return (
    <section ref={ref} className="py-24 px-6 flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center gap-8">
        <motion.a
          href="https://band.link/koliixmusic"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="px-8 py-4 border border-border text-sm tracking-[0.3em] text-foreground hover:text-heading hover:border-accent transition-all duration-500 font-mono font-medium"
        >
          ОБ АРТИСТЕ
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-6"
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-heading hover:scale-110 transition-all duration-300"
              aria-label={social.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <social.icon />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
