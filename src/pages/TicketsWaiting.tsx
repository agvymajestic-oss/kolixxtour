import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';

const TicketsWaiting = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      {/* Background effects */}
      <div className="noise-overlay" />
      <div className="vignette" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
          className="mb-8 inline-flex items-center justify-center w-20 h-20 border border-border/50 bg-card/50"
        >
          <Clock className="w-10 h-10 text-accent" />
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-2xl md:text-4xl font-bold text-primary mb-4"
        >
          СКОРО
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-mono text-sm md:text-base text-muted-foreground mb-8 leading-relaxed"
        >
          Продажа билетов ещё не началась.
          <br />
          Дождитесь старта продаж.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-card border border-border hover:border-accent/50 text-foreground font-mono text-sm tracking-wider transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            ВЕРНУТЬСЯ НА ГЛАВНУЮ
          </Link>
        </motion.div>
      </motion.div>
      
      {/* Decorative elements */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l border-t border-border/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-r border-t border-border/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l border-b border-border/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-border/30" />
    </div>
  );
};

export default TicketsWaiting;
