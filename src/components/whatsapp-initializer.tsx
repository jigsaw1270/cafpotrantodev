'use client';

import { useEffect } from 'react';
import { WhatsAppState } from '@/lib/whatsapp';

export function WhatsAppInitializer() {
  useEffect(() => {
    // Initialize WhatsApp storage system on client side
    WhatsAppState.initialize();

    console.log('🚀 WhatsApp 24h expiration system initialized');
  }, []);

  return null; // This component doesn't render anything
}
