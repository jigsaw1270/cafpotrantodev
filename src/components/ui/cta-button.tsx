'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CTAButtonProps extends ButtonProps {
  showArrow?: boolean;
  animateOnHover?: boolean;
}

export function CTAButton({
  children,
  showArrow = true,
  animateOnHover = true,
  className,
  ...props
}: CTAButtonProps) {
  const buttonContent = (
    <>
      <span>{children}</span>
      {showArrow && (
        <motion.div
          className="ml-2"
          animate={animateOnHover ? { x: [0, 4, 0] } : {}}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          }}
        >
          <ArrowRight className="h-4 w-4" />
        </motion.div>
      )}
    </>
  );

  if (animateOnHover) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <Button
          className={cn('group overflow-hidden', className)}
          {...props}
        >
          {buttonContent}
        </Button>
      </motion.div>
    );
  }

  return (
    <Button className={cn('group overflow-hidden', className)} {...props}>
      {buttonContent}
    </Button>
  );
}
