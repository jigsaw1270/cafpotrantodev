'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export default function Register() {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Le password non corrispondono');
      return;
    }

    if (!formData.agreeToTerms) {
      alert('Accetta i termini e le condizioni');
      return;
    }

    setIsSubmitting(true);

    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log('Registration submitted:', formData);
    setIsSubmitting(false);
  };

  return (
    <>
      <SEO
        title="Registrati - CafPotranto Dev"
        description="Crea il tuo account CafPotranto Dev per iniziare con i nostri servizi di sviluppo web e strumenti di gestione progetti."
        url="/auth/register"
      />

      {/* Empty div like homepage */}
      <div className="bg-light-teal max-auto text-cyan hidden px-4 md:block">
        .
      </div>

      <div className="grad-up-navy flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md space-y-8"
        >
          {/* Header */}
          <div className="text-center">
            <Link href="/" className="mb-8 inline-flex items-center space-x-2">
              <div className="bg-background h-8 w-8 rounded-full" />
              <span className="text-lg font-bold">CafPotranto</span>
            </Link>
            <h2 className="text-foreground text-3xl font-bold">
              Crea il tuo account
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Unisciti a noi e inizia a costruire progetti straordinari
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-card rounded-lg border p-8 shadow-sm"
            style={{
              background: 'linear-gradient(135deg, #FFD460, #F07B3F)',
              border: 'none',
              color: '#142850',
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-background block text-sm font-medium"
                  >
                    Nome
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      autoComplete="given-name"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="border-input placeholder-muted-foreground text-foreground focus:ring-ring focus:border-ring relative block w-full appearance-none rounded-md border px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
                      placeholder="Nome"
                    />
                    <User className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="text-background block text-sm font-medium"
                  >
                    Cognome
                  </label>
                  <div className="relative mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      autoComplete="family-name"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="border-input placeholder-muted-foreground text-foreground focus:ring-ring focus:border-ring relative block w-full appearance-none rounded-md border px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
                      placeholder="Cognome"
                    />
                    <User className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-background block text-sm font-medium"
                >
                  Indirizzo email
                </label>
                <div className="relative mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="border-input placeholder-muted-foreground text-foreground focus:ring-ring focus:border-ring relative block w-full appearance-none rounded-md border px-3 py-2 pl-10 focus:ring-2 focus:outline-none"
                    placeholder="Inserisci la tua email"
                  />
                  <Mail className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-background block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative mt-1">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="border-input placeholder-muted-foreground text-foreground focus:ring-ring focus:border-ring relative block w-full appearance-none rounded-md border px-3 py-2 pr-10 pl-10 focus:ring-2 focus:outline-none"
                    placeholder="Crea una password"
                  />
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 h-5 w-5"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-background block text-sm font-medium"
                >
                  Conferma password
                </label>
                <div className="relative mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-input placeholder-muted-foreground text-foreground focus:ring-ring focus:border-ring relative block w-full appearance-none rounded-md border px-3 py-2 pr-10 pl-10 focus:ring-2 focus:outline-none"
                    placeholder="Conferma la tua password"
                  />
                  <Lock className="text-muted-foreground absolute top-2.5 left-3 h-5 w-5" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3 h-5 w-5"
                  >
                    {showConfirmPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Terms agreement */}
              <div className="flex items-center">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="text-primary focus:ring-ring border-input h-4 w-4 rounded"
                />
                <label
                  htmlFor="agreeToTerms"
                  className="text-foreground ml-2 block text-sm"
                >
                  Accetto i{' '}
                  <Link
                    href="/terms"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Termini di Servizio
                  </Link>{' '}
                  e la{' '}
                  <Link
                    href="/privacy"
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    Informativa sulla Privacy
                  </Link>
                </label>
              </div>

              {/* Submit button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="mr-2 h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                    />
                    Creazione account...
                  </>
                ) : (
                  'Crea account'
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-border w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-card text-muted-foreground px-2">
                    Oppure continua con
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full text-white">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="ml-2">Google</span>
                </Button>

                <Button variant="outline" className="w-full text-white">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.347-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-12C24.007 5.367 18.641.001 12.017.001z" />
                  </svg>
                  <span className="ml-2">GitHub</span>
                </Button>
              </div>
            </div>

            {/* Sign in link */}
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                Hai già un account?{' '}
                <Link
                  href="/auth/login"
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  Accedi
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
