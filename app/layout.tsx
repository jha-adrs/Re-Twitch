import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { ThemeProvider } from '@/components/theme-provider'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import {Toaster} from "sonner"
//const inter = Inter({ subsets: ['latin'] })
const poppins = Poppins({
  subsets: ['latin'],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: 'Re-Twitch',
  description: 'A Twitch clone built with Next.js and Tailwind CSS.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Check if it is client side or server side
  return (
    <ClerkProvider
    
      appearance={{
        layout:{
          socialButtonsVariant: "blockButton"
        },   
        elements: {
          rootBox: "bg-background ",
          card: "dark:bg-neutral-900 bg-white rounded-lg shadow-lg ",
          socialButtons: " ",
          socialButtonsBlockButton: "dark:hover:bg-foreground/10 rounded-lg",
          alertText: "text-primary",
          headerTitle: "text-primary",
          headerSubtitle: "text-primary",
          footerActionText: "text-primary",
          footerText: "text-primary",
          socialButtonsBlockButtonText: "text-primary",
          socialButtonsBlockButtonArrow: "text-primary",
          navbarButtonIcon: "text-primary",
          navbarMobileMenuButtonIcon: "text-primary",
          navbarMobileMenuButtonText: "text-primary",
          profileSectionTitleText: "text-primary",
          profileSectionSubtitleText: "text-primary",
          profileSectionActionText: "text-primary",
          navbarButton: "text-primary",
          navbar: "dark:bg-black dark:text-primary",
          navbarMobileMenuButton: "text-primary",
          modalCloseButton: "text-primary",
          profileSectionPrimaryButton: "text-primary",
          accordionTriggerButton: "text-primary",
          accordionContent: "text-primary",
          activeDevice: "text-primary",
          userButtonPopoverActionButton: "text-primary",
          userButtonPopoverActionButtonText: "text-primary",
          userButtonPopoverActionButtonIcon: "text-primary",
          userPreviewTextContainer: "text-primary",
          userPreviewSecondaryIdentifier: "text-primary",
          breadcrumbsItem: "text-primary",
          breadcrumbsItemLink: "text-primary",
          breadcrumbsItemIcon: "text-primary",
          pageHeaderTitle: "text-primary",
          pageHeaderSubtitle: "text-primary",
          formFieldLabel: "text-primary",
          formFieldDescription: "text-primary",
          formFieldError: "text-destructive",
          formFieldInput: "text-primary bg-background border border-white border-1",
          formFieldInputPlaceholder: "text-primary",
          
          footerActionLink: cn(
            buttonVariants({variant: "link"}),
            "p-0 m-0 justify-start items-start text-xs h-auto focus-visible:outline-none focus-visible:ring-0 "
          ),
        }
        
      }}>
      <html lang="en">
        <body className={poppins.className}>
          
          <ThemeProvider
            attribute='class'

          >
            <Toaster 
              richColors
              
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
