import { SignUpForm } from '@/components/general/auth/signup-form';

export default function SignUpPage() {
  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-green-950">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] mix-blend-overlay opacity-30 bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-green-950/80 to-green-950/30" />
        </div>
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/572.png" alt="572 Logo" className="h-8 w-8 mr-2" />
          572
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "mk Ive listening, sounds interesting"
            </p>
            <footer className="text-sm">PlagueTPK</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account
            </p>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}