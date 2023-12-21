import { ModeToggle } from "@/components/ThemeSwitcher"
import { Logo } from "./_components/logo"

const layout = ({children}:{children: React.ReactNode}) => {
  return (
    <div className="h-full flex flex-col items-center justify-center space-y-6">
        <ModeToggle className="absolute top-2 left-2" />
        <Logo />
      {children}
    </div>
  )
}

export default layout
